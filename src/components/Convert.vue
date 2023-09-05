<template>
    <div class="convert-container">
        <div class="convert-header">
            <Dropdown class="convert-dropdown" :items="items" :id="0" 
                :selected="indices[0]" @select="select"></Dropdown>
            <div class="convert-toggle" @click="toggleReverse()">⇄</div>
            <Dropdown class="convert-dropdown" :items="items" :id="1" 
                :selected="indices[1]" @select="select"></Dropdown>
        </div>
        <textarea class="convert-input" :placeholder="texts.convert.input" 
            v-model="input"></textarea>
        <div class="convert-middle-menu">
            <div class="convert-clear" @click="clear()">{{ texts.convert.clear }}</div>
            <div class="convert-paste" @click="paste()">{{ texts.convert.paste }}</div>
            <div class="convert-middle-right">
                <div class="convert-copy" @click="copy()">{{ texts.convert.copy }}</div>
                <div class="convert-save" @click="save()">{{ texts.convert.save }}</div>
            </div>
        </div>
        <textarea class="convert-input" :placeholder="texts.convert.output" 
            readonly v-model="output"></textarea>
    </div>
</template>

<script lang="ts">
import Toggle from './Toggle.vue';
import Dropdown from './Dropdown.vue';
import { useSettingStore } from '../stores/SettingStore';
import { convert } from '../scripts/Convert'

export default {
    data: () => ({
        input: "",
        output: "",
        reverse: false,

        items: ['UTF-8 String', 'UTF-16 String', 'Code Units', 'Base64'],
        indices: [0, 1],

        setting: useSettingStore()
    }),
    computed: {
        texts() {
            return this.setting.getTexts
        }
    },
    methods: {
        select(key: number, index: number) {
            this.indices[key] = index
        },
        toggleReverse() {
            this.input = this.output;
            [this.indices[0], this.indices[1]] = [this.indices[1], this.indices[0]];
        },
        clear() {
            this.input = ""
        },
        paste() {
            navigator.clipboard.readText().then((text: string) => (this.input = text))
        },
        copy() {
            navigator.clipboard.writeText(this.output)
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
        this.output = convert(this.indices[0], this.indices[1], this.input)
        if (this.input && !this.output) {
            this.output = this.texts.convert.error
        }
    },
    components: { Toggle, Dropdown }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

.convert-container {
    display: flex;
    flex-direction: column;

    .convert-header {
        display: grid;
        grid-template-columns: 1fr 100px 1fr;
        align-items:center;

        margin-bottom: 8px;
        gap: 8px;
        font: normal 24px sans-serif;
        user-select: none;

        .convert-dropdown {
            width: 100%;
            padding: 6px 8px;
            border-radius: 4px;
            @include trans;

            &:hover {
                background-color: var(--background-color-hover);
            }
        }

        .convert-toggle {
            @include convert-buttons;
            margin: 0px;
            padding: 0px 0px 6px 0px;
            justify-content: center;
            width: 100%;
            font: normal 24px sans-serif;
        }
    }

    .convert-middle-menu {
        display: flex;
        position: relative;
        gap: 4px;

        .convert-middle-right {
            display: flex;
            position: absolute;
            right: 0;
            gap: 4px;
        }

        .convert-clear, 
        .convert-paste, 
        .convert-copy, 
        .convert-save { @include convert-buttons; }
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
