<template>
    <div class="hash-container">
        <textarea></textarea>
        <div class="hash-output" v-for="(item, index) in types" :key="index">
            <div>{{ item }}</div>
            <input type="text" readonly v-model="outputs[index]">
            <div><span class="material-symbols-outlined">folder_copy</span></div>
            <div><span class="material-symbols-outlined">save</span></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data: () => ({
        types: ['MD5', 'SHA-1', 'SHA-256', 'SHA-512', 'SHA-3'],
        outputs: ['', '', '', '', '']
    }),
    methods: {
        copy(index: number) {
            navigator.clipboard.writeText(this.outputs[index])
        },
        save(index: number) {
            let link = document.createElement('a')
            link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.outputs[index])
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
        grid-template-columns: 80px 1fr 40px 40px;
        height: 32px;
        gap: 8px;

        * {
            display: flex;
            align-items: center;
        }

        >:nth-child(3), >:nth-child(4) { justify-content: center; }
    }
}
</style>
