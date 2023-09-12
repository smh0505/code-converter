<template>
    <div id="detect-container">
        <div id="detect-header">
            <div @click="clear()"><span class="material-symbols-outlined">delete</span></div>
            <div @click="paste()"><span class="material-symbols-outlined">content_paste</span></div>
            <input type="text" placeholder="output (.json)" v-model="filename">
            <div @click="save()" v-if="input && regex"><span class="material-symbols-outlined">save</span></div>
        </div>
        <input type="text" :placeholder="texts.detect.pattern" v-model="regex">
        <div id="detect-backlayer" ref="highlight"><div v-html="result"></div></div>
        <textarea :placeholder="texts.detect.input" v-model="input" @scroll="scroll()" ref="input"></textarea>
        <ul>
            <li v-for="text in matched()">
                <div>{{ text.text }}</div>
                <div>{{ text.index }}</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useSettingStore } from '../stores/SettingStore';
import filenamify from 'filenamify'

export default {
    data: () => ({
        regex: "",
        input: "",
        filename: "",
        setting: useSettingStore()
    }),
    computed: {
        texts() { return this.setting.getTexts },
        result() {
            try {
                const regex = new RegExp(this.regex, 'g')
                return this.input.replace(regex, x => `<span class="detect-mark">${x}</span>`)
            } catch { return this.input }
        }
    },
    methods: {
        scroll() {
            const highlight = this.$refs.highlight as HTMLDivElement
            const input = this.$refs.input as HTMLTextAreaElement
            highlight.scroll(0, input.scrollTop)
        },
        matched() {
            const match = []
            let found, index = 0

            try {
                const regex = new RegExp(this.regex, 'g')
                while (this.regex && this.input && (found = regex.exec(this.input)) !== null) {
                    match.push({ text: found[0], index: this.input.indexOf(found[0], index) })
                    if (index === regex.lastIndex) regex.lastIndex += 1
                    index = regex.lastIndex
                }
            } catch { }
            return match
        },
        clear() { this.input = "" },
        paste() { navigator.clipboard.readText().then((text: string) => (this.input = text)) },
        save() {
            const output = {
                input: this.input,
                pattern: this.regex,
                result: this.matched()
            }
            let filename = filenamify(this.filename.trim())
            if (!filename) filename = 'output.json'

            const url = URL.createObjectURL(new Blob([JSON.stringify(output, null, 4)], { type: 'application/json' }))
            const link = document.createElement('a')
            link.href = url
            link.download = filename.match(/.json$/i) ? filename : filename + '.json'

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

#detect-container {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 8px;

    #detect-header {
        display: grid;
        grid-template-columns: 40px 40px 1fr 40px;
        gap: 4px;
        
        >:nth-child(1), >:nth-child(2), >:nth-child(4) {
            @include convert-buttons;
            margin: 0px;
        }

        >:nth-child(3) { padding: 0px 8px; }
    }

    input { @include input; }

    #detect-backlayer {
        position: absolute;
        top: 98px;
        width: 100%;
        height: 120px;
        border: 4px solid transparent;
        border-radius: 8px;
        padding: 8px;

        overflow: auto;
        background-color: var(--background-color);
        @include trans;

        div {
            white-space: pre-wrap;
            word-wrap: break-word;
            color: transparent;
            font: 20px "D2Coding", sans-serif;

            span {
                background-color: var(--highlight-color);
                @include trans;
            }
        }
    }

    textarea {
        height: 120px;
        @include input;
        background-color: transparent;
        font: 20px "D2Coding", sans-serif;
        z-index: 5;
    }

    ul {
        list-style-type: none;
        user-select: none;
        
        li {
            display: flex;
            gap: 4px;
            margin-bottom: 4px;
            
            >:nth-child(1) {
                font: 20px "D2Coding", sans-serif;
                background-color: var(--highlight-color);
                color: var(--color);
                @include trans;
            }
            
            >:nth-child(2) {
                font: 12px sans-serif;
                color: var(--color);
                @include trans;
            }
        }
    }
}
</style>
