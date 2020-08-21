<template>
    <aside class="main-sidebar vh-100 sidebar-dark-primary elevation-4">
        <router-link to="/home" class="brand-link text-center text-uppercase">
            <span class="brand-text font-weight-light">{{APP_NAME}}</span>
        </router-link>
        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column"
                    data-widget="treeview" role="menu" data-animation-speed="300">
                    <menu-item v-for="(route, idx) in routes" :key="idx" :route="route"/>
                </ul>
            </nav>
        </div>
    </aside>

</template>

<script>
    import MenuItem from "./MenuItem";
    import routes from "../../assets/js/menu-routes";
    import {APP_NAME} from "../../../env";

    export default {
        name: "Sidebar",
        components: {MenuItem},
        data() {
            return {
                APP_NAME,
                routes
            }
        }
    }
</script>
