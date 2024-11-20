<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* Eliminado el margin-top */
}

body {
  margin: 0; /* Eliminar el margen del body */
  padding: 0; /* Asegurarte de que no haya padding */
  background-color: #f4f4f4; /* Color de fondo de la aplicación */
  height: 100vh; /* Asegurarte de que el body ocupe todo el alto de la ventana */
  display: flex;
  flex-direction: column; /* Para alinear los elementos en columna */
}
</style>
