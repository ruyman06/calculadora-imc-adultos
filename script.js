document.getElementById('action-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100; // pasar a metros
    const edad = parseInt(document.getElementById('edad').value);
    const resultado = document.getElementById('resultado');

    // Validación básica
    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        resultado.textContent = 'Por favor, introduce valores válidos.';
        resultado.className = 'resultado';
        return;
    }

    const imc = peso / (altura * altura);
    let clasificacion = '';
    let claseCSS = '';

    if (imc < 18.5) {
        clasificacion = 'Bajo peso';
        claseCSS = 'normal'; // puedes usar una clase específica si quieres otro color
    } else if (imc < 25) {
        clasificacion = 'Normal';
        claseCSS = 'normal';
    } else if (imc < 30) {
        clasificacion = 'Sobrepeso';
        claseCSS = 'sobrepeso';
    } else {
        clasificacion = 'Obesidad';
        claseCSS = 'obesidad';
    }

    resultado.className = 'resultado ' + claseCSS;
    resultado.textContent = `Tu IMC es ${imc.toFixed(1)} (${clasificacion}).`;
});