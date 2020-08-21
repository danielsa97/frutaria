<template>
    <b-container :fluid="true">
        <b-row>
            <div :style="`background-image: url(${frutas_banner})`" class="vh-100 col-12 col-md-8 bg-info d-none d-md-block">
            </div>
            <b-col cols="12" md="4" class="p-5 bg-light  vh-100">
                <h4><i class="fa fa-lock"/> Iniciar sessão</h4>
                <form-group label="E-mail" :required="true">
                    <b-form-input type="email" v-model="email" name="email" placeholder="mail@gmail.com" autofocus/>
                </form-group>
                <form-group label="Senha" :required="true">
                    <b-form-input type="password" v-model="password" name="password" placeholder="******"/>
                </form-group>
                <b-form-group class="text-right">
                    <b-button type="button" @click.prevent="login" variant="primary">
                        LOGIN <i class="fa fa-arrow-right"/>
                    </b-button>
                </b-form-group>
            </b-col>

        </b-row>
    </b-container>
</template>

<script>
    import FormMixin from "../mixins/FormMixin";
    import frutas_banner from '../assets/img/frutas-banner.jpg';

    export default {
        name: "Login",
        mixins: [FormMixin],
        data() {
            return {
                frutas_banner,
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                this.$auth.login({
                    data: {
                        email: this.email,
                        password: this.password
                    },
                    error: (e) => {
                        this.showErrors(e)
                    },
                    rememberMe: true,
                    fetchUser: true
                })
            }
        }
    }
</script>
<style scoped>
    .brand {
        animation: start 600ms;
    }

    @keyframes start {
        0% {
            margin-top: 100px;
        }
        100% {
            margin-top: 0;
        }
    }

    .bg-info {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
</style>
