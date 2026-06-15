(function () {

      /* ── Данные моделей ── */
      var MODELS = [
        { id: 0, name: 'СКЛАД 300',  area: '300–450 м²',       dims: '30×10×6 м'   },
        { id: 1, name: 'СКЛАД 500',  area: '450–800 м²',       dims: '50×10×7 м'   },
        { id: 2, name: 'СКЛАД 1000', area: '800–1 500 м²',     dims: '50×20×8 м'   },
        { id: 3, name: 'СКЛАД 2000', area: '1 500–2 000 м²',   dims: '100×20×9 м'  }
      ];

      /* ── Данные комплектаций ── */
      var CONFIGS = [
        {
          level:   'Base',
          badge:   'BASE',
          spec:    'Проектная документация + металлоконструкции',
          items:   [
            'КД (АР, ОК, КР.Р, КМ+КМД, ПБ)',
            'Комплект здания'
          ],
          prices:  [24900000, 42500000, 79000000, 148000000]
        },
        {
          level:   'Base+',
          badge:   'BASE+',
          spec:    'Расширенный состав КД + конструктив',
          items:   [
            'КД (АР, ОК, АИ, КР.Р, КЖ0 Фундаменты, КМ+КМД, ПБ)',
            'Комплект здания'
          ],
          prices:  [28500000, 48000000, 89500000, 168000000]
        },
        {
          level:   'Optimal',
          badge:   'OPTIMAL',
          spec:    'Изыскания + полный КД + монтаж здания',
          items:   [
            'Инженерные изыскания',
            'КД (АР, ОК, АИ, КР.Р, КЖ0 Фундаменты+Полы, КМ+КМД, ПБ)',
            'Комплект здания',
            'Монтаж здания'
          ],
          prices:  [33200000, 55500000, 103000000, 193000000]
        },
        {
          level:   'Max',
          badge:   'MAX',
          spec:    'Полный пакет: изыскания, КД, экспертиза, монтаж, инженерные системы',
          items:   [
            'Полный комплект изысканий',
            'Полный состав КД',
            'Экспертиза проекта',
            'Комплект здания',
            'Монтаж здания',
            'Комплект инженерных систем',
            'Монтаж инженерных систем'
          ],
          prices:  [39900000, 65000000, 121000000, 228000000]
        }
      ];

      /* ── Утилиты ── */
      function fmt(n) {
        return n.toLocaleString('ru-RU') + ' ₽';
      }

      function getModelIdx() {
        var p = new URLSearchParams(window.location.search).get('model');
        var idx = parseInt(p, 10);
        return (isNaN(idx) || idx < 0 || idx > 3) ? 0 : idx;
      }

      /* ── Рендер ── */
      var currentIdx = getModelIdx();

      function renderHero(idx) {
        var m = MODELS[idx];
        var heroModel = document.getElementById('js-hero-model');
        var heroSub   = document.getElementById('js-hero-sub');
        if (heroModel) heroModel.textContent = m.name;
        if (heroSub)   heroSub.innerHTML = 'Комплектации для &nbsp; <span>' + m.name + '</span> &emsp;' + m.area + ' &emsp; ' + m.dims;
      }

      function renderSidebar(idx) {
        var list = document.getElementById('js-model-list');
        if (!list) return;
        list.innerHTML = MODELS.map(function (m) {
          var active = m.id === idx ? ' is-active' : '';
          return '<li class="ocfg-model-item' + active + '" data-model="' + m.id + '">' +
            '<span class="ocfg-model-item__radio"></span>' +
            '<img class="ocfg-model-item__img" src="images/models-1.png" alt="' + m.name + '">' +
            '<span class="ocfg-model-item__info">' +
              '<span class="ocfg-model-item__name">' + m.name + '</span>' +
              '<span class="ocfg-model-item__area">' + m.area + '</span>' +
            '</span>' +
          '</li>';
        }).join('');

        list.querySelectorAll('.ocfg-model-item').forEach(function (el) {
          el.addEventListener('click', function () {
            var newIdx = parseInt(el.dataset.model, 10);
            if (newIdx === currentIdx) return;
            currentIdx = newIdx;
            var url = new URL(window.location.href);
            url.searchParams.set('model', newIdx);
            window.history.replaceState(null, '', url.toString());
            render(newIdx);
          });
        });
      }

      function renderGrid(idx) {
        var grid = document.getElementById('js-config-grid');
        if (!grid) return;
        grid.innerHTML = CONFIGS.map(function (cfg, ci) {
          var price = cfg.prices[idx];
          var items = cfg.items.map(function (it) {
            return '<li>' + it + '</li>';
          }).join('');
          return '<div class="ocfg-card">' +
            '<div class="ocfg-card__img-wrap">' +
              '<img src="images/models-1.png" alt="' + cfg.level + '">' +
              '<span class="ocfg-card__badge">' + cfg.badge + '</span>' +
            '</div>' +
            '<div class="ocfg-card__body">' +
              '<div class="ocfg-card__model">' + MODELS[idx].name + '</div>' +
              '<div class="ocfg-card__level">' + cfg.level + '</div>' +
              '<div class="ocfg-card__spec">' + cfg.spec + '</div>' +
              '<ul class="ocfg-card__list">' + items + '</ul>' +
            '</div>' +
            '<div class="ocfg-card__foot">' +
              '<div>' +
                '<div class="ocfg-card__price-label">Стоимость от</div>' +
                '<div class="ocfg-card__price">' + fmt(price) +
                  '<span class="tooltip" style="margin-left:6px">' +
                    '<svg class="tooltip__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                      '<circle cx="12" cy="12" r="10"/>' +
                      '<line x1="12" y1="6" x2="12" y2="13"/>' +
                      '<line x1="12" y1="17.5" x2="12" y2="17.5" stroke-width="3"/>' +
                    '</svg>' +
                    '<span class="tooltip__bubble">Средневзвешенная стоимость формируется на дату предоставления информации, которая не является офертой и предназначена исключительно для ознакомительных целей.<br><br>Все технические условия поставки и строительства готового здания определяются техническими условиями в сроки, указанные в графике поставки в договоре. За подробной информацией об условиях покупки готового здания, строительства и дополнительных услугах обращайтесь к официальным представителям.</span>' +
                  '</span>' +
                '</div>' +
              '</div>' +
              '<a href="configurator.html?model=' + idx + '&level=' + ci + '" class="ocfg-card__btn">' +
                'Выбрать' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
                  '<path d="M5 12h14M12 5l7 7-7 7"/>' +
                '</svg>' +
              '</a>' +
            '</div>' +
          '</div>';
        }).join('');
      }

      function render(idx) {
        renderHero(idx);
        renderSidebar(idx);
        renderGrid(idx);
      }

      render(currentIdx);

      /* ── Сайдбар: аккордеон ── */
      var toggle = document.getElementById('js-sidebar-toggle');
      if (toggle) {
        toggle.addEventListener('click', function () {
          toggle.classList.toggle('is-open');
          var list = document.getElementById('js-model-list');
          if (list) list.style.display = toggle.classList.contains('is-open') ? '' : 'none';
        });
      }

      /* ── Плавное появление страницы ── */
      var pc = document.getElementById('page-content');
      if (pc) setTimeout(function () { pc.classList.add('page-visible'); }, 50);

      /* ── Заглушка модалки ── */
      if (typeof openModal === 'undefined') {
        window.openModal = function () { alert('Форма заказа звонка'); };
      }

    })();
