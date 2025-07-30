window.addEventListener("load", function () {
  // Verifica que la librería esté cargada
  if (typeof window.cookieconsent === "undefined") {
    console.error("CookieConsent no está cargado. Revisa la URL del script.");
    return;
  }

  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#212121e7", text: "#fff" },
      button: { 
        background: "#1976d2e7",
        text: "#fff"
      },
      deny: { 
        background: "#f44336e7", // Color rojo para "Rechazar"
        text: "#fff"
      }
    },
    theme: "classic",
    type: "opt-in", // Obliga al usuario a elegir (mejor para RGPD)
    content: {
      message: "Usamos cookies para análisis y anuncios personalizados.",
      dismiss: "Aceptar",
      deny: "Rechazar",
      link: "Leer más",
      href: "/politica-privacidad/",

      allow: "Aceptar",
      deny: "Rechazar",
      header: "Cookies en este sitio",
      close: "✕"
    },
    onStatusChange: function (status) {
      if (this.hasConsented()) {
        console.log("Aceptado: Cargando scripts...");
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-S9ZZ1CY21L";
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-S9ZZ1CY21L');

        const adsScript = document.createElement("script");
        adsScript.async = true;
        adsScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3980836867624384";
        adsScript.crossOrigin = "anonymous";
        document.head.appendChild(adsScript);

      } else {
        console.log("Rechazado: Bloqueando cookies.");
        // Opcional: Borrar cookies existentes
      }
    }
  });
});