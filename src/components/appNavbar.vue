<template>
    <nav class="navbar">
        <ul class="navbar-list">
            <li><router-link to="/main">Inicio</router-link></li>
            <li><router-link to="/crear">Crear Paciente</router-link></li>
            <li><router-link to="/mostrar">Mostrar Pacientes</router-link></li>
            <li><router-link to="/buscarID">Buscar Paciente por cedula</router-link></li>
            <li><router-link to="/registrarFicha">Registrar Ficha Medica</router-link></li>
        </ul>
        <!-- Botón de cerrar sesión -->
        <button class="logout-btn" @click="cerrarSesion">Cerrar Sesión</button>
    </nav>
</template>

<script>
export default {
    name: 'AppNavbar',
    methods: {
        cerrarSesion() {
            // Lógica para cerrar sesión (esto depende de cómo manejes la autenticación)
            // Por ejemplo, podrías borrar el token o redirigir al login
            this.$router.push('/'); // Redirigir al login
        }
    }
}
</script>

<style>
.navbar {
    background-color: #333; /* Color de fondo de la navbar */
    padding: 10px 0; /* Espaciado interno de la navbar */
    position: sticky; /* Fija la navbar en la parte superior */
    top: 0; /* Se mantiene en la parte superior al hacer scroll */
    width: 100%; /* Abarca todo el ancho de la ventana */
    z-index: 1000; /* Asegura que la navbar esté por encima de otros elementos */
    display: flex; /* Flexbox para alinear los elementos de la barra */
    justify-content: space-between; /* Coloca los elementos a los lados opuestos */
    align-items: center; /* Alinea los elementos verticalmente */
}

.navbar-list {
    list-style: none; /* Quitar viñetas de la lista */
    display: flex; /* Usar Flexbox para alinear los elementos */
    justify-content: center; /* Centrar elementos horizontalmente */
    margin: 0; /* Eliminar margen de la lista */
    padding: 0; /* Eliminar padding de la lista */
}

.navbar-list li {
    margin: 0 20px; /* Espaciado entre los elementos de la lista */
}

.navbar-list a {
    color: white; /* Color del texto */
    text-decoration: none; /* Quitar subrayado */
    transition: color 0.3s; /* Transición suave para el color */
}

.navbar-list a:hover {
    color: #007BFF; /* Color al pasar el ratón */
}

/* Estilos para el botón de cerrar sesión */
.logout-btn {
    padding: 10px 20px;
    background-color: #FF4C4C; /* Rojo */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    margin-right: 20px; /* Espacio entre el botón y el borde derecho */
}

.logout-btn:hover {
    background-color: #FF1F1F; /* Rojo más oscuro al pasar el ratón */
}
</style>

