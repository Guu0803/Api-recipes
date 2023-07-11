<template>
  <div class="home">
    home page
  </div>
  <RouterLink to="/detalhes-da-receita">
    detalhes
  </RouterLink>
  <button v-on:click="showRecipes()" >
    Mostrar receitas
  </button>
  <div v-for="(recipe) in recipesList" :key="recipe.id">
    Nome da receita: {{ recipe.name }}
  </div>
</template>

<script>
export default {
  name: 'HomeViews',
  data() {
    return {
      recipesList: []
    }
  },
  methods: {
    showRecipes() {
      const axios = require('axios')
      let url = 'https://tasty.p.rapidapi.com/recipes/list'
      let header = {
        'X-RapidAPI-Key': '8da8e9ee9amshed2a7d23a4fd5ccp12a336jsncaa9aaffe8d3',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
      let config = { headers: header }
      axios.get(url, config).then(response => {
        console.log(response)
        this.recipesList = response.data.results
        this.$store.commit("pegarReceitas", this.recipesList)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    this.$store.commit("atualizarIdadeECor", {idade: 78, cor:"laranja"})
    
  }
}
    // created() {
    //   const axios = require('axios')
    //   let url = 'https://tasty.p.rapidapi.com/recipes/list'
    //   let header = {
    //     'X-RapidAPI-Key': '8da8e9ee9amshed2a7d23a4fd5ccp12a336jsncaa9aaffe8d3',
    //     'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    //   }
    //   let config = {headers: header}
    //   axios.get(url, config).then(response =>{
    //     console.log(response)
    //   }).cath(error => {
    //     console.log(error)
    //   })

    //   // const options = {
    //   //   method: 'GET',
    //   //   url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
    //   //   params: {
    //   //     prefix: 'chicken soup'
    //   //   },
    //   //   headers: {
    //   //     'X-RapidAPI-Key': '8da8e9ee9amshed2a7d23a4fd5ccp12a336jsncaa9aaffe8d3',
    //   //     'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    //   //   }
    //   // };

    //   // try {
    //   //   const response = await axios.request(options);
    //   //   console.log(response.data);
    //   // } catch (error) {
    //   //   console.error(error);
    //   // }

    // }

</script>
<style>


</style>
