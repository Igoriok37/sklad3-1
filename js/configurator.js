function toggleFeatures(e, rowId) {
      e.stopPropagation();
      document.getElementById(rowId).classList.toggle('is-open');
    }

    // ── Привязка субнава к ?model= ──
    (function () {
      var NAMES = ['СКЛАД 300', 'СКЛАД 500', 'СКЛАД 1000', 'СКЛАД 2000'];
      var param = new URLSearchParams(window.location.search).get('model');
      var idx = parseInt(param, 10);
      if (isNaN(idx) || idx < 0 || idx > 3) idx = 0;

      var modelLink = document.getElementById('cfg-model-link');
      if (modelLink) {
        modelLink.textContent = NAMES[idx];
        modelLink.href = 'sklad.html?model=' + idx;
      }
      var equipLink = document.getElementById('cfg-equip-link');
      if (equipLink) equipLink.href = 'equipment.html?model=' + idx;

      var completeLink = document.getElementById('cfg-complete-link');
      if (completeLink) completeLink.href = 'complete.html?model=' + idx;

      var specsLink = document.getElementById('cfg-specs-link');
      if (specsLink) specsLink.href = 'specs.html?model=' + idx;
    })();
