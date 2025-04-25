<template>
  <div class="relative flex flex-col justify-between h-screen w-screen text-white bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${courtBg})` }">
    <!-- 🏀 Floating Basketball -->
    <img :src="bball" alt="Floating Ball" class="w-[40px] h-[40px] object-contain z-10 animate-bounce-dvd" />
    <img :src="shai" alt="Shai" class="player-face object-contain z-10 animate-chaotic-1" />
    <img :src="luka" alt="Luka" class="player-face object-contain z-10 animate-chaotic-2" />
    <img :src="durant" alt="Durant" class="player-face object-contain z-10 animate-chaotic-3" />
    <img :src="ja" alt="Ja" class="player-face object-contain z-10 animate-chaotic-4" />
    <img :src="caruso" alt="Caruso" class="player-face object-contain z-10 animate-chaotic-5" />
    <img :src="jokic" alt="Jokic" class="player-face object-contain z-10 animate-chaotic-6" />
    <img :src="steph" alt="Steph" class="player-face object-contain z-10 animate-chaotic-7" />
    <img :src="lebrugh" alt="Lebrugh" class="player-face object-contain z-10 animate-chaotic-8" />
    <img :src="russ" alt="Russ" class="player-face object-contain z-10 animate-chaotic-9" />
    <img :src="jimmy" alt="Jimmy" class="player-face object-contain z-10 animate-chaotic-10" />


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
import bball from './assets/images/bball.png'
import clippy from './assets/images/courtside/clippy.png'
import drake from './assets/images/courtside/drake.png'
import riri from './assets/images/courtside/riri.png'
import mister from './assets/images/courtside/mister.png'
import sandler from './assets/images/courtside/sandler.png'
import me from './assets/images/courtside/me.png'
import shai from './assets/images/players/shai.png'
import luka from './assets/images/players/luka.png'
import durant from './assets/images/players/durant.png'
import ja from './assets/images/players/ja.png'
import caruso from './assets/images/players/caruso.png'
import jokic from './assets/images/players/jokic.png'
import steph from './assets/images/players/steph.png'
import lebrugh from './assets/images/players/lebrugh.png'
import russ from './assets/images/players/russ.png'
import jimmy from './assets/images/players/jimmy.png'

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

@keyframes bounce-chaotic-1 {
  0% {
    top: 10vh;
    left: 5vw;
  }

  25% {
    top: 20vh;
    left: 80vw;
  }

  50% {
    top: 75vh;
    left: 50vw;
  }

  75% {
    top: 30vh;
    left: 15vw;
  }

  100% {
    top: 10vh;
    left: 5vw;
  }
}

@keyframes bounce-chaotic-2 {
  0% {
    top: 15vh;
    left: 20vw;
  }

  25% {
    top: 35vh;
    left: 70vw;
  }

  50% {
    top: 60vh;
    left: 30vw;
  }

  75% {
    top: 25vh;
    left: 90vw;
  }

  100% {
    top: 15vh;
    left: 20vw;
  }
}

@keyframes bounce-chaotic-3 {
  0% {
    top: 5vh;
    left: 10vw;
  }

  25% {
    top: 60vh;
    left: 75vw;
  }

  50% {
    top: 85vh;
    left: 40vw;
  }

  75% {
    top: 30vh;
    left: 20vw;
  }

  100% {
    top: 5vh;
    left: 10vw;
  }
}

@keyframes bounce-chaotic-4 {
  0% {
    top: 18vh;
    left: 12vw;
  }

  25% {
    top: 50vh;
    left: 85vw;
  }

  50% {
    top: 65vh;
    left: 25vw;
  }

  75% {
    top: 40vh;
    left: 5vw;
  }

  100% {
    top: 18vh;
    left: 12vw;
  }
}

@keyframes bounce-chaotic-5 {
  0% {
    top: 8vh;
    left: 15vw;
  }

  25% {
    top: 70vh;
    left: 60vw;
  }

  50% {
    top: 60vh;
    left: 10vw;
  }

  75% {
    top: 20vh;
    left: 90vw;
  }

  100% {
    top: 8vh;
    left: 15vw;
  }
}

@keyframes bounce-chaotic-6 {
  0% {
    top: 12vh;
    left: 25vw;
  }

  25% {
    top: 65vh;
    left: 15vw;
  }

  50% {
    top: 45vh;
    left: 80vw;
  }

  75% {
    top: 10vh;
    left: 40vw;
  }

  100% {
    top: 12vh;
    left: 25vw;
  }
}

@keyframes bounce-chaotic-7 {
  0% {
    top: 3vh;
    left: 30vw;
  }

  25% {
    top: 45vh;
    left: 70vw;
  }

  50% {
    top: 70vh;
    left: 50vw;
  }

  75% {
    top: 25vh;
    left: 10vw;
  }

  100% {
    top: 3vh;
    left: 30vw;
  }
}

@keyframes bounce-chaotic-8 {
  0% {
    top: 6vh;
    left: 5vw;
  }

  25% {
    top: 60vh;
    left: 30vw;
  }

  50% {
    top: 78vh;
    left: 90vw;
  }

  75% {
    top: 20vh;
    left: 60vw;
  }

  100% {
    top: 6vh;
    left: 5vw;
  }
}

@keyframes bounce-chaotic-9 {
  0% {
    top: 20vh;
    left: 40vw;
  }

  25% {
    top: 75vh;
    left: 20vw;
  }

  50% {
    top: 50vh;
    left: 70vw;
  }

  75% {
    top: 35vh;
    left: 10vw;
  }

  100% {
    top: 20vh;
    left: 40vw;
  }
}

@keyframes bounce-chaotic-10 {
  0% {
    top: 14vh;
    left: 35vw;
  }

  25% {
    top: 60vh;
    left: 85vw;
  }

  50% {
    top: 80vh;
    left: 45vw;
  }

  75% {
    top: 25vh;
    left: 5vw;
  }

  100% {
    top: 14vh;
    left: 35vw;
  }
}

/* Matching utility classes */
.animate-chaotic-1 {
  animation: bounce-chaotic-1 12s linear infinite;
  position: absolute;
}

.animate-chaotic-2 {
  animation: bounce-chaotic-2 175s linear infinite;
  position: absolute;
}

.animate-chaotic-3 {
  animation: bounce-chaotic-3 12s linear infinite;
  position: absolute;
}

.animate-chaotic-4 {
  animation: bounce-chaotic-4 12s linear infinite;
  position: absolute;
}

.animate-chaotic-5 {
  animation: bounce-chaotic-5 175s linear infinite;
  position: absolute;
}

.animate-chaotic-6 {
  animation: bounce-chaotic-6 175s linear infinite;
  position: absolute;
}

.animate-chaotic-7 {
  animation: bounce-chaotic-7 12s linear infinite;
  position: absolute;
}

.animate-chaotic-8 {
  animation: bounce-chaotic-8 12s linear infinite;
  position: absolute;
}

.animate-chaotic-9 {
  animation: bounce-chaotic-9 2s linear infinite;
  position: absolute;
}

.animate-chaotic-10 {
  animation: bounce-chaotic-10 12s linear infinite;
  position: absolute;
}

.player-face {
  width: 90px;
  height: 90px;
  object-fit: contain;
  position: absolute;
  z-index: 10;
}
</style>
