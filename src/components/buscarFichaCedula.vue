<template>
    <app-navbar />
    <div class="container">
      <h1>Ingrese la cédula que desea buscar</h1>
      <br>
      <table>
        <tr>
          <td><label for="cedula">Ingrese la cédula: </label></td>
          <td><input required v-model="identityCard" type="text" /></td>
        </tr>
      </table>
      <br />
      <table>
        <tr>
          <td><button @click="mostrarLista()">Buscar Paciente</button></td>
        </tr>
      </table>
  
      <!-- Muestra mensaje de error si no se encuentra el registro -->
      <div v-if="mensaje" class="error-message">
        <p>{{ mensaje }}</p>
        <button @click="crearFicha">Crear nuevo registro</button>
      </div>
  
      <!-- Muestra los datos del registro si `registro` existe -->
      <fieldset v-if="registro && registro.identityCard">
        <div>
          <table class="tablasP">
            <thead>
              <tr>
                <th class="bonito" scope="col">Fecha</th>
                <th class="bonito" scope="col">Hora de Inicio</th>
                <th class="bonito" scope="col">Hora de Fin</th>
                <th class="bonito" scope="col">Tipo de Paciente</th>
                <th class="bonito" scope="col">Razón de Consulta</th>
                <th class="bonito" scope="col">Historia Contextual</th>
                <th class="bonito" scope="col">Tema de Consejo</th>
                <th class="bonito" scope="col">Acciones</th>
                <th class="bonito" scope="col">Recomendaciones</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bonito">{{ registro.date }}</td>
                <td class="bonito">{{ registro.startTime }}</td>
                <td class="bonito">{{ registro.endTime }}</td>
                <td class="bonito">{{ registro.typePatient }}</td>
                <td class="bonito">{{ registro.consultationReason }}</td>
                <td class="bonito">{{ registro.contextStory }}</td>
                <td class="bonito">{{ registro.adviceTopic }}</td>
                <td class="bonito">{{ registro.actions }}</td>
                <td class="bonito">{{ registro.recommendations }}</td>

              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>
    </div>
  </template>
  
  <script>
  import { buscarRegistroPorId } from '@/js/ProcesarRegistro';
  import AppNavbar from './appNavbar.vue';
  
  export default {
    components: {
      AppNavbar,
    },
    data() {
      return {
        registro: null, // Información del registro encontrado
        mensaje: null,
        identityCard: '', // Modelo para buscar por cédula
      };
    },
    methods: {
      async mostrarLista() {
        try {
          this.registro = await buscarRegistroPorId(this.identityCard); // Llama a la función para buscar el registro por cédula.
          if (this.registro) {
            this.mensaje = '';
          } else {
            this.mensaje = 'No existe un registro para este paciente.';
          }
        } catch (error) {
          console.error('Error al obtener el registro:', error);
          this.mensaje = 'Error al buscar el registro.';
          this.registro = null; // Asegúrate de que `registro` esté en null si hay un error
        }
      },
      crearFicha() {
        this.$router.push({
          name: "crearficha",
          params: {
            identityCard: this.identityCard,
          },
        });
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
  