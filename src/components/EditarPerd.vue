<template>
  <app-navbar />
  <div class="container">
    <h1>Editar Paciente con Cédula: {{ identityCard }}</h1>
    <br />
    <table>
      <tr>
        <td><label for="fullName">Nombre Completo: </label></td>
        <td><input type="text" required v-model="localFullName" id="fullName" /></td>
      </tr>
      <tr>
        <td><label for="birthDate">Fecha de Nacimiento: </label></td>
        <td><input type="date" required v-model="localBirthDate" id="birthDate" /></td>
      </tr>
      <tr>
        <td><label for="phone">Teléfono: </label></td>
        <td><input type="text" required v-model="localPhone" id="phone" @input="validarTelefono" /></td>
      </tr>
      <tr>
        <td><label for="residence">Residencia: </label></td>
        <td><input type="text" required v-model="localResidence" id="residence" /></td>
      </tr>
      <tr>
        <td><label for="educationLevel">Nivel de Estudio: </label></td>
        <td><input type="text" required v-model="localEducationLevel" id="educationLevel" /></td>
      </tr>
      <tr>
        <td><label for="employmentStatus">Estado Laboral: </label></td>
        <td><input type="text" required v-model="localEmploymentStatus" id="employmentStatus" /></td>
      </tr>
      <tr>
        <td><label for="diseases">Enfermedades: </label></td>
        <td><input type="text" required v-model="localDiseases" id="diseases" /></td>
      </tr>
      <tr>
        <td><label for="healthService">Servicio de Salud: </label></td>
        <td><input type="text" required v-model="localHealthService" id="healthService" /></td>
      </tr>
      <tr>
        <td><label for="medications">Medicamentos: </label></td>
        <td><input type="text" required v-model="localMedications" id="medications" /></td>
      </tr>
      <tr>
        <td><label for="livingWith">Viviendo Con: </label></td>
        <td><input type="text" required v-model="localLivingWith" id="livingWith" /></td>
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
  components: {
    AppNavbar,
  },
  data() {
    return {
      localFullName: this.fullName,
      localBirthDate: this.birthDate,
      localPhone: this.phone,
      localResidence: this.residence,
      localEducationLevel: this.educationLevel,
      localEmploymentStatus: this.employmentStatus,
      localDiseases: this.diseases,
      localHealthService: this.healthService,
      localMedications: this.medications,
      localLivingWith: this.livingWith,
      mensaje: null,
    };
  },
  props: {
    id: String,
    identityCard: String,
    fullName: String,
    birthDate: String,
    phone: String,
    residence: String,
    educationLevel: String,
    employmentStatus: String,
    diseases: String,
    healthService: String,
    medications: String,
    livingWith: String,
  },
  methods: {
    async actualizar() {
      const paciente = {
        id: this.id,
        identityCard: this.identityCard,
        fullName: this.localFullName,
        birthDate: this.localBirthDate,
        phone: this.localPhone,
        residence: this.localResidence,
        educationLevel: this.localEducationLevel,
        employmentStatus: this.localEmploymentStatus,
        diseases: this.localDiseases,
        healthService: this.localHealthService,
        medications: this.localMedications,
        livingWith: this.localLivingWith,
      };

      if (
        !this.localFullName ||
        !this.localBirthDate ||
        !this.localPhone ||
        !this.localResidence ||
        !this.localEducationLevel ||
        !this.localEmploymentStatus ||
        !this.localDiseases ||
        !this.localHealthService ||
        !this.localMedications ||
        !this.localLivingWith
      ) {
        this.mensaje = 'Por favor, complete todos los campos.';
      } else {
        try {
          await actualizarPer(this.id, paciente);
          this.mensaje = 'Paciente actualizado correctamente.';
          this.regresar();
        } catch (error) {
          console.error('Error al actualizar el paciente:', error);
          this.mensaje = 'Hubo un error al actualizar el paciente.';
        }
      }
    },
    regresar() {
      this.$router.replace('/mostrar');
    },
    validarTelefono() {
      this.localPhone = this.localPhone.replace(/[^0-9]/g, '');
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
