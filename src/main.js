import './assets/js/bootstrap';
import './styles/app.scss';
import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import VueIzitoast from 'vue-izitoast';
import {BootstrapVue} from 'bootstrap-vue';
import vSelect from 'vue-select';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'
import money from 'v-money';
import auth from "./assets/js/auth";
import router from './router';
import Main from "./components/template/Main";

Vue.use(VueTheMask);
Vue.use(VueAxios, axios);
Vue.use(money);
Vue.use(BootstrapVue);

Vue.use(VueIzitoast, {
    resetOnHover: true,
    position: 'topRight',
});

Vue.router = router;
Vue.use(VueAuth, auth);


//Global Components
Vue.component('v-select', vSelect);
Vue.component('form-group', require("./components/FormGroup").default);
Vue.component('data-table', require("./components/DataTable").default);
Vue.component('input-image', require("./components/InputImage").default);

new Vue({
    el: '#app',
    render: app => app(Main),
    router
});

