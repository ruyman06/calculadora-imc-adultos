window.addEventListener("load", function() {
  // 1. Verifica si el usuario YA aceptó antes
  const savedConsent = localStorage.getItem('cookie_consent'); // Usamos localStorage (persiste incluso al cerrar el navegador)
  
  // Si ya aceptó, carga GA y NO muestres el banner
  if (savedConsent === 'accepted') {
    console.log("Cookies ya aceptadas")
    loadGoogleAnalytics();
    return;
  }

  // 2. Configura el banner (con Aceptar/Rechazar)
  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#212121e7", text: "#fff" },
      button: { background: "#1976d2e7", text: "#fff" },
      deny: { background: "#f44336e7", text: "#fff" }
    },
    type: "opt-in",
    theme: "classic",
    content: {
      message: "Usamos cookies para análisis y mejorar tu experiencia.",
      dismiss: "Aceptar",
      deny: "Rechazar",
      link: "Leer más",
      href: "/politica-privacidad/",
      close: "", // Eliminamos la "X" para forzar a elegir
      allow: "Aceptar"
    },
    cookie: {
      name: 'cookie_consent', // Nombre de la cookie
      sameSite:'Lax',
      secure: 'true',
      path: '/',
      expires: 365, // Dura 1 año (solo aplica si acepta)
      domain: window.location.hostname
    },
    onStatusChange: function(status) {
      if (this.hasConsented()) {
        // Si acepta: guarda en localStorage + carga GA
        localStorage.setItem('cookie_consent', 'accepted');
        loadGoogleAnalytics();
      } else {
        // Si rechaza: NO guarda nada (el banner seguirá apareciendo)
        console.log("Cookies rechazadas");
      }
    }
  });

  // Función para cargar Google Analytics
  function loadGoogleAnalytics() {
    // 1. Limpieza agresiva de cookies de terceros
    const domainsToClean = [
      '.google-analytics.com',
      'region1.google-analytics.com',
      '.googletagmanager.com'
    ];
    
    domainsToClean.forEach(domain => {
      document.cookie = `_ga=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `_gid=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `ar_debug=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });

    // 2. Configuración FIRST-PARTY
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    
    gtag('config', 'G-BBJWP86LDZ', {
      storage: 'none',
      client_storage: 'none',
      server_container_url: 'https://tuservidor.com/collect' // Endpoint personalizado
    });

    // 3. Carga el script con parámetros de privacidad
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BBJWP86LDZ';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
});