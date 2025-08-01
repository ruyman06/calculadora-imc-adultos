// script.js completo con percentiles
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('action-form');
    const resultado = document.getElementById('resultado');
    const alturaInput = document.getElementById('altura-input');
    const alturaSlider = document.getElementById('altura-slider');
    const edadInput = document.getElementById('edad');

    // Percentiles OMS (datos simplificados)
    const percentilesOMS = {
        niño: {
            hombre: {
                2: { P3: 11.5, P50: 12.7, P97: 14.3 },
                5: { P3: 15.3, P50: 17.4, P97: 20.3 },
                10: { P3: 26.0, P50: 31.2, P97: 39.0 },
                15: { P3: 42.0, P50: 52.0, P97: 65.0 },
                17: { P3: 50.1, P50: 62.7, P97: 78.5 }
            },
            mujer: {
                2: { P3: 11.0, P50: 12.2, P97: 13.8 },
                5: { P3: 14.8, P50: 16.9, P97: 19.7 },
                10: { P3: 25.0, P50: 30.0, P97: 38.0 },
                15: { P3: 40.0, P50: 50.0, P97: 62.0 },
                17: { P3: 45.4, P50: 56.4, P97: 70.3 }
            }
        }
    };

    // Sincronización slider-input
    alturaSlider.addEventListener('input', () => alturaInput.value = alturaSlider.value);
    alturaInput.addEventListener('input', () => alturaSlider.value = alturaInput.value);

    // Validación mejorada
    const validarDatos = (altura, edad) => {
        // Validación básica
        if (altura < 45 || altura > 250) {
            mostrarOutput("⚠️ La altura debe estar entre 45cm y 250cm", 'error');
            return false;
        }
        if (edad < 2 || edad > 120) {
            mostrarOutput("⚠️ La edad debe estar entre 2 y 120 años", 'error');
            return false;
        }
        
        // Validación edad/altura coherente
        if ((edad >= 5 && altura < 80) || (edad >= 10 && altura < 120)) {
            mostrarOutput(`⚠️ Para ${edad} años, la altura debe ser >${edad >=10 ? 120 : 80}cm`, 'error');
            return false;
        }
        
        return true;
    };

    // Mostrar resultados
    const mostrarOutput = (contenido, tipo = '') => {
        resultado.className = '';
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

        // Resetear
        mostrarOutput('');

        // Validar
        if (!validarDatos(altura, edad)) return;

        // Calcular según edad
        if (edad < 18) {
            calcularPercentilOMS(edad, sexo);
        } else {
            calcularPesoAdulto(altura, edad, sexo);
        }
    });

    // Cálculo para adultos (≥18 años)
    function calcularPesoAdulto(altura, edad, sexo) {
        // Fórmula Hamwi modificada
        let pesoIdeal = (sexo === 'hombre') 
            ? 50 + 0.9 * (altura - 150) 
            : 45.5 + 0.8 * (altura - 150);
        
        // Ajuste ancianos (>65 años)
        if (edad > 65) {
            pesoIdeal *= (1 - 0.05 * Math.floor((edad - 65) / 10));
        }

        // Rango IMC saludable
        const imcMin = (altura * altura * 18.5 / 10000).toFixed(1);
        const imcMax = (altura * altura * 24.9 / 10000).toFixed(1);
        
        mostrarOutput(`
            <h3>Peso ideal: <strong>${pesoIdeal.toFixed(1)} kg</strong></h3>
            <p>Rango saludable (IMC 18.5-24.9): <strong>${imcMin} - ${imcMax} kg</strong></p>
        `, 'exito');
    }

    // Cálculo para niños (2-17 años)
    function calcularPercentilOMS(edad, sexo) {
        // Obtener percentil más cercano
        const edadKey = Math.min(Math.max(edad, 2), 17);
        const percentil = percentilesOMS.niño[sexo][edadKey];
        
        mostrarOutput(`
            <div class="resultado-nino">
                <h3>Percentiles OMS para ${sexo === 'hombre' ? 'niños' : 'niñas'} de ${edad} años:</h3>
                <ul>
                    <li><strong>P3 (Bajo peso):</strong> ${percentil.P3} kg</li>
                    <li><strong>P50 (Medio):</strong> ${percentil.P50} kg</li>
                    <li><strong>P97 (Alto):</strong> ${percentil.P97} kg</li>
                </ul>
                <p class="nota">* Estos valores son referenciales. Consulte a su pediatra.</p>
            </div>
        `, 'info');
    }
});