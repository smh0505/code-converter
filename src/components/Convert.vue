<template>
    <div class="convert-container">
        <div class="convert-header">{{ reverse ? "Base64 to UTF-8" : "UTF-8 to Base64" }}</div>
        <textarea class="convert-input" placeholder="Insert your text here." 
            v-model="input"></textarea>
        <div class="convert-middle-menu">
            <div class="convert-toggle" @click="toggleReverse()">
                <Toggle :is-active="reverse"></Toggle>
                <div>{{ reverse ? "Decode" : "Encode" }}</div>
            </div>
            <div class="convert-save" @click="save()">💾</div>
        </div>
        <textarea class="convert-input" placeholder="The result will be shown here." 
            @keypress.prevent v-model="output"></textarea>
    </div>
</template>

<script lang="ts">
import Toggle from './Toggle.vue';
import { encode, decode } from '../scripts/Convert';

export default {
    data: () => ({
        input: "",
        output: "",
        reverse: false
    }),
    methods: {
        toggleReverse() {
            this.reverse = !this.reverse
            const temp = this.input
            this.input = this.output
            this.output = temp
        },
        save() {
            let link = document.createElement('a')
            link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.output)
            link.download = 'output.txt'
            link.style.display = 'none'

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    },
    updated() {
        this.output = this.reverse ? decode(this.input) : encode(this.input)
    },
    components: { Toggle }
}
</script>

<style lang="scss">
@import "../styles/Transition.scss";

@mixin convert-buttons {
    display: flex;
    align-items: center;

    width: max-content;
    height: 40px;

    gap: 12px;
    padding-inline: 6px;
    margin-block: 6px;
    border-radius: 4px;

    font: bold 24px sans-serif;
    color: var(--color);

    user-select: none;
    @include trans;

    &:hover {
        background-color: var(--background-color-hover);
    }
}

.convert-container {
    display: flex;
    flex-direction: column;

    .convert-header {
        margin-bottom: 8px;
        font: bold 32px sans-serif;
        user-select: none;
    }

    .convert-middle-menu {
        display: flex;
        position: relative;

        .convert-toggle { @include convert-buttons; }

        .convert-save {
            @include convert-buttons;

            position: absolute;
            right: 0px;
        }
    }

    .convert-input {
        width: 100%;
        height: 80px;
        padding: 8px;
        border: 4px solid var(--border-color);
        border-radius: 8px;

        font: 16px "D2Coding", sans-serif;
        background-color: var(--background-color);
        color: var(--color);
        resize: none;

        @include trans;
    }
}
</style>
