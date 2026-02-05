#!/usr/bin/env bash

#------------------------------------------------------------------------------
# @file
# Builds a Hugo site hosted on a Cloudflare Worker.
#
# The Cloudflare Worker automatically installs Node.js dependencies.
#------------------------------------------------------------------------------

set -euo pipefail

# Tool versions
DART_SASS_VERSION=1.97.1
GO_VERSION=1.25.6
HUGO_VERSION=0.155.2
NODE_VERSION=24.12.0

# Cache directory for toolchains
CACHE_DIR="${HOME}/.cache/camerasrj"
mkdir -p "${CACHE_DIR}"

export TZ=America/Sao_Paulo

# Function to install Dart Sass with caching
install_dart_sass() {
  local version="${1}"
  local cache_path="${CACHE_DIR}/dart-sass-${version}"
  
  if [[ -d "${cache_path}" ]]; then
    echo "Using cached Dart Sass ${version}"
  else
    echo "Installing Dart Sass ${version}..."
    curl -sLJO "https://github.com/sass/dart-sass/releases/download/${version}/dart-sass-${version}-linux-x64.tar.gz"
    mkdir -p "${cache_path}"
    tar -xf "dart-sass-${version}-linux-x64.tar.gz" -C "${cache_path}" --strip-components=1
    rm "dart-sass-${version}-linux-x64.tar.gz"
  fi
  
  export PATH="${cache_path}:${PATH}"
}

# Function to install Go with caching
install_go() {
  local version="${1}"
  local cache_path="${CACHE_DIR}/go-${version}"
  
  if [[ -d "${cache_path}" ]]; then
    echo "Using cached Go ${version}"
  else
    echo "Installing Go ${version}..."
    curl -sLJO "https://go.dev/dl/go${version}.linux-amd64.tar.gz"
    mkdir -p "${cache_path}"
    tar -xf "go${version}.linux-amd64.tar.gz" -C "${cache_path}" --strip-components=1
    rm "go${version}.linux-amd64.tar.gz"
  fi
  
  export PATH="${cache_path}/bin:${PATH}"
}

# Function to install Hugo with caching
install_hugo() {
  local version="${1}"
  local cache_path="${CACHE_DIR}/hugo-${version}"
  
  if [[ -d "${cache_path}" ]]; then
    echo "Using cached Hugo ${version}"
  else
    echo "Installing Hugo ${version}..."
    curl -sLJO "https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_extended_${version}_linux-amd64.tar.gz"
    mkdir -p "${cache_path}"
    tar -xf "hugo_extended_${version}_linux-amd64.tar.gz" -C "${cache_path}"
    rm "hugo_extended_${version}_linux-amd64.tar.gz"
  fi
  
  export PATH="${cache_path}:${PATH}"
}

# Function to install Node.js with caching
install_node() {
  local version="${1}"
  local cache_path="${CACHE_DIR}/node-${version}"
  
  if [[ -d "${cache_path}" ]]; then
    echo "Using cached Node.js ${version}"
  else
    echo "Installing Node.js ${version}..."
    curl -sLJO "https://nodejs.org/dist/v${version}/node-v${version}-linux-x64.tar.xz"
    mkdir -p "${cache_path}"
    tar -xf "node-v${version}-linux-x64.tar.xz" -C "${cache_path}" --strip-components=1
    rm "node-v${version}-linux-x64.tar.xz"
  fi
  
  export PATH="${cache_path}/bin:${PATH}"
}

# Function to clean old cache versions
clean_old_caches() {
  echo "Cleaning old cache versions..."
  
  # Keep only current versions
  for tool in dart-sass go hugo node; do
    find "${CACHE_DIR}" -maxdepth 1 -type d -name "${tool}-*" | while read -r dir; do
      case "${tool}" in
        dart-sass)
          if [[ ! "${dir}" == *"${DART_SASS_VERSION}"* ]]; then
            echo "Removing old cache: ${dir}"
            rm -rf "${dir}"
          fi
          ;;
        go)
          if [[ ! "${dir}" == *"${GO_VERSION}"* ]]; then
            echo "Removing old cache: ${dir}"
            rm -rf "${dir}"
          fi
          ;;
        hugo)
          if [[ ! "${dir}" == *"${HUGO_VERSION}"* ]]; then
            echo "Removing old cache: ${dir}"
            rm -rf "${dir}"
          fi
          ;;
        node)
          if [[ ! "${dir}" == *"${NODE_VERSION}"* ]]; then
            echo "Removing old cache: ${dir}"
            rm -rf "${dir}"
          fi
          ;;
      esac
    done
  done
}

main() {
  # Install toolchains with caching
  install_dart_sass "${DART_SASS_VERSION}"
  install_go "${GO_VERSION}"
  install_hugo "${HUGO_VERSION}"
  install_node "${NODE_VERSION}"
  
  # Clean old caches periodically (check if this is a fresh build)
  if [[ -z "${SKIP_CACHE_CLEAN:-}" ]]; then
    clean_old_caches
  fi
  
  # Verify installations
  echo "Verifying installations..."
  echo "Dart Sass: $(sass --version 2>/dev/null || echo 'not found')"
  echo "Go: $(go version 2>/dev/null || echo 'not found')"
  echo "Hugo: $(hugo version 2>/dev/null || echo 'not found')"
  echo "Node.js: $(node --version 2>/dev/null || echo 'not found')"
  
  # Configure Git
  echo "Configuring Git..."
  git config core.quotepath false
  if [ "$(git rev-parse --is-shallow-repository 2>/dev/null)" = "true" ]; then
    git fetch --unshallow || true
  fi
  
  # Install Node.js dependencies
  echo "Installing Node.js dependencies..."
  if [ -f "package-lock.json" ]; then
    npm ci
  else
    npm install
  fi
  
  # Build the site
  echo "Building the site..."
  hugo --gc --minify
  
  echo "Build completed successfully!"
}

main "$@"
