<template>
    <container v-if="allowDashboard"/>
    <router-view v-else/>
</template>
<script>
    import Container from "./Container";
    import {APP_NAME} from "../../../env";

    export default {
        name: "Main",
        components: {Container},
        mounted() {
            document.title = APP_NAME;
        },
        computed: {
            allowDashboard() {
                return this.$auth.check() && !['404'].includes(this.$route.name)
            }
        }
    }
</script>
