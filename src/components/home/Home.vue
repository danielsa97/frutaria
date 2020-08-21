<template>
    <b-row class="d-sm-flex justify-content-center">
        <b-col sm="3">
            <counter-card action="cliente"
                          label="Clientes"
                          bg="bg-teal"
                          name="clientes_counter"
                          icon="fa fa-users"/>
        </b-col>
        <b-col sm="3">
            <counter-card action="venda"
                          bg="bg-purple"
                          label="Total de vendas"
                          name="total_vendas_counter"
                          icon="fa fa-archive"/>
        </b-col>
        <b-col sm="3">
            <counter-card action="venda"
                          bg="bg-gradient-success"
                          label="Receitas"
                          name="valor_vendas_counter"
                          icon="fa fa-dollar-sign"/>
        </b-col>
        <b-col sm="3">
            <counter-card action="fruta"
                          bg="bg-gradient-info"
                          label="Frutas"
                          name="frutas_counter"
                          icon="fa fa-apple-alt"/>
        </b-col>
    </b-row>
</template>

<script>
    import CounterCard from "./widgets/CounterCard";

    export default {
        name: "Home",
        components: {CounterCard},
    }
</script>
