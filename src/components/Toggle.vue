<template>
    <div id="toggle-bg"><div :class="{ 'toggle-active': isActive }"></div></div>
</template>

<script lang="ts">
import { useSettingStore } from '../stores/SettingStore'

export default {
    props: {
        isActive: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        setting: useSettingStore()
    }),
    computed: {
        getActive() {
            return { "toggle-active": this.isActive }
        }
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

#toggle-bg {
    display: flex;
    position: relative;
    align-items: center;
    width: 54px;
    height: 24px;

    background-color: var(--background-color-toggle);
    border-radius: 16px;
    transition: all 0.2s ease-out;

    div {
        width: 20px;
        height: 20px;
        margin: 2px;

        background-color: var(--toggle-color);
        border-radius: 10px;
        transition: all 0.2s ease-out;
        &.toggle-active { transform: translateX(30px); }
    }
}
</style>
