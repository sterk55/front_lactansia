<template>
    <app-navbar />
    <div class="container">
      <h1>Ingrese la cédula que desea buscar</h1>
      <br>
      <table>
        <tr>
          <td><label for="">Ingrese la cédula: </label></td>
          <td><input required v-model="identityCard" type="text" /></td>
        </tr>
      </table>
      <br />
      <table>
        <tr>
          <td><button @click="mostrarLista()">Buscar Paciente</button></td>
        </tr>
      </table>
  
      <!-- Muestra mensaje de error si no se encuentra el paciente -->
      <div v-if="mensaje" class="error-message">
        <p>{{ mensaje }}</p>
        <button @click="redirigirCrear">Crear nuevo paciente</button>
      </div>
  
      <!-- Muestra los datos solo si `paciente` existe -->
      <fieldset v-if="paciente && paciente.identityCard">
        <div>
          <table class="tablasP">
            <thead>
              <tr>
                <th class="bonito" scope="col">Cédula</th>
                <th class="bonito" scope="col">Nombre Completo</th>
                <th class="bonito" scope="col">Fecha de Nacimiento</th>
                <th class="bonito" scope="col">Teléfono</th>
                <th class="bonito" scope="col">Ficha Medica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bonito">{{ paciente.identityCard }}</td>
                <td class="bonito">{{ paciente.fullName }}</td>
                <td class="bonito">{{ paciente.birthDate }}</td>
                <td class="bonito">{{ paciente.phone }}</td>
                <td class="bonito"><a id="idEditar" @click="editarPac(paciente)">Añadir Ficha</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>
    </div>
  </template>
  
  <script>
  import { eliminarPerId, buscarPerId } from '@/js/ProcesarPersona';
  import AppNavbar from './appNavbar.vue';
  
  export default {
    components: {
      AppNavbar,
    },
    data() {
      return {
        paciente: null, // Información del paciente encontrado
        mensaje: null,
        identityCard: '', // Modelo para buscar por cédula
      };
    },
    methods: {
      async mostrarLista() {
        try {
          this.paciente = await buscarPerId(this.identityCard); // Llama a la función para buscar paciente por cédula.
          if (this.paciente) {
            this.mensaje = "";
          } else {
            this.mensaje = "No existe el paciente con esta cédula.";
          }
        } catch (error) {
          console.error("Error al obtener el paciente:", error);
          this.mensaje = "Error al buscar el paciente.";
          this.paciente = null; // Asegúrate de que `this.paciente` esté en null si hay un error
        }
      },
      async eliminarPac(identityCard) {
        try {
          await eliminarPerId(identityCard);
          alert("El paciente ha sido eliminado correctamente.");
          this.paciente = null; // Limpia la información del paciente
        } catch (error) {
          console.error("Error al eliminar el paciente:", error);
        }
      },
      alerta(identityCard) {
        const opcion = confirm("¿Desea eliminar el paciente con cédula: " + identityCard + "?");
        if (opcion) {
          this.eliminarPac(identityCard);
        } else {
          alert("No se ha eliminado nada.");
        }
      },
      editarPac(paciente) {
        this.$router.push({
          name: "editar",
          params: {
            id: paciente.id,
            identityCard: paciente.identityCard,
            fullName: paciente.fullName,
            birthDate: paciente.birthDate,
            phone: paciente.phone,
          },
        });
      },
      redirigirCrear() {
        this.$router.push('/crear'); // Navega al componente de creación
      },
    },
  };
  </script>
  
  <style>
  .container {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    width: 80%;
    max-width: 800px;
  }
  
  table {
    margin: 0 auto;
  }
  
  .tablasP {
    margin: 0 auto;
    border: 1px solid #000;
    width: 100%;
  }
  
  .bonito {
    width: 12%;
    text-align: left;
    vertical-align: top;
    border: 1px solid #000;
    border-collapse: collapse;
    padding: 0.3em;
  }
  
  th {
    background: #dadada;
  }
  
  #error-message {
    color: red;
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
  
  .error-message {
    color: red;
    text-align: center;
    margin: 20px 0;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  