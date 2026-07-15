
let graficoCartera;
let graficoEvolucion;

// Gráfico distribución de cartera
export function actualizarGraficoCartera(usuario) {
    const canvas = document.getElementById("graficoCartera");
    if (!canvas) {return;}

    const datos = agruparActivos(usuario);

    if (graficoCartera) {graficoCartera.destroy();}

    graficoCartera = new Chart(
        canvas,
        {
            type: "doughnut",
            data: {labels: datos.labels, datasets: [{data: datos.valores}]},
            options: {responsive: true}
        }
    );
}

// Agrupar activos para gráfico
function agruparActivos(usuario) {
    const resultado = {};
    if (!usuario.cartera) {
        return {
            labels: [],
            valores: []
        };
    }

    usuario.cartera.forEach(item => {
        const valor = item.precioActual * item.cantidad;

        if (resultado[item.ticker]) {
            resultado[item.ticker] += valor;
        } else {
            resultado[item.ticker] = valor;
        }
    });

    return {
        labels: Object.keys(resultado),
        valores: Object.values(resultado)
    };
}

// Gráfico evolución patrimonio
export function actualizarGraficoEvolucion(usuario, patrimonioActual) {
    const canvas = document.getElementById("graficoEvolucion");

    if (!canvas) {return;}
    if (!usuario.evolucion) {usuario.evolucion = [];}

    // Evitar duplicar valores idénticos
    const ultimo = usuario.evolucion[usuario.evolucion.length - 1];
    const fechaActual = new Date().toLocaleDateString("es-AR");

    if (!ultimo || ultimo.valor !== patrimonioActual) {
        usuario.evolucion.push({
            fecha: fechaActual,
            valor: patrimonioActual
        });
    }

    if (graficoEvolucion) {graficoEvolucion.destroy();}

    graficoEvolucion = new Chart(
        canvas,
        {
            type: "line",
            data: {
                labels: usuario.evolucion.map(item => item.fecha),
                datasets: [{label:"Patrimonio", data: usuario.evolucion.map(item => item.valor)}]
            },
            options: {responsive: true, scales: {y: {beginAtZero: false}}}
        }
    );
}