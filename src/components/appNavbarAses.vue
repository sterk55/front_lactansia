<template>
    <nav class="navbar">
        <ul class="navbar-list">
            <li><router-link to="/main">Inicio</router-link></li>
            <li><router-link to="/mostrarAses">Mostrar Asesores</router-link></li>
            <li><router-link to="/buscarAsesID">Buscar Asesor por cedula</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'AppNavbarAses'
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
</style>
