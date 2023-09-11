<template>
    <div class="hash-container">
        <textarea v-model="input" :placeholder="texts.hash.input"></textarea>
        <div class="hash-output" v-for="(item, index) in types" :key="index">
            <div>{{ item }}</div>
            <input type="text" readonly v-model="output[index]"
                :placeholder="texts.hash.output.replace('?', item)">
            <div @click="copy(index)"><span class="material-symbols-outlined">folder_copy</span></div>
            <div @click="save(index)"><span class="material-symbols-outlined">save</span></div>
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
        texts() {
            return this.setting.getTexts
        },
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
        copy(index: number) {
            navigator.clipboard.writeText(this.output[index])
        },
        save(index: number) {
            let link = document.createElement('a')
            link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.output[index])
            link.download = 'output.txt'
            link.style.display = 'none'

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

.hash-container {
    display: flex;
    flex-direction: column;
    gap: 8px;

    textarea {
        @include input;
        height: 120px;
    }

    .hash-output {
        display: grid;
        grid-template-columns: 70px 1fr 40px 40px;
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

        >:nth-child(3), >:nth-child(4) {
            @include convert-buttons; 
            justify-content: center;
            height: 100%;
            margin: 0px;
            padding-inline: 8px;
        }
    }
}
</style>
