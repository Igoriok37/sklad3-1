(function () {

    /* ═══════════════════════════════════
       ДАННЫЕ
    ═══════════════════════════════════ */

    var MODELS = [
      { id: 0, name: 'СКЛАД 300',  area: '300–450 м²',     dims: '30×10×6 м'   },
      { id: 1, name: 'СКЛАД 500',  area: '450–800 м²',     dims: '50×10×7 м'   },
      { id: 2, name: 'СКЛАД 1000', area: '800–1 500 м²',   dims: '50×20×8 м'   },
      { id: 3, name: 'СКЛАД 2000', area: '1 500–2 000 м²', dims: '100×20×9 м'  }
    ];

    var CONFIGS = [
      { name: 'Base',    prices: [24900000,  42500000,  79000000,  148000000] },
      { name: 'Base+',   prices: [28500000,  48000000,  89500000,  168000000] },
      { name: 'Optimal', prices: [33200000,  55500000,  103000000, 193000000] },
      { name: 'Max',     prices: [39900000,  65000000,  121000000, 228000000] }
    ];

    // RAL-цвета для стен и кровли
    var WALL_COLORS = [
      { ral: 'RAL 7035', label: 'Светло-серый',     hex: '#D2D3D0', mat: 'WallMaterial',  extra: 0 },
      { ral: 'RAL 7004', label: 'Сигнальный серый', hex: '#9EA0A1', mat: 'WallMaterial',  extra: 0 },
      { ral: 'RAL 9003', label: 'Белый',             hex: '#ECECE7', mat: 'WallMaterial',  extra: 0 },
      { ral: 'RAL 5005', label: 'Синий',             hex: '#1B4788', mat: 'WallMaterial',  extra: 0 },
      { ral: 'RAL 3009', label: 'Оксидно-красный',  hex: '#6B3234', mat: 'WallMaterial',  extra: 0 },
      { ral: 'RAL 6005', label: 'Зелёный мох',      hex: '#114232', mat: 'WallMaterial',  extra: 0 },
      { ral: 'RAL 8017', label: 'Коричневый',       hex: '#472F2B', mat: 'WallMaterial',  extra: 0 }
    ];

    var ROOF_COLORS = [
      { ral: 'RAL 7004', label: 'Сигнальный серый', hex: '#9EA0A1', mat: 'RoofMaterial',  extra: 0 },
      { ral: 'RAL 7035', label: 'Светло-серый',     hex: '#D2D3D0', mat: 'RoofMaterial',  extra: 0 },
      { ral: 'RAL 9005', label: 'Чёрный',           hex: '#0E0E10', mat: 'RoofMaterial',  extra: 0 },
      { ral: 'RAL 5005', label: 'Синий',             hex: '#1B4788', mat: 'RoofMaterial',  extra: 0 },
      { ral: 'RAL 3009', label: 'Красный',           hex: '#6B3234', mat: 'RoofMaterial',  extra: 0 },
      { ral: 'RAL 6005', label: 'Зелёный',           hex: '#114232', mat: 'RoofMaterial',  extra: 0 }
    ];

    var GATE_TYPES = [
      { id: 'swing',     label: 'Распашные',   extra: 0 },
      { id: 'roller',    label: 'Рулонные',    extra: 350000 },
      { id: 'sectional', label: 'Секционные',  extra: 480000 }
    ];

    var OPTIONS = [
      { id: 'mezzanine',  label: 'Антресольный этаж',       extra: 1200000 },
      { id: 'warm',       label: 'Тёплый контур',           extra: 800000  },
      { id: 'windows',    label: 'Окна 6 шт.',              extra: 240000  },
      { id: 'lighting',   label: 'Светодиодное освещение',  extra: 180000  }
    ];

    /* ═══════════════════════════════════
       СОСТОЯНИЕ
    ═══════════════════════════════════ */

    var p = new URLSearchParams(window.location.search);
    var modelIdx = Math.max(0, Math.min(3, parseInt(p.get('model'), 10) || 0));
    var levelIdx = Math.max(0, Math.min(3, parseInt(p.get('level'), 10) || 0));

    var state = {
      modelIdx:  modelIdx,
      levelIdx:  levelIdx,
      wallIdx:   0,
      roofIdx:   0,
      gateIdx:   0,
      options:   {}
    };

    OPTIONS.forEach(function (o) { state.options[o.id] = false; });

    /* ═══════════════════════════════════
       УТИЛИТЫ
    ═══════════════════════════════════ */

    function fmt(n) { return n.toLocaleString('ru-RU') + ' ₽'; }

    function fmtExtra(n) { return n === 0 ? 'бесплатно' : '+' + fmt(n); }

    function hexToRgb01(hex) {
      var r = parseInt(hex.slice(1, 3), 16) / 255;
      var g = parseInt(hex.slice(3, 5), 16) / 255;
      var b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    }

    function calcTotal() {
      var base  = CONFIGS[state.levelIdx].prices[state.modelIdx];
      var gate  = GATE_TYPES[state.gateIdx].extra;
      var opts  = OPTIONS.reduce(function (acc, o) {
        return acc + (state.options[o.id] ? o.extra : 0);
      }, 0);
      return base + gate + opts;
    }

    /* ═══════════════════════════════════
       РЕНДЕР SIDEBAR
    ═══════════════════════════════════ */

    function renderSidebar() {
      var m = MODELS[state.modelIdx];
      var c = CONFIGS[state.levelIdx];
      var wall = WALL_COLORS[state.wallIdx];
      var roof = ROOF_COLORS[state.roofIdx];
      var gate = GATE_TYPES[state.gateIdx];

      // Модель
      document.getElementById('js-sb-name').textContent = m.name;
      document.getElementById('js-sb-area').textContent = m.area + ' · ' + m.dims;

      // Комплектация
      document.getElementById('js-sb-level-name').textContent = c.name;
      document.getElementById('js-sb-level-price').textContent = fmt(c.prices[state.modelIdx]);

      // Цвета
      document.getElementById('js-sb-wall-name').textContent = wall.ral;
      document.getElementById('js-sb-roof-name').textContent = roof.ral;
      document.getElementById('js-sb-gate-name').textContent = gate.label + (gate.extra ? ' +' + fmt(gate.extra) : '');

      // Опции
      var activeOpts = OPTIONS.filter(function (o) { return state.options[o.id]; });
      var optsWrap = document.getElementById('js-sb-options-wrap');
      var optsList = document.getElementById('js-sb-options-list');

      if (activeOpts.length > 0) {
        optsWrap.style.display = '';
        optsList.innerHTML = activeOpts.map(function (o) {
          return '<div class="cfg3d-summary__row">' +
            '<span class="cfg3d-summary__key">' + o.label + '</span>' +
            '<span class="cfg3d-summary__val cfg3d-summary__val--muted">+' + fmt(o.extra) + '</span>' +
          '</div>';
        }).join('');
      } else {
        optsWrap.style.display = 'none';
      }

      // Итог
      document.getElementById('js-sb-total').textContent = fmt(calcTotal());
    }

    /* ═══════════════════════════════════
       ПРИМЕНИТЬ ЦВЕТ К 3D МОДЕЛИ
    ═══════════════════════════════════ */

    function applyToModelViewer() {
      var mv = document.getElementById('cfg3d-mv');
      if (!mv || !mv.model) return;

      function setMaterial(name, hex) {
        var mat = mv.model.materials.find(function (m) { return m.name === name; });
        if (!mat) return;
        var rgb = hexToRgb01(hex);
        mat.pbrMetallicRoughness.setBaseColorFactor([rgb[0], rgb[1], rgb[2], 1]);
      }

      setMaterial('WallMaterial', WALL_COLORS[state.wallIdx].hex);
      setMaterial('RoofMaterial', ROOF_COLORS[state.roofIdx].hex);
    }

    // Запускаем смену цвета и при первой загрузке модели
    var mv = document.getElementById('cfg3d-mv');
    if (mv) {
      mv.addEventListener('load', applyToModelViewer);
    }

    /* ═══════════════════════════════════
       РЕНДЕР СВОТЧЕЙ
    ═══════════════════════════════════ */

    function buildSwatches(container, colors, activeIdx, nameEl, onChange) {
      container.innerHTML = '';
      colors.forEach(function (c, i) {
        var el = document.createElement('button');
        el.className = 'cfg3d-swatch' + (i === activeIdx ? ' is-active' : '');
        el.style.background = c.hex;
        el.title = c.ral + ' ' + c.label;
        el.addEventListener('click', function () {
          container.querySelectorAll('.cfg3d-swatch').forEach(function (s) { s.classList.remove('is-active'); });
          el.classList.add('is-active');
          nameEl.textContent = c.ral + ' ' + c.label;
          onChange(i);
        });
        container.appendChild(el);
      });
    }

    function buildGateBtns() {
      var container = document.getElementById('js-gate-btns');
      container.innerHTML = '';
      GATE_TYPES.forEach(function (g, i) {
        var el = document.createElement('button');
        el.className = 'cfg3d-gate-btn' + (i === state.gateIdx ? ' is-active' : '');
        el.innerHTML = g.label + (g.extra ? ' <span>+' + fmt(g.extra) + '</span>' : ' <span>включено</span>');
        el.addEventListener('click', function () {
          container.querySelectorAll('.cfg3d-gate-btn').forEach(function (b) { b.classList.remove('is-active'); });
          el.classList.add('is-active');
          state.gateIdx = i;
          renderSidebar();
        });
        container.appendChild(el);
      });
    }

    function buildOptions() {
      var grid = document.getElementById('js-options-grid');
      grid.innerHTML = '';
      OPTIONS.forEach(function (o) {
        var el = document.createElement('div');
        el.className = 'cfg3d-option' + (state.options[o.id] ? ' is-active' : '');
        el.innerHTML =
          '<span class="cfg3d-option__check"></span>' +
          '<span class="cfg3d-option__body">' +
            '<span class="cfg3d-option__title">' + o.label + '</span>' +
            '<span class="cfg3d-option__price">+' + fmt(o.extra) + '</span>' +
          '</span>';
        el.addEventListener('click', function () {
          state.options[o.id] = !state.options[o.id];
          el.classList.toggle('is-active', state.options[o.id]);
          renderSidebar();
        });
        grid.appendChild(el);
      });
    }

    /* ═══════════════════════════════════
       ТАБЫ
    ═══════════════════════════════════ */

    document.querySelectorAll('.cfg3d-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var name = tab.dataset.tab;
        document.querySelectorAll('.cfg3d-tab').forEach(function (t) { t.classList.remove('is-active'); });
        document.querySelectorAll('.cfg3d-tab-panel').forEach(function (p) { p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        document.querySelector('[data-panel="' + name + '"]').classList.add('is-active');
      });
    });

    /* ═══════════════════════════════════
       ССЫЛКИ
    ═══════════════════════════════════ */

    // Назад на order-config
    var backBtn = document.getElementById('js-back-config');
    if (backBtn) {
      backBtn.href = 'order-config.html?model=' + state.modelIdx;
    }

    // CTA — пока открывает модал
    document.getElementById('js-cta').addEventListener('click', function (e) {
      e.preventDefault();
      if (typeof openModal === 'function') openModal();
      else alert('Заявка: ' + MODELS[state.modelIdx].name + ' · ' + CONFIGS[state.levelIdx].name + ' · ' + fmt(calcTotal()));
    });

    /* ═══════════════════════════════════
       ХИНТ — скрываем после первого взаимодействия
    ═══════════════════════════════════ */

    var hint = document.getElementById('js-hint');
    var viewerArea = document.querySelector('.cfg3d-viewer-area');
    if (viewerArea && hint) {
      viewerArea.addEventListener('pointerdown', function () {
        hint.classList.add('is-hidden');
      }, { once: true });
    }

    /* ═══════════════════════════════════
       ИНИЦИАЛИЗАЦИЯ
    ═══════════════════════════════════ */

    buildSwatches(
      document.getElementById('js-wall-swatches'),
      WALL_COLORS, state.wallIdx,
      document.getElementById('js-wall-name'),
      function (i) { state.wallIdx = i; applyToModelViewer(); renderSidebar(); }
    );

    buildSwatches(
      document.getElementById('js-roof-swatches'),
      ROOF_COLORS, state.roofIdx,
      document.getElementById('js-roof-name'),
      function (i) { state.roofIdx = i; applyToModelViewer(); renderSidebar(); }
    );

    buildGateBtns();
    buildOptions();
    renderSidebar();

    /* Fade-in */
    var pc = document.getElementById('page-content');
    if (pc) setTimeout(function () { pc.classList.add('page-visible'); }, 50);

    if (typeof openModal === 'undefined') {
      window.openModal = function () {};
    }

  })();
