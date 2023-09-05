<template>
    <div class="nav-container">
        <router-link class="nav-button" to="/">{{ texts.navbar.home }}</router-link>
        <router-link class="nav-button" to="/convert">{{ texts.navbar.convert }}</router-link>
        <div class="nav-right-side">
            <Dropdown class="nav-button" :items="languages" :id="0" 
                :selected="setting.currentLanguage" @select="select"></Dropdown>
            <div class="nav-button" @click="setting.toggleDarkMode()">
                <div>{{ setting.isDarkMode ? texts.navbar.darkmode : texts.navbar.lightmode }}</div>
                <Toggle :is-active="setting.isDarkMode"></Toggle>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Toggle from './Toggle.vue'
import Dropdown from './Dropdown.vue'
import { useSettingStore } from '../stores/SettingStore'

export default {
    data: () => ({
        setting: useSettingStore(),
        languages: ['English', '한국어'],
    }),
    components: {
        Toggle, Dropdown
    },
    computed: {
        texts() {
            return this.setting.getTexts
        }
    },
    methods: {
        select(_: number, index: number) {
            this.setting.currentLanguage = index
        }
    },
    mounted() {
        this.setting.loadSetting()
        onbeforeunload = () => this.setting.saveSetting()
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

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

    .nav-right-side {
        display: flex;
        position: absolute;
        right: 0;
    }

    .nav-button {
        display: flex;
        width: fit-content;
        height: 48px;
        padding: 12px;
        gap: 8px;
        
        color: var(--color);
        text-decoration: none;
        user-select: none;
        @include trans;
        
        &:hover { background-color: var(--background-color-hover); }
    }
}
</style>
