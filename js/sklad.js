      /* ── 3D сборка: этапы + цвет стен ── */
      (function () {
        var frame     = document.getElementById('sklad3dFrame');
        var steps     = document.querySelectorAll('#sklad3dSteps .sklad3d-step');
        var swatches  = document.querySelectorAll('#sklad3dSwatches .sklad3d-swatch');
        var colorName = document.getElementById('sklad3dColorName');
        var hint      = document.getElementById('sklad3dHint');
        if (!frame) return;

        function send(data) {
          if (frame.contentWindow) frame.contentWindow.postMessage(data, '*');
        }

        /* Хинт скрывается после первого взаимодействия */
        frame.addEventListener('load', function () {
          try {
            frame.contentWindow.addEventListener('mousedown', function () {
              hint && hint.classList.add('is-hidden');
            }, { once: true });
          } catch(e) {}
        });

        /* Шаги сборки */
        steps.forEach(function (step) {
          var btn = step.querySelector('.sklad3d-step-header');
          btn.addEventListener('click', function () {
            var active = step.classList.toggle('is-active');
            send({ type: 'v3dSetGroupVisible', group: step.dataset.group, visible: active });
          });
        });

        /* Свотчи цвета стен */
        swatches.forEach(function (sw) {
          sw.addEventListener('click', function () {
            swatches.forEach(function (s) { s.classList.remove('is-selected'); });
            sw.classList.add('is-selected');
            if (colorName) colorName.textContent = sw.dataset.name;
            send({ type: 'v3dSetColor',
                   r: parseFloat(sw.dataset.r),
                   g: parseFloat(sw.dataset.g),
                   b: parseFloat(sw.dataset.b) });
          });
        });

        /* Свотчи фона сцены — меняем CSS-фон контейнера */
        var bgSwatches  = document.querySelectorAll('#sklad3dBgSwatches .sklad3d-swatch');
        var bgName      = document.getElementById('sklad3dBgName');
        var viewer      = document.querySelector('.sklad3d-viewer');
        bgSwatches.forEach(function (sw) {
          sw.addEventListener('click', function () {
            bgSwatches.forEach(function (s) { s.classList.remove('is-selected'); });
            sw.classList.add('is-selected');
            if (bgName) bgName.textContent = sw.dataset.name;
            if (viewer) viewer.style.background = sw.dataset.hex;
          });
        });
      })();

