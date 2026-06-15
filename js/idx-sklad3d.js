/* ── 3D сборка: этапы + цвет стен ── */
      (function () {
        var frame     = null; // создаётся по клику
        var preview   = document.getElementById('sklad3dPreview');
        var launchBtn = document.getElementById('sklad3dLaunchBtn');
        var steps     = document.querySelectorAll('#sklad3dSteps .sklad3d-step');
        var swatches  = document.querySelectorAll('#sklad3dSwatches .sklad3d-swatch');
        var colorName = document.getElementById('sklad3dColorName');
        var hint      = document.getElementById('sklad3dHint');
        var viewer    = document.querySelector('.sklad3d-viewer');

        function send(data) {
          if (frame && frame.contentWindow) frame.contentWindow.postMessage(data, '*');
        }

        /* Запуск 3D по клику */
        launchBtn.addEventListener('click', function () {
          // Кнопка переходит в режим загрузки — превью остаётся поверх
          launchBtn.textContent = 'Загружается…';
          launchBtn.disabled = true;
          launchBtn.style.opacity = '0.7';

          // Создаём iframe невидимым (opacity:0) — грузится за превью
          frame = document.createElement('iframe');
          frame.id = 'sklad3dFrame';
          frame.src = '3d/sklady_test.html';
          frame.title = '3D модель склада';
          frame.allow = 'fullscreen';
          frame.allowTransparency = true;
          frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;background:transparent;opacity:0;transition:opacity 0.5s ease';
          viewer.insertBefore(frame, hint);

          // После загрузки ждём инициализацию Verge3D, потом crossfade
          frame.addEventListener('load', function () {
            setTimeout(function () {
              // Синхронизируем шаги
              steps.forEach(function (step) {
                var active = step.classList.contains('is-active');
                if (step.dataset.group === 'foundation') return;
                if (active) send({ type: 'v3dSetGroupVisible', group: step.dataset.group, visible: true });
              });
              // Синхронизируем цвет стен
              var sel = document.querySelector('#sklad3dSwatches .sklad3d-swatch.is-selected');
              if (sel) send({ type: 'v3dSetColor',
                r: parseFloat(sel.dataset.r),
                g: parseFloat(sel.dataset.g),
                b: parseFloat(sel.dataset.b) });

              // Плавно: превью исчезает, 3D появляется
              preview.style.transition = 'opacity 0.45s ease';
              preview.style.opacity = '0';
              frame.style.opacity = '1';
              hint.style.display = '';
              setTimeout(function () { preview.style.display = 'none'; }, 450);

            }, 900); // ждём пока Verge3D применит прозрачный фон

            // Хинт прячется после первого касания
            try {
              frame.contentWindow.addEventListener('mousedown', function () {
                hint.classList.add('is-hidden');
              }, { once: true });
            } catch(e) {}
          });
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

      })();
