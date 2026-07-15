
export function mostrarCartera(usuario, venderCallback) {
    const contenedor = document.getElementById("miCartera");
    contenedor.innerHTML = "";
    if (!usuario.cartera || usuario.cartera.length === 0) {
        contenedor.innerHTML = `
            <div class="card-vacia">
                <h3>No tenés inversiones todavía</h3>
                <p>Comprá activos desde el mercado para comenzar.</p>
            </div>
        `;
        return;
    }

    const carteraAgrupada = agruparCartera(usuario.cartera);
    const tabla = document.createElement("table");
    tabla.className = "tabla-cartera";

    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Activo</th>
                <th>Cantidad</th>
                <th>Precio Promedio</th>
                <th>Precio Actual</th>
                <th>Resultado</th>
                <th>Acción</th>
            </tr>
        </thead>
    `;

    const tbody = document.createElement("tbody");

    carteraAgrupada.forEach(item => {
        const resultado = (item.precioActual - item.precioPromedio) * item.cantidad;
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${item.ticker}</td>
            <td>${item.cantidad}</td>
            <td>$ ${item.precioPromedio.toFixed(2)}</td>
            <td>$ ${item.precioActual.toFixed(2)}</td>
            <td class="${resultado >= 0 ? "ganancia" : "perdida"}">
                $ ${resultado.toFixed(2)}
            </td>
            <td>
                <button class="btnVender">
                    Vender
                </button>
            </td>
        `;

        fila
            .querySelector(".btnVender")
            .addEventListener("click", () => venderCallback(item));
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
}

// Agrupar compras del mismo activo
function agruparCartera(cartera) {
    const agrupados = {};
    cartera.forEach(item => {
        if (!agrupados[item.ticker]) {
            agrupados[item.ticker] = {
                ticker: item.ticker,
                nombre: item.nombre,
                tipo: item.tipo,
                cantidad: 0,
                costoTotal: 0,
                precioActual: item.precioActual
            };
        }

        agrupados[item.ticker].cantidad += item.cantidad;

        agrupados[item.ticker].costoTotal += item.precioCompra * item.cantidad;

        // Siempre tomar el último precio actualizado
        agrupados[item.ticker].precioActual = item.precioActual;
    });

    return Object
        .values(agrupados)
        .map(item => {return {...item, precioPromedio: item.costoTotal / item.cantidad};});
}