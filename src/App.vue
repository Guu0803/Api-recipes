<template>
  <div class="window">
    <div class="header">
      <div v-on:click="toHome()" >
        <img src="@/assets/logo.png" class="logo">
      </div>
      <div>
        <input type="search" placeholder="O que está procurando?" class="search" v-model="input">
        <button>
          Pesquisar
        </button>
      </div>
      <div class="find">
        Descubra
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data(){
    return{
      input:''
    }
  },
  methods:{
    toHome(){
      this.$router.push('/')
    }
  },
  watch:{
    input(value){
      this.$store.commit('textAtt', value)
    }
  }
}
</script>
<style>
body {
  margin: 0;
}

.window {
  height: 100vh;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1f1f1f;
}
.logo {
  height: 7vh;
}
.search {
  height: 5vh;
  border: 2px solid #c6c6c6;
  font-size: 2vh;
}

button {
  padding: 1vh 2vw;
  background-color: #c6c6c6;
  border: none;
  height: 5vh;
  color: white;
  cursor: pointer;
}

.find {
  height: 5vh;
  color: white;
  font-size: 3vh;
  background-color: #818181;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1vh 2vw;

}</style>
