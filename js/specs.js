var SPECS_MODELS = [
      { id: 0, name: 'СКЛАД 300' },
      { id: 1, name: 'СКЛАД 500' },
      { id: 2, name: 'СКЛАД 1000' },
      { id: 3, name: 'СКЛАД 2000' },
    ];

    (function () {
      var param = new URLSearchParams(window.location.search).get('model');
      var idx = parseInt(param, 10);
      if (isNaN(idx) || idx < 0 || idx > 3) idx = 0;

      var m = SPECS_MODELS[idx];

      document.title = 'Технические характеристики ' + m.name + ' — ЭКЛЕТ ИНЖИНИРИНГ';

      // Заголовок hero
      var heroModel = document.getElementById('specs-hero-model');
      if (heroModel) heroModel.textContent = m.name;

      // Суб-нав: название модели
      var modelLink = document.getElementById('subnav-model');
      if (modelLink) {
        modelLink.textContent = m.name;
        modelLink.href = 'sklad.html?model=' + idx;
      }

      // Суб-нав: остальные ссылки
      var equipLink = document.getElementById('specs-equip-link');
      if (equipLink) equipLink.href = 'equipment.html?model=' + idx;

      var completeLink = document.getElementById('specs-complete-link');
      if (completeLink) completeLink.href = 'complete.html?model=' + idx;

      var configLink = document.getElementById('specs-config-link');
      if (configLink) configLink.href = 'configurator.html?model=' + idx;

      // Хлебная крошка — ссылка на модель
      var bcModelLink = document.getElementById('specs-bc-model-link');
      if (bcModelLink) {
        bcModelLink.textContent = m.name;
        bcModelLink.href = 'sklad.html?model=' + idx;
      }

      // ── Обновляем лейблы в select-ах конфигурации ──
      var cfgSuffixes = { base: '/ Base', basepl: '/ Base+', optimal: '/ Optimal', max: '/ Max' };
      document.querySelectorAll('.specs-table__sel option').forEach(function (opt) {
        opt.textContent = m.name + ' ' + cfgSuffixes[opt.value];
      });

      // Заголовок CTA-формы
      var ctaName = document.getElementById('cta-model-name');
      if (ctaName) ctaName.textContent = m.name;

      // Downloads — название серии в обеих карточках
      var dl1 = document.getElementById('downloads-series-1');
      if (dl1) dl1.textContent = m.name;
      var dl2 = document.getElementById('downloads-series-2');
      if (dl2) dl2.textContent = m.name;

      document.getElementById('page-content').classList.add('page-visible');
    })();

    // ── ТАБЛИЦА ТЕХНИЧЕСКИХ ХАРАКТЕРИСТИК ──
    (function () {

      // Данные по каждой конфигурации
      var SPECS = {
        base: {
          foundation: 'Наземный, без фундамента',
          roofType: 'Двускатная, уклон 8°',
          roofMat: 'Профлист С-20',
          roofDrain: 'Наружный, неорганизованный',
          roofSnow: 'I–VII',
          dimLen: '12 000',
          dimWid: '24 000',
          dimWallH: '5 400',
          dimRidgeH: '6 700',
          dimArea: '300',
          dimVol: '1 440',
          dimStep: '6 000',
          dimDoors: '1 × 4 200 × 4 200',
          massSteel: '12',
          massFacade: '6',
          massTotal: '28',
          massFloor: '5',
          massVol: '1 440',
          structType: 'Стальной каркас',
          structProfile: 'Горячекатаный профиль',
          structJoints: 'Болтовые',
          structAnchors: 'Химические анкеры',
          structLife: '50 лет',
          opsSnow: 'I–VII',
          opsWind: 'I–IV',
          opsSeism: 'до 9 баллов',
          opsTemp: '−60 °C / +50 °C',
          opsFire: 'C3',
          opsWarranty: '5 лет',
          opsEngWar: '3 года',
        },
        basepl: {
          foundation: 'Наземный, без фундамента',
          roofType: 'Двускатная, уклон 8°',
          roofMat: 'Сэндвич-панель 100 мм',
          roofDrain: 'Наружный, организованный',
          roofSnow: 'I–VII',
          dimLen: '12 000',
          dimWid: '24 000',
          dimWallH: '5 400',
          dimRidgeH: '6 700',
          dimArea: '300',
          dimVol: '1 440',
          dimStep: '6 000',
          dimDoors: '1 × 4 200 × 4 200',
          massSteel: '13',
          massFacade: '10',
          massTotal: '34',
          massFloor: '5',
          massVol: '1 440',
          structType: 'Стальной каркас',
          structProfile: 'Горячекатаный профиль',
          structJoints: 'Болтовые',
          structAnchors: 'Химические анкеры',
          structLife: '50 лет',
          opsSnow: 'I–VII',
          opsWind: 'I–IV',
          opsSeism: 'до 9 баллов',
          opsTemp: '−60 °C / +50 °C',
          opsFire: 'C2',
          opsWarranty: '5 лет',
          opsEngWar: '3 года',
        },
        optimal: {
          foundation: 'Наземный, без фундамента',
          roofType: 'Двускатная, уклон 8°',
          roofMat: 'Сэндвич-панель 150 мм',
          roofDrain: 'Наружный, организованный',
          roofSnow: 'I–VII',
          dimLen: '12 000',
          dimWid: '24 000',
          dimWallH: '5 400',
          dimRidgeH: '6 700',
          dimArea: '300',
          dimVol: '1 440',
          dimStep: '6 000',
          dimDoors: '2 × 4 200 × 4 200',
          massSteel: '14',
          massFacade: '14',
          massTotal: '42',
          massFloor: '5',
          massVol: '1 440',
          structType: 'Стальной каркас',
          structProfile: 'Горячекатаный профиль',
          structJoints: 'Болтовые',
          structAnchors: 'Химические анкеры',
          structLife: '50 лет',
          opsSnow: 'I–VII',
          opsWind: 'I–IV',
          opsSeism: 'до 9 баллов',
          opsTemp: '−60 °C / +50 °C',
          opsFire: 'C2',
          opsWarranty: '5 лет',
          opsEngWar: '3 года',
        },
        max: {
          foundation: 'Наземный, без фундамента',
          roofType: 'Двускатная, уклон 8°',
          roofMat: 'Сэндвич-панель 200 мм, снегозадержатели',
          roofDrain: 'Внутренний, организованный',
          roofSnow: 'I–VII',
          dimLen: '12 000',
          dimWid: '24 000',
          dimWallH: '5 400',
          dimRidgeH: '6 700',
          dimArea: '300',
          dimVol: '1 440',
          dimStep: '6 000',
          dimDoors: '2 × 4 200 × 5 000',
          massSteel: '16',
          massFacade: '20',
          massTotal: '56',
          massFloor: '5',
          massVol: '1 440',
          structType: 'Стальной каркас',
          structProfile: 'Горячекатаный профиль',
          structJoints: 'Болтовые',
          structAnchors: 'Химические анкеры',
          structLife: '50 лет',
          opsSnow: 'I–VII',
          opsWind: 'I–IV',
          opsSeism: 'до 9 баллов',
          opsTemp: '−60 °C / +50 °C',
          opsFire: 'C1',
          opsWarranty: '5 лет',
          opsEngWar: '3 года',
        },
      };

      var selLeft = document.getElementById('specsSelLeft');
      var selRight = document.getElementById('specsSelRight');
      if (!selLeft || !selRight) return;

      // Заполнить ячейки одной колонки
      function fillCol(side, cfg) {
        var data = SPECS[cfg];
        if (!data) return;
        document.querySelectorAll('.specs-table__val[data-side="' + side + '"]').forEach(function (el) {
          el.textContent = data[el.dataset.row] !== undefined ? data[el.dataset.row] : '—';
        });
      }

      // Подсветить ячейки, где значения различаются; пометить строки data-same
      function markDiff() {
        var leftCfg = selLeft.value;
        var rightCfg = selRight.value;
        document.querySelectorAll('.specs-table__val[data-side="left"]').forEach(function (lEl) {
          var rEl = document.querySelector('.specs-table__val[data-side="right"][data-row="' + lEl.dataset.row + '"]');
          if (!rEl) return;
          var diff = SPECS[leftCfg][lEl.dataset.row] !== SPECS[rightCfg][lEl.dataset.row];
          lEl.classList.toggle('is-diff', diff);
          rEl.classList.toggle('is-diff', diff);
          // Пометить родительскую строку: same=1 — одинаково, same=0 — различается
          var row = lEl.closest('.specs-table__row');
          if (row) row.dataset.same = diff ? '0' : '1';
        });
      }

      // Применить фильтр «только отличия»
      function applyFilter() {
        var on = diffToggle && diffToggle.checked;
        document.querySelectorAll('.specs-table__row').forEach(function (row) {
          row.classList.toggle('specs-table__row--hidden', on && row.dataset.same === '1');
        });
      }

      function update() {
        fillCol('left', selLeft.value);
        fillCol('right', selRight.value);
        markDiff();
        applyFilter();
      }

      selLeft.addEventListener('change', update);
      selRight.addEventListener('change', update);

      // Тоггл «Показать отличия»
      var diffToggle = document.getElementById('specsDiffToggle');
      if (diffToggle) {
        diffToggle.addEventListener('change', applyFilter);
      }

      // Аккордион
      document.querySelectorAll('.specs-table__grp-hd').forEach(function (btn) {
        btn.addEventListener('click', function () {
          btn.closest('.specs-table__group').classList.toggle('is-open');
        });
      });

      // ������ ������
      update();
    })();
