<template>
  <app-navbar />
    <div class="container">
      <h1>Editar Persona con ID: {{ ids }}</h1>
      <br />
      <table>
        <tr>
          <td><label for="idNombre">Nombre: </label></td>
          <td><input type="text" required v-model="nombre" id="idNombre" /></td>
          
        </tr>
        <tr>
          <td><label for="idapellido">Apellido: </label></td>
          <td><input type="text" required v-model="apellido" id="idapellido" /></td>
         
        </tr>
        <tr>
          <td><label for="idEdad">Edad: </label></td>
          <td>
            <input
              type="text"
              required
              v-model="edad"
              id="idEdad"
              @input="validarEdad"
            />
          </td>
        
        </tr>
      </table>
      <br />
      <table>
        <tr>
          <td><button @click="actualizar()">Actualizar</button></td>
        </tr>
        <tr>
          <td><label class="mensaje">{{ mensaje }}</label></td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import { actualizarPer } from '@/js/ProcesarPersona';
  import AppNavbar from './appNavbar.vue';
  
  export default {
    components:{
      AppNavbar
    },

    data() {
      return {
        nombre: null,
        apellido: null,
        edad: null,
        mensaje: null,
      };
    },
    props: {
      ids: null,
      nombres: {
        type: String,
      },
      direccions: {
        type: String,
      },
      edads: {
        type: String,
      },
    },
    methods: {
      async actualizar() {
        const persona = {
          id: this.ids,
          firstName: this.nombre,
          lastName: this.apellido,
          age: this.edad,
        };
  
        if (this.nombre === null || this.apellido === null || this.edad === null) {
          this.mensaje = 'Llene todos los parámetros';
        } else {
          await actualizarPer(this.ids, persona);
          this.nombre = null;
          this.apellido = null;
          this.edad = null;
          this.mensaje = 'Se ha actualizado correctamente';
          this.regresar();
        }
      },
      regresar() {
        this.$router.replace('/mostrar');
      },
      validarEdad() {
        // Filtrar solo caracteres numéricos
        this.edad = this.edad.replace(/[^0-9]/g, '');
      },
    },
    mounted() {
      // Asigna los valores de props a los modelos para que se reflejen en los inputs
      this.nombre = this.nombres;
      this.apellido = this.direccions;
      this.edad = this.edads;
    },
  };
  </script>
  
  <style>
  .container {
    background-color: #f4f4f4; /* Color de fondo de la aplicación */
    padding: 20px; /* Espaciado interno */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
    margin: 20px auto; /* Margen automático para centrar */
    width: 80%; /* Ancho del contenedor */
    max-width: 800px; /* Ancho máximo */
  }
  
  table {
    margin: 0 auto; /* Centrar la tabla */
  }
  
  .mensaje {
    color: red; /* Color del mensaje */
    text-align: center; /* Centrar el mensaje */
    margin-top: 10px; /* Espaciado superior */
  }
  </style>
  