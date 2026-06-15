(function () {

    /* ═══ ДАННЫЕ ПРЕДСТАВИТЕЛЕЙ ═══ */
    var REPRS = [
      { name: 'ТехноСклад Групп',      city: 'Москва',        lat: 55.6526, lng: 37.6239 },
      { name: 'АвтоСпецЦентр Внуково', city: 'Москва',        lat: 55.5967, lng: 37.2701 },
      { name: 'СтройПромСервис',        city: 'Москва',        lat: 55.6494, lng: 37.6753 },
      { name: 'Аларм',                  city: 'Санкт-Петербург', lat: 59.9990, lng: 30.3620 },
      { name: 'УралСклад',              city: 'Екатеринбург',  lat: 56.8376, lng: 60.6100 },
      { name: 'СибСтрой Групп',         city: 'Новосибирск',   lat: 54.9847, lng: 82.8977 }
    ];

    /* ═══ КАРТА ═══ */
    var map = L.map('repr-map', {
      center: [60, 57],
      zoom: 4,
      zoomControl: true
    });

    // Тёмная тема тайлов (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Кастомный маркер
    var pinIcon = L.divIcon({
      className: '',
      html: '<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.163 0 0 7.163 0 16C0 24 16 40 16 40C16 40 32 24 32 16C32 7.163 24.837 0 16 0Z" fill="#649DEA"/><circle cx="16" cy="16" r="6" fill="#0F2B45"/></svg>',
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -42]
    });

    var activeMarker = null;
    var markers = [];

    REPRS.forEach(function (r, i) {
      var m = L.marker([r.lat, r.lng], { icon: pinIcon })
        .addTo(map)
        .bindPopup(
          '<div style="font-family:var(--font-body,sans-serif);min-width:160px">' +
            '<div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:4px">' + r.name + '</div>' +
            '<div style="font-size:12px;color:#9bb8d8">' + r.city + '</div>' +
          '</div>'
        );
      m.on('click', function () { selectRepr(i, true); });
      markers.push(m);
    });

    /* ═══ ВЫБОР ПРЕДСТАВИТЕЛЯ ═══ */
    window.selectRepr = function (idx, fromMap) {
      // Карточки
      document.querySelectorAll('.repr-card').forEach(function (c) { c.classList.remove('is-active'); });
      var card = document.querySelector('.repr-card[data-idx="' + idx + '"]');
      if (card) {
        card.classList.add('is-active');
        if (!fromMap) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Карта
      var r = REPRS[idx];
      map.setView([r.lat, r.lng], 12, { animate: true });
      markers[idx].openPopup();
    };

    /* ═══ ГЕОЛОКАЦИЯ ═══ */
    document.getElementById('js-locate-btn').addEventListener('click', function () {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(function (pos) {
        map.setView([pos.coords.latitude, pos.coords.longitude], 10, { animate: true });
      });
    });

    /* ═══ FADE-IN ═══ */
    var pc = document.getElementById('page-content');
    if (pc) setTimeout(function () { pc.classList.add('page-visible'); }, 50);

  })();
