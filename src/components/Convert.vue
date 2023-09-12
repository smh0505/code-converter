<template>
    <div id="convert-container">
        <div id="convert-header">
            <Dropdown :items="items" :selected="index1" @select="select1"></Dropdown>
            <div @click="toggleReverse()"><span class="material-symbols-outlined">sync_alt</span></div>
            <Dropdown :items="items" :selected="index2" @select="select2"></Dropdown>
        </div>
        <textarea :placeholder="texts.convert.input" v-model="input"></textarea>
        <div id="convert-middle-menu">
            <div @click="clear()"><span class="material-symbols-outlined">delete</span></div>
            <div @click="paste()"><span class="material-symbols-outlined">content_paste</span></div>
            <div id="convert-middle-right">
                <div @click="copy()"><span class="material-symbols-outlined">folder_copy</span></div>
                <div @click="save()"><span class="material-symbols-outlined">save</span></div>
            </div>
        </div>
        <textarea :placeholder="texts.convert.output" v-model="output" readonly></textarea>
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
        items: ['UTF-8 String', 'UTF-16 String', 'Code Units', 'Base64'],
        index1: 0,
        index2: 1,
        setting: useSettingStore()
    }),
    computed: {
        texts() { return this.setting.getTexts },
        output() {
            if (!this.input) return ""
            let output = convert(this.index1, this.index2, this.input)
            if (!output || output.trim().length === 0) output = this.texts.convert.error
            return output
        }
    },
    methods: {
        // Dropdowns
        select1(index: number) { this.index1 = index },
        select2(index: number) { this.index2 = index },
        toggleReverse() {
            this.input = this.output;
            [this.index1, this.index2] = [this.index2, this.index1];
        },
        // Middle menu buttons
        clear() { this.input = "" },
        paste() { navigator.clipboard.readText().then((text: string) => (this.input = text)) },
        copy() { navigator.clipboard.writeText(this.output) },
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

@mixin button-groups($position) {
    display: flex;
    position: $position;
    gap: 4px;
    >:nth-child(1), >:nth-child(2) { @include convert-buttons; }
}

#convert-container {
    display: flex;
    flex-direction: column;

    #convert-header {
        display: grid;
        grid-template-columns: 1fr 40px 1fr;
        align-items:center;

        margin-bottom: 8px;
        gap: 8px;
        font: normal 24px sans-serif;
        user-select: none;

        >:nth-child(1), >:nth-child(3) {
            width: 100%;
            padding: 6px 8px;
            border-radius: 4px;
            color: var(--color);
            @include trans;

            &:hover { background-color: var(--background-color-hover); }
        }

        >:nth-child(2) {
            @include convert-buttons;
            margin: 0px;
            justify-content: center;
            width: 100%;
        }
    }

    #convert-middle-menu {
        @include button-groups(relative);

        #convert-middle-right {
            @include button-groups(absolute);
            right: 0px;
        }
    }

    textarea {
        width: 100%;
        height: 80px;
        @include input;
    }
}
</style>
