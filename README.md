# InvestSim Pro 📈

## Simulador de Inversiones Personales

InvestSim Pro es una aplicación web interactiva desarrollada con JavaScript que permite simular operaciones de inversión en diferentes activos financieros.

El usuario puede iniciar sesión, consultar activos disponibles, realizar compras y ventas, administrar su cartera de inversiones y analizar la evolución de su patrimonio mediante gráficos.

El proyecto fue desarrollado aplicando conceptos de JavaScript moderno, manipulación del DOM, módulos ES6, consumo de datos mediante Fetch API, persistencia con LocalStorage y utilización de librerías externas.


---

# 🚀 Funcionalidades principales

## 👤 Gestión de usuarios

- Inicio de sesión mediante email y contraseña.
- Validación de usuarios.
- Persistencia de sesión utilizando LocalStorage.
- Recuperación de información del usuario al volver a ingresar.


## 📊 Mercado

- Carga dinámica de activos desde archivos JSON.
- Visualización de activos disponibles.
- Consulta de precios actuales.
- Actualización de cotizaciones del mercado.


## 💰 Operaciones de inversión

- Compra de activos financieros.
- Validación de saldo disponible antes de realizar una operación.
- Venta de activos.
- Validación de cantidad disponible para evitar ventas superiores a la posición actual.
- Registro de operaciones realizadas.


## 📁 Gestión de cartera

- Visualización de inversiones actuales.
- Agrupación de compras del mismo activo.
- Cálculo del precio promedio de adquisición.
- Cálculo de ganancias y pérdidas.
- Actualización del patrimonio total del usuario.


## 📈 Dashboard

El panel principal permite visualizar:

- Patrimonio total.
- Saldo disponible.
- Resultado acumulado.
- Distribución de inversiones.
- Evolución del patrimonio.


## 📉 Gráficos

La aplicación utiliza Chart.js para representar:

- Distribución de cartera mediante gráfico Doughnut.
- Evolución del patrimonio mediante gráfico Line.


---

# 🛠️ Tecnologías utilizadas

## Frontend

- HTML5
- CSS3
- JavaScript ES6+


## Librerías externas

### SweetAlert2

Utilizada para generar alertas y ventanas interactivas para las operaciones realizadas por el usuario.

### Chart.js

Utilizada para la creación de gráficos dinámicos.


## Herramientas y APIs

- Fetch API para obtener información desde archivos JSON.
- LocalStorage para persistencia de datos.
- JavaScript Modules para organización del código.


---

# 📂 Estructura del proyecto

```text
InvestSim-Pro/
│
├── index.html
├── styles.css
├── README.md
│
├── data/
│   ├── activos.json
│   └── usuarios.json
│
└── js/
    ├── main.js
    ├── auth.js
    ├── storage.js
    ├── usuariosStorage.js
    ├── mercado.js
    ├── cartera.js
    ├── graficos.js
    ├── ui.js
    └── uiCartera.js
```



---

# ▶️ Instalación y ejecución

1. Descargar o clonar el proyecto.
2. Abrir la carpeta del proyecto utilizando Visual Studio Code.
3. Ejecutar el proyecto mediante un servidor local.
Se recomienda utilizar la extensión: Live Server
4. Abrir el archivo: index.html


desde el servidor local.

---

# 💾 Persistencia de datos

La aplicación utiliza LocalStorage para almacenar información del usuario:

- Usuario activo.
- Saldo disponible.
- Cartera de inversiones.
- Historial de operaciones.
- Evolución del patrimonio.

Esto permite conservar la información aunque el usuario cierre la aplicación y vuelva a ingresar posteriormente.

---

# 🧩 Arquitectura del proyecto

El código está organizado utilizando módulos JavaScript ES6.

La aplicación separa responsabilidades en diferentes componentes:

- Autenticación y usuarios.
- Persistencia de datos.
- Gestión del mercado.
- Lógica de inversiones.
- Renderizado de interfaz.
- Generación de gráficos.


Esta estructura permite un código más ordenado, mantenible y escalable.

---

# 📌 Objetivo del proyecto

El objetivo principal de InvestSim Pro es desarrollar una aplicación web completa utilizando JavaScript, aplicando buenas prácticas de programación y simulando un entorno real de gestión de inversiones.

---

# 👨‍💻 Autor

Nicolás Fasanella

Proyecto final - JavaScript
