import { defineStore } from 'pinia'
import Language from '../scripts/Language.json'

const languages = [ Language.english, Language.korean ]

export const useSettingStore = defineStore('setting', {
    state: () => ({
        isDarkMode: false,
        currentLanguage: 0
    }),
    getters: {
        getDarkMode: (state) => ({ 'dark-mode': state.isDarkMode }),
        getTexts: (state) => (languages[state.currentLanguage])
    },
    actions: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode
        },
        saveSetting() {
            localStorage.setItem('setting', JSON.stringify({
                isDarkMode: this.isDarkMode,
                currentLanguage: this.currentLanguage
            }))
        },
        loadSetting() {
            const setting = JSON.parse(String(localStorage.getItem('setting')))
            this.isDarkMode = setting?.isDarkMode ?? false
            this.currentLanguage = setting?.currentLanguage ?? 0
        }
    }
})
