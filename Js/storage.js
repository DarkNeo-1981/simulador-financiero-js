
const CLAVE_USUARIO_ACTIVO = "usuarioActivo";

// Guardar usuario activo
export function guardarUsuarioActivo(usuario) {
    localStorage.setItem(
        CLAVE_USUARIO_ACTIVO,
        JSON.stringify(usuario)
    );
}

// Obtener usuario activo
export function obtenerUsuarioActivo() {
    const usuario = localStorage.getItem(CLAVE_USUARIO_ACTIVO);
    if (!usuario) {return null;}
    return JSON.parse(usuario);
}

// Cerrar sesión
export function cerrarSesion() {localStorage.removeItem(CLAVE_USUARIO_ACTIVO);}