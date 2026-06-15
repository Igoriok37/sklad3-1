// ── Данные моделей (совпадают с catalog.html и configurator.html) ──
    var equip_MODELS = [
      { id: 0, name: 'СКЛАД 300', tag: 'С выгодной ценой от 83 000 ₽/м²', price: 'от 24 900 000 ₽' },
      { id: 1, name: 'СКЛАД 500', tag: 'С выгодной ценой', price: 'от 83 000 ₽/м²' },
      { id: 2, name: 'СКЛАД 1000', tag: 'С выгодной ценой', price: 'от 83 000 ₽/м²' },
      { id: 3, name: 'СКЛАД 2000', tag: 'С выгодной ценой', price: 'от 83 000 ₽/м²' },
    ];

    // ── Читаем ?model= из URL и обновляем страницу ──
    (function () {
      var param = new URLSearchParams(window.location.search).get('model');
      var idx = parseInt(param, 10);
      if (isNaN(idx) || idx < 0 || idx > 3) idx = 0; // по умолчанию СКЛАД 300

      var m = equip_MODELS[idx];

      // Первая ссылка субнава — название модели
      var firstLink = document.getElementById('subnav-model');
      if (firstLink) {
        firstLink.textContent = m.name;
        firstLink.href = 'sklad.html?model=' + idx;
      }

      // Заголовок героя и title вкладки
      var elTitle = document.querySelector('.equip-hero__title');
      if (elTitle) elTitle.textContent = 'Услуги и оборудование  ' + m.name;
      document.title = 'Услуги и оборудование  ' + m.name + ' — ЭКЛЕТ ИНЖИНИРИНГ';

      // Хлебная крошка — ссылка на model-страницу
      var elBcLink = document.getElementById('bc-model-link');
      if (elBcLink) {
        elBcLink.textContent = m.name;
        elBcLink.href = 'sklad.html?model=' + idx;
      }

      // Ссылка «Комплектации и цены» в субнаве — добавляем ?model=
      var elCompleteLink = document.getElementById('equip-complete-link');
      if (elCompleteLink) elCompleteLink.href = 'complete.html?model=' + idx;

      // Ссылка «Технические характеристики» в субнаве — добавляем ?model=
      var elSpecsLink = document.getElementById('equip-specs-link');
      if (elSpecsLink) elSpecsLink.href = 'specs.html?model=' + idx;
    })();

    // ── Аккордион + смена фото в блоке .equip-service__features ──
    (function () {
      var items = document.querySelectorAll('.equip-service__feat-item');
      var photo = document.querySelector('.equip-service__photo img');

      function switchPhoto(src) {
        if (!photo || !src || photo.getAttribute('src') === src) return;
        photo.classList.add('is-switching');
        // Ждём окончания fade-out, меняем src, делаем fade-in
        setTimeout(function () {
          photo.src = src;
          photo.classList.remove('is-switching');
        }, 350);
      }

      function openItem(item) {
        var desc = item.querySelector('.equip-service__feat-desc');
        if (!desc) return;
        item.classList.add('is-open');
        desc.style.maxHeight = desc.scrollHeight + 'px';
        switchPhoto(item.dataset.img);
      }

      function closeItem(item) {
        if (!item.classList.contains('is-open')) return;
        var desc = item.querySelector('.equip-service__feat-desc');
        if (!desc) return;
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
          items.forEach(closeItem);
          if (!isOpen) openItem(item);
        });
      });
    })();

    // ── Аккордион + смена фото в блоке .equip-product__features ──
    (function () {
      var items = document.querySelectorAll('.equip-product__feat-item');
      var photo = document.querySelector('.equip-product__photo img');

      function switchPhoto(src) {
        if (!photo || !src || photo.getAttribute('src') === src) return;
        photo.classList.add('is-switching');
        setTimeout(function () {
          photo.src = src;
          photo.classList.remove('is-switching');
        }, 350);
      }

      function openItem(item) {
        var desc = item.querySelector('.equip-product__feat-desc');
        if (!desc) return;
        item.classList.add('is-open');
        desc.style.maxHeight = desc.scrollHeight + 'px';
        switchPhoto(item.dataset.img);
      }

      function closeItem(item) {
        if (!item.classList.contains('is-open')) return;
        var desc = item.querySelector('.equip-product__feat-desc');
        if (!desc) return;
        desc.style.maxHeight = desc.scrollHeight + 'px';
        requestAnimationFrame(function () {
          desc.style.maxHeight = '0px';
        });
        item.classList.remove('is-open');
      }

      if (items.length) openItem(items[0]);

      items.forEach(function (item) {
        item.addEventListener('click', function () {
          var isOpen = item.classList.contains('is-open');
          items.forEach(closeItem);
          if (!isOpen) openItem(item);
        });
      });
    })();

    // ── Хотспоты поверх 360° iframe ──
    (function () {
      var hotspots = document.querySelectorAll('.equip-360__hotspot');
      hotspots.forEach(function (hs) {
        hs.querySelector('.equip-360__dot').addEventListener('click', function (e) {
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

    // ── CTA form — переключатели комплектаций ──
    (function () {
      var toggles = document.querySelectorAll('#ctaLevelToggles .cta-form__toggle');
      toggles.forEach(function (btn) {
        btn.addEventListener('click', function () {
          toggles.forEach(function (b) { b.classList.remove('cta-form__toggle--active'); });
          btn.classList.add('cta-form__toggle--active');
        });
      });
    })();

    // ── CTA form — свотчи цветов ──
    (function () {
      document.querySelectorAll('.cta-form__swatches').forEach(function (group) {
        var swatches = group.querySelectorAll('.cta-form__swatch');
        var targetId = group.dataset.target;
        var nameEl = document.getElementById(targetId);
        swatches.forEach(function (sw) {
          sw.addEventListener('click', function () {
            swatches.forEach(function (s) { s.classList.remove('cta-form__swatch--active'); });
            sw.classList.add('cta-form__swatch--active');
            if (nameEl) nameEl.textContent = sw.dataset.color;
          });
        });
      });
    })();

    function submitCtaForm(e) {
      e.preventDefault();
      var consents = document.querySelectorAll('.cta-form__checkbox');
      var allChecked = true;
      consents.forEach(function (c) { if (!c.checked) allChecked = false; });
      if (!allChecked) { alert('Пожалуйста, подтвердите все необходимые согласия.'); return; }
      alert('✅ Заявка принята! Пришлём предложение в течение 24 часов.');
    }

    // ── Sub-nav scroll spy ──
    (function () {
      // «Оборудование» всегда активна (is-active прописан статично).
      const sections = ['sec-cta'];
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

    // ── Чипы выбора услуг / оборудования ──
    document.querySelectorAll('.cta-form__chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var cb = chip.querySelector('input[type="checkbox"]');
        if (!cb) return;
        cb.checked = !cb.checked;
        chip.classList.toggle('is-checked', cb.checked);
        // Обновляем лейбл дропдауна если чип внутри панели
        var panel = chip.closest('.cta-form__dropdown-panel');
        if (panel) updateDropdownLabel(panel.closest('.cta-form__dropdown'));
      });
    });

    // ── Дропдаун-селекторы ──
    function updateDropdownLabel(dropdown) {
      if (!dropdown) return;
      var checked = dropdown.querySelectorAll('input[type="checkbox"]:checked');
      var label = dropdown.querySelector('.cta-form__dropdown-label');
      var trigger = dropdown.querySelector('.cta-form__dropdown-trigger');
      var defaultText = trigger.dataset.default || label.textContent;
      if (!trigger.dataset.default) trigger.dataset.default = label.textContent;
      label.textContent = checked.length
        ? 'Выбрано: ' + checked.length
        : defaultText;
    }

    document.querySelectorAll('.cta-form__dropdown-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dropdown = btn.closest('.cta-form__dropdown');
        var panel = dropdown.querySelector('.cta-form__dropdown-panel');
        var isOpen = btn.classList.contains('is-open');

        // Закрываем все остальные
        document.querySelectorAll('.cta-form__dropdown-trigger.is-open').forEach(function (b) {
          if (b !== btn) {
            b.classList.remove('is-open');
            b.closest('.cta-form__dropdown').querySelector('.cta-form__dropdown-panel').classList.remove('is-open');
          }
        });

        btn.classList.toggle('is-open', !isOpen);
        panel.classList.toggle('is-open', !isOpen);
      });
    });

    // Закрываем дропдаун при клике вне
    document.addEventListener('click', function (e) {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest('.cta-form__dropdown')) {
        document.querySelectorAll('.cta-form__dropdown-trigger.is-open').forEach(function (btn) {
          btn.classList.remove('is-open');
          btn.closest('.cta-form__dropdown').querySelector('.cta-form__dropdown-panel').classList.remove('is-open');
        });
      }
    });
