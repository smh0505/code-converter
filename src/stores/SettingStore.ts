import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        isDarkMode: false
    }),
    getters: {
        getDarkMode: (state) => ({ 'dark-mode': state.isDarkMode })
    },
    actions: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode
        },

        saveSetting() {
            localStorage.setItem('setting', JSON.stringify({
                isDarkMode: this.isDarkMode
            }))
        },
        loadSetting() {
            const setting = JSON.parse(String(localStorage.getItem('setting')))
            this.isDarkMode = setting?.isDarkMode ?? false
        }
    }
})
