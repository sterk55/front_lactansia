<template>
  <app-navbar />
  <div class="container">
    <h1>Ingrese los datos requeridos para la creación</h1>
    <br />
    <table>
      <tr>
        <td><label for="nombreCompleto">Nombre Completo: </label></td>
        <td>
          <input v-model="nombreCompleto" required type="text" id="nombreCompleto" />
        </td>
      </tr>
      <tr>
        <td><label for="identificacion">Identificación: </label></td>
        <td>
          <input
            v-model="identificacion"
            required
            type="text"
            id="identificacion"
            @input="validarIdentificacion"
            maxlength="10"
          />
        </td>
      </tr>
      <tr>
        <td><label for="fechaNacimiento">Fecha de Nacimiento: </label></td>
        <td>
          <input v-model="fechaNacimiento" required type="date" id="fechaNacimiento" />
        </td>
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
      <tr>
        <td><label for="atencionMedica">Atención Médica: </label></td>
        <td>
          <input v-model="atencionMedica" required type="text" id="atencionMedica" />
        </td>
      </tr>
      <tr>
        <td><label for="medicamentos">Medicamentos: </label></td>
        <td>
          <input v-model="medicamentos" required type="text" id="medicamentos" />
        </td>
      </tr>
      <tr>
        <td><label for="viveCon">Vive con: </label></td>
        <td>
          <input v-model="viveCon" required type="text" id="viveCon" />
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
      nombreCompleto: null,
      identificacion: null,
      fechaNacimiento: null,
      telefono: null,
      residencia: null,
      nivelEstudio: null,
      lugarTrabajo: null,
      enfermedades: null,
      atencionMedica: null,
      medicamentos: null,
      viveCon: null,
      mensaje: null,
    };
  },
  methods: {
    validarTelefono() {
      // Filtrar solo caracteres numéricos
      this.telefono = this.telefono.replace(/[^0-9]/g, '');
    },
    validarIdentificacion() {
      // Filtrar solo caracteres numéricos y limitar a 10 caracteres
      this.identificacion = this.identificacion.replace(/[^0-9]/g, '').slice(0, 10);
    },
    async Insertar() {
      const per = {
        fullName: this.nombreCompleto,
        identityCard: this.identificacion,
        birthDate: this.fechaNacimiento,
        phone: this.telefono,
        residence: this.residencia,
        educationLevel: this.nivelEstudio,
        employmentStatus: this.lugarTrabajo,
        diseases: this.enfermedades,
        healthService: this.atencionMedica,
        medications: this.medicamentos,
        livingWith: this.viveCon,
      };
      if (
        !this.nombreCompleto ||
        !this.identificacion ||
        !this.fechaNacimiento ||
        !this.telefono ||
        !this.residencia ||
        !this.nivelEstudio ||
        !this.lugarTrabajo ||
        !this.enfermedades ||
        !this.atencionMedica ||
        !this.medicamentos ||
        !this.viveCon
      ) {
        this.mensaje = 'Llene todos los campos.';
      } else {
        try {
          await InsertarPer(per);
          this.mensaje = 'Se ha ingresado correctamente.';
          // Limpiar los campos
          this.nombreCompleto = null;
          this.identificacion = null;
          this.fechaNacimiento = null;
          this.telefono = null;
          this.residencia = null;
          this.nivelEstudio = null;
          this.lugarTrabajo = null;
          this.enfermedades = null;
          this.atencionMedica = null;
          this.medicamentos = null;
          this.viveCon = null;
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
