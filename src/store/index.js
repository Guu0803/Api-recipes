import { createStore } from 'vuex'  
export default createStore({
    state:{
        searchText: '--',
        recipesList:[]
    },
    getters:{
        pegarCorEIdade(state){
            return {
                idade:state.idade,
                cor:state.cor
            }
        }
    },
    mutations:{
        atualizarCor(state, valor){
            state.cor = valor
        },
        textAtt(state, value){
            state.searchText = value
        }
    },
    actions:{},
    modules:{}
})