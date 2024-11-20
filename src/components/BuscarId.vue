<template>
  <app-navbar />
  <div class="container">
    <h1>Ingrese la cédula que desea buscar</h1>
    <br>
    <table>
      <tr>
        <td><label for="">Ingrese la cédula: </label></td>
        <td><input required v-model="id" type="text" /></td>
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

    <!-- Muestra los datos solo si `lista` existe y no es nula -->
    <fieldset v-if="lista && lista.id">
      <div>
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
            <tr>
              <th class="bonito">{{ lista.id }}</th>
              <td class="bonito">{{ lista.firstName }}</td>
              <td class="bonito">{{ lista.lastName }}</td>
              <td class="bonito">{{ lista.phone }}</td>
              <td class="bonito">{{ lista.residence }}</td>
              <td class="bonito">{{ lista.educationLevel }}</td>
              <td class="bonito">{{ lista.workplace }}</td>
              <td class="bonito">{{ lista.diseases }}</td>
              <td class="bonito"><a id="idEditar" @click="editarPac(lista)">Editar</a></td>
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
import AppNavbar from './appNavbar.vue';

export default {
  components: {
    AppNavbar,
  },
  data() {
    return {
      lista: null, // Inicializa la lista como null
      mostrarB: false,
      mensaje: null,
      id: '',
    };
  },
  methods: {
    async mostrarLista() {
      try {
        this.lista = await buscarPerId(this.id); // Llama a la función para obtener el paciente.
        if (this.lista) {
          this.mostrarB = true; // Paciente encontrado
          this.mensaje = "";
        } else {
          this.mostrarB = false; // Paciente no encontrado
          this.mensaje = "No existe el paciente";
        }
      } catch (error) {
        console.error("Error al obtener el paciente:", error);
        this.mensaje = "Error al buscar el paciente";
        this.lista = null; // Asegúrate de que `this.lista` esté en null si hay un error
      }
    },
    async eliminarPac(id) {
      try {
        await eliminarPerId(id);
        alert("El paciente ha sido eliminado correctamente");
        location.reload(); // Recarga la página después de eliminar
      } catch (error) {
        console.error("Error al eliminar el paciente:", error);
      }
    },
    alerta(id) {
      const opcion = confirm("¿Desea eliminar el paciente con id: " + id + "?");
      if (opcion) {
        this.eliminarPac(id);
      } else {
        alert("No se ha eliminado nada");
      }
    },
    editarPac(paciente) {
      this.$router.push({
        name: "editar",
        params: {
          ids: paciente.id,
          nombres: paciente.firstName,
          apellidos: paciente.lastName,
          telefonos: paciente.phone,
          residencias: paciente.residence,
          nivelesEstudio: paciente.educationLevel,
          lugaresTrabajo: paciente.workplace,
          enfermedades: paciente.diseases,
        },
      });
    },
    redirigirCrear() {
      this.$router.push('/crearases'); // Navega al componente de crear
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
