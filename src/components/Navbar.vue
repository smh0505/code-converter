<template>
    <div class="nav-container" ref="navbar">
        <div class="nav-text">Code Converter</div>
        <router-link class="nav-button" to="/">{{ texts.navbar.home }}</router-link>
        <router-link class="nav-button" to="/convert">{{ texts.navbar.convert }}</router-link>
        <router-link class="nav-button" to="/detect">{{ texts.navbar.detect }}</router-link>
        <div class="nav-right-side">
            <Dropdown class="nav-button" :items="languages" :id="0" :selected="setting.currentLanguage" @select="select"></Dropdown>
            <div class="nav-button" @click="setting.toggleDarkMode()">
                <span class="material-symbols-outlined">{{ setting.isDarkMode ? "dark_mode" : "light_mode" }}</span>
                <Toggle :is-active="setting.isDarkMode"></Toggle>
            </div>
        </div>
    </div>
    <div class="nav-mobile" :class="{ 'nav-list-open': isOpen }">
        <div class="nav-button" @click="isOpen = !isOpen">
            <span class="material-symbols-outlined">menu</span>
        </div>
        <div class="nav-text">Code Converter</div>
        <transition>
            <div class="nav-list" v-if="isOpen" @mouseleave="isOpen = false">
                <router-link class="nav-list-item" to="/" @click="isOpen = false">{{ texts.navbar.home }}</router-link>
                <router-link class="nav-list-item" to="/convert" @click="isOpen = false">{{ texts.navbar.convert }}</router-link>
                <router-link class="nav-list-item" to="/detect" @click="isOpen = false">{{ texts.navbar.detect }}</router-link>
                <Dropdown class="nav-list-item" :items="languages" :id="0" :selected="setting.currentLanguage" @select="select"></Dropdown>
                <div class="nav-list-item" @click="setting.toggleDarkMode()">
                    <div>{{ setting.isDarkMode ? texts.navbar.darkmode : texts.navbar.lightmode }}</div>
                    <div class="nav-list-right">
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
        isOpen: false
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

@mixin navbar {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 48px;

    background-color: var(--background-color-navbar);
    box-shadow: 0px 3px 10px var(--shadow-color);
    font-style: sans-serif;
    @include trans;
}

@mixin navButton {
    display: flex;
    width: fit-content;
    height: 48px;
    padding: 12px;
    
    color: var(--color);
    text-decoration: none;
    user-select: none;
    @include trans;
}

.nav-container {
    @include navbar;
    visibility: visible;
    flex-direction: row;
    justify-content: left;

    .nav-right-side {
        display: flex;
        position: absolute;
        right: 0;
    }

    .nav-button {
        @include navButton;
        gap: 8px;
        &:hover { background-color: var(--background-color-hover); }
    }

    .nav-text { 
        @include navButton;
        font-weight: bold;
    }
}

.nav-mobile { 
    @include navbar;
    visibility: hidden;

    &.nav-list-open { box-shadow: none; }

    .nav-button {
        @include navButton;
        &:hover { background-color: var(--background-color-hover); }
    }

    .nav-text { 
        @include navButton;
        font-weight: bold;
    }

    .nav-list {
        position: absolute;
        top: 48px;
        width: 100%;
        z-index: 99;
        background-color: var(--background-color-navbar);
        box-shadow: 0px 3px 5px var(--shadow-color);
        user-select: none;
        @include trans;

        .nav-list-right {
            display: flex;
            position: absolute;
            right: 8px;
            bottom: 4px;
            gap: 4px;
        }

        .nav-list-item {
            display: flex;
            padding: 6px 8px;
            color: var(--color);
            text-decoration: none;
            @include trans;

            &:hover {
                background-color: var(--background-color-hover);
            }
        }
    }
}

@media (max-width: 768px) {
    .nav-container {
        visibility: hidden;
    }

    .nav-mobile {
        visibility: visible;
    }
}

.v-enter-active, .v-leave-active { transition: opacity 0.2s ease-out; }
.v-enter-from, .v-leave-to { opacity: 0; }
</style>
