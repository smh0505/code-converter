<template>
    <div class="background" :class="setting.getDarkMode">
        <Navbar></Navbar>
        <div class="foreground">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from './components/Navbar.vue'
import { useSettingStore } from './stores/SettingStore'

export default {
    data: () => ({
        setting: useSettingStore()
    }),
    components: {
        Navbar
    },
}
</script>

<style lang="scss">
@import "./styles/style.scss";

.background {
    position: absolute; 
    width: 100vw;
    height: 100vh;

    background-color: var(--background-color);
    color: var(--color);

    transition-property: color, background;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
}

.foreground {
    margin-inline: auto;
    margin-top: 72px;
    margin-bottom: 24px;

    padding: 16px;
    
    max-width: 960px;
    height: calc(100vh - 96px);
    overflow: auto;
    
    border: 4px solid var(--border-color);
    border-radius: 16px;
}

@media screen and (max-width: 1008px) {
    .foreground {
        margin-inline: 24px;
    }
}
</style>
