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
    // Limpia cookies antiguas de terceros
    document.cookie.split(';').forEach(cookie => {
      const domain = cookie.includes('google-analytics.com') 
        ? 'domain=.google-analytics.com;' 
        : '';
      document.cookie = `${cookie.split('=')[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${domain}`;
    });

    // Configuración GA4 first-party
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    
    gtag('config', 'G-BBJWP86LDZ', {
      cookie_flags: 'SameSite=Lax; Secure; Path=/',
      cookie_domain: window.location.hostname,
      cookie_prefix: 'ga_',
      client_storage: 'cookie',
      use_google_client_id: true  // 👈 Clave para persistencia sin third-party
    });

    // Carga el script con atributos de privacidad
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BBJWP86LDZ';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
});