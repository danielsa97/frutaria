<template>
    <div>
        <fruta-form ref="fruta_form" @save="dataTableRefresh"/>
        <data-table @create="$bvModal.show('fruta_modal')"
                    @edit="$refs.fruta_form.edit($event)"
                    @change-status="changeFrutaStatus"
                    :id="datatable"
                    route="fruta"/>
    </div>
</template>

<script>
    import ChangeStatusMixin from "../../mixins/ChangeStatusMixin";
    import FrutaForm from "./form/FrutaForm";

    export default {
        name: "FrutasManager",
        components: {FrutaForm},
        mixins: [ChangeStatusMixin],
        data() {
            return {
                datatable: 'fruta_datatable'
            }
        },
        methods: {
            changeFrutaStatus({id}) {
                this.changeStatus(`fruta/${id}/change-status`, this.datatable);
            },
            dataTableRefresh() {
                $(`#${this.datatable}`).DataTable().ajax.reload();
            }
        }
    }
</script>
