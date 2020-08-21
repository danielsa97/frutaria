<template>
    <b-modal id="fruta_modal"
             title="Cadastro de Frutas"
             @ok.prevent="save"
             @hidden="reset"
             ok-title="Salvar"
             ok-only>
        <form ref="fruta_form">
            <form-group label="Nome" :required="true">
                <b-form-input name="nome" :value="content.nome"/>
            </form-group>
            <form-group name="data_validade" label="Data de validade" :required="true">
                <b-form-datepicker :min="new Date()" name="data_validade" placeholder="09/10/2020"
                                   :value="content.data_validade"/>
            </form-group>
            <form-group label="Quantidade" :required="true">
                <b-form-input type="number" name="quantidade" :value="content.quantidade"/>
            </form-group>
            <form-group label="Valor unitario" :required="true">
                <b-form-input placeholder="1,00" type="text" name="valor_unitario" v-money="money"
                              :value="content.valor_unitario"/>
            </form-group>
        </form>
    </b-modal>
</template>

<script>
    import FormMixin from "../../../mixins/FormMixin";
    import {VMoney} from 'v-money';

    export default {
        name: "ClienteForm",
        mixins: [FormMixin],
        directives: {money: VMoney},
        data() {
            return {
                content: {},
                form: {
                    action: 'fruta',
                    method: 'post'
                },
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: '',
                    suffix: '',
                    precision: 2,
                    masked: false
                }
            };
        },
        methods: {
            edit({id}) {
                this.request(`fruta/${id}/edit`, {
                    method: 'get',
                    onSuccess: ({data}) => {
                        this.content = data;
                        this.form.action = `fruta/${id}`;
                        this.form.method = 'put';
                        this.$bvModal.show('fruta_modal');
                    }
                });
            },
            save() {
                this.request(this.form.action, {
                    method: this.form.method,
                    data: new FormData(this.$refs['fruta_form']),
                    toast: true,
                    onSuccess: () => {
                        this.$bvModal.hide('fruta_modal');
                        this.$emit('save');
                    },
                    onError: (error) => this.showErrors(error)
                });
            }
        }
    }
</script>
