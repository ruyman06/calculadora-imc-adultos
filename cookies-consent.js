// cookies-consent.js

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
        // Google Analytics
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-CD2HKSPHT9";
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-CD2HKSPHT9');

        // Google AdSense
        const adsScript = document.createElement("script");
        adsScript.async = true;
        adsScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3980836867624384";
        adsScript.crossOrigin = "anonymous";
        document.head.appendChild(adsScript);
      }
    }
  });
});
