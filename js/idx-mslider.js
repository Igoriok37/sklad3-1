(function () {
          var slider   = document.getElementById('mslider');
          var dotsWrap = document.getElementById('msDots');
          var prevBtn  = document.getElementById('msPrev');
          var nextBtn  = document.getElementById('msNext');
          var cards    = Array.prototype.slice.call(slider.querySelectorAll('.model-card'));
          var total       = cards.length;
          var current     = 0;
          var perView     = 3;
          var gap         = 24;
          var startX      = 0;
          var dragDist    = 0;
          var dragging    = false;
          var hasDragged  = false;
          var dragEndTime = 0;   // момент отпускания — для блокировки клика
          var velocities  = [];
          var lastX       = 0;
          var lastT       = 0;

          function getPerView() {
            return window.innerWidth >= 1281 ? 4 : window.innerWidth >= 1025 ? 3 : window.innerWidth >= 679 ? 2 : window.innerWidth >= 480 ? 1 : 1;
          }
          function cardW() { return cards[0].getBoundingClientRect().width || 300; }
          function maxIdx() { return Math.max(0, total - perView); }
          function baseOffset(idx) { return idx * (cardW() + gap); }

          function setWidths() {
            perView = getPerView();
            var w = (slider.parentElement.clientWidth - gap * (perView - 1)) / perView;
            cards.forEach(function (c) { c.style.flex = '0 0 ' + w + 'px'; c.style.width = w + 'px'; });
          }

          function goTo(idx) {
            current = Math.max(0, Math.min(idx, maxIdx()));
            slider.style.transition = 'transform .45s cubic-bezier(.25,.46,.45,.94)';
            slider.style.transform  = 'translateX(-' + baseOffset(current) + 'px)';
            updateDots();
            prevBtn.disabled = current === 0;
            nextBtn.disabled = current >= maxIdx();
          }

          function buildDots() {
            dotsWrap.innerHTML = '';
            for (var i = 0; i <= maxIdx(); i++) {
              var d = document.createElement('button');
              d.className = 'mslider-dot' + (i === current ? ' is-active' : '');
              d.setAttribute('aria-label', 'Слайд ' + (i + 1));
              (function (n) { d.addEventListener('click', function () { goTo(n); }); })(i);
              dotsWrap.appendChild(d);
            }
          }

          function updateDots() {
            dotsWrap.querySelectorAll('.mslider-dot').forEach(function (d, i) {
              d.classList.toggle('is-active', i === current);
            });
          }

          /* Resistance как в Swiper — экспоненциальное сопротивление на краях */
          function applyResistance(translate) {
            var minT = -baseOffset(maxIdx());
            var maxT = 0;
            if (translate > maxT) return maxT + Math.pow(translate - maxT, 0.82);
            if (translate < minT) return minT - Math.pow(minT - translate, 0.82);
            return translate;
          }

          function onMove(x) {
            if (!dragging) return;
            var now  = Date.now();
            dragDist = x - startX;
            if (Math.abs(dragDist) > 4) hasDragged = true;

            /* velocity sampling (последние 5 замеров) */
            velocities.push({ x: x - lastX, t: now - lastT });
            if (velocities.length > 5) velocities.shift();
            lastX = x; lastT = now;

            /* 1:1 движение + resistance на краях */
            var raw = -baseOffset(current) + dragDist;
            slider.style.transition = 'none';
            slider.style.transform  = 'translateX(' + applyResistance(raw) + 'px)';
          }

          function onEnd() {
            if (!dragging) return;
            dragging = false;
            slider.style.cursor = '';

            /* средняя скорость (px/ms) по последним замерам */
            var vel = 0;
            if (velocities.length) {
              var totX = velocities.reduce(function (s, v) { return s + v.x; }, 0);
              var totT = velocities.reduce(function (s, v) { return s + v.t; }, 0);
              vel = totT > 0 ? totX / totT : 0;
            }

            /* переход если скорость > 0.3 px/ms ИЛИ дистанция > 30% ширины карточки */
            var threshold = cardW() * 0.3;
            if (Math.abs(vel) > 0.3 || Math.abs(dragDist) > threshold) {
              goTo(dragDist < 0 ? current + 1 : current - 1);
            } else {
              goTo(current); // снап обратно
            }
            velocities = [];
            if (hasDragged) dragEndTime = Date.now();
            hasDragged = false;
          }

          /* — Инициализация — */
          setWidths(); buildDots(); prevBtn.disabled = true;
          prevBtn.addEventListener('click', function () { goTo(current - 1); });
          nextBtn.addEventListener('click', function () { goTo(current + 1); });

          /* — Mouse — */
          slider.addEventListener('mousedown', function (e) {
            if (e.button !== 0) return;
            e.preventDefault(); /* блокируем нативный drag браузера */
            dragging = true; hasDragged = false;
            startX = e.clientX; dragDist = 0;
            lastX = e.clientX; lastT = Date.now(); velocities = [];
            slider.style.cursor = 'grabbing';
          });
          window.addEventListener('mousemove', function (e) { onMove(e.clientX); });
          window.addEventListener('mouseup',   function ()  { onEnd(); });

          /* — Touch — */
          slider.addEventListener('touchstart', function (e) {
            dragging = true; hasDragged = false;
            startX = e.touches[0].clientX; dragDist = 0;
            lastX = startX; lastT = Date.now(); velocities = [];
          }, { passive: true });
          slider.addEventListener('touchmove', function (e) { onMove(e.touches[0].clientX); }, { passive: true });
          slider.addEventListener('touchend',  function ()  { onEnd(); });

          /* — Блокировка клика после drag (300мс) — */
          slider.addEventListener('click', function (e) {
            if (Date.now() - dragEndTime < 300) {
              e.preventDefault();
              e.stopPropagation();
            }
          }, true);

          /* — Ресайз — */
          window.addEventListener('resize', function () {
            setWidths(); buildDots(); goTo(Math.min(current, maxIdx()));
          });
        })();
