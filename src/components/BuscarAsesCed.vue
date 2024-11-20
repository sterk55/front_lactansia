<template>
     <app-navbar-ases />
      <div class="container">
        <h1>Ingrese la cedula que desea buscar</h1>
        <br>
        <table>
          <tr>
            <td><label for="">Ingrese la cedula: </label></td>
            <td><input required v-model="id" type="text" /></td>
          </tr>
        </table>
        <br />
        <table>
          <tr>
            <td><button @click="mostrarLista()">Buscar Paciente</button></td>
          </tr>
        </table>
    
        <!-- Muestra mensaje de error si no se encuentra la persona -->
        <div v-if="mensaje" class="error-message">
          <p>{{ mensaje }}</p>
        </div>
    
        <!-- Muestra los datos solo si `lista` existe y no es nula -->
        <fieldset v-if="lista && lista.id">
          <div>
            <table class="tablasP">
              <thead>
                <tr>
                  <th class="bonito" scope="col">ID</th>
                  <th class="bonito" scope="col">Nombre</th>
                  <th class="bonito" scope="col">Apellido</th>
                  <th class="bonito" scope="col">Edad</th>
                  <th class="bonito" scope="col">Editar</th>
                  <th class="bonito" scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="bonito">{{ lista.id }}</th>
                  <td class="bonito">{{ lista.firstName }}</td>
                  <td class="bonito">{{ lista.lastName }}</td>
                  <td class="bonito">{{ lista.age }}</td>
                  <td class="bonito"><a id="idEditar" @click="editarPer(lista.id, lista.firstName, lista.lastName, lista.age)">Editar</a></td>
                  <td class="bonito"><a id="idEliminar" @click="alerta(lista.id)">Eliminar</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
    </template>
    
    <script>
    import { eliminarPerId, buscarPerId } from '@/js/ProcesarPersona';
    import AppNavbarAses from './appNavbarAses.vue';
  
    export default {
  
  components: {
    AppNavbarAses
  
  },
  
      data() {
        return {
          lista: null, // Inicializa la lista como null
          mostrarB: false,
          mensaje: null,
          id: ''
        }
      },
      methods: {
        async mostrarLista() {
          try {
            this.lista = await buscarPerId(this.id); // Llama a la función para obtener la persona.
            if (this.lista) {
              this.mostrarB = true; // Persona encontrada
              this.mensaje = "";
            } else {
              this.mostrarB = false; // Persona no encontrada
              this.mensaje = "No existe Persona";
            }
          } catch (error) {
            console.error("Error al obtener la persona:", error);
            this.mensaje = "Error al buscar la persona";
            this.lista = null; // Asegúrate de que `this.lista` esté en null si hay un error
          }
        },
        async PerEliminar(id) {
          await eliminarPerId(id);
          alert("Se ha eliminado correctamente");
          location.reload();
        },
        alerta(id) {
          var opcion = confirm("Desea eliminar la persona con id: " + id);
          if (opcion == true) {
            this.PerEliminar(id);
          } else {
            alert("No se ha eliminado nada");
          }
        },
        editarPer(id, nombre, apellido, edad) {
          this.$router.push({ name: "editar", params: { ids: id, nombres: nombre, direccions: apellido, edads: edad } });
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
    
    .tablasP {
        margin: 0 auto;
        border: 1px solid #000;
        width: 100%; /* Asegúrate de que ocupe todo el ancho */
    }
    
    .bonito {
        width: 18%;
        text-align: left;
        vertical-align: top;
        border: 1px solid #000;
        border-collapse: collapse;
        padding: 0.3em;
        caption-side: bottom;
    }
    
    th {
        background: #dadada;
    }
    
    #error-message {
        color: red; /* Color del mensaje de error */
    }
    
    #idEditar,
    #idCertificados {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }
    
    #idEliminar {
        color: red;
        text-decoration: underline;
        cursor: pointer;
    }
    
    .error-message {
        color: red; /* Color del mensaje de error */
        text-align: center; /* Centrar el mensaje de error */
        margin: 20px 0; /* Espaciado alrededor del mensaje de error */
    }
    </style>
    