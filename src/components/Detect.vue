<template>
    <div class="detect-container">
        <input class="detect-pattern" type="text" :placeholder="texts.detect.pattern" v-model="regex">
        <div class="detect-backdrop" ref="highlight">
            <div class="detect-highlight" v-html="result"></div>
        </div>
        <textarea class="detect-input" :placeholder="texts.detect.input" 
            v-model="input" @scroll="scroll()" ref="input"></textarea>
        <ul class="detect-result">
            <li v-for="text in matched()">
                <div>{{ text.text }}</div>
                <div>{{ text.index }}</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useSettingStore } from '../stores/SettingStore';

export default {
    data: () => ({
        regex: "",
        input: "",

        setting: useSettingStore()
    }),
    computed: {
        texts() {
            return this.setting.getTexts
        },
        result() {
            const regex = new RegExp(this.regex, 'g')
            return this.input.replace(regex, x => `<span class="detect-mark">${x}</span>`)
        }
    },
    methods: {
        scroll() {
            const highlight = this.$refs.highlight as HTMLDivElement
            const input = this.$refs.input as HTMLTextAreaElement
            highlight.scroll(0, input.scrollTop)
        },
        matched() {
            const regex = new RegExp(this.regex, 'g')
            const match = []

            let found, index = 0
            while (this.regex && this.input && (found = regex.exec(this.input)) !== null) {
                match.push({ text: found[0], index: this.input.indexOf(found[0], index) })
                if (index === regex.lastIndex) regex.lastIndex += 1
                index = regex.lastIndex
            }
            return match
        }
    }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

.detect-container {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 8px;

    .detect-pattern {
        @include input;
    }

    .detect-backdrop {
        position: absolute;
        top: 50px;
        width: 100%;
        height: 120px;
        border: 4px solid transparent;
        border-radius: 8px;
        padding: 8px;

        overflow: auto;
        background-color: var(--background-color);
        @include trans;

        .detect-highlight {
            white-space: pre-wrap;
            word-wrap: break-word;
            color: transparent;
            font: 20px "D2Coding", sans-serif;

            .detect-mark {
                background-color: var(--highlight-color);
                @include trans;
            }
        }
    }

    .detect-input {
        height: 120px;
        @include input;
        background-color: transparent;
        font: 20px "D2Coding", sans-serif;
        z-index: 5;
    }

    .detect-result {
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
