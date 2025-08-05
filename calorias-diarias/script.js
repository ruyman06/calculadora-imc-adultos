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

// Cálculo TMB y TDEE con scroll controlado
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
    const actividad = document.getElementById('actividad').value;
    const objetivo = document.getElementById('objetivo').value;

    // Validación mejorada
    if (!peso || peso < 5 || peso > 200) {
      mostrarError("Por favor ingresa un peso válido (entre 5 y 200 kg)");
      return;
    }
    if (!altura || altura < 40 || altura > 250) {
      mostrarError("Por favor ingresa una altura válida (entre 40 y 250 cm)");
      return;
    }
    if (!edad || edad < 2 || edad > 90) {
      mostrarError("Por favor ingresa una edad válida (entre 2 y 90 años)");
      return;
    }

    // Cálculo TMB (fórmula Mifflin-St Jeor)
    let tmb;
    if (sexo === 'hombre') {
      tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    } else {
      tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    }

    // Factores de actividad física
    const factoresActividad = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      intenso: 1.725,
      atleta: 1.9
    };

    // Cálculo TDEE
    const tdee = tmb * factoresActividad[actividad];

    // Ajuste según objetivo
    let caloriasObjetivo;
    let mensajeObjetivo;
    if (objetivo === 'perder') {
      caloriasObjetivo = tdee - 500; // Déficit de 500 kcal/día
      mensajeObjetivo = "Para perder peso (0.5 kg/semana)";
    } else if (objetivo === 'ganar') {
      caloriasObjetivo = tdee + 500; // Superávit de 500 kcal/día
      mensajeObjetivo = "Para ganar peso (0.5 kg/semana)";
    } else {
      caloriasObjetivo = tdee;
      mensajeObjetivo = "Para mantener tu peso actual";
    }

    // Mostrar resultados con formato
    resultadoDiv.innerHTML = `
      <div class="resultado-contenido">
        <h3 class="resultado-titulo">Tu requerimiento calórico diario:</h3>
        <p class="resultado-subtitulo">- Tasa Metabólica Basal (TMB):</p>
        <p class="resultado-valor">${Math.round(tmb)} kcal/día</p>
        
        <p class="resultado-subtitulo">- Gasto calórico total (TDEE - ${actividad}):</p>
        <p class="resultado-valor">${Math.round(tdee)} kcal/día</p>
        
        <p class="resultado-subtitulo">- ${mensajeObjetivo}:</p>
        <p class="resultado-objetivo">${Math.round(caloriasObjetivo)} kcal/día</p>
        
        <p class="resultado-nota">* Basado en la ecuación Mifflin-St Jeor</p>
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

  function mostrarError(mensaje) {
    resultadoDiv.innerHTML = `<p class="error-message">${mensaje}</p>`;
    resultadoDiv.classList.remove('activo');
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});