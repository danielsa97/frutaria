<template>
    <li :class="['nav-item', route.children ? 'has-treeview' : '']">
        <router-link :to="route.children ? '#': (route.path || '#')" class="nav-link">
            <span :class="route.icon" v-if="route.icon"/>
            <span v-else>&raquo;</span>
            <i v-if="route.children" class="fas fa-angle-left right"/>
            {{route.label }}
        </router-link>
        <ul class="nav nav-treeview" v-if="route.children">
            <menu-item v-for="(children, idx) in route.children" :key="idx" :route="children"/>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "MenuItem",
        props: {
            route: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .nav-link:hover {
        background: #6c757d;
        color: #ffffff !important;
    }
</style>
