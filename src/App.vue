<template>
  <div id="app">
    <input type="text" v-model="input" placeholder="url страницы" />
    <button @click="createPage">Перийти</button>
    <button @click="clear">Освободить пул</button>
    <p style="color:red;" v-show="error">В ПУЛЕ ПУСТО</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      input: "",
      error: false,
    };
  },
  methods: {
    async createPage() {
      const data = { url: this.input };
      try {
        const res = await axios.post("http://localhost:3000/data", data);
        window.open(res.data);
      } catch (err) {
        this.error = true;
      }
    },
    async clear() {
      const data = { url: this.input };
      await axios.post("http://localhost:3000/clear", data);
      this.error = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
