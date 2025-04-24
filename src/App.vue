<template>
  <div class="flex flex-col justify-between h-screen w-screen bg-neutral-900 text-white">

    <!-- 🏀 TOP: Game Stats -->
    <header class="p-4 text-center">
      <h2 class="text-2xl font-bold">Quarter: {{ game.quarter }}</h2>
      <h2 class="text-xl">Time: {{ game.time }} sec</h2>
      <h2 class="text-2xl font-bold">Money: {{ game.money }}</h2>
      <h2 class="text-2xl font-bold">Hype Level: {{ game.hype }}</h2>
      <h2 class="text-xl">Regret: {{ game.regret }}</h2>

      <h2 :class="['text-xl font-bold', scoreClass]">
        {{ scoreStatus }}
      </h2>


      <!-- 🚨 Special event message (Luka trade) -->
      <h3 class="text-md text-red-400" v-if="game.lukaTraded">
        Luka traded at halftime! Riots ensue across Texas and your regret increases.
      </h3>
    </header>

    <!-- 🏟️ MIDDLE: Court Area with floating actions + buttons -->
    <main class="flex-1 flex items-center justify-center relative">

      <!-- 🔥 Chant Overlay Message -->
      <div v-if="showChantOverlay"
        class="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded shadow-lg text-xl font-bold animate-bounce z-50">
        🔥 FIRE NICO!! The crowd is losing it!
      </div>

      <!-- 🎯 Core Interaction Buttons -->
      <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition m-2"
        @click="game.increaseHype(10)">
        Hype Me Up!
      </button>

      <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition m-2"
        @click="game.spendMoney(5)">
        Spend Money
      </button>

      <!-- 🔊 Available in Q3+ -->
      <button v-if="game.quarter >= 3"
        class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition m-2" @click="
          game.increaseHype(15);
        showChantOverlay = true;
        setTimeout(() => showChantOverlay = false, 2000);
        ">
        Chant "FIRE NICO"
      </button>

      <!-- 📸 Take Selfie: Regret Relief -->
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition m-2"
        @click="game.decreaseRegret(10)">
        Take Selfie 📸
      </button>

      <!-- 🌭 Hot Dog: Slightly Regretful Purchase -->
      <button class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition m-2" @click="
        game.spendMoney(10);
      game.decreaseHype(5);
      game.addRegret(2);
      ">
        Buy Hot Dog 🌭
      </button>

      <!-- 👕 Luka Jersey (Q1+Q2 only): Hype Boost + Regret Relief -->
      <button v-if="game.quarter < 3"
        class="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition m-2" @click="
          game.spendMoney(20);
        game.decreaseRegret(20);
        game.increaseHype(5);
        ">
        Buy Luka Jersey 💔
      </button>
    </main>

    <!-- 🪑 BOTTOM: Reserved for future use -->
    <footer class="p-4 text-center">
      <!-- Optional debug/stats area -->
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from './stores/game'
import { computed } from 'vue'

const game = useGameStore()
const showChantOverlay = ref(false)

const scoreStatus = computed(() => {
  if (game.scoreGap > 0) return `Winning by: ${Math.abs(game.scoreGap)}`
  if (game.scoreGap < 0) return `Losing by: ${Math.abs(game.scoreGap)}`
  return 'Tied Game'
})

const scoreClass = computed(() => {
  if (game.scoreGap > 0) return 'text-green-400'
  if (game.scoreGap < 0) return 'text-red-400'
  return 'text-yellow-300'
})


onMounted(() => {
  const interval = setInterval(() => {
    // ⏱️ Tick game time
    game.time++

    // ⏩ Advance quarter every 15 seconds
    if (game.time % 15 === 0 && game.quarter < 4) {
      game.advanceQuarter()
      console.log(`Quarter ${game.quarter}`)
    }

    // 📊 ScoreGap reflects hype
    if (game.hype > 50) {
      game.updateScoreGap(1)
    } else if (game.hype < 50) {
      game.updateScoreGap(-1)
    }

    // 💔 Trigger Luka Trade once at Q3
    if (game.quarter === 3 && !game.lukaTraded) {
      game.lukaTraded = true
      game.addRegret(20)
      console.log('Luka traded at halftime! Riots ensue across Texas.')
    }
  }, 1000)

  // 🧹 Cleanup on unmount
  onUnmounted(() => clearInterval(interval))
})
</script>
