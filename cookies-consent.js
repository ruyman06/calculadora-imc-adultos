window.addEventListener("load", function () {
  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#212121e7" },
      button: { background: "#1976d2e7" }
    },
    theme: "classic",
    content: {
      message: "Usamos cookies para análisis y mostrar anuncios personalizados.",
      dismiss: "Aceptar",
      deny: "Rechazar",
      link: "Leer más",
      href: "/politica-privacidad/"
    },
    onStatusChange: function (status) {
      if (this.hasConsented()) {
        // Cargar scripts si ACEPTA
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
        // Bloquear scripts si RECHAZA
        console.log("Cookies rechazadas. No se cargarán Analytics ni AdSense.");
        // Opcional: Borrar cookies existentes de GA/AdSense (requiere implementación adicional).
      }
    }
  });
});