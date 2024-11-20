<template>
         <app-navbar-ases />

      <div class="container">
        <h1>Ingrese los datos requeridos para la creación</h1>
        <br />
        <table>
          <tr>
            <td><label for="">Nombre: </label></td>
            <td><input v-model="nombre" required type="text" /></td>
          </tr>
          <tr>
            <td><label for="">Apellido: </label></td>
            <td><input v-model="apellido" required type="text" /></td>
          </tr>
          <tr>
            <td><label for="">Edad: </label></td>
            <td>
              <input v-model="edad" required type="text" @input="validarEdad" />
            </td>
          </tr>
        </table>
    
        <table>
          <tr>
            <td><button @click="Insertar()">Ingresar Datos</button></td>
          </tr>
          <tr>
            <td>
              <label class="mensaje">{{ mensaje }}</label>
            </td>
          </tr>
        </table>
      </div>
    </template>
    
    <script>
    import { InsertarAse } from '@/js/ProcesarAsesor';
    import AppNavbarAses from './appNavbarAses.vue';
  
    export default {
  
      components:{
        AppNavbarAses
    },
  
      data() {
        return {
          nombre: null,
          apellido: null,
          edad: null,
          mensaje: null,
        }
      },
      methods: {
        validarEdad() {
          // Filtrar solo caracteres numéricos
          this.edad = this.edad.replace(/[^0-9]/g, '');
        },
        async Insertar() {
          const per = {
            firstName: this.nombre,
            lastName: this.apellido,
            age: this.edad
          };
          if (
            this.nombre == null ||
            this.apellido == null ||
            this.edad == null
          ) {
            this.mensaje = "Llene todos los parámetros";
          } else {
            await InsertarAse(per);
            this.mensaje = "Se ha ingresado correctamente";
            // Limpiar los campos
            this.nombre = null;
            this.apellido = null;
            this.edad = null;
          }
        }
      }
    }
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
    