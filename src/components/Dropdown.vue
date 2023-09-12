<template>
    <div id="dropdown-button" @click="isAbove = true" @mouseleave="isAbove = false">
        <div>{{ items[selected] }}</div>
        <transition>
            <div v-if="isAbove">
                <div v-for="(item, index) in items" @click="$emit('select', index)">{{ item }}</div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        items: {
            type: Array<string>,
            required: true
        },
        selected: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        isAbove: false
    }),
    emits: ['select']
}
</script>

<style lang="scss">
#dropdown-button {
    position: relative;
    width: 100%;

    >:nth-child(2) {
        display: flex;
        position: absolute;
        flex-direction: column;
        z-index: 99;
        width: max-content;

        box-shadow: 0px 0px 10px var(--shadow-color);
        background-color: var(--background-color-navbar);
        color: var(--color);
        transition: all 0.2s ease-out;

        div {
            width: 100%;
            padding-inline: 8px;
            padding-block: 4px;
            &:hover { background-color: var(--background-color-hover); }
        }
    }
}

.v-enter-active, .v-leave-active { transition: opacity 0.2s ease-out; }
.v-enter-from, .v-leave-to { opacity: 0; }
</style>
