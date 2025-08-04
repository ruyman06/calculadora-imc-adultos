// Sincronización Peso: Input <-> Slider
const pesoInput = document.getElementById('peso-input');
const pesoSlider = document.getElementById('peso-slider');

pesoSlider.addEventListener('input', () => {
  pesoInput.value = pesoSlider.value; // Slider -> Input
});

pesoInput.addEventListener('input', () => {
  pesoSlider.value = pesoInput.value; // Input -> Slider
});

// Sincronización Altura: Input <-> Slider
const alturaInput = document.getElementById('altura-input');
const alturaSlider = document.getElementById('altura-slider');

alturaSlider.addEventListener('input', () => {
  alturaInput.value = alturaSlider.value; // Slider -> Input
});

alturaInput.addEventListener('input', () => {
  alturaSlider.value = alturaInput.value; // Input -> Slider
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('action-form');
  const checkbox = document.getElementById('preciso-checkbox');
  const inputsPreciso = document.getElementById('campos-avanzados');
  const sexoInput = document.getElementById('sexo');
  const resultadoDiv = document.getElementById('resultado');

  // Mostrar/ocultar inputs precisos
  checkbox.addEventListener('change', () => {
    inputsPreciso.style.display = checkbox.checked ? 'block' : 'none';
  });

  // Cálculo
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const peso = parseFloat(document.getElementById('peso-input').value);
    const altura = parseFloat(document.getElementById('altura-input').value);
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = sexoInput.value;

    if (!peso || !altura || !edad || !sexo) {
      resultadoDiv.innerHTML = `<p style="color:red;">Por favor, completa todos los campos obligatorios.</p>`;
      return;
    }

    const alturaCm = altura;
    const alturaM = altura / 100;
    const imc = peso / (alturaM * alturaM);

    let grasa = 0;

    if (!checkbox.checked) {
      // Fórmula simplificada
      grasa = sexo === 'hombre'
        ? (1.20 * imc) + (0.23 * edad) - 16.2
        : (1.20 * imc) + (0.23 * edad) - 5.4;
    } else {
      // Fórmula US Navy (solo con cintura y cuello)
      const cintura = parseFloat(document.getElementById('cintura-input').value);
      const cuello = parseFloat(document.getElementById('cuello-input').value);

      if (!cintura || !cuello) {
        resultadoDiv.innerHTML = `<p style="color:red;">Completa también las medidas de cintura y cuello.</p>`;
        return;
      }

      if (sexo === 'hombre') {
        grasa = 86.010 * Math.log10(cintura - cuello)
              - 70.041 * Math.log10(alturaCm)
              + 36.76;
      } else {
        grasa = 163.205 * Math.log10(cintura - cuello)
              - 97.684 * Math.log10(alturaCm)
              - 78.387;
      }
    }

    grasa = grasa.toFixed(2);

    resultadoDiv.innerHTML = `<p>Tu porcentaje estimado de grasa corporal es: ${grasa}%</p>`;
  });
});
