
import {obtenerUsuarios} from "./usuariosStorage.js";

export async function validarUsuario(email, password) {
    let usuarios = obtenerUsuarios();

    // Si no hay usuarios creados, intenta cargar usuarios.json
    if (usuarios.length === 0) {
        const respuesta = await fetch("./data/usuarios.json");
        usuarios = await respuesta.json();
    }

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    return usuario || null;
}