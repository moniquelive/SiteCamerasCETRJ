(function () {
  window.init = function () {
    const bairrosUrl = "/js/cor-bairros.json";
    const storageKeys = {
      bairro: "camerasrj.bairro",
      camera: "camerasrj.camera",
      favorites: "camerasrj.favorites",
    };
    fetch(bairrosUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar dados de bairros.");
        }
        return response.json();
      })
      .then((bairrosData) => createCameras(bairrosData))
      .catch(() => console.warn("Falha ao carregar dados de bairros."));

    // https://aplicativo.cocr.com.br/cameras_api
    // https://aplicativo.cocr.com.br/camera/325
    // https://aplicativo.cocr.com.br/radar_emb_app
    function createCameras(bairrosData) {
      const CAM_URL = "https://aplicativo.cocr.com.br/camera/";
      const imageControllers = new WeakMap();

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
        return String(text)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\"/g, "&quot;")
          .replace(/'/g, "&#039;");
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
        window.localStorage.setItem(
          storageKeys.favorites,
          JSON.stringify(favorites),
        );
      };

      const getFavoriteIndex = (favorites, cameraId) =>
        favorites.findIndex((item) => item.id === cameraId);

      const bairroSelect = createElement("select", {
        id: "bairro-select",
        className: "form-select",
      });
      const cameraSelect = createElement("select", {
        id: "camera-select",
        className: "form-select",
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
      });
      const favoritesEmpty = createElement("p", {
        className: "favorites-empty",
        text: "Nenhum favorito ainda.",
      });
      const favoritesPanel = createElement("section", {
        className: "favorites-panel",
        children: [favoritesHeader, favoritesEmpty, favoritesList],
      });
      const grid = createElement("div", { className: "camera-grid" });
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

      Object.keys(grouped)
        .sort()
        .forEach((letter) => {
          const options = grouped[letter]
            .map(
              (bairro) =>
                `<option value="${escapeHtml(bairro)}">${escapeHtml(
                  bairro,
                )}</option>`,
            )
            .join("");
          const optgroup = createElement("optgroup", {
            attributes: { label: letter },
          });
          optgroup.innerHTML = options;
          bairroSelect.appendChild(optgroup);
        });

      const savedBairro = window.localStorage.getItem(storageKeys.bairro) || "";
      const savedCamera = window.localStorage.getItem(storageKeys.camera) || "";
      let favorites = loadFavorites();
      const state = {
        bairro: bairros.includes(savedBairro) ? savedBairro : bairros[0] || "",
        cameraId: savedCamera,
      };

      const bindImageEvents = (imgs) => {
        imgs.forEach((img) => {
          const caption = img
            .closest(".camera-card")
            .querySelector(".camera-caption");
          const onLoad = () => {
            if (caption) caption.style.display = "none";
            img.dataset.failed = "false";
          };
          const onError = () => {
            const detail = img.naturalWidth === 0 ? "sem imagem" : "";
            const message = detail
              ? `Erro ao carregar (${detail})`
              : "Erro ao carregar";
            if (caption) {
              caption.textContent = "Erro ao carregar";
              caption.title = message;
              caption.style.display = "block";
            }
            img.dataset.failed = "true";
          };
          img.addEventListener("load", onLoad);
          img.addEventListener("error", onError);
        });
      };

      const renderCamera = () => {
        const cameras = bairrosData[state.bairro] || [];
        let selected = cameras.filter((cam) => cam.id === state.cameraId);
        if (!selected.length && cameras.length) {
          selected = [cameras[0]];
          state.cameraId = cameras[0].id;
        }

        grid.querySelectorAll("img.camera-image").forEach((img) => {
          const current = imageControllers.get(img);
          if (current && current.controller) current.controller.abort();
          if (current && current.objectUrl)
            URL.revokeObjectURL(current.objectUrl);
          imageControllers.delete(img);
        });

        const html = selected
          .map((cam) => {
            const id = cam.id;
            const caption = cam.caption || "";
            const src = CAM_URL + encodeURIComponent(id);
            const isFavorite = getFavoriteIndex(favorites, id) !== -1;
            return `
            <div class="camera-card is-expanded" data-camera-id="${escapeHtml(
              id,
            )}">
              <div class="camera-media">
                <button
                  class="camera-favorite"
                  type="button"
                  data-action="toggle-favorite"
                  aria-pressed="${isFavorite}"
                  aria-label="${
                    isFavorite
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }"
                >${isFavorite ? "⭐" : "✨"}</button>
                <img class="camera-image" alt="" data-src="${src}">
              </div>
              <div class="camera-caption" data-caption="${escapeHtml(
                caption,
              )}">Carregando...</div>
            </div>
          `;
          })
          .join("");
        grid.innerHTML = html;
        const images = Array.from(grid.querySelectorAll("img.camera-image"));
        bindImageEvents(images);
        images.forEach((img) => {
          const url = img.dataset.src;
          if (!url) return;
          const controller = new AbortController();
          imageControllers.set(img, { controller, objectUrl: null });
          fetch(url, { signal: controller.signal })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Falha ao carregar camera.");
              }
              return response.blob();
            })
            .then((blob) => {
              if (controller.signal.aborted) return;
              const objectUrl = URL.createObjectURL(blob);
              imageControllers.set(img, { controller, objectUrl });
              img.src = objectUrl;
            })
            .catch(() => {
              if (controller.signal.aborted) return;
              img.src = url;
            });
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
          const row = createElement("li", { className: "favorites-row" });
          const link = createElement("button", {
            className: "favorites-link",
            text: `${item.bairro} — ${item.caption}`,
            attributes: {
              type: "button",
              "data-bairro": item.bairro,
              "data-camera": item.id,
            },
          });
          const remove = createElement("button", {
            className: "favorites-remove",
            text: "🗑️",
            attributes: {
              type: "button",
              "data-action": "remove-favorite",
              "data-camera": item.id,
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
        grid.innerHTML =
          '<p class="camera-empty">Nenhum bairro disponível.</p>';
        return;
      }

      updateCameraSelect();
      renderCamera();
      renderFavorites();
    }
  };
})();
