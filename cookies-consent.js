// cookies-consent.js

window.addEventListener("load", function () {
  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#2121218d" },
      button: { background: "#1976d28d" }
    },
    theme: "classic",
    content: {
      message: "Usamos cookies para análisis y mostrar anuncios personalizados.",
      dismiss: "Aceptar",
      link: "Leer más",
      href: "/politica-privacidad/"
    },
    onStatusChange: function (status) {
      if (this.hasConsented()) {
        // Google Analytics
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-DBR48D17HD";
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-DBR48D17HD');

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
