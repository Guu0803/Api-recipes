<template>
  <div>
    <div>
     {{ recipeID }}
    </div>
  </div>
</template>
<script>
export default {
  name:'recipesDetails',
  data (){
    return {
      recipesList: [],
      recipeID:{}
    }
  },
  created(){
    this.recipeID = this.$route.params.recipeID
    
  }
}

</script>
