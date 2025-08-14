document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
  });

  // Opcional: Búsqueda mientras se escribe
  searchInput.addEventListener('input', function() {
    performSearch();
  });

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Si está vacío, muestra todos los artículos
      document.querySelectorAll('.articulo').forEach(article => {
        article.style.display = 'block';
      });
      return;
    }

    // Busca en todos los artículos
    document.querySelectorAll('.articulo').forEach(article => {
      const title = article.querySelector('h2').textContent.toLowerCase();
      const description = article.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        article.style.display = 'block';
      } else {
        article.style.display = 'none';
      }
    });
  }
});