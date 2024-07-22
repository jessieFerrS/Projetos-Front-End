<template>
    <div>
        <Message :msg="msg" v-show="msg"/>
        <div>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="name">Nome do Cliente </label>
                    <input type="text" id="name" name="name" v-model="name" placeholder="Digite o Seu Nome">
                </div>
                <div class="input-container">
                    <label for="bread">Tipo de pão: </label>
                    <select name="bread" id="bread" v-model="bread">
                        <option value="">Selecione o tipo de pão</option>
                        <option v-for="bread in breads" :key="bread.id"  :value="bread.tipo">{{ bread.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="meat">Tipo de carne: </label>
                    <select name="meat" id="meat" v-model="meat">
                        <option value="">Selecione o tipo de carne</option>
                        <option v-for="meat in meats" :key="meat.id" :value="meat.tipo"> {{ meat.tipo }}</option>
                    </select>
                </div>
                <div id="toppings-container" class="input-container">
                    <label id="toppings-title" for="toppings">Opcionais: </label>
                    <div class="checkbox-container" v-for="topping in toppingsdata" :key="topping.id">
                        <input type="checkbox" name="toppings" v-model="toppings" :value="topping.tipo">
                        <span>{{ topping.tipo }}</span>
                    </div>
                </div>
                
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Criar meu Burger!">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue';

export default {
    name: "BurgerForm",

    data() {
        return {
            /* dados no plural porque são os dados que vem do servidor */
            breads: null,
            meats: null,
            toppingsdata: null,
            /* dados no singular porque são dados do forms */
            name: null,
            bread: null,
            meat: null,
            toppings: [],
            msg: null
        };
    },
    methods: {
        /* metodos que vao trazer o backend */
        /* metodo getIngredientes = assincrono : significa que ele não bloqueia a execução do restante do codigo enquanto aguarda
        a resposta da solicitação de rede */
        async getIngredientes() {
            /* função fetch: para fazer uma solicitação HTTPget para o endpoint HTTP localhost: 3000/ingredientes.
            A resposta da solicitação é armazenada na constante req. */
            const req = await fetch("http://localhost:3000/ingredientes"); /* dá acesso a API */
            /* função json: analisa a resposta da solicitação HTTP e retorna um objeto javascript que
            pode ser usado no restante do codigo*/
            /* await: utilizado com funções assincronas para esperar que uma operação assincrona seja concluida
            antes de continuar a executar o codigo, a funçõa fetch retorna uma promessa que é resolvida com
            a resposta da solicitação HTTP. O await é usado para esperar que a promessa seja resolvida e em
            seguida a resposta da solicitação é armazenada na constante req, garantindo que o restante do codigo
            nao seja executado até que a resposta da solicitação esteja disponivel.*/
            const data = await req.json();
            this.breads = data.breads;
            this.meats = data.meats;
            this.toppingsdata = data.toppings;
            console.log(data);
        },
        async createBurger(e) {
            e.preventDefault();
            const data = {
                name: this.name,
                meat: this.meat,
                bread: this.bread,
                toppings: Array.from(this.toppings),
                status: "Solicitado"
            };
            /* precisa virar um texto porque via request será enviado para o servidor */
            const dataJson = JSON.stringify(data);
            const req = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            const res = await req.json();
            
            //colocar uma msg de sistema
            this.msg = `Pedido Nº ${res.id} Realizado com Sucesso!`;
            
            
            //limpar msg
            setTimeout(() => this.msg = "", 3000);
            
            //limpar os campos
            this.name = "";
            this.meat = "";
            this.bread = "";
            this.toppings = "";
        }
    },
    mounted() {
        this.getIngredientes();
    },
    components: { Message }
}
</script>

<style scoped>
    #burger-form {
        max-width: 400px;
        margin: 0 auto;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label {
        font-weight: bold;
        margin-bottom: 15px;
        color: #1dbaf7;
        padding: 5px 10px;
        border-left: 4px solid #990000;
    }

    input, select {
        padding: 5px 10px;
        width: 300px;
    }

    #toppings-container {
        flex-direction: row;
        flex-wrap: wrap;
    }

    #toppings-title {
        width: 100%;
    }

    span {
        font-style: italic;
    }
    .checkbox-container {
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    .checkbox-container span,
    .checkbox-container input {
        width: auto; 
    }

    .checkbox-container span {
        margin-left: 6px;
    }

    .submit-btn {
        background-color: #990000;
        color: #222;
        font-weight: bold;
        border: 2px solid #990000;
        border-radius: 10px;
        padding: 10px;
        font-size: 16px;
        margin:0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover {
        background-color: transparent;
        color: #1dbaf7;
    }
</style>