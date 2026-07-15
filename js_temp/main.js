

import { validarUsuario } from "./auth.js";

import {
    guardarUsuarioActivo,
    obtenerUsuarioActivo,
    cerrarSesion
} from "./storage.js";

import { actualizarUsuario } from "./usuariosStorage.js";

import {
    cargarActivos,
    actualizarCotizaciones
} from "./mercado.js";

import {
    mostrarActivos
} from "./ui.js";

import {
    mostrarCartera
} from "./uiCartera.js";

import {
    comprarActivo,
    venderActivo,
    calcularResumenCartera,
    actualizarPreciosCartera
} from "./cartera.js";

import {
    actualizarGraficoCartera,
    actualizarGraficoEvolucion
} from "./graficos.js";

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnActualizarMercado = document.getElementById("btnActualizarMercado");

btnLogin.addEventListener("click", login);

btnLogout.addEventListener("click", () => {
    cerrarSesion();
    location.reload();
});

btnActualizarMercado.addEventListener(
    "click",
    actualizarMercado
);


// Inicio automático si existe sesión
const usuarioActivo = obtenerUsuarioActivo();
if(usuarioActivo){mostrarDashboard(usuarioActivo);}

// LOGIN
async function login(){
    const email =
        document
            .getElementById("emailUsuario")
            .value
            .trim();

    const password =
        document
            .getElementById("passwordUsuario")
            .value;

    const usuario = await validarUsuario(email, password);

    if(!usuario){
        Swal.fire({
            icon:"error",
            title:"Error",
            text:"Usuario o contraseña incorrectos"
        });

        return;
    }

    if(!usuario.cartera){usuario.cartera=[];}
    if(!usuario.historial){usuario.historial=[];}

    guardarUsuarioActivo(usuario);
    mostrarDashboard(usuario);
}

// DASHBOARD
async function mostrarDashboard(usuario){
    document
        .getElementById("login")
        .classList
        .add("hidden");

    document
        .getElementById("dashboard")
        .classList
        .remove("hidden");

    const activos =
        await cargarActivos();
        await actualizarCotizaciones();

    const activosActualizados = await cargarActivos();

    actualizarPreciosCartera(usuario, activosActualizados);
    guardarCambios(usuario);
    mostrarActivos(activosActualizados, realizarCompra);
    mostrarCartera(usuario, realizarVenta);
    actualizarDashboard(usuario);
}

// ACTUALIZAR CARDS
function actualizarDashboard(usuario){
    const resumen = calcularResumenCartera(usuario);
    const patrimonio = usuario.saldo + resumen.valorCartera;

    document
        .getElementById("patrimonio")
        .textContent = "$ " + patrimonio.toLocaleString();

    document
        .getElementById("saldo")
        .textContent = "$ " + usuario.saldo.toLocaleString();

    document
        .getElementById("resultado")
        .textContent = "$ " + resumen.resultado.toLocaleString();

    actualizarGraficoCartera(usuario);
    actualizarGraficoEvolucion(usuario, patrimonio);
}

// COMPRA
function realizarCompra(activo){

    Swal.fire({
        title:`Comprar ${activo.nombre}`,
        input:"number",
        inputLabel:"Cantidad",
        inputValue:1,
        showCancelButton:true,
        confirmButtonText:"Comprar"
    })
    .then(resultado=>{
        if(!resultado.isConfirmed)
            return;

        const cantidad = Number(resultado.value);

        try{
            const usuario = obtenerUsuarioActivo();
            comprarActivo(usuario, activo, cantidad);
            actualizarDashboard(usuario);
            guardarCambios(usuario);

            Swal.fire({
                icon:"success",
                title:"Compra realizada",
                text: `Compraste ${cantidad} ${activo.ticker}`
            });
        }
        catch(error){
            Swal.fire({
                icon:"error",
                title:"Error",
                text:error.message
            });
        }
    });
}

// VENTA
function realizarVenta(item){
    Swal.fire({
        title:`Vender ${item.ticker}`,
        input:"number",
        inputLabel:"Cantidad",
        inputValue:1,
        showCancelButton:true,
        confirmButtonText:"Vender"
    })
    .then(resultado=>{
        if(!resultado.isConfirmed)
            return;
            const cantidad = Number(resultado.value);
        try{
            const usuario = obtenerUsuarioActivo();
            const posicion = usuario.cartera.find(op=>op.ticker===item.ticker);

            if(!posicion) throw new Error( "No existe ese activo");

            venderActivo(usuario, posicion.id, cantidad);
            guardarCambios(usuario);
            Swal.fire({
                icon:"success",
                title:"Venta realizada"
            });
        }
        catch(error){
            Swal.fire({
            icon:"error",
            title:"Error",
            text:error.message
            });
        }
    });
}

// GUARDAR TODO
function guardarCambios(usuario) {
    guardarUsuarioActivo(usuario);
    actualizarUsuario(usuario);
    mostrarCartera(usuario, realizarVenta);
    actualizarDashboard(usuario);
}

// ACTUALIZAR MERCADO
async function actualizarMercado(){
    const usuario = obtenerUsuarioActivo();
    const activos = await actualizarCotizaciones();
    actualizarPreciosCartera(usuario, activos);
    guardarCambios(usuario);
    mostrarActivos(activos, realizarCompra);
    mostrarCartera(usuario, realizarVenta);
    actualizarDashboard(usuario);
}