import { createStore } from 'vuex'  
export default createStore({
    state:{
        cor:"",
        idade:0,
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
        atualizarIdade(state, valor){
            state.idade = valor
        },
        atualizarIdadeECor(state, objeto){
            state.idade =  objeto.idade
            state.cor = objeto.cor
        },
        pegarReceitas(state, objeto){
            console.log("1 2 3")
            state.recipesList = objeto
        }
    },
    actions:{},
    modules:{}
})