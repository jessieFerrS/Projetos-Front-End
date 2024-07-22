<template>
    <div id="main-banner">
        <h1>Krusty Krab</h1>
    </div>
</template>
<script>
export default {
    name: 'Banner'
}
</script>

<style scoped>

    #main-banner {
        background-image: url('../../public/img/burguer_krabbyPatty.jpg');
        background-position: 0 -180px;
        background-size:cover;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    #main-banner h1 {
        color: #ffff;
        font-size: 300%;
        padding: 10px 10px;
        
    }
   

</style>