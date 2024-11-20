<template>
  <app-navbar />
  <div class="container">
    <h1>A continuación se muestran todos los pacientes registrados</h1>
    <br />
    <fieldset>
      <div v-if="mostrarB">
        <table class="tablasP">
          <thead>
            <tr>
              <th class="bonito" scope="col">Cédula</th>
              <th class="bonito" scope="col">Nombre Completo</th>
              <th class="bonito" scope="col">Fecha de Nacimiento</th>
              <th class="bonito" scope="col">Teléfono</th>
              <th class="bonito" scope="col">Residencia</th>
              <th class="bonito" scope="col">Nivel de Estudio</th>
              <th class="bonito" scope="col">Lugar de Trabajo</th>
              <th class="bonito" scope="col">Enfermedades</th>
              <th class="bonito" scope="col">Atención Médica</th>
              <th class="bonito" scope="col">Medicamentos</th>
              <th class="bonito" scope="col">Vive Con</th>
              <th class="bonito" scope="col">Editar</th>
              <th class="bonito" scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="persona in lista" :key="persona.identityCard">
              <th class="bonito">{{ persona.identityCard }}</th>
              <td class="bonito">{{ persona.fullName }}</td>
              <td class="bonito">{{ persona.birthDate }}</td>
              <td class="bonito">{{ persona.phone }}</td>
              <td class="bonito">{{ persona.residence }}</td>
              <td class="bonito">{{ persona.educationLevel }}</td>
              <td class="bonito">{{ persona.employmentStatus }}</td>
              <td class="bonito">{{ persona.diseases }}</td>
              <td class="bonito">{{ persona.healthService }}</td>
              <td class="bonito">{{ persona.medications }}</td>
              <td class="bonito">{{ persona.livingWith }}</td>
              <td class="bonito">
                <a id="idEditar" @click="editarPer(persona)">Editar</a>
              </td>
              <td class="bonito">
                <a id="idEliminar" @click="alerta(persona.identityCard)">Eliminar</a>
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
import AppNavbar from './appNavbar.vue';

export default {
  components: {
    AppNavbar,
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
          this.mensaje = "No hay pacientes ingresados.";
          this.mostrarB = false;
        } else {
          this.mostrarB = true;
          this.mensaje = "";
        }
      } catch (error) {
        this.mensaje = "Error al cargar la lista.";
        console.error("Error al cargar lista de pacientes:", error);
      }
    },
    async eliminarPersona(identityCard) {
      try {
        await eliminarPerId(identityCard);
        alert("Se ha eliminado correctamente.");
        await this.cargarLista(); // Recarga la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar el paciente:", error);
      }
    },
    alerta(identityCard) {
      const opcion = confirm("Desea eliminar el paciente con cédula: " + identityCard + "?");
      if (opcion) {
        this.eliminarPersona(identityCard);
      } else {
        alert("No se ha eliminado nada.");
      }
    },
    editarPer(persona) {
      this.$router.push({
        name: "editar",
        params: {
          id: persona.id,
          identityCard: persona.identityCard,
          fullName: persona.fullName,
          birthDate: persona.birthDate,
          phone: persona.phone,
          residence: persona.residence,
          educationLevel: persona.educationLevel,
          employmentStatus: persona.employmentStatus,
          diseases: persona.diseases,
          healthService: persona.healthService,
          medications: persona.medications,
          livingWith: persona.livingWith,
        },
      });
    },
  },
  mounted() {
    this.cargarLista();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.cargarLista(); // Asegura que se recargue la lista al volver a esta página
    });
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
  width: 90%;
  max-width: 1000px;
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
  text-align: left;
  vertical-align: top;
  border: 1px solid #000;
  border-collapse: collapse;
  padding: 0.3em;
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
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
