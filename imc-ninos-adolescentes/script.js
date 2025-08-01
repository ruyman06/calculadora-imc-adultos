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

document.getElementById('action-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value) / 100; // cm -> metros
  const edad = parseInt(document.getElementById('edad').value);
  const sexo = document.getElementById('sexo').value;
  const resultado = document.getElementById('resultado');

  // Validación básica
  if (isNaN(peso) || isNaN(altura) || altura <= 0 || isNaN(edad) || edad < 2 || edad > 18) {
    resultado.textContent = 'Por favor, introduce valores válidos (edad entre 2-18 años).';
    resultado.className = 'resultado error';
    resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const imc = peso / (altura * altura);
  const percentil = calcularPercentil(imc, edad, sexo);
  let clasificacion = '';
  let claseCSS = '';

  // Clasificación según percentiles OMS
  if (percentil < 5) {
    clasificacion = 'Bajo peso';
    claseCSS = 'bajopeso';
  } else if (percentil < 85) {
    clasificacion = 'Peso saludable';
    claseCSS = 'normal';
  } else if (percentil < 95) {
    clasificacion = 'Riesgo de sobrepeso';
    claseCSS = 'riesgo_sobrepeso';
  } else {
    clasificacion = 'Obesidad';
    claseCSS = 'obesidad';
  }

  resultado.className = 'resultado ' + claseCSS;
  resultado.innerHTML = `
    <strong>Resultado para ${sexo === 'hombre' ? 'niño' : 'niña'} de ${edad} años:</strong><br>
    Percentil: ${percentil.toFixed(1)}<br>
    Clasificación: ${clasificacion}
    <br><br>
    <a href="#tabla-imc" style="font-size: 18px; color: #1976D2; display: block; text-decoration: none; margin-top: 0;">
      Ver tabla de percentiles →
    </a>
  `;

  resultado.scrollIntoView({ 
    behavior: 'smooth',
    block: 'center'
  });

  resultado.style.animation = 'none';
  void resultado.offsetWidth;
  resultado.style.animation = 'highlight 1s ease';
});

// Función simulada para calcular percentil (en una implementación real usarías tablas OMS completas)
function calcularPercentil(imc, edad, sexo) {
  // Esta es una SIMULACIÓN básica. En producción deberías:
  // 1. Usar tablas OMS completas (https://www.who.int/tools/growth-reference-data-for-5to19-years)
  // 2. O implementar una fórmula de aproximación como LMS (usando los parámetros de la OMS)
  
  // Valores de ejemplo para niño de 10 años:
  const media = sexo === 'hombre' ? 16.5 : 16.0;
  const desviacion = 2.5;
  
  // Cálculo simplificado del percentil (distribución normal)
  const zScore = (imc - media) / desviacion;
  const percentil = 100 * (0.5 * (1 + erf(zScore / Math.sqrt(2))));
  
  return Math.min(100, Math.max(0, percentil));
}

// Función error (necesaria para el cálculo del percentil)
function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}