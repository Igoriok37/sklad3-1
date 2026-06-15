// Плавное появление страницы
    (function () {
      var pc = document.getElementById('page-content');
      if (pc) setTimeout(function () { pc.classList.add('page-visible'); }, 50);
    })();

    // Заглушка для модального окна (если нет common.js реализации)
    if (typeof openModal === 'undefined') {
      function openModal() { alert('Форма заказа звонка'); }
    }
