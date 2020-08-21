<template>
    <div>
        <venda-form ref="venda_form" @save="dataTableRefresh"/>
        <data-table @create="$bvModal.show('venda_modal')"
                    @edit="$refs.venda_form.edit($event)"
                    @change-status="changeFrutaStatus"
                    :id="datatable"
                    route="venda"/>
    </div>
</template>

<script>
    import ChangeStatusMixin from "../../mixins/ChangeStatusMixin";
    import VendaForm from "./form/VendaForm";

    export default {
        name: "VendasManager",
        components: {VendaForm},
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
