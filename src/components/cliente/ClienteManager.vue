<template>
    <div>
        <cliente-form ref="cliente_form" @save="dataTableRefresh"/>
        <data-table @create="$bvModal.show('cliente_modal')"
                    @edit="$refs.cliente_form.edit($event)"
                    @change-status="changeClienteStatus"
                    :id="datatable"
                    route="cliente"/>
    </div>
</template>

<script>
    import ChangeStatusMixin from "../../mixins/ChangeStatusMixin";
    import ClienteForm from "./form/ClienteForm";

    export default {
        name: "ClienteManager",
        components: {ClienteForm},
        mixins: [ChangeStatusMixin],
        data() {
            return {
                datatable: 'cliente_datatable'
            }
        },
        methods: {
            changeClienteStatus({id}) {
                this.changeStatus(`cliente/${id}/change-status`, this.datatable);
            },
            dataTableRefresh() {
                $(`#${this.datatable}`).DataTable().ajax.reload();
            }
        }
    }
</script>
