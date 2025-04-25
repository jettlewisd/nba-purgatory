<template>
  <div class="relative flex flex-col justify-between h-screen w-screen text-white bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${courtBg})` }">
    <!-- 🏀 Floating Basketball -->
    <img :src="ball" alt="Floating Ball" class="w-[40px] h-[40px] object-contain z-10 animate-bounce-dvd" />

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

      <h3 class="text-md text-red-400" v-if="game.lukaTraded">
        Luka traded at halftime! Riots ensue across Texas and your regret increases.
      </h3>
    </header>

    <!-- 🏟️ MIDDLE: Court Area with floating actions + buttons -->
    <main class="relative w-full h-auto flex items-center justify-center overflow-hidden">
      <div v-if="showChantOverlay"
        class="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded shadow-lg text-xl font-bold animate-bounce z-50">
        🔥 FIRE NICO!! The crowd is losing it!
      </div>

      <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition m-2"
        @click="game.increaseHype(10)">
        Hype Me Up!
      </button>

      <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition m-2"
        @click="game.spendMoney(5)">
        Spend Money
      </button>

      <button v-if="game.quarter >= 3"
        class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition m-2" @click="
          game.increaseHype(15);
        showChantOverlay = true;
        setTimeout(() => showChantOverlay = false, 2000);
        ">
        Chant "FIRE NICO"
      </button>

      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition m-2"
        @click="game.decreaseRegret(10)">
        Take Selfie 📸
      </button>

      <button class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition m-2" @click="
        game.spendMoney(10);
      game.decreaseHype(5);
      game.addRegret(2);
      ">
        Buy Hot Dog 🌭
      </button>

      <button v-if="game.quarter < 3"
        class="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition m-2" @click="
          game.spendMoney(20);
        game.decreaseRegret(20);
        game.increaseHype(5);
        ">
        Buy Luka Jersey 💔
      </button>
    </main>

    <!-- 👑 Courtside Celebs -->
    <div class="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 flex justify-between z-30 relative w-[600px]">
      <img :src="drake" alt="Drake" class="w-[57px] h-auto object-contain animate-bounce-gently" />
      <img :src="clippy" alt="Clippy" class="w-[80px] h-auto object-contain animate-bounce-gently" />
      <img :src="riri" alt="Rihanna" class="w-[89px] h-auto object-contain animate-bounce-gently" />
      <img :src="sandler" alt="Sandler" class="w-[47px] h-auto object-contain animate-bounce-gently" />
      <img :src="me" alt="Me" class="w-[85px] h-auto object-contain animate-bounce-gently" />
      <img :src="mister" alt="Mister" class="w-[35px] h-auto object-contain animate-bounce-gently" />
    </div>


    <footer class="p-4 text-center">
      <!-- Optional debug/stats area -->
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from './stores/game'
import { computed } from 'vue'
import courtBg from './assets/images/court-bg.png'
import ball from './assets/images/bball.png'
import clippy from './assets/images/courtside/clippy.png'
import drake from './assets/images/courtside/drake.png'
import riri from './assets/images/courtside/riri.png'
import mister from './assets/images/courtside/mister.png'
import sandler from './assets/images/courtside/sandler.png'
import me from './assets/images/courtside/me.png'

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
    game.time++

    if (game.time % 15 === 0 && game.quarter < 4) {
      game.advanceQuarter()
      console.log(`Quarter ${game.quarter}`)
    }

    if (game.hype > 50) {
      game.updateScoreGap(1)
    } else if (game.hype < 50) {
      game.updateScoreGap(-1)
    }

    if (game.quarter === 3 && !game.lukaTraded) {
      game.lukaTraded = true
      game.addRegret(20)
      console.log('Luka traded at halftime! Riots ensue across Texas.')
    }
  }, 1000)

  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
@keyframes floating {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(20px, -15px);
  }

  50% {
    transform: translate(-10px, 10px);
  }

  75% {
    transform: translate(15px, -5px);
  }

  100% {
    transform: translate(0, 0);
  }
}

.animate-floating {
  animation: floating 5s ease-in-out infinite;
}

@keyframes bounce-chaotic {
  0% {
    top: 20vh;
    left: 10vw;
  }

  20% {
    top: 30vh;
    left: 85vw;
  }

  40% {
    top: 75vh;
    left: 50vw;
  }

  60% {
    top: 35vh;
    left: 20vw;
  }

  80% {
    top: 65vh;
    left: 90vw;
  }

  100% {
    top: 20vh;
    left: 10vw;
  }
}

@keyframes bounce-gently {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce-gently {
  animation: bounce-gently 2s ease-in-out infinite;
}


.animate-bounce-dvd {
  animation: bounce-chaotic 11s linear infinite;
  position: absolute;
}
</style>
