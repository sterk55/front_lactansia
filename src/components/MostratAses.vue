<template>
     <app-navbar-ases />
     <div class="container">
        <h1>A continuación se muestran todas los pacientes registrados</h1>
        <br />
        <fieldset>
          <div v-if="mostrarB">
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
                <tr v-for="l in lista" :key="l.id">
                  <th class="bonito">{{ l.id }}</th>
                  <td class="bonito">{{ l.firstName }}</td>
                  <td class="bonito">{{ l.lastName }}</td>
                  <td class="bonito">{{ l.age }}</td>
                  <td class="bonito">
                    <a id="idEditar" @click="editarPer(l.id, l.firstName, l.lastName, l.age)">Editar</a>
                  </td>
                  <td class="bonito">
                    <a id="idEliminar" @click="alerta(l.id)">Eliminar</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
        <br />
        <label class="mensaje">{{ mensaje }}</label>
      </div>
    </template>
    
    <script>
    import { listaPerTodos, eliminarPerId } from '@/js/ProcesarPersona';
    import AppNavbarAses from './appNavbarAses.vue';
  
    export default {
      components:{
        AppNavbarAses
      },
      data() {
        return {
          lista: [],
          mostrarB: false,
          mensaje: null,
        };
      },
      methods: {
        async cargarLista() {
          try {
            this.lista = await listaPerTodos();
            if (this.lista.length === 0) {
              this.mensaje = "No hay personas ingresadas";
              this.mostrarB = false;
            } else {
              this.mostrarB = true;
              this.mensaje = "";
            }
          } catch (error) {
            this.mensaje = "Error al cargar la lista.";
            console.error("Error al cargar lista de personas:", error);
          }
        },
        async eliminarPersona(id) {
          try {
            await eliminarPerId(id);
            alert("Se ha eliminado correctamente");
            await this.cargarLista(); // Recarga la lista después de eliminar
          } catch (error) {
            console.error("Error al eliminar persona:", error);
          }
        },
        alerta(id) {
          const opcion = confirm("Desea eliminar la persona con id: " + id);
          if (opcion) {
            this.eliminarPersona(id);
          } else {
            alert("No se ha eliminado nada");
          }
        },
        editarPer(id, nombre, apellido, edad) {
          this.$router.push({ name: "editar", params: { ids: id, nombres: nombre, direccions: apellido, edads: edad } });
        },
      },
      mounted() {
        this.cargarLista();
      },
      beforeRouteEnter(to, from, next) {
        next((vm) => {
          vm.cargarLista(); // Asegura que se recargue la lista cuando vuelvas a esta página
        });
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
    
    .tablasP {
      margin: 0 auto;
      border: 1px solid #000;
      width: 80%;
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
    
    #idEditar,
    #idEliminar {
      text-decoration: underline;
      cursor: pointer;
    }
    
    #idEditar {
      color: blue;
    }
    
    #idEliminar {
      color: red;
    }
    
    .mensaje {
      color: red; /* Color del mensaje */
      text-align: center; /* Centrar el mensaje */
      margin-top: 10px; /* Espaciado superior */
    }
    </style>
    