// ── Данные моделей (совпадают с catalog.html и configurator.html) ──
    var PRJ_MODELS = [
      { id: 0, name: 'СКЛАД 300', tag: 'С выгодной ценой от 83 000 ₽/м²', price: 'от 24 900 000 ₽' },
      { id: 1, name: 'СКЛАД 500', tag: 'С выгодной ценой от 83 000 ₽/м²', price: 'от 42 500 000 ₽' },
      { id: 2, name: 'СКЛАД 1000', tag: 'С выгодной ценой от 83 000 ₽/м²', price: 'от 79 000 000 ₽' },
      { id: 3, name: 'СКЛАД 2000', tag: 'С выгодной ценой от 83 000 ₽/м²', price: 'от 148 000 000 ₽' },
    ];

    // ── Читаем ?model= из URL и обновляем страницу ──
    (function () {
      var param = new URLSearchParams(window.location.search).get('model');
      var idx = parseInt(param, 10);
      if (isNaN(idx) || idx < 0 || idx > 3) idx = 0; // по умолчанию СКЛАД 300

      // Ссылка «Подробнее о комплектациях» → complete.html?model=N
      var linkComplete = document.getElementById('link-complete');
      if (linkComplete) linkComplete.href = 'complete.html?model=' + idx;

      var m = PRJ_MODELS[idx];

      // Первая ссылка субнава — название модели
      var firstLink = document.querySelector('.subnav__link[data-section="sec-building"]');
      if (firstLink) firstLink.textContent = m.name;

      // Хиро — тег, заголовок, цена, title вкладки
      var elTag = document.querySelector('.prj-hero__tag');
      var elTitle = document.querySelector('.prj-hero__title');
      var elPrice = document.querySelector('.prj-hero__price');
      if (elTag) elTag.textContent = m.tag;
      if (elTitle) elTitle.textContent = m.name;
      if (elPrice) elPrice.textContent = m.price;
      document.title = m.name + ' — ЭКЛЕТ ИНЖИНИРИНГ';

      // Заголовок в секции .prj-about
      var elAboutTitle = document.querySelector('.prj-about__title');
      if (elAboutTitle) elAboutTitle.textContent = m.name;

      // Хлебная крошка — последний пункт
      var elBc = document.getElementById('bc-model');
      if (elBc) elBc.textContent = m.name;

      // Заголовок секции вариантов
      var elSeries = document.getElementById('series-name');
      if (elSeries) elSeries.textContent = m.name;

      // CTA-секция — название модели в заголовке
      var elCtaModel = document.getElementById('cta-model-name');
      if (elCtaModel) elCtaModel.textContent = m.name;

      // Секция загрузок — название серии
      document.querySelectorAll('.prj-downloads__series').forEach(function (el) {
        el.textContent = m.name;
      });

      // Ссылка «Оборудование» в субнаве — добавляем ?model=
      var elEquipLink = document.getElementById('prj-equip-link');
      if (elEquipLink) elEquipLink.href = 'equipment.html?model=' + idx;

      // Ссылка «Комплектации и цены» в субнаве — добавляем ?model=
      var elCompleteLink = document.getElementById('prj-complete-link');
      if (elCompleteLink) elCompleteLink.href = 'complete.html?model=' + idx;

      // Ссылка «Технические характеристики» в субнаве — добавляем ?model=
      var elSpecsLink = document.getElementById('prj-specs-link');
      if (elSpecsLink) elSpecsLink.href = 'specs.html?model=' + idx;
    })();

    // ── Аккордион в блоке .prj-about__features ──
    (function () {
      var items = document.querySelectorAll('.prj-about__feat-item');

      function openItem(item) {
        var desc = item.querySelector('.prj-about__feat-desc');
        if (!desc) return;
        item.classList.add('is-open');
        // Ставим точную высоту контента — без прыжка
        desc.style.maxHeight = desc.scrollHeight + 'px';
      }

      function closeItem(item) {
        // Трогаем только реально открытые — иначе rAF перебьёт openItem
        if (!item.classList.contains('is-open')) return;
        var desc = item.querySelector('.prj-about__feat-desc');
        if (!desc) return;
        // Фиксируем текущую высоту, затем в следующем кадре обнуляем
        desc.style.maxHeight = desc.scrollHeight + 'px';
        requestAnimationFrame(function () {
          desc.style.maxHeight = '0px';
        });
        item.classList.remove('is-open');
      }

      // Первый пункт открыт по умолчанию
      if (items.length) openItem(items[0]);

      items.forEach(function (item) {
        item.addEventListener('click', function () {
          var isOpen = item.classList.contains('is-open');
          // Закрываем только те, что открыты
          items.forEach(closeItem);
          // Если был закрыт — открываем
          if (!isOpen) openItem(item);
        });
      });
    })();

    // ── Хотспоты поверх 360° iframe ──
    (function () {
      var hotspots = document.querySelectorAll('.prj-360__hotspot');
      hotspots.forEach(function (hs) {
        hs.querySelector('.prj-360__dot').addEventListener('click', function (e) {
          e.stopPropagation();
          var isOpen = hs.classList.contains('is-open');
          hotspots.forEach(function (h) { h.classList.remove('is-open'); });
          if (!isOpen) hs.classList.add('is-open');
        });
      });
      // Клик в любое место закрывает тултипы
      document.addEventListener('click', function () {
        hotspots.forEach(function (h) { h.classList.remove('is-open'); });
      });
    })();

    // ── Sub-nav scroll spy ──
    (function () {
      const sections = ['sec-building', 'sec-specs'];
      const links = document.querySelectorAll('.subnav__link[data-section]');

      function setActive(id) {
        links.forEach(function (link) {
          const isActive = link.dataset.section === id;
          link.classList.toggle('is-active', isActive);
        });
      }

      function onScroll() {
        const scrollY = window.scrollY + window.innerHeight * 0.35;
        let current = sections[0];
        sections.forEach(function (id) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollY) current = id;
        });
        setActive(current);
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    })();
