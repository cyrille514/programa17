// FUNCIÓN FLECHA pura que recibe un array numérico y devuelve el objeto con 2 sub-arreglos
const separarParesEImpares = (arrayNumerico) => {
    // .filter() extrae los números que cumplen la condición matemática del residuo % 2
    // El número 0 calza de forma exacta en 'pares' porque 0 % 2 es 0
    const pares = arrayNumerico.filter(num => num % 2 === 0);
    const impares = arrayNumerico.filter(num => num % 2 !== 0);

    // Devolvemos la estructura de objeto idéntica solicitada
    return {
        pares: pares,
        impares: impares
    };
};
// Objeto global vacío para resguardar las referencias con nombre de las funciones flecha de escucha
const accionesClasificador = {};

const activarEcosistemaClasificador = () => {
    const formulario = document.getElementById("validador-form");
    const inputNumeros = document.getElementById("input-numeros");
    const boxResultado = document.getElementById("resultado-validacion");
    const txtObjeto = document.getElementById("texto-objeto");

    if (!formulario || !inputNumeros || !boxResultado || !txtObjeto) return;

    // A. ESCUCHADOR NATIVO 'input': Limpia y oculta el panel de resultados en tiempo real al escribir en el móvil
    inputNumeros.addEventListener("input", () => {
        boxResultado.className = "hidden";
        txtObjeto.textContent = "";
    });

    // B. FUNCIÓN FLECHA CON NOMBRE: Procesa el string y ejecuta la separación lógica
    accionesClasificador.ejecutarClasificacion = (evento) => {
        // Frenar el reinicio automático del navegador en pantallas de teléfonos móviles
        evento.preventDefault();

        const textoIngresado = inputNumeros.value.trim();

        // Validación UX inmediata si el usuario presiona el botón vacío
        if (textoIngresado === "") {
            alert("⚠️ Por favor, introduce números separados por comas antes de clasificar.");
            return;
        }

        // Conversión del string original en un array numérico limpio de espacios y caracteres inválidos
        const arrayProcesado = textoIngresado.split(",")
                                              .map(elemento => parseInt(elemento.trim(), 10))
                                              .filter(elemento => !isNaN(elemento));

        // Si después de limpiar el texto no queda ningún número válido en la lista
        if (arrayProcesado.length === 0) {
            alert("❌ Error: No has introducido ningún número válido (Ejemplo correcto: 1,2,3,4,5,6,7,8,9,0).");
            return;
        }

        // Ejecutar de forma directa la función flecha del Bloque 1 pasando el array limpio
        const objetoResultado = separarParesEImpares(arrayProcesado);

        // C. FORMATO EXACTO REQUERIDO: Estructura la cadena de texto tal como indicas en tu ejemplo
        txtObjeto.textContent = `{pares: [${objetoResultado.pares.join(",")}], impares: [${objetoResultado.impares.join(",")}]}`;

        // Hacer visible la sección aplicando las clases elásticas responsivas de alto contraste
        boxResultado.className = "mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl font-mono border-4 bg-slate-950 text-white border-slate-800 shadow-2xl max-w-full overflow-hidden text-left block animate-fade-in";
    };

    // D. ESCUCHADOR NATIVO 'submit': Captura de forma independiente el envío del formulario
    formulario.addEventListener("submit", accionesClasificador.ejecutarClasificacion);
};

// Inicializa las operaciones en cuanto el HTML responsivo se dibuja en el dispositivo móvil
document.addEventListener("DOMContentLoaded", () => {
    // Lanzar de forma directa las operaciones de escucha de los botones
    activarEcosistemaClasificador();
});
