<template>
    <b-modal id="venda_detalhe_modal"
             title="Detalhes da Vendas"
             @hidden="reset">

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
            async getDetalhes(item) {
                const frutaId = this.content?.fruta_id?.code;
                if (frutaId) {
                    const hasFruta = this.frutas.findIndex(fruta => fruta.id === frutaId);
                    if (hasFruta !== -1) {
                        this.$toast.error("A fruta selecionada já foi incluída");
                    } else {
                        let {data} = await this.$http.get(`fruta/${frutaId}/edit`);
                        this.frutas.push(data);
                    }
                } else {
                    this.$toast.error("Selecione uma fruta");
                }
            }
        }
    }
</script>
