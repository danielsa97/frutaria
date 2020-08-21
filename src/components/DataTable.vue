<template>
    <div class="table-responsive">
        <div>

        </div>
        <table ref="datatable" :id="id" class="table table-bordered table-striped">
            <thead/>
        </table>
    </div>
</template>

<script>
    export default {
        name: "DataTable",
        props: {
            route: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: false
            },
            btnCreate: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        mounted() {
            this.makeDataTable();
        },
        methods: {
            async makeDataTable() {
                let {data} = await axios.get(this.route);
                let table = $(this.$refs.datatable);
                let dataTable = table.DataTable(data);
                if (this.btnCreate) {
                    dataTable.button().add(0, {
                        text: '<i class="fa fa-plus-circle"></i> Cadastrar',
                        className: 'btn btn-primary btn-sm',
                        action: () => this.$emit('create')
                    });
                }
                table.on("click", "tr[role='row']", evt => {
                    let {emit} = evt.target.dataset;
                    if (emit) {
                        this.$emit(emit, evt.target.dataset);
                    }
                });

            }
        }
    }
</script>
