// script.js optimizado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('action-form');
    const resultado = document.getElementById('resultado');
    const alturaInput = document.getElementById('altura-input');
    const alturaSlider = document.getElementById('altura-slider');
    const edadInput = document.getElementById('edad');

    // Sincronizar slider y input de altura
    alturaSlider.addEventListener('input', () => alturaInput.value = alturaSlider.value);
    alturaInput.addEventListener('input', () => alturaSlider.value = alturaInput.value);

    // Validación básica
    const validarDatos = (altura, edad) => {
        if (altura < 45 || altura > 250) {
            mostrarOutput("⚠️ Altura debe estar entre 45cm y 250cm", 'error');
            return false;
        }
        if (edad < 2 || edad > 120) {
            mostrarOutput("⚠️ Edad debe estar entre 2 y 120 años", 'error');
            return false;
        }
        return true;
    };

    // Mostrar resultados (única función de output)
    const mostrarOutput = (contenido, tipo = '') => {
        resultado.className = ''; // Limpiar clases
        resultado.innerHTML = contenido;
        
        if (contenido) {
            resultado.classList.add('activo', tipo);
            resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    // Calcular al enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const altura = parseInt(alturaInput.value);
        const edad = parseInt(edadInput.value);
        const sexo = document.getElementById('sexo').value;

        // Resetear visualización
        mostrarOutput('');

        // Validar
        if (!validarDatos(altura, edad)) return;

        // Calcular
        const pesoIdeal = calcularPeso(altura, edad, sexo);
        const rangoSaludable = calcularRangoIMC(altura);

        // Mostrar
        mostrarOutput(`
            <h3>Tu peso ideal: <strong>${pesoIdeal.toFixed(1)} kg</strong></h3>
            <p>Rango saludable: <strong>${rangoSaludable.min} - ${rangoSaludable.max} kg</strong></p>
        `, 'exito');
    });

    // Funciones de cálculo
    function calcularPeso(altura, edad, sexo) {
        let base = (sexo === 'hombre') 
            ? 50 + 0.9 * (altura - 150) 
            : 45.5 + 0.8 * (altura - 150);
        
        return (edad > 65) 
            ? base * (1 - 0.05 * Math.floor((edad - 65) / 10)) 
            : base;
    }

    function calcularRangoIMC(altura) {
        const alturaMetros = altura / 100;
        return {
            min: (18.5 * alturaMetros ** 2).toFixed(1),
            max: (24.9 * alturaMetros ** 2).toFixed(1)
        };
    }
});