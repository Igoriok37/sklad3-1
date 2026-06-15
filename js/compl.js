// ── Данные моделей (совпадают с catalog.html и configurator.html) ──
    var compl_MODELS = [
      { id: 0, name: 'СКЛАД 300', tag: 'С выгодной ценой от 83 000 ₽/м²', price: 'от 24 900 000 ₽' },
      { id: 1, name: 'СКЛАД 500', tag: 'С выгодной ценой', price: 'от 83 000 ₽/м²' },
      { id: 2, name: 'СКЛАД 1000', tag: 'С выгодной ценой', price: 'от 83 000 ₽/м²' },
      { id: 3, name: 'СКЛАД 2000', tag: 'С выгодной ценой', price: 'от 83 000 ₽/м²' },
    ];

    // ── Читаем ?model= из URL и обновляем страницу ──
    (function () {
      var param = new URLSearchParams(window.location.search).get('model');
      var idx = parseInt(param, 10);
      if (isNaN(idx) || idx < 0 || idx > 3) idx = 0;

      var m = compl_MODELS[idx];

      // Первая ссылка субнава — название модели + href
      var firstLink = document.getElementById('subnav-model');
      if (firstLink) {
        firstLink.textContent = m.name;
        firstLink.href = 'sklad.html?model=' + idx;
      }

      // Ссылка «Оборудование» в субнаве
      var equipLink = document.getElementById('compl-link');
      if (equipLink) equipLink.href = 'equipment.html?model=' + idx;

      // Заголовок вкладки браузера
      document.title = 'Комплектации и цены — ' + m.name + ' — ЭКЛЕТ ИНЖИНИРИНГ';

      // Хлебная крошка — ссылка на страницу модели
      var elBcLink = document.getElementById('bc-model-link');
      if (elBcLink) {
        elBcLink.textContent = m.name;
        elBcLink.href = 'sklad.html?model=' + idx;
      }

      // Заголовок секции сравнения
      var titleModel = document.getElementById('compl-title-model');
      if (titleModel) titleModel.textContent = m.name;

      // CTA-заголовок
      var ctaName = document.getElementById('cta-model-name');
      if (ctaName) ctaName.textContent = m.name;

      // Ссылка «Технические характеристики» в субнаве — добавляем ?model=
      var elSpecsLink = document.getElementById('compl-specs-link');
      if (elSpecsLink) elSpecsLink.href = 'specs.html?model=' + idx;
    })();

    // ── Sub-nav scroll spy ──
    (function () {
      // «Комплектации и цены» всегда активна (is-active прописан статично).
      // Scroll-spy нужен только для «Технических характеристик» если они появятся.
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

    // ── Таблица сравнения комплектаций ──
    (function () {
      var VI_COLORS = ['#649dea', '#5bc4a0', '#f0a840', '#e06060'];
      var VI_NAMES  = ['BASE', 'BASE +', 'OPTIMAL', 'MAX'];
      var VI_PRICES = ['от 24 900 000 ₽', 'от 29 500 000 ₽', 'от 36 200 000 ₽', 'от 44 800 000 ₽'];
      var VI_IMGS   = [
        'images/models-1.png',
        'images/models-1.png',
        'images/models-1.png',
        'images/models-1.png'
      ];

      var DATA = [
        {
          name: 'Конструкция',
          rows: [
            { name: 'Стальной каркас с антикоррозийным покрытием', vals: [1,1,1,1] },
            { name: 'Кровельные сэндвич-панели 100 мм', vals: [1,1,1,1] },
            { name: 'Фасадные сэндвич-панели 80 мм', vals: [1,1,0,0] },
            { name: 'Фасадные сэндвич-панели 100 мм', vals: [0,0,1,1] },
            { name: 'Снегозадержатели на кровле', vals: [0,1,1,1] },
            { name: 'Водосточная система', vals: [1,1,1,1] },
            { name: 'Двойное утепление кровли', vals: [0,0,0,1] },
          ]
        },
        {
          name: 'Ворота и въезды',
          rows: [
            { name: 'Секционные ворота 4×4 м (1 шт.)', vals: [1,1,1,1] },
            { name: 'Электропривод ворот', vals: [0,1,1,1] },
            { name: 'Дополнительные ворота (2 шт.)', vals: [0,0,1,1] },
            { name: 'Противопожарная дверь', vals: [1,1,1,1] },
            { name: 'Калитка в воротах', vals: [0,1,1,1] },
            { name: 'Пандус для погрузки', vals: [0,0,1,1] },
          ]
        },
        {
          name: 'Полы',
          rows: [
            { name: 'Армированная бетонная плита М300', vals: [1,1,1,1] },
            { name: 'Топпинговое упрочнение пола', vals: [0,1,1,1] },
            { name: 'Антипылевое покрытие', vals: [0,0,0,1] },
            { name: 'Нагрузка на пол 5 т/м²', vals: [1,1,0,0] },
            { name: 'Нагрузка на пол 10 т/м²', vals: [0,0,1,1] },
            { name: 'Деформационные швы по проекту', vals: [1,1,1,1] },
          ]
        },
        {
          name: 'Электрика и освещение',
          rows: [
            { name: 'Вводной щит 380 В / 100 кВт', vals: [1,1,1,1] },
            { name: 'Светодиодное освещение 200 лк', vals: [1,1,1,1] },
            { name: 'Аварийное освещение', vals: [0,1,1,1] },
            { name: 'Розеточные группы 380 В', vals: [0,0,1,1] },
            { name: 'Автоматическое управление освещением', vals: [0,0,0,1] },
            { name: 'ИБП для критических систем', vals: [0,0,0,1] },
          ]
        },
        {
          name: 'Отопление и вентиляция',
          rows: [
            { name: 'Естественная вентиляция (аэрационный конёк)', vals: [1,1,1,1] },
            { name: 'Тепловые завесы на въездах', vals: [0,1,1,1] },
            { name: 'Газовые теплогенераторы', vals: [0,0,1,1] },
            { name: 'Принудительная приточно-вытяжная вентиляция', vals: [0,0,0,1] },
            { name: 'Климат-контроль в офисной зоне', vals: [0,0,1,1] },
          ]
        },
        {
          name: 'Безопасность',
          rows: [
            { name: 'Пожарная сигнализация и оповещение', vals: [1,1,1,1] },
            { name: 'Охранная сигнализация', vals: [0,1,1,1] },
            { name: 'Видеонаблюдение (8 камер)', vals: [0,0,1,1] },
            { name: 'Система контроля доступа (СКУД)', vals: [0,0,1,1] },
            { name: 'Автоматическое пожаротушение (спринклер)', vals: [0,0,0,1] },
            { name: 'Периметральное ограждение', vals: [0,0,1,1] },
          ]
        },
      ];

      var INFO_SVG  = '<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M7 6.5v3.5M7 4v.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
      var TIP_HTML  = '<span class="tooltip"><svg class="tooltip__icon" style="margin-left:5px" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="13"/><line x1="12" y1="17.5" x2="12" y2="17.5" stroke-width="3"/></svg><span class="tooltip__bubble">Средневзвешенная стоимость формируется на дату предоставления информации, которая не является офертой и предназначена исключительно для ознакомительных целей.<br><br>Все технические условия поставки и строительства готового здания определяются техническими условиями в сроки, указанные в графике поставки в договоре. За подробной информацией об условиях покупки готового здания, строительства и дополнительных услугах обращайтесь к официальным представителям.</span></span>';
      var ARROW_SVG = '<svg class="compl-compare__group-arrow" viewBox="0 0 18 18" fill="none"><path d="M4.5 11.25L9 6.75L13.5 11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var CHECK_SVG = '<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      // Состояние видимости вариантов: все включены по умолчанию
      var viVisible = [true, true, true, true];

      // ── Чекбоксы выбора вариантов (разметка в HTML, здесь только события) ──
      document.querySelectorAll('.compl-compare__vi-toggle').forEach(function (label) {
        var i = parseInt(label.dataset.vi, 10);
        var cb = label.querySelector('.compl-compare__vi-cb');
        cb.addEventListener('change', function (e) {
          // Минимум 1 вариант должен оставаться включённым
          var checkedCount = document.querySelectorAll('.compl-compare__vi-cb:checked').length;
          if (!e.target.checked && checkedCount === 0) {
            e.target.checked = true;
            return;
          }
          viVisible[i] = e.target.checked;
          applyVisibility();
        });
      });

      // ── Карточки вариантов (полные, с фото) ──
      var head = document.getElementById('compareHead');
      if (head) {
        VI_NAMES.forEach(function (name, i) {
          var div = document.createElement('div');
          div.className = 'compl-compare__var';
          div.dataset.vi = String(i);
          div.innerHTML =
            '<div class="compl-compare__var-img-wrap">' +
              '<img src="' + VI_IMGS[i] + '" alt="' + name + '" class="compl-compare__var-img">' +
            '</div>' +
            '<div class="compl-compare__var-name" style="color:' + VI_COLORS[i] + '">' + name + '</div>' +
            '<div class="compl-compare__var-price">' + VI_PRICES[i] + TIP_HTML + '</div>';
          head.appendChild(div);
        });
      }

      // ── Компактные карточки вариантов (имя + цена, без фото) для sticky-шапки ──
      var compactHead = document.getElementById('compareCompactHead');
      if (compactHead) {
        VI_NAMES.forEach(function (name, i) {
          var div = document.createElement('div');
          div.className = 'compl-compare__compact-var';
          div.dataset.vi = String(i);
          div.style.borderTopColor = VI_COLORS[i];
          div.innerHTML =
            '<span class="compl-compare__compact-name" style="color:' + VI_COLORS[i] + '">' + name + '</span>' +
            '<span class="compl-compare__compact-price">' + VI_PRICES[i] + TIP_HTML + '</span>';
          compactHead.appendChild(div);
        });
      }

      // ── IntersectionObserver: когда заголовок уходит — controls залипает ──
      var controls = document.getElementById('compareControls');
      var topSentinel = document.getElementById('compareHead');
      if (controls && topSentinel && 'IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            // entry.isIntersecting === false → заголовок ушёл → controls залип
            controls.classList.toggle('is-stuck', !entry.isIntersecting);
          });
        }, { threshold: 0 });
        obs.observe(topSentinel);
      }

      // ── Тело таблицы ──
      var table = document.getElementById('compareTable');
      if (!table) return;

      DATA.forEach(function (cat) {
        var group = document.createElement('div');
        group.className = 'compl-compare__group';

        var hd = document.createElement('button');
        hd.type = 'button';
        hd.className = 'compl-compare__group-hd';
        hd.setAttribute('aria-expanded', 'true');
        hd.innerHTML = '<span>' + cat.name + '</span>' + ARROW_SVG;

        var body = document.createElement('div');
        body.className = 'compl-compare__group-body';

        hd.addEventListener('click', function () {
          var expanded = hd.getAttribute('aria-expanded') === 'true';
          hd.setAttribute('aria-expanded', String(!expanded));
          body.style.display = expanded ? 'none' : '';
          group.classList.toggle('compl-compare__group--collapsed', expanded);
        });

        cat.rows.forEach(function (row) {
          var allSame = row.vals.every(function (v) { return v === row.vals[0]; });
          var tr = document.createElement('div');
          tr.className = 'compl-compare__row';
          tr.dataset.same = allSame ? '1' : '0';

          var feat = document.createElement('div');
          feat.className = 'compl-compare__feat';
          feat.textContent = row.name;
          tr.appendChild(feat);

          // Обёртка для четырёх ячеек — выравнивается с карточками шапки
          var cellsRow = document.createElement('div');
          cellsRow.className = 'compl-compare__cells-row';

          row.vals.forEach(function (v, i) {
            var cell = document.createElement('div');
            cell.className = 'compl-compare__cell';
            cell.dataset.vi = String(i);
            cell.innerHTML = v
              ? '<span class="compl-compare__dot" style="background:' + VI_COLORS[i] + '"></span>'
              : '<span class="compl-compare__dash">–</span>';
            cellsRow.appendChild(cell);
          });

          tr.appendChild(cellsRow);

          body.appendChild(tr);
        });

        group.appendChild(hd);
        group.appendChild(body);
        table.appendChild(group);
      });

      // ── Обновить видимость колонок ──
      // Flex сам перераспределяет пространство — grid-template пересчитывать не нужно
      function applyVisibility() {
        for (var j = 0; j < 4; j++) {
          var vis = viVisible[j];
          // Карточки (полные + компактные) + ячейки в строках
          var sel = '.compl-compare__var[data-vi="' + j + '"],' +
                    '.compl-compare__compact-var[data-vi="' + j + '"],' +
                    '.compl-compare__cell[data-vi="' + j + '"]';
          document.querySelectorAll(sel).forEach(function (el) {
            el.style.display = vis ? '' : 'none';
          });
        }
      }

      // ── Тоггл «Показать отличия» ──
      var diffToggle = document.getElementById('showDiffOnly');
      if (diffToggle) {
        diffToggle.addEventListener('change', function () {
          var on = diffToggle.checked;
          document.querySelectorAll('.compl-compare__row').forEach(function (row) {
            row.classList.toggle('compl-compare__row--hidden', on && row.dataset.same === '1');
          });
        });
      }
    })();
