
export function mostrarActivos(activos, eventoCompra){
    const contenedor = document.getElementById("listaActivos");
    contenedor.innerHTML = "";

    activos.forEach(activo => {
        const tarjeta = document.createElement("div");
        tarjeta.className="activo";
        tarjeta.innerHTML = `

        <h3> ${activo.nombre} </h3>
        <p> ${activo.ticker} </p>
        <p> ${activo.tipo} </p>
        <span> $ ${activo.precio} </span>

        <button class="btnComprar" data-id="${activo.id}"> Comprar </button> `;

        tarjeta
            .querySelector(".btnComprar")
            .addEventListener("click", () => eventoCompra(activo));


        contenedor.appendChild(tarjeta);
    });
}