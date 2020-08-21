<template>
    <div>
        <venda-form ref="venda_form" @save="dataTableRefresh"/>
        <venda-detalhe ref="venda_form" @save="dataTableRefresh"/>
        <data-table @create="$bvModal.show('venda_modal')"
                    @detalhe="$refs.venda_detalhe_modal.edit($event)"
                    @change-status="changeFrutaStatus"
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
            changeFrutaStatus({id}) {
                this.changeStatus(`venda/${id}/change-status`, this.datatable);
            },
            dataTableRefresh() {
                $(`#${this.datatable}`).DataTable().ajax.reload();
            }
        }
    }
</script>
