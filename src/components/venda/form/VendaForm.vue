<template>
    <b-modal id="venda_modal"
             title="Cadastro de Vendas"
             @ok.prevent="save"
             @hidden="reset"
             @show="getSelect"
             size="md"
             ok-title="Salvar"
             ok-only>
        <form ref="venda_form">
            <form-group name="cliente_id" label="Cliente" :required="true">
                <v-select v-model="content.cliente_id"
                          :options="cliente"
                          @search="clienteSearch"/>
            </form-group>
            <form-group name="fruta_id" label="Frutas" tooltip="É necessário informar pelo menos uma fruta">
                <b-row>
                    <b-col :cols="content.fruta_id ? '10': '12'">
                        <v-select v-model="content.fruta_id"
                                  :options="fruta"
                                  @search="frutaSearch"/>
                    </b-col>
                    <b-col cols="2" class="text-right" v-if="content.fruta_id">
                        <b-button variant="primary" @click.prevent="atualizaListaFrutas"
                                  v-b-tooltip="'Selecionar fruta'">
                            <i class="fa fa-plus"/>
                        </b-button>
                    </b-col>
                </b-row>
            </form-group>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                    <tr class="text-center">
                        <th>Ação</th>
                        <th>FRUTA</th>
                        <th v-b-tooltip="'Valor unitario'">VALOR UN</th>
                        <th v-b-tooltip="'Disponível'">DISP</th>
                        <th style="width: 100px" v-b-tooltip="'Quantidade'">QTD</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="frutas.length === 0">
                        <td colspan="5" class="text-center font-weight-bold">Sem frutas selecionados</td>
                    </tr>
                    <tr v-for="(fruta, idx) in frutas" :key="idx" v-else>
                        <td class="text-center">
                            <b-button variant="danger" size="sm" @click="frutas.splice(idx,1)">&times;</b-button>
                        </td>
                        <td>{{fruta.nome}}</td>
                        <td class="text-center">{{fruta.valor_unitario}}</td>
                        <td class="text-center">{{fruta.quantidade}}</td>
                        <td>
                            <b-form-input @blur="verificaQuantidade(fruta)" v-model="fruta.qtd"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <b>Valor Total: R$ {{frutas | calcularTotal}}</b>
            </div>
        </form>
    </b-modal>
</template>

<script>
    import FormMixin from "../../../mixins/FormMixin";

    export default {
        name: "VendaForm",
        mixins: [FormMixin],
        data() {
            return {
                content: {},
                cliente: [],
                fruta: [],
                frutas: [],
                form: {
                    action: 'venda',
                    method: 'post'
                }
            };
        },
        filters: {
            calcularTotal(frutas) {
                let total = 0;
                frutas.forEach(fruta => {
                    let qtd = fruta.qtd ?? 1;
                    total += parseFloat(fruta.valor_unitario.replace(',', '.')).toFixed(2) * qtd;
                });
                return total.toString().replace('.', ',');
            }
        },
        methods: {
            getSelect() {
                this.clienteSearch();
                this.frutaSearch();

            },
            verificaQuantidade(fruta) {
                if (fruta.qtd > fruta.quantidade) {
                    this.$toast.error(`A quantidade disponível de ${fruta.nome} é de ${fruta.quantidade} unidades`);
                    fruta.qtd = fruta.quantidade;
                }
            },
            async atualizaListaFrutas() {
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
            },
            async clienteSearch(search = '', loading = () => null) {
                loading(true);
                let {data} = await this.$http.get(`cliente/search?search=${search}`);
                this.cliente = data;
                loading(false);
            },
            async frutaSearch(search = '', loading = () => null) {
                loading(true);
                let {data} = await this.$http.get(`fruta/search?search=${search}`);
                this.fruta = data;
                loading(false);
            },

            edit({id}) {
                this.request(`venda/${id}/edit`, {
                    method: 'get',
                    onSuccess: ({data}) => {
                        this.content = data;
                        this.form.action = `venda/${id}`;
                        this.form.method = 'put';
                        this.$bvModal.show('venda_modal');
                    }
                });
            },
            save() {
                let form = new FormData(this.$refs['venda_form']);
                const frutas = this.frutas.map(fruta => {
                    let qtd = fruta.qtd ?? 1;
                    return {
                        fruta_id: fruta.id,
                        quantidade: qtd
                    };
                });
                if (frutas.length) {
                    form.set('fruta_id', JSON.stringify(frutas));
                }
                form.set('cliente_id', this.content?.cliente_id?.code ?? '');
                this.request(this.form.action, {
                    method: this.form.method,
                    data: form,
                    toast: true,
                    onSuccess: () => {
                        this.$bvModal.hide('venda_modal');
                        this.$emit('save');
                    },
                    onError: (error) => this.showErrors(error)
                });
            }
        }
    }
</script>
