<template>
    <div class="nav-container">
        <router-link class="nav-button" to="/">Home</router-link>
        <router-link class="nav-button" to="/convert">Convert</router-link>
        <div class="nav-button nav-right" @click="setting.toggleDarkMode()">
            <div>{{ setting.isDarkMode ? "Dark Mode" : "Light Mode" }}</div>
            <Toggle :is-active="setting.isDarkMode"></Toggle>
        </div>
    </div>
</template>

<script lang="ts">
import Toggle from './Toggle.vue'
import { useSettingStore } from '../stores/SettingStore'

export default {
    data: () => ({
        setting: useSettingStore()
    }),
    components: {
        Toggle
    },
    mounted() {
        this.setting.loadSetting()
        onbeforeunload = () => this.setting.saveSetting()
    }
}
</script>

<style lang="scss">
@import "../styles/Transition.scss";

.nav-container {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;

    flex-direction: row;
    justify-content: left;

    width: 100%;
    height: 48px;
    
    background-color: var(--background-color-navbar);
    box-shadow: 0px 3px 10px var(--shadow-color);
    @include trans;

    .nav-button {
        display: flex;
        height: 48px;
        padding: 12px;
        gap: 8px;
        
        color: var(--color);
        text-decoration: none;
        user-select: none;
        @include trans;
        
        &.nav-right {
            position: absolute;
            right: 0;
        }

        &:hover {
            background-color: var(--background-color-hover);
        }
    }
}
</style>
