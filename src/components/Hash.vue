<template>
    <div id="hash-container">
        <div id="hash-header">
            <div @click="clear()"><span class="material-symbols-outlined">delete</span></div>
            <div @click="paste()"><span class="material-symbols-outlined">content_paste</span></div>
        </div>
        <textarea v-model="input" :placeholder="texts.hash.input"></textarea>
        <div id="hash-output" v-for="(item, index) in types" :key="index">
            <div>{{ item }}</div>
            <input type="text" readonly v-model="output[index]" :placeholder="texts.hash.output.replace('?', item)">
            <div @click="copy(index)"><span class="material-symbols-outlined">folder_copy</span></div>
        </div>
    </div>
</template>

<script lang="ts">
import { MD5, SHA1, SHA256, SHA512, SHA3 } from 'crypto-js'
import { useSettingStore } from '../stores/SettingStore'

export default {
    data: () => ({
        types: ['MD5', 'SHA-1', 'SHA-256', 'SHA-512', 'SHA-3'],
        input: "",
        setting: useSettingStore()
    }),
    computed: {
        texts() { return this.setting.getTexts },
        output() {
            return this.input ? [
                MD5(this.input).toString(),
                SHA1(this.input).toString(),
                SHA256(this.input).toString(),
                SHA512(this.input).toString(),
                SHA3(this.input).toString(),
            ] : ['', '', '', '', '']
        }
    },
    methods: {
        clear() { this.input = "" },
        paste() { navigator.clipboard.readText().then((text: string) => (this.input = text)) },
        copy(index: number) { navigator.clipboard.writeText(this.output[index]) }
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

#hash-container {
    display: flex;
    flex-direction: column;
    gap: 8px;

    #hash-header {
        display: flex;
        gap: 4px;

        div {
            @include convert-buttons;
            height: 32px;
            margin: 0px;
        }
    }

    textarea {
        @include input;
        height: 120px;
    }

    #hash-output {
        display: grid;
        grid-template-columns: 70px 1fr 40px;
        height: 32px;
        gap: 4px;

        * {
            display: flex;
            align-items: center;
            height: 32px;
        }

        >:nth-child(2) { 
            @include input;
            padding-block: 4px;
        }

        >:nth-child(3) {
            @include convert-buttons; 
            height: 100%;
            margin: 0px;
            padding-inline: 8px;
        }
    }
}
</style>
