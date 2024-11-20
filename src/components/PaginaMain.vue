<template>
   
    <div class="welcome-container">
        <h1 class="welcome-title">Bienvenido!!</h1>
        <h2 class="welcome-subtitle">Seleccione la opción que desea realizar</h2>
        <table class="options-table">
            <tr>
                <td><h3 class="option" @click="sendToCreate">Crear Paciente</h3></td>
                <td><h3 class="option" @click="sendToMostrarAll">Mostrar todas los pacientes</h3></td>
                <td><h3 class="option" @click="sendToId">Buscar paciente por cedula</h3></td>
                <td><h3 class="option" @click="sendToRegister">Registrar Ficha Medica</h3></td>
            </tr>
            <tr>
                <td><h3 class="option" @click="sendToCreateAses">Crear Asesor</h3></td>
                <td><h3 class="option" @click="sendToMostrarAsesAll">Mostrar todos los asesores</h3></td>
                <td><h3 class="option" @click="sendToAsesId">Buscar asesor por cedula</h3></td>
            </tr>
        </table>
    </div>
</template>

<script>
import router from '@/router/router';


export default {

    methods: {
        sendToCreate() {
            router.push('/crear');
        },
        sendToMostrarAll() {
            router.push('/mostrar');
        },
        sendToId() {
            router.push('/buscarID');
        },
        sendToRegister() {
            router.push('/registrarFicha');
        },
        sendToCreateAses() {
            router.push('/crearases');
        },
        sendToMostrarAsesAll() {
            router.push('/mostrarases');
        },
        sendToAsesId() {
            router.push('/buscarasesID');
        }
    }
}
</script>

<style>
.welcome-container {
    text-align: center;
    margin: 0 auto;
    padding: 50px 20px;
    background-color: #f4f4f4; /* Color de fondo */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra */
    max-width: 600px; /* Ancho máximo */
}

.welcome-title {
    font-size: 2.5em; /* Tamaño de fuente */
    color: #333; /* Color del texto */
}

.welcome-subtitle {
    font-size: 1.5em; /* Tamaño de fuente */
    color: #666; /* Color del texto */
    margin-bottom: 30px; /* Margen inferior */
}

.options-table {
    margin: 0 auto;
    border-collapse: collapse; /* Quitar bordes dobles */
}

.options-table td {
    padding: 20px; /* Espaciado interno */
}

.option {
    cursor: pointer; /* Cambiar cursor al pasar el ratón */
    transition: color 0.3s ease; /* Transición suave para el color */
}

.option:hover {
    color: #007BFF; /* Color al pasar el ratón */
    text-decoration: underline; /* Subrayar al pasar el ratón */
}
</style>
