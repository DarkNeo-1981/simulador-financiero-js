
let activos = [];

export async function cargarActivos() {

    if (activos.length > 0) {
        return activos;
    }

    const response = await fetch("./data/activos.json");

    activos = await response.json();

    return activos;
}

export function obtenerActivos() {
    return activos;
}

export async function actualizarCotizaciones() {

    if (activos.length === 0) {
        await cargarActivos();
    }

    activos = activos.map(activo => {

        const variacion =
            (Math.random() * 0.04) - 0.02;

        const nuevoPrecio =
            activo.precio * (1 + variacion);

        return {

            ...activo,

            precio: Number(
                nuevoPrecio.toFixed(2)
            )

        };

    });

    return activos;

}