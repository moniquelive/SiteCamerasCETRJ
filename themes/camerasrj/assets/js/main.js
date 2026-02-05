(function () {
  'use strict';

  window.init = function () {
    const bairrosUrl = window.CAMERAS_RJ_ASSETS && window.CAMERAS_RJ_ASSETS.bairrosUrl;
    if (!bairrosUrl) {
      console.error('CAMERAS_RJ_ASSETS.bairrosUrl not defined');
      return;
    }

    const storageKeys = {
      bairro: "camerasrj.bairro",
      camera: "camerasrj.camera",
      favorites: "camerasrj.favorites",
    };

    // Offline detection
    let isOnline = navigator.onLine;
    window.addEventListener('online', () => { isOnline = true; });
    window.addEventListener('offline', () => { isOnline = false; });

    // Retry logic with exponential backoff
    const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          const response = await fetch(url, { 
            ...options, 
            signal: controller.signal 
          });
          clearTimeout(timeoutId);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response;
        } catch (error) {
          if (i === maxRetries - 1) throw error;
          await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
        }
      }
    };

    fetchWithRetry(bairrosUrl)
      .then((response) => response.json())
      .then((bairrosData) => createCameras(bairrosData))
      .catch((error) => {
        console.warn("Falha ao carregar dados de bairros:", error);
        showOfflineMessage();
      });

    function showOfflineMessage() {
      const host = document.querySelector(".cameras-ui") || document.body;
      const msg = document.createElement('div');
      msg.className = 'camera-empty';
      msg.textContent = isOnline 
        ? 'Não foi possível carregar os dados. Tente novamente mais tarde.'
        : 'Você está offline. Verifique sua conexão.';
      host.appendChild(msg);
    }

    function createCameras(bairrosData) {
      const CAM_URL = "https://aplicativo.cocr.com.br/camera/";
      const imageControllers = new Map();
      const imageObservers = new WeakMap();

      // Cleanup function for image resources
      const cleanupImage = (img) => {
        const controller = imageControllers.get(img);
        if (controller) {
          controller.abort();
          imageControllers.delete(img);
        }
        const observer = imageObservers.get(img);
        if (observer) {
          observer.disconnect();
          imageObservers.delete(img);
        }
      };

      function createElement(tag, options) {
        const element = document.createElement(tag);
        if (!options) return element;
        const { className, text, htmlFor, id, attributes, children } = options;
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        if (htmlFor) element.htmlFor = htmlFor;
        if (id) element.id = id;
        if (attributes) {
          Object.keys(attributes).forEach((key) =>
            element.setAttribute(key, attributes[key]),
          );
        }
        if (children && children.length) element.append(...children);
        return element;
      }

      function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
      }

      const ensureHost = () => {
        let host = document.querySelector(".cameras-ui");
        if (host) return host;
        host = createElement("div", { className: "cameras-ui" });
        const main = document.querySelector("main");
        if (main) {
          main.appendChild(host);
        } else {
          document.body.appendChild(host);
        }
        return host;
      };

      const host = ensureHost();
      host.innerHTML = "";

      const loadFavorites = () => {
        try {
          const raw = window.localStorage.getItem(storageKeys.favorites);
          const parsed = raw ? JSON.parse(raw) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
          return [];
        }
      };

      const saveFavorites = (favorites) => {
        try {
          window.localStorage.setItem(
            storageKeys.favorites,
            JSON.stringify(favorites),
          );
        } catch (error) {
          console.warn('Failed to save favorites:', error);
        }
      };

      const getFavoriteIndex = (favorites, cameraId) =>
        favorites.findIndex((item) => item.id === cameraId);

      const bairroSelect = createElement("select", {
        id: "bairro-select",
        className: "form-select",
        attributes: { "aria-label": "Selecionar bairro" }
      });
      const cameraSelect = createElement("select", {
        id: "camera-select",
        className: "form-select",
        attributes: { "aria-label": "Selecionar câmera" }
      });
      const bairroField = createElement("div", {
        className: "form-field",
        children: [
          createElement("label", {
            className: "form-label",
            htmlFor: "bairro-select",
            text: "Bairro",
          }),
          bairroSelect,
        ],
      });
      const cameraField = createElement("div", {
        className: "form-field",
        children: [
          createElement("label", {
            className: "form-label",
            htmlFor: "camera-select",
            text: "Câmera",
          }),
          cameraSelect,
        ],
      });
      const controls = createElement("div", {
        className: "camera-controls",
        children: [bairroField, cameraField],
      });
      const favoritesTitle = createElement("span", {
        className: "favorites-title",
        text: "Favoritos",
      });
      const favoritesHeader = createElement("div", {
        className: "favorites-header",
        children: [favoritesTitle],
      });
      const favoritesList = createElement("ul", {
        className: "favorites-list",
        attributes: { 
          role: "list",
          "aria-label": "Lista de câmeras favoritas"
        }
      });
      const favoritesEmpty = createElement("p", {
        className: "favorites-empty",
        text: "Nenhum favorito ainda.",
      });
      const favoritesPanel = createElement("section", {
        className: "favorites-panel",
        attributes: { 
          "aria-live": "polite",
          "aria-atomic": "false"
        },
        children: [favoritesHeader, favoritesEmpty, favoritesList],
      });
      const grid = createElement("div", { 
        className: "camera-grid",
        attributes: { role: "list" }
      });
      const listWrapper = createElement("div", {
        className: "cameras-list",
        children: [grid],
      });

      host.append(favoritesPanel, controls, listWrapper);

      const bairros = Object.keys(bairrosData || {}).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase()),
      );

      const grouped = bairros.reduce((acc, bairro) => {
        const letter = bairro.charAt(0).toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(bairro);
        return acc;
      }, {});

      // Use DOM methods instead of innerHTML for options
      Object.keys(grouped)
        .sort()
        .forEach((letter) => {
          const optgroup = createElement("optgroup", {
            attributes: { label: letter },
          });
          grouped[letter].forEach((bairro) => {
            const option = createElement("option", {
              attributes: { value: bairro },
              text: bairro,
            });
            optgroup.appendChild(option);
          });
          bairroSelect.appendChild(optgroup);
        });

      const savedBairro = window.localStorage.getItem(storageKeys.bairro) || "";
      const savedCamera = window.localStorage.getItem(storageKeys.camera) || "";
      let favorites = loadFavorites();
      const state = {
        bairro: bairros.includes(savedBairro) ? savedBairro : bairros[0] || "",
        cameraId: savedCamera,
      };

      // IntersectionObserver for lazy loading
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            loadImage(img);
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });

      const loadImage = (img) => {
        const url = img.dataset.src;
        if (!url) return;
        
        cleanupImage(img);
        
        const controller = new AbortController();
        imageControllers.set(img, controller);
        
        fetch(url, { signal: controller.signal })
          .then((response) => {
            if (!response.ok) throw new Error("Falha ao carregar camera.");
            return response.blob();
          })
          .then((blob) => {
            if (controller.signal.aborted) return;
            const objectUrl = URL.createObjectURL(blob);
            img.src = objectUrl;
            img.dataset.objectUrl = objectUrl;
          })
          .catch(() => {
            if (controller.signal.aborted) return;
            img.src = url;
          });
      };

      const bindImageEvents = (img) => {
        const card = img.closest(".camera-card");
        const media = img.closest(".camera-media");
        const caption = card?.querySelector(".camera-caption");
        
        const onLoad = () => {
          // Hide caption completely when image loads
          if (caption) {
            caption.classList.add("camera-caption--loaded");
          }
          if (media) {
            media.classList.remove("is-loading");
          }
          img.style.visibility = "visible";
          img.style.opacity = "1";
          img.dataset.failed = "false";
        };
        
        const onError = () => {
          const detail = img.naturalWidth === 0 ? "sem imagem" : "";
          const message = detail
            ? `Erro ao carregar (${detail})`
            : "Erro ao carregar";
          
          // Show error in caption, keep image hidden
          if (caption) {
            caption.textContent = "Erro ao carregar";
            caption.title = message;
            caption.classList.remove("camera-caption--loaded");
          }
          img.style.visibility = "hidden";
          img.style.opacity = "0";
          img.dataset.failed = "true";
        };
        
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onError, { once: true });
      };

      const renderCamera = () => {
        const cameras = bairrosData[state.bairro] || [];
        let selected = cameras.filter((cam) => cam.id === state.cameraId);
        if (!selected.length && cameras.length) {
          selected = [cameras[0]];
          state.cameraId = cameras[0].id;
        }

        // Cleanup all existing images
        grid.querySelectorAll("img.camera-image").forEach((img) => {
          cleanupImage(img);
          if (img.dataset.objectUrl) {
            URL.revokeObjectURL(img.dataset.objectUrl);
          }
        });

        // Use DOM methods instead of innerHTML for camera cards
        grid.innerHTML = "";
        
        selected.forEach((cam) => {
          const id = cam.id;
          const captionText = cam.caption || "";
          const src = CAM_URL + encodeURIComponent(id);
          const isFavorite = getFavoriteIndex(favorites, id) !== -1;
          
          const card = createElement("div", {
            className: "camera-card is-expanded",
            attributes: { 
              "data-camera-id": id,
              role: "listitem"
            },
          });
          
          const media = createElement("div", { className: "camera-media is-loading" });
          
          const favButton = createElement("button", {
            className: "camera-favorite",
            attributes: {
              type: "button",
              "data-action": "toggle-favorite",
              "aria-pressed": String(isFavorite),
              "aria-label": isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos",
            },
            text: isFavorite ? "🗑️" : "✅",
          });
          
          const img = createElement("img", {
            className: "camera-image",
            attributes: {
              alt: `Câmera ${captionText || id}`,
              "data-src": src,
              loading: "lazy",
            },
          });
          // Initially hide image visually but keep layout space for IntersectionObserver
          img.style.visibility = "hidden";
          img.style.opacity = "0";
          img.style.transition = "opacity 0.3s ease";
          
          const captionDiv = createElement("div", {
            className: "camera-caption",
            attributes: { "data-caption": captionText },
            text: "Carregando...",
          });
          captionDiv.style.display = "block";
          
          media.append(favButton, img, captionDiv);
          card.append(media);
          grid.appendChild(card);
          
          // Bind events BEFORE observing to ensure handlers are ready
          bindImageEvents(img);
          
          // Observe for lazy loading
          imageObserver.observe(img);
        });
      };

      const renderFavorites = () => {
        favoritesList.innerHTML = "";
        if (!favorites.length) {
          favoritesEmpty.style.display = "block";
          return;
        }
        favoritesEmpty.style.display = "none";
        favorites.forEach((item) => {
          const row = createElement("li", { 
            className: "favorites-row",
            attributes: { role: "listitem" }
          });
          const link = createElement("button", {
            className: "favorites-link",
            text: `${item.bairro} — ${item.caption}`,
            attributes: {
              type: "button",
              "data-bairro": item.bairro,
              "data-camera": item.id,
              "aria-label": `Ver câmera ${item.caption} em ${item.bairro}`,
            },
          });
          const remove = createElement("button", {
            className: "favorites-remove",
            text: "🗑️",
            attributes: {
              type: "button",
              "data-action": "remove-favorite",
              "data-camera": item.id,
              "aria-label": `Remover ${item.caption} dos favoritos`,
            },
          });
          row.append(link, remove);
          favoritesList.appendChild(row);
        });
      };

      const toggleFavorite = (cam, bairroName) => {
        const index = getFavoriteIndex(favorites, cam.id);
        if (index === -1) {
          favorites = [
            {
              id: cam.id,
              caption: cam.caption || cam.id,
              bairro: bairroName,
            },
            ...favorites,
          ];
        } else {
          favorites = favorites.filter((item) => item.id !== cam.id);
        }
        saveFavorites(favorites);
        renderFavorites();
        renderCamera();
      };

      const updateCameraSelect = () => {
        const cameras = bairrosData[state.bairro] || [];
        cameraSelect.innerHTML = "";
        cameras.forEach((cam) => {
          const option = createElement("option", {
            text: cam.caption || cam.id,
            attributes: { value: cam.id },
          });
          cameraSelect.appendChild(option);
        });
        const cameraIds = cameras.map((cam) => cam.id);
        state.cameraId = cameraIds.includes(state.cameraId)
          ? state.cameraId
          : cameras.length
            ? cameras[0].id
            : "";
        if (state.cameraId) cameraSelect.value = state.cameraId;
      };

      // Keyboard navigation
      bairroSelect.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          cameraSelect.focus();
          e.preventDefault();
        }
      });

      cameraSelect.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          bairroSelect.focus();
          e.preventDefault();
        }
      });

      bairroSelect.value = state.bairro;
      bairroSelect.addEventListener("change", (event) => {
        state.bairro = event.target.value;
        window.localStorage.setItem(storageKeys.bairro, state.bairro);
        updateCameraSelect();
        renderCamera();
      });

      cameraSelect.addEventListener("change", (event) => {
        state.cameraId = event.target.value;
        window.localStorage.setItem(storageKeys.camera, state.cameraId);
        renderCamera();
      });

      favoritesList.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const removeButton = target.closest("[data-action='remove-favorite']");
        if (removeButton) {
          const cameraId = removeButton.getAttribute("data-camera") || "";
          favorites = favorites.filter((item) => item.id !== cameraId);
          saveFavorites(favorites);
          renderFavorites();
          renderCamera();
          return;
        }
        const link = target.closest("[data-bairro][data-camera]");
        if (!link) return;
        const bairro = link.getAttribute("data-bairro") || "";
        const cameraId = link.getAttribute("data-camera") || "";
        if (!bairro || !cameraId) return;
        state.bairro = bairro;
        state.cameraId = cameraId;
        window.localStorage.setItem(storageKeys.bairro, state.bairro);
        window.localStorage.setItem(storageKeys.camera, state.cameraId);
        bairroSelect.value = state.bairro;
        updateCameraSelect();
        cameraSelect.value = state.cameraId;
        renderCamera();
      });

      grid.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const button = target.closest("[data-action='toggle-favorite']");
        if (!button) return;
        const card = button.closest(".camera-card");
        if (!card) return;
        const cameraId = card.getAttribute("data-camera-id") || "";
        const cameras = bairrosData[state.bairro] || [];
        const cam = cameras.find((item) => item.id === cameraId);
        if (!cam) return;
        toggleFavorite(cam, state.bairro);
      });

      if (!state.bairro) {
        grid.innerHTML = "";
        const emptyMsg = createElement("p", {
          className: "camera-empty",
          text: "Nenhum bairro disponível.",
        });
        grid.appendChild(emptyMsg);
        return;
      }

      updateCameraSelect();
      renderCamera();
      renderFavorites();

      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        grid.querySelectorAll("img.camera-image").forEach((img) => {
          cleanupImage(img);
          if (img.dataset.objectUrl) {
            URL.revokeObjectURL(img.dataset.objectUrl);
          }
        });
      });
    }
  };
})();
