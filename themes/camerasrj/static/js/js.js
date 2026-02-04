(function () {
  window.init = function () {
    const bairrosUrl = "/js/cor-bairros.json";
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
      const grid = createElement("div", { className: "camera-grid" });
      const listWrapper = createElement("div", {
        className: "cameras-list",
        children: [grid],
      });

      host.append(controls, listWrapper);

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

      const state = { bairro: bairros[0] || "", cameraId: "" };

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

        const html = selected
          .map((cam) => {
            const id = cam.id;
            const caption = cam.caption || "";
            const src = CAM_URL + encodeURIComponent(id);
            return `
            <div class="camera-card">
              <div class="camera-media">
                <img class="camera-image" alt="" src="${src}">
              </div>
              <div class="camera-caption" data-caption="${escapeHtml(
                caption,
              )}">Carregando...</div>
            </div>
          `;
          })
          .join("");
        grid.innerHTML = html;
        bindImageEvents(Array.from(grid.querySelectorAll("img.camera-image")));
        bindGridHover();
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
        state.cameraId = cameras.length ? cameras[0].id : "";
      };

      const bindGridHover = () => {
        const cards = Array.from(grid.querySelectorAll(".camera-card"));
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            cards.forEach((item) => item.classList.remove("is-expanded"));
            card.classList.add("is-expanded");
          });
          card.addEventListener("mouseleave", () => {
            card.classList.remove("is-expanded");
          });
        });
      };

      bairroSelect.addEventListener("change", (event) => {
        state.bairro = event.target.value;
        updateCameraSelect();
        renderCamera();
      });

      cameraSelect.addEventListener("change", (event) => {
        state.cameraId = event.target.value;
        renderCamera();
      });

      if (!state.bairro) {
        grid.innerHTML =
          '<p class="camera-empty">Nenhum bairro disponível.</p>';
        return;
      }

      updateCameraSelect();
      renderCamera();
    }
  };
})();
