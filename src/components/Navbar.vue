<template>
    <div id="nav-container" ref="navbar">
        <div class="nav-text">Code Converter</div>
        <router-link class="nav-button" v-for="(item, index) in paths" :to="item">{{ labels[index] }}</router-link>
        <div id="nav-right-side">
            <Dropdown class="nav-button" :items="languages" :selected="setting.currentLanguage" @select="select"></Dropdown>
            <div class="nav-button" @click="setting.toggleDarkMode()">
                <span class="material-symbols-outlined">{{ setting.isDarkMode ? "dark_mode" : "light_mode" }}</span>
                <Toggle :is-active="setting.isDarkMode"></Toggle>
            </div>
        </div>
    </div>
    <div id="nav-mobile" :class="{ 'nav-list-open': isOpen }">
        <div class="nav-button" @click="isOpen = !isOpen"><span class="material-symbols-outlined">menu</span></div>
        <div class="nav-text">Code Converter</div>
        <transition>
            <div v-if="isOpen" @mouseleave="isOpen = false">
                <router-link class="nav-list-item" v-for="(item, index) in paths" :to="item" @click="isOpen = false">{{ labels[index] }}</router-link>
                <Dropdown class="nav-list-item" :items="languages" :id="0" :selected="setting.currentLanguage" @select="select"></Dropdown>
                <div class="nav-list-item" @click="setting.toggleDarkMode()">
                    <div>{{ setting.isDarkMode ? texts.navbar.darkmode : texts.navbar.lightmode }}</div>
                    <div id="nav-list-right">
                        <span class="material-symbols-outlined">{{ setting.isDarkMode ? "dark_mode" : "light_mode" }}</span>
                        <Toggle :is-active="setting.isDarkMode"></Toggle>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Toggle from './Toggle.vue'
import Dropdown from './Dropdown.vue'
import { useSettingStore } from '../stores/SettingStore'

export default {
    data: () => ({
        setting: useSettingStore(),
        languages: ['ENGLISH', '한국어'],
        isOpen: false,
        paths: ['/', '/convert', '/detect', '/hash']
    }),
    components: {
        Toggle, Dropdown
    },
    computed: {
        texts() { return this.setting.getTexts },
        labels() {
            return [
                this.texts.navbar.home,
                this.texts.navbar.convert,
                this.texts.navbar.detect,
                this.texts.navbar.hash,
            ]
        }
    },
    methods: {
        select(index: number) { this.setting.currentLanguage = index }
    },
    mounted() {
        this.setting.loadSetting()
        onbeforeunload = () => this.setting.saveSetting()
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

.nav-button {
    @include nav-buttons(fit-content, 48px, 12px);
    &:hover { background-color: var(--background-color-hover); }
}

.nav-text { 
    @include nav-buttons(fit-content, 48px, 12px);
    font-weight: bold;
}

#nav-container {
    @include navbar;
    visibility: visible;
    flex-direction: row;
    gap: 4px;

    #nav-right-side { @include nav-right(0px); }
    .nav-button { gap: 8px; }
}

#nav-mobile { 
    @include navbar;
    visibility: hidden;

    &.nav-list-open { box-shadow: none; }

    >:nth-child(3) {
        position: absolute;
        top: 48px;
        width: 100%;
        z-index: 99;
        background-color: var(--background-color-navbar);
        box-shadow: 0px 3px 5px var(--shadow-color);
        user-select: none;
        @include trans;

        #nav-list-right {
            @include nav-right(8px);
            bottom: 4px;
        }

        .nav-list-item {
            @include nav-buttons(100%, auto, 6px 8px);
            &:hover { background-color: var(--background-color-hover); }
        }
    }
}

@media (max-width: 768px) {
    #nav-container { visibility: hidden; }
    #nav-mobile { visibility: visible; }
}

.v-enter-active, .v-leave-active { transition: opacity 0.2s ease-out; }
.v-enter-from, .v-leave-to { opacity: 0; }
</style>
