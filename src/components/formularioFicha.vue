<template>
    <app-navbar />
    <div class="container">
      <h1>Ingrese los datos requeridos</h1>
      <h2>Se añadira nueva ficha al paciente asignado con el sguiente numero de cedula: {{identityCard }}</h2>
      <br />
      <table>
    
        <tr>
          <td><label for="date">Fecha: </label></td>
          <td>
            <input v-model="date" required type="date" id="date" />
          </td>
        </tr>
        <tr>
          <td><label for="startTime">Hora de Inicio: </label></td>
          <td>
            <input v-model="startTime" required type="time" id="startTime" />
          </td>
        </tr>
        <tr>
          <td><label for="endTime">Hora de Fin: </label></td>
          <td>
            <input v-model="endTime" required type="time" id="endTime" />
          </td>
        </tr>
        <tr>
          <td><label for="typePatient">Tipo de Paciente: </label></td>
          <td>
            <select v-model="typePatient" required id="typePatient">
              <option value="" disabled>Seleccione una opción</option>
              <option value="Adulto">Adulto</option>
              <option value="Niño">Niño</option>
              <option value="Adolescente">Adolescente</option>
              <option value="Adulto Mayor">Adulto Mayor</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="consultationReason">Motivo de Consulta: </label></td>
          <td>
            <textarea v-model="consultationReason" required id="consultationReason"></textarea>
          </td>
        </tr>
        <tr>
          <td><label for="contextStory">Contexto de Historia: </label></td>
          <td>
            <textarea v-model="contextStory" required id="contextStory"></textarea>
          </td>
        </tr>
        <tr>
          <td><label for="adviceTopic">Tema de Asesoría: </label></td>
          <td>
            <textarea v-model="adviceTopic" required id="adviceTopic"></textarea>
          </td>
        </tr>
        <tr>
          <td><label for="actions">Acciones: </label></td>
          <td>
            <textarea v-model="actions" required id="actions"></textarea>
          </td>
        </tr>
        <tr>
          <td><label for="recommendations">Recomendaciones: </label></td>
          <td>
            <textarea v-model="recommendations" required id="recommendations"></textarea>
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
  import { InsertarRegistro } from '@/js/ProcesarRegistro'; // Ajusta según la ubicación de tu método.
  import AppNavbar from './appNavbar.vue';
  
  export default {
    components: {
      AppNavbar,
    },
    data() {
      return {
        date: null,
        startTime: null,
        endTime: null,
        typePatient: null,
        consultationReason: null,
        contextStory: null,
        adviceTopic: null,
        actions: null,
        recommendations: null,
        mensaje: null,
        localId: this.id,
        locaIdentyCard: this.identityCard,
      };
    },
    props: {
    identityCard: String,
  },
    methods: {
      async Insertar() {
        const pac = {
            identityCard: this.identityCard
        };

        const registro = {
          date: this.date,
          startTime: this.startTime,
          endTime: this.endTime,
          typePatient: this.typePatient,
          consultationReason: this.consultationReason,
          contextStory: this.contextStory,
          adviceTopic: this.adviceTopic,
          actions: this.actions,
          recommendations: this.recommendations,
          patient: this.pac

        };
  
        if (Object.values(registro).some((value) => !value)) {
          this.mensaje = 'Llene todos los campos.';
        } else {
          try {
            await InsertarRegistro(registro);
            this.mensaje = 'Se ha ingresado correctamente.';
            this.resetForm();
          } catch (error) {
            this.mensaje = 'Ocurrió un error al ingresar los datos.';
          }
        }
      },
      resetForm() {
        this.date = null;
        this.startTime = null;
        this.endTime = null;
        this.typePatient = null;
        this.consultationReason = null;
        this.contextStory = null;
        this.adviceTopic = null;
        this.actions = null;
        this.recommendations = null;
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
  
  .mensaje {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  