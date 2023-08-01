<template>
  <div>
    <button v-on:click="showRecipes()">
      Mostrar receitas
    </button>

    <div class="recipes-home-grid" v-if="this.search == false">
      <div v-for="recipe in recipesList" :key="recipe.id" class="recipes-home-card" v-on:click="toDetails(recipe)">
        <div class="conteiner-img">
          <img :src="recipe.thumbnail_url" class="recipes-img">
        </div>
        <div class="recipes-home-name">
          {{ recipe.name }}
        </div>
      </div>

    </div>
    <div class="recipes-home-grid" v-if="this.search == true">
      <div v-for="recipe in searchResult" :key="recipe.id" class="recipes-home-card" v-on:click="toDetails(recipe)">
        <div class="conteiner-img">
          <img :src="recipe.thumbnail_url" class="recipes-img">
        </div>
        <div class="recipes-home-name">
          {{ recipe.name }}
        </div>
      </div>
    </div>
    <Loading v-if="loading == true" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
export default {
  name: 'HomeViews',
  components: {
    Loading
  },
  data() {
    return {
      recipesList: [],
      loading: false,
      contenFilter: '',
      searchResult: [],
      search: false,
      filterName: '',
    }
  },
  computed: {
    pegarOSearch() {
      return this.$store.state.searchText
    }
  },
  watch: {
    pegarOSearch(value) {
      this.searchResult = []
      this.recipesList.forEach(element => {
        if (element.name.toLowerCase().includes(value.toLowerCase())) {
          this.searchResult.push(element)
          this.search = true
        }
      })
    },

  },
  methods: {
    showRecipes() {
      this.loading = true
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
        localStorage.setItem("recipes", JSON.stringify(this.recipesList))
        this.$store.commit("pegarReceitas", this.recipesList)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    resultadoMetodo() {
      console.log('resultado Metodo')
      return this.numero1 + this.numero2
    },
    toDetails(recipe){
      this.$router.push("/detalhes-da-receita/" + recipe.id )
    }

  },
  created() {
    let recipes = localStorage.getItem("recipes")
    recipes = JSON.parse(recipes)
    if (recipes) {
      this.recipesList = recipes
    }


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
<style scoped>
.recipes-home-grid {
  display: flex;
  justify-content: center;
  gap: 4vw 2vw;
  flex-wrap: wrap;
  margin-top: 3vw;

}

.recipes-home-card {
  width: 20vw;
  height: 20vw;
  text-align: center;
  transition: 200ms ease-in-out;
  cursor: pointer;

}

.recipes-home-card:hover {
  scale: 1.1;
}

.conteiner-img {
  width: 100%;
  height: 84%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recipes-img {
  max-width: 100%;
  max-height: 100%;
}

.recipes-home-name {
  color: #1f1f11;
  font-size: 3vh;
  cursor: pointer;
}

.recipes-home-name:hover {
  color: #289292;
}
</style>
