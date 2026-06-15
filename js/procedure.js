(function () {
      var pc = document.getElementById('page-content');
      if (pc) setTimeout(function () { pc.classList.add('page-visible'); }, 50);
      if (typeof openModal === 'undefined') {
        window.openModal = function () { alert('Форма заказа звонка'); };
      }
    })();
