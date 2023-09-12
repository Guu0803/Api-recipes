<template>
  <button v-on:click="getMoreINfo()">
    mais detalhes
  </button>

  <div class="window" v-if="details && details.id == recipeID">
    <div class="title">
      {{ details.name }}
    </div>
    <div class="conteiner-classification">
      <span class="material-icons user">
        account_circle
      </span>
      <div>
        <div class="classification">
          <div class="conteiner-stars">
            <span class="material-icons" v-if="details.user_ratings.roundScore >= 0.2">
              star_rate 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore >= 0.4">
              star_rate 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore >= 0.6">
              star_rate 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore >= 0.8">
              star_rate 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore == 1">
              star_rate 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore == 0.1 || details.user_ratings.roundScore == 0.3 || details.user_ratings.roundScore == 0.5 ||details.user_ratings.roundScore == 0.7 || details.user_ratings.roundScore == 0.9 ">
              star_half
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore <= 0.8">
              star_outline 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore <= 0.6">
              star_outline 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore <= 0.4">
              star_outline 
            </span>
            <span class="material-icons" v-if="details.user_ratings.roundScore <= 0.2">
              star_outline 
            </span>
            
          </div>
          <div v-if="details.user_ratings">
            Review: {{ details.user_ratings.score }} ({{ details.user_ratings.count_negative +
              details.user_ratings.count_positive }} votes)
          </div>
        </div>
        <div style="display: flex; gap:1vw;">
            By
            <div style="color:#a6e9e3">
              {{ details.credits[0].name }},
            </div>
            <div>
              {{ this.getDate(details) }}
            </div>
        </div>
      </div>
    </div>

    <div class="image">
      <img :src="details.thumbnail_url">
    </div>
    <div class="ingredients-list">
      <div class="first-line-list">
        <div>
          <span class="material-icons group-icon">
            group
          </span>
          {{ details.yields }} peoples
        </div>
        <div class="separation">
        </div>
        <div>
          Time: 30 min
        </div>
        <div class="separation">
        </div>
        <div>
          Dificult: Hard
        </div>
      </div>
      <div class="price">
        Custo : {{ details.price.total }}
      </div>
      <div class="ingredients">
        Ingredients to make : {{ details.name }}
        <div class="collums">
          <div v-for="ingredient in details.sections[0].components" :key="ingredient.id" class="collum-left">
            <div v-on:click="checked(ingredient)">
              <span class="material-icons check" v-if="ingredient.check == false">
                check_box_outline_blank
              </span>
              <span class="material-icons check" v-if="ingredient.check == true">
                check_box
              </span>
            </div>
            {{ ingredient.raw_text }}
          </div>
        </div>
      </div>
    </div>
    <div class="method-of-preparation">
      <div class="title-preparation">
        How to prepare {{ details.name }}
      </div>
      <div v-for="(ingredient, index) in details.instructions" :key="ingredient.id" class="preparation-list">
        <div class="preparation">
          <div>
            {{ (index + 1) }}
          </div>
          {{ ingredient.display_text }}
        </div>
      </div>
    </div>
  </div>
  <Loading v-if="loading == true"/>

</template>
<script>
import Loading from '@/components/Loading.vue'
export default {
  components:{
    Loading
  },
  name: 'recipesDetails',
  data() {
    return {
      recipesList: [],
      recipeID: {},
      details: undefined,
      loading: false
    }
  },
  methods: {
    getMoreINfo() {
      console.log('init')
      this.loading = true
      const axios = require('axios')
      let url = "https://tasty.p.rapidapi.com/recipes/get-more-info"
      let header = {
        'X-RapidAPI-Key': '8da8e9ee9amshed2a7d23a4fd5ccp12a336jsncaa9aaffe8d3',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
      let params = { id: this.recipeID }
      let config = { headers: header, params: params }
      axios.get(url, config).then(response => {
        console.log(response)
        this.details = response.data
        this.details.user_ratings.roundScore = (Math.round(this.details.user_ratings.score * 10)) / 10
        localStorage.setItem('details', JSON.stringify(this.details))
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    checked(ingredient) {
      if (ingredient.check == false) {
        ingredient.check = true
      } else {
        ingredient.check = false
      }
    },
    getDate(details){
      const newDate = new Date(details.created_at)
      console.log(newDate)
      console.log(newDate.getDate())
      console.log(newDate.getMonth() + 1)
      console.log(newDate.getYear())

      return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getYear()
    }
  },
  created() {
    this.recipeID = this.$route.params.recipeID
    let details = localStorage.getItem('details')
    details = JSON.parse(details)
    if (details) {
      this.details = details
      details.sections[0].components.forEach(element => {
        element.check = false
      });
    }
    console.log(this.details)
  }
}

</script>
<style scoped>
.window {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;

}

.title {
  font-size: 5vh;
  color: #1f1f1f;
  font-weight: 600;
}

.conteiner-classification {
  display: flex;
  gap: 1vh;
  align-items: center;
}

.user {
  font-size: 7vh;
}

.classification {
  display: flex;
  align-items: center;
  gap: 1vh;
  border-left: 1px solid #a6e9e3;
  border-bottom: 1px solid #a6e9e3;

}

.image {
  height: 50vh;
}

img {
  height: 100%;
}

.ingredients-list {
  border: 1px solid #a6e9e3;
  width: 60vw;

}

.first-line-list {
  display: flex;
  align-items: center;
  gap: 2vw;
  font-size: 3vh;
  height: 6vh;
  border-bottom: 1px solid #a6e9e3;
}

.first-line-list div {
  display: flex;
  align-items: center;
  gap: 1vh;
}

.group-icon {
  margin-left: 1vh;
}

.separation {
  border-left: 1px solid #a6e9e3;
  height: 5vh;
}

.price {
  font-size: 3vh;
  height: 6vh;
  border-bottom: 1px solid #a6e9e3;
  display: flex;
  align-items: center;
  padding-left: 3vw;
}

.ingredients {
  font-size: 3vh;
  color: #1f1f1f;
  font-weight: 600;
  text-align: center;
  padding: 1vh;

}

.collums {
  display: flex;
  flex-direction: column;
  height: 50vh;
  flex-wrap: wrap;
  gap: 0 2vw;
}

.collum-left {
  display: flex;
  text-align: justify;
  align-items: first baseline;
  gap: 1vw;
  width: 27vw;
  color: #333333;
  font-weight: normal;
}

.check {
  color: #1f1f1f;
  cursor: pointer;
}

.title-preparation {
  font-size: 4vh;
  font-weight: bold;
}

.preparation-list {
  width: 60vw;
  font-size: 3vh;
}

.preparation {
  display: flex;
  gap: 1vw;
  align-items: first baseline;
}

.preparation div {
  font-size: 3.5vh;
  font-weight: bold;
}</style>
