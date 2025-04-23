import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
    state: () => ({
        hype: 50,
        regret: 0,
        money: 100,
        scoreGap: 0,
        quarter: 1,
        time: 0,
        isEjected: false,
    }),

    actions: {
        increaseHype(amount) {
            this.hype += amount
        },
        decreaseHype(amount) {
            this.hype = Math.max(0, this.hype - amount)
        },
        addRegret(amount) {
            this.regret += amount
        },
        spendMoney(amount) {
            this.money = Math.max(0, this.money - amount)
        },
        updateScoreGap(diff) {
            this.scoreGap += diff
        },
    }
})