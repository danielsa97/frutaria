<template>
    <div>
        <venda-form ref="venda_form" @save="dataTableRefresh"/>
        <venda-detalhe ref="venda_detalhe_modal"/>
        <data-table @create="$bvModal.show('venda_modal')"
                    @detalhes="$refs.venda_detalhe_modal.getDetalhes($event)"
                    :id="datatable"
                    route="venda"/>
    </div>
</template>

<script>
    import ChangeStatusMixin from "../../mixins/ChangeStatusMixin";
    import VendaForm from "./form/VendaForm";
    import VendaDetalhe from "./form/VendaDetalhe";

    export default {
        name: "VendasManager",
        components: {VendaDetalhe, VendaForm},
        mixins: [ChangeStatusMixin],
        data() {
            return {
                datatable: 'venda_datatable'
            }
        },
        methods: {
            dataTableRefresh() {
                $(`#${this.datatable}`).DataTable().ajax.reload();
            }
        }
    }
</script>
