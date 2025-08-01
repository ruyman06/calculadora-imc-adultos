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

document.getElementById('action-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value) / 100; // cm -> metros
    const edad = parseInt(document.getElementById('edad').value);
    const resultado = document.getElementById('resultado');

    // Validación básica
    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        resultado.textContent = 'Por favor, introduce valores válidos.';
        resultado.className = 'resultado';
        resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const imc = peso / (altura * altura);
    let clasificacion = '';
    let claseCSS = '';

    if (imc < 18.5) {
        clasificacion = 'Bajo peso';
        claseCSS = 'bajopeso'; // puedes usar una clase específica si quieres otro color
    } else if (imc < 21.9) {
        clasificacion = 'Peso normal';
        claseCSS = 'normal';
    } else if (imc < 24.9) {
        clasificacion = 'Riesgo de sobrepeso';
        claseCSS = 'riesgo_sobrepeso';
    } else if (imc < 26.9){
        clasificacion = 'Sobrepeso';
        claseCSS = 'sobrepeso';
    } else if (imc < 29.9) {
        clasificacion = 'Sobrepeso grado 2';
        claseCSS = 'sobrepeso-grado2';
    }  else {
        clasificacion = 'Obesidad';
        claseCSS = 'obesidad';
    }

    resultado.className = 'resultado ' + claseCSS;
    resultado.innerHTML = `
        Tu IMC es ${imc.toFixed(1)} (${clasificacion}).
        <br>
        <a href="#tabla-imc" style="font-size: 18px; color: #1976D2; display: inline-block; text-decoration: none; margin-top: 6px;">
            Ver tabla de interpretación →
        </a>
        `;
        
        // Desplazamiento suave al resultado
        resultado.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center' // Centra el resultado en la pantalla
        });

        // Efecto visual de destacado
        resultado.style.animation = 'none';
        void resultado.offsetWidth; // Trigger reflow
        resultado.style.animation = 'highlight 1s ease';
    });
    