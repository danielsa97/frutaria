import {HOST_API} from "../../../env";

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = `${HOST_API}/api`;

require('jquery-ui-dist/jquery-ui');
require('overlayscrollbars');
require('bootstrap');
require('datatables.net-buttons-bs');
require('datatables.net-bs4');

window.AdminLte = require('admin-lte');

const DATATABLE_PT_BR = require('../datatable-pt-br');
const NProgress = require('nprogress');
const axiosLoading = {
    stage: 1,
    run: () => {
        switch (axiosLoading.stage) {
            case 2:
                setTimeout(() => {
                    NProgress.inc();
                    axiosLoading.run();
                }, 500);
                break;
            case 3:
                axiosLoading.stage = 1;
                NProgress.done();
                break;
        }
    },
    done: () => {
        axiosLoading.stage = 3;
    }
};


axios.interceptors.request.use((config) => {
    if (axiosLoading.stage === 1) {
        NProgress.start();
        axiosLoading.stage = 2;
        axiosLoading.run();
    }
    return config;
}, (error) => {
    axiosLoading.done();
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    axiosLoading.done();
    return response;
}, (error) => {
    axiosLoading.done();
    return Promise.reject(error);
});


$.extend(true, $.fn.dataTable.defaults, {
    "language": DATATABLE_PT_BR,
});

$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token_default')}`);
    }
});
