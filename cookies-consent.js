window.addEventListener("load", function() {
  if (typeof window.cookieconsent === 'undefined') {
    console.error('cookieconsent library not loaded!');
    return;
  }

  const savedConsent = localStorage.getItem('cookie_consent');
  if (savedConsent === 'accepted') {
    console.log("Cookies ya aceptadas");
    loadGoogleAnalytics();
    return;
  }

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
      close: "",
      allow: "Aceptar"
    },
    cookie: {
      name: 'cookie_consent',
      sameSite: 'Lax',
      secure: true,
      path: '/',
      expires: 365,
      domain: window.location.hostname
    },
    onStatusChange: function(status) {
      if (this.hasConsented()) {
        localStorage.setItem('cookie_consent', 'accepted');
        loadGoogleAnalytics();
      } else {
        console.log("Cookies rechazadas");
        clearAnalyticsCookies();
      }
    }
  });

  function clearAnalyticsCookies() {
    const domainsToClean = [
      window.location.hostname,
      '.google-analytics.com',
      '.googletagmanager.com'
    ];
    domainsToClean.forEach(domain => {
      document.cookie = `_ga=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `_gid=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  }

  function loadGoogleAnalytics() {
    clearAnalyticsCookies();
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-BBJWP86LDZ', {
      storage: 'none',
      client_storage: 'none',
      anonymize_ip: true
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BBJWP86LDZ';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
});