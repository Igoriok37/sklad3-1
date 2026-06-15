// ── Modal ──
    function openModal()  { document.getElementById('modalOverlay').classList.add('open'); }
    function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
    function closeModalOutside(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }
    function submitModal() { closeModal(); alert('✅ Заявка принята! Пришлём КП в течение 24 часов.'); }
    function submitoffer()  { alert('✅ Заявка отправлена! Перезвоним в течение 15 минут.'); }

    // ── Accordion ──
    function toggleStep(idx) {
      const steps = document.querySelectorAll('.offer-step');
      steps.forEach((s, i) => {
        if (i === idx) s.classList.toggle('is-open');
        else s.classList.remove('is-open');
      });
    }

    // ── Model selection ──
    const configPrices = [4200000, 6800000, 11500000, 21000000];
    const configNames  = ['СКЛАД 300', 'СКЛАД 500', 'СКЛАД 1000', 'СКЛАД 2000'];
    let selectedModel = 0, extrasCost = 0, finDiscount = 0;

    function selectConfigModel(el, idx) {
      document.querySelectorAll('.offer-model-opt').forEach(o => o.classList.remove('is-selected'));
      el.classList.add('is-selected');
      selectedModel = idx;
      document.getElementById('pval-0').textContent = configNames[idx];
      recalcConfig();
    }

    function toggleExtra(el) {
      el.classList.toggle('is-checked');
      extrasCost = Array.from(document.querySelectorAll('.offer-extra-opt.is-checked'))
        .reduce((s, o) => s + parseInt(o.dataset.price), 0);
      const cnt = document.querySelectorAll('.offer-extra-opt.is-checked').length;
      document.getElementById('pval-3').textContent = cnt > 0 ? cnt + ' опций' : 'Не выбрано';
      recalcConfig();
    }

    function selectFinOpt(el, name, discount) {
      document.querySelectorAll('.offer-fin-opt').forEach(o => o.classList.remove('is-selected'));
      el.classList.add('is-selected');
      finDiscount = discount;
      document.getElementById('pval-4').textContent = name;
      recalcConfig();
    }

    function recalcConfig() {
      let total = configPrices[selectedModel] + extrasCost;
      if (finDiscount > 0) total = Math.round(total * (1 - finDiscount));
      document.getElementById('preview-price').textContent = total.toLocaleString('ru-RU') + ' ₽';
    }

    // ── Preview tabs ──
    function switchPrevTab(btn) {
      document.querySelectorAll('.offer-preview__tab').forEach(t => t.classList.remove('is-active'));
      btn.classList.add('is-active');
    }
    recalcConfig();
