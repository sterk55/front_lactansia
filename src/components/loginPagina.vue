<template>
    <div class="login">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        if (this.username && this.password) {
          // Simular validación
          this.$router.push('/main');
        } else {
          alert('Por favor, ingresa tus credenciales');
        }
      },
    },
  };
  </script>
  
  <style>
  .login {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  