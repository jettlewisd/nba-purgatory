import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
    state: () => ({
        hype: 49,
        regret: 50,
        money: 100,
        scoreGap: 0,
        quarter: 1,
        time: 0,
        isEjected: false,
        lukaTraded: false,
        userScore: 0,
        themScore: 0,
        beerLevel: 0,
    }),

    actions: {
        increaseHype(amount) {
            this.hype = Math.min(100, Math.max(0, this.hype + amount))
        },
        decreaseHype(amount) {
            this.hype = Math.max(0, Math.min(100, this.hype - amount))
        },
        addRegret(amount) {
            this.regret = Math.min(100, Math.max(0, this.regret + amount))
        },
        decreaseRegret(amount) {
            this.regret = Math.max(0, Math.min(100, this.regret - amount))
        },
        spendMoney(amount) {
            this.money -= amount
        },
        advanceQuarter() {
            this.quarter++
        },
        updateScoreGap(amount) {
            this.scoreGap += amount
        },
        increaseUserScore(points) {
            this.userScore += points
        },
        increaseThemScore(points) {
            this.themScore += points
        },
        unlockNextBeer() {
            this.beerLevel++
        }
    }
})
