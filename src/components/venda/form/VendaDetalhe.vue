<template>
    <b-modal id="venda_detalhe_modal" title="Detalhes da Vendas" hide-footer>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Fruta</th>
                    <th>Validade</th>
                    <th>Quantidade</th>
                    <th>Valor unitário(R$)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="fruta in frutas" :key="fruta.id">
                    <td>{{fruta.nome}}</td>
                    <td>{{fruta.data_validade}}</td>
                    <td>{{fruta.pivot.quantidade_fruta}}</td>
                    <td>{{fruta.valor_unitario}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </b-modal>
</template>

<script>

    export default {
        name: "VendaDetalhe",
        data() {
            return {
                frutas: []
            };
        },
        methods: {
            async getDetalhes({id}) {
                const {data} = await this.$http.get(`venda/detalhe/${id}`);
                this.frutas = data;
                this.$bvModal.show('venda_detalhe_modal');
            }
        }
    }
</script>
