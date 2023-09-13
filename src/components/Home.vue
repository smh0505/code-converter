<template>
    <div id="home-container">
        <h1>Code Converter</h1>
        <hr style="width: 100%;">
        <h1>{{ texts.home.update }}</h1>
        <div class="home-versions" v-for="(item, index) in logs">
            <div>
                <div>{{ new Date(item.date).toLocaleString(locale[setting.currentLanguage]) }}</div> 
                <a :href="redirect(index)">({{ item.version.substring(0, 7) }})</a>
                <a :href="showDiff(index)">{{ texts.home.showDiff }}</a>
            </div>
            <div>{{ item.comment }}</div>
            <div v-html="profile(index)"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { useSettingStore } from '../stores/SettingStore'

export default {
    data: () => ({
        logs: [] as any[],
        locale: ['en-US', 'ko-KR'],
        setting: useSettingStore()
    }),
    computed: {
        texts() { return this.setting.getTexts }
    },
    methods: {
        redirect(index: number) {
            return index === 0
                ? 'https://github.com/smh0505/code-converter'
                : 'https://github.com/smh0505/code-converter/tree/' + this.logs[index].version
        },
        showDiff(index: number) {
            return 'https://github.com/smh0505/code-converter/commit/' + this.logs[index].version
        },
        profile(index: number) {
            return this.texts.home.committer.replace('?',
                `<a href='https://github.com/${this.logs[index].committer}'>${this.logs[index].committer}</a>`)
        }
    },
    async mounted() {
        await fetch("https://api.github.com/repos/smh0505/code-converter/commits")
            .then(res => res.json())
            .then(json => json.slice(0, 5))
            .then(arr => arr = arr.map((x: any) => ({
                date: x.commit.committer.date,
                committer: x.commit.committer.name,
                comment: x.commit.message,
                version: x.sha
            })))
            .then(arr => this.logs = arr)
    }
}
</script>

<style lang="scss">
@import '../styles/style.scss';

#home-container {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;

    hr {
        width: 100%;
        margin-block: 16px;
    }

    .home-versions {
        width: 100%;
        margin-top: 16px;

        >:nth-child(1) {
            display: flex;
            gap: 12px;
        }

        >:nth-child(2) { font: 24px "D2Coding", sans-serif; }

        a {
            color: var(--color);
            @include trans;
        }
    }
}
</style>
