<template>
  <div class="about">
    detalhes da receita
  </div>
  <div>
    <!-- {{ this.cor }}
    {{ this.idade }} -->
    {{ this.recipesList }}
  </div>
  <RouterLink to="/">
    home
  </RouterLink>
</template>
<script>
export default {
  name:'recipesDetails',
  data (){
    return {
      cor:"",
      idade: 0,
      recipesList: []
    }
  },
  created() {
    this.recipesList = this.$store.state.recipesList

    // let info = this.$store.getters.pegarCorEIdade()
    // this.cor = info.cor
    // this.idade = info.idade
  }


}

</script>
