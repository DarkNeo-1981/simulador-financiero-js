
const CLAVE_USUARIOS = "usuarios";

// Obtener usuarios guardados
export function obtenerUsuarios() {
    const usuarios = localStorage.getItem(CLAVE_USUARIOS);
    if (!usuarios) {return [];}
    return JSON.parse(usuarios);
}

// Guardar lista usuarios
export function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

// Actualizar usuario existente
export function actualizarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    const indice = usuarios.findIndex(u => u.email === usuario.email);
    if (indice === -1) {
        usuarios.push(usuario);
    } else {
        usuarios[indice] = usuario;
    }
    guardarUsuarios(usuarios);
}
