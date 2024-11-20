<template>
  <app-navbar />
  <div class="container">
    <h1>Ingrese los datos requeridos para la creación</h1>
    <br />
    <table>
      <tr>
        <td><label for="nombre">Nombre Completo: </label></td>
        <td><input v-model="nombre" required type="text" id="nombre" /></td>
      </tr>
      <tr>
        <td><label for="apellido">Identificación: </label></td>
        <td><input v-model="apellido" required type="text" id="apellido" /></td>
      </tr>
      <tr>
        <td><label for="telefono">Teléfono: </label></td>
        <td>
          <input v-model="telefono" required type="text" id="telefono" @input="validarTelefono" />
        </td>
      </tr>
      <tr>
        <td><label for="residencia">Residencia: </label></td>
        <td>
          <input v-model="residencia" required type="text" id="residencia" />
        </td>
      </tr>
      <tr>
        <td><label for="nivelEstudio">Nivel de Estudio: </label></td>
        <td>
          <input v-model="nivelEstudio" required type="text" id="nivelEstudio" />
        </td>
      </tr>
      <tr>
        <td><label for="lugarTrabajo">Lugar de Trabajo: </label></td>
        <td>
          <input v-model="lugarTrabajo" required type="text" id="lugarTrabajo" />
        </td>
      </tr>
      <tr>
        <td><label for="enfermedades">Enfermedades: </label></td>
        <td>
          <input v-model="enfermedades" required type="text" id="enfermedades" />
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
import { InsertarPer } from '@/js/ProcesarPersona';
import AppNavbar from './appNavbar.vue';

export default {
  components: {
    AppNavbar,
  },
  data() {
    return {
      nombre: null,
      apellido: null,
      telefono: null,
      residencia: null,
      nivelEstudio: null,
      lugarTrabajo: null,
      enfermedades: null,
      mensaje: null,
    };
  },
  methods: {
    validarTelefono() {
      // Filtrar solo caracteres numéricos
      this.telefono = this.telefono.replace(/[^0-9]/g, '');
    },
    async Insertar() {
      const per = {
        firstName: this.nombre,
        lastName: this.apellido,
        phone: this.telefono,
        residence: this.residencia,
        educationLevel: this.nivelEstudio,
        workplace: this.lugarTrabajo,
        diseases: this.enfermedades,
      };
      if (
        !this.nombre ||
        !this.apellido ||
        !this.telefono ||
        !this.residencia ||
        !this.nivelEstudio ||
        !this.lugarTrabajo ||
        !this.enfermedades
      ) {
        this.mensaje = 'Llene todos los campos.';
      } else {
        try {
          await InsertarPer(per);
          this.mensaje = 'Se ha ingresado correctamente.';
          // Limpiar los campos
          this.nombre = null;
          this.apellido = null;
          this.telefono = null;
          this.residencia = null;
          this.nivelEstudio = null;
          this.lugarTrabajo = null;
          this.enfermedades = null;
        } catch (error) {
          this.mensaje = 'Ocurrió un error al ingresar los datos.';
        }
      }
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
