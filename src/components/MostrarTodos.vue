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
              <th class="bonito" scope="col">ID</th>
              <th class="bonito" scope="col">Nombre</th>
              <th class="bonito" scope="col">Apellido</th>
              <th class="bonito" scope="col">Teléfono</th>
              <th class="bonito" scope="col">Residencia</th>
              <th class="bonito" scope="col">Nivel de Estudio</th>
              <th class="bonito" scope="col">Lugar de Trabajo</th>
              <th class="bonito" scope="col">Enfermedades</th>
              <th class="bonito" scope="col">Editar</th>
              <th class="bonito" scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in lista" :key="l.id">
              <th class="bonito">{{ l.id }}</th>
              <td class="bonito">{{ l.firstName }}</td>
              <td class="bonito">{{ l.lastName }}</td>
              <td class="bonito">{{ l.phone }}</td>
              <td class="bonito">{{ l.residence }}</td>
              <td class="bonito">{{ l.educationLevel }}</td>
              <td class="bonito">{{ l.workplace }}</td>
              <td class="bonito">{{ l.diseases }}</td>
              <td class="bonito">
                <a id="idEditar" @click="editarPer(l)">Editar</a>
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
    editarPer(persona) {
      this.$router.push({
        name: "editar",
        params: {
          ids: persona.id,
          nombres: persona.firstName,
          apellidos: persona.lastName,
          telefonos: persona.phone,
          residencias: persona.residence,
          nivelesEstudio: persona.educationLevel,
          lugaresTrabajo: persona.workplace,
          enfermedades: persona.diseases,
        },
      });
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
  width: 10%;
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
