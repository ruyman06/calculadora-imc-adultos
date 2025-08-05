// Sincronización Peso: Input <-> Slider
const pesoInput = document.getElementById('peso-input');
const pesoSlider = document.getElementById('peso-slider');

pesoSlider.addEventListener('input', () => {
  pesoInput.value = pesoSlider.value;
});

pesoInput.addEventListener('input', () => {
  pesoSlider.value = pesoInput.value;
});

// Sincronización Altura: Input <-> Slider
const alturaInput = document.getElementById('altura-input');
const alturaSlider = document.getElementById('altura-slider');

alturaSlider.addEventListener('input', () => {
  alturaInput.value = alturaSlider.value;
});

alturaInput.addEventListener('input', () => {
  alturaSlider.value = alturaInput.value;
});

// Cálculo TMB con scroll controlado y estilos personalizados
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('action-form');
  const resultadoDiv = document.getElementById('resultado');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.getElementById('sexo').value;

    // Validación básica
    if (!peso || !altura || !edad || !sexo) {
      resultadoDiv.innerHTML = `<p class="error-message">Por favor completa todos los campos</p>`;
      resultadoDiv.classList.remove('activo');
      return;
    }

    // Cálculo TMB (fórmula Mifflin-St Jeor)
    let tmb;
    if (sexo === 'hombre') {
      tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    } else {
      tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    }

    // Mostrar resultado con formato
    resultadoDiv.innerHTML = `
      <div class="resultado-contenido">
        <h3 class="resultado-titulo">Tu Tasa Metabólica Basal:</h3>
        <p class="resultado-valor">${Math.round(tmb)} kcal/día</p>
      </div>
    `;
    
    // Aplicar clase activo para los estilos
    resultadoDiv.classList.add('activo');

    // Scroll suave al resultado (centrado verticalmente)
    resultadoDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
});