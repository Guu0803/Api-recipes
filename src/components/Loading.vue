<template>
    <div class="tela">
        <div class="conteiner-loading">
            <span class="material-icons loading">
                refresh
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'loadingComponent'
}
</script>
<style scoped>
.tela {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0, 0.5);

}
.conteiner-loading {
    width: 3vw;
    height: 3vw;
    padding: 1vw;
    background-color: black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading {
    font-size: 5vh;
    color: white;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
}

@keyframes spin { 
    100% { 
        transform:rotate(360deg); 
    } 
}
</style>