<template>
    <b-modal id="cliente_modal"
             title="Cadastro de Clientes"
             @ok.prevent="save"
             @hidden="reset"
             ok-title="Salvar"
             ok-only>
        <form ref="cliente_form">
            <form-group label="Nome" :required="true">
                <b-form-input name="nome" :value="content.nome"/>
            </form-group>
            <form-group label="CPF" :required="true">
                <b-form-input name="cpf" v-mask="'###.###.###-##'" :value="content.cpf"/>
            </form-group>
        </form>
    </b-modal>
</template>

<script>
    import FormMixin from "../../../mixins/FormMixin";

    export default {
        name: "ClienteForm",
        mixins: [FormMixin],
        data() {
            return {
                content: {},
                form: {
                    action: 'cliente',
                    method: 'post'
                }
            };
        },
        methods: {
            edit({id}) {
                this.request(`cliente/${id}/edit`, {
                    method: 'get',
                    onSuccess: ({data}) => {
                        this.content = data;
                        this.form.action = `cliente/${id}`;
                        this.form.method = 'put';
                        this.$bvModal.show('cliente_modal');
                    }
                });
            },
            save() {
                this.request(this.form.action, {
                    method: this.form.method,
                    data: new FormData(this.$refs['cliente_form']),
                    toast: true,
                    onSuccess: () => {
                        this.$bvModal.hide('cliente_modal');
                        this.$emit('save');
                    },
                    onError: (error) => this.showErrors(error)
                });
            }
        }
    }
</script>
