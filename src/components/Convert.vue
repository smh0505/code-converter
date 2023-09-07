<template>
    <div class="convert-container">
        <div class="convert-header">
            <Dropdown class="convert-dropdown" :items="items" :id="0" 
                :selected="indices[0]" @select="select"></Dropdown>
            <div class="convert-toggle" @click="toggleReverse()">
                <span class="material-symbols-outlined">sync_alt</span>
            </div>
            <Dropdown class="convert-dropdown" :items="items" :id="1" 
                :selected="indices[1]" @select="select"></Dropdown>
        </div>
        <textarea class="convert-input" :placeholder="texts.convert.input" 
            v-model="input"></textarea>
        <div class="convert-middle-menu">
            <div class="convert-clear" @click="clear()">
                <span class="material-symbols-outlined">delete</span>
            </div>
            <div class="convert-paste" @click="paste()">
                <span class="material-symbols-outlined">content_paste</span>
            </div>
            <div class="convert-middle-right">
                <div class="convert-copy" @click="copy()">
                    <span class="material-symbols-outlined">folder_copy</span>
                </div>
                <div class="convert-save" @click="save()">
                    <span class="material-symbols-outlined">save</span>
                </div>
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
        reverse: false,

        items: ['UTF-8 String', 'UTF-16 String', 'Code Units', 'Base64'],
        indices: [0, 1],

        setting: useSettingStore()
    }),
    computed: {
        texts() {
            return this.setting.getTexts
        },
        output() {
            if (!this.input) return ""
            let output = convert(this.indices[0], this.indices[1], this.input)
            if (!output) output = this.texts.convert.error
            return output
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
        grid-template-columns: 1fr 40px 1fr;
        align-items:center;

        margin-bottom: 8px;
        gap: 8px;
        font: normal 24px sans-serif;
        user-select: none;

        .convert-dropdown {
            width: 100%;
            padding: 6px 8px;
            border-radius: 4px;
            color: var(--color);
            @include trans;

            &:hover {
                background-color: var(--background-color-hover);
            }
        }

        .convert-toggle {
            @include convert-buttons;
            margin: 0px;
            justify-content: center;
            width: 100%;
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
