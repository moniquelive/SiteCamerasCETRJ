window.init = function () {
  const bairrosUrl = "/js/cor-bairros.json";
  $.getJSON(bairrosUrl)
    .done((bairrosData) => createCameras(bairrosData))
    .fail(() => console.warn("Falha ao carregar dados de bairros."));

  // https://aplicativo.cocr.com.br/cameras_api
  // https://aplicativo.cocr.com.br/camera/325
  // https://aplicativo.cocr.com.br/radar_emb_app
  function createCameras(bairrosData) {
    const CAM_URL = "https://aplicativo.cocr.com.br/camera/";

    function escapeHtml(text) {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    const ensureHost = () => {
      let $host = $(".cameras-ui");
      if ($host.length) return $host;
      const $article = $("main article").first();
      $host = $('<div class="cameras-ui row"></div>');
      if ($article.length) {
        const $time = $article.find(".time").last();
        if ($time.length) {
          $host.insertAfter($time);
        } else {
          $host.prependTo($article);
        }
      } else {
        $host.appendTo("body");
      }
      return $host;
    };

    const $host = ensureHost();
    $host.empty();

    const $controls = $(
      `<div class="col-md-12 cameras-controls">
        <label for="bairro-select">Bairro</label>
        <select id="bairro-select" class="form-control"></select>
      </div>`,
    );
    const $cameraControls = $(
      `<div class="col-md-12 cameras-controls">
        <label for="camera-select">Câmera</label>
        <select id="camera-select" class="form-control"></select>
      </div>`,
    );
    const $listWrapper = $(
      `<div class="col-md-12 cameras-list">
        <div class="row camera-grid"></div>
      </div>`,
    );
    $host.append($controls, $cameraControls, $listWrapper);

    const $select = $host.find("#bairro-select");
    const $cameraSelect = $host.find("#camera-select");
    const $grid = $host.find(".camera-grid");

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
        $select.append(
          `<optgroup label="${escapeHtml(letter)}">${options}</optgroup>`,
        );
      });

    const state = { bairro: bairros[0] || "", cameraId: "" };

    const bindImageEvents = ($imgs) => {
      $imgs.each(function () {
        const $img = $(this);
        const $caption = $img.next(".caption");
        $img
          .off("load.camera")
          .on("load.camera", function () {
            $caption.hide();
            $img.removeData("failed");
          })
          .off("error.camera")
          .on("error.camera", function () {
            const detail = this.naturalWidth === 0 ? "sem imagem" : "";
            const message = detail
              ? `Erro ao carregar (${detail})`
              : "Erro ao carregar";
            $caption.text("Erro ao carregar").attr("title", message).show();
            $caption.prev(".camera-image").data("failed", true);
          });
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
            <div class="col-md-6 camera-item">
              <div class="thumbnail">
                <img class="camera-image img-responsive" alt="" style="width:100%" src="${src}">
                <div class="caption" data-caption="${escapeHtml(
                  caption,
                )}">Carregando...</div>
              </div>
            </div>
          `;
        })
        .join("");
      $grid.html(html);
      bindImageEvents($grid.find("img.camera-image"));
      bindGridHover();
    };

    const updateCameraSelect = () => {
      const cameras = bairrosData[state.bairro] || [];
      $cameraSelect.empty();
      cameras.forEach((cam) => {
        $cameraSelect.append(
          `<option value="${escapeHtml(cam.id)}">${escapeHtml(
            cam.caption || cam.id,
          )}</option>`,
        );
      });
      state.cameraId = cameras.length ? cameras[0].id : "";
    };

    const bindGridHover = () => {
      $grid
        .find(".camera-item")
        .off("mouseenter.camera mouseleave.camera")
        .on("mouseenter.camera", function () {
          const $item = $(this);
          $grid
            .find(".camera-item")
            .removeClass("camera-item--expanded col-md-12")
            .addClass("col-md-6");
          $item
            .removeClass("col-md-6")
            .addClass("col-md-12 camera-item--expanded");
        })
        .on("mouseleave.camera", function () {
          $(this)
            .removeClass("camera-item--expanded col-md-12")
            .addClass("col-md-6");
        });
    };

    $select.on("change", function () {
      state.bairro = $(this).val();
      updateCameraSelect();
      renderCamera();
    });

    $cameraSelect.on("change", function () {
      state.cameraId = $(this).val();
      renderCamera();
    });

    if (!state.bairro) {
      $grid.html("<p>Nenhum bairro disponível.</p>");
      return;
    }

    updateCameraSelect();
    renderCamera();
  }

  function extractParamFromUri(uri, paramName) {
    if (!uri) return;
    const regex = new RegExp("[\\?&#]" + paramName + "=([^&#]*)");
    const params = regex.exec(uri);
    if (params != null) return decodeURIComponent(params[1]);
  }

  // social thangs
  if (navigator.userAgent.match(/Chrome/i)) {
    $(".for-chrome-only").fadeIn();
  }
  const $fb_like = $("a.addthis_button_facebook_like");
  $fb_like.bind("edge.create", (targetUrl) =>
    ga("send", "social", "facebook", "like", targetUrl),
  );
  $fb_like.bind("edge.remove", (targetUrl) =>
    ga("send", "social", "facebook", "unlike", targetUrl),
  );
  $("a.addthis_button_tweet").bind("tweet", function (event) {
    if (event) {
      const targetUrl =
        event.target && event.target.nodeName == "IFRAME"
          ? extractParamFromUri(event.target.src, "url")
          : "";
      ga("send", "social", "twitter", "tweet", targetUrl);
    }
  });
};
