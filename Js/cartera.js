
// COMPRAR ACTIVO
export function comprarActivo(usuario, activo, cantidad){
    if(cantidad <= 0){throw new Error("La cantidad debe ser mayor a cero.");}

    const inversion = activo.precio * cantidad;
    if(usuario.saldo < inversion){throw new Error("Saldo insuficiente para realizar la compra.");}

    usuario.saldo -= inversion;

    if(!usuario.cartera){usuario.cartera=[];}
    if(!usuario.historial){usuario.historial=[];}

    const operacion = {
        id: Date.now(),
        activoId: activo.id,
        nombre: activo.nombre,
        ticker: activo.ticker,
        tipo: activo.tipo,
        cantidad: cantidad,
        precioCompra: activo.precio,
        precioActual: activo.precio,
        fecha:new Date().toLocaleString("es-AR")
    };

    usuario.cartera.push(operacion);
    usuario.historial.push({
        id:operacion.id,
        tipo:"COMPRA",
        ticker:activo.ticker,
        cantidad:cantidad,
        precio:activo.precio,
        total:inversion,
        fecha:operacion.fecha
    });

    registrarEvolucion(usuario);
}

// VENDER ACTIVO
export function venderActivo(usuario, idOperacion, cantidad){
    if(!usuario.cartera || usuario.cartera.length===0){throw new Error("No tenés activos en cartera.");}
    if(cantidad<=0){throw new Error("La cantidad debe ser mayor a cero.");}
  
    const operacion = usuario.cartera.find(item=>item.id===idOperacion);
    
    if(!operacion){throw new Error("Activo no encontrado.");}
    if(cantidad > operacion.cantidad){throw new Error("No podés vender más unidades de las disponibles.");}
    
    const importeVenta = operacion.precioActual * cantidad;
    usuario.saldo += importeVenta;
    operacion.cantidad -= cantidad;

    if(operacion.cantidad===0){
        usuario.cartera = usuario.cartera.filter(item=>item.id!==idOperacion);
    }

    if(!usuario.historial){usuario.historial=[];}

    usuario.historial.push({
        id:Date.now(),
        tipo:"VENTA",
        ticker:operacion.ticker,
        cantidad:cantidad,
        precio:operacion.precioActual,
        total:importeVenta,
        fecha: new Date().toLocaleString("es-AR")
    });

    registrarEvolucion(usuario);
}

// RESUMEN CARTERA
export function calcularResumenCartera(usuario){
    let valorCartera=0;
    let costoTotal=0;

    if(!usuario.cartera){return {valorCartera:0, costoTotal:0, resultado:0};}

    usuario.cartera.forEach(item=>{
        costoTotal += item.precioCompra * item.cantidad;
        valorCartera += item.precioActual * item.cantidad;
    });

    return {valorCartera, costoTotal, resultado: valorCartera-costoTotal};
}

// ACTUALIZAR PRECIOS
export function actualizarPreciosCartera(usuario, activos){
    if(!usuario.cartera)
        return;

    usuario.cartera.forEach(posicion=>{
        const activoActual =
            activos.find(
                activo =>
                activo.id == posicion.activoId
            );
        if(activoActual){posicion.precioActual = activoActual.precio;}
    });

    registrarEvolucion(usuario);
}

// HISTORIAL DE EVOLUCIÓN
function registrarEvolucion(usuario){
    if(!usuario.evolucion){usuario.evolucion=[];}
    const resumen = calcularResumenCartera(usuario);
    const patrimonio = usuario.saldo + resumen.valorCartera;

    usuario.evolucion.push({
        fecha: new Date().toLocaleDateString("es-AR"),
        valor: patrimonio
    });

    // máximo 30 registros
    if(usuario.evolucion.length>30){usuario.evolucion.shift();}
}