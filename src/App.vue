<template>
  <div class="relative flex flex-col justify-between h-screen w-screen bg-cover bg-center bg-no-repeat select-none"
    :style="{ backgroundImage: `url(${courtBg})` }">

    <!-- Floating Ball (Clickable with Bigger Hitbox) -->
    <div class="absolute w-[65px] h-[65px] z-50 animate-bounce-dvd flex items-center justify-center"
      @click="handleBallClick">

      <img :src="bball" alt="Floating Ball" class="w-[70px] h-[70px] object-contain" :class="{ 'pop': isBallPopped }"
        draggable="false" />

      <!-- Float-Ups appear centered over the ball -->
      <div v-for="float in floatUps" :key="float.id"
        class="absolute text-pink-400 text-2xl font-bold pointer-events-none animate-float-up z-60"
        style="top: 0; left: 0; transform: translate(-50%, -50%)">
        +1
      </div>
    </div>




    <!-- Floating Players -->
    <img v-for="(player, idx) in players" :key="idx" :src="player.src" :alt="player.name" :class="player.class"
      class="player-face" />

    <header class="p-4 text-center flex flex-col items-center font-['Press_Start_2P']">
      <!-- Top Row: Stat Pills wrapper -->
      <div class="flex flex-row justify-center gap-x-10 mb-2">
        <div
          class="bg-green-600 text-gray-200 px-4 py-2 rounded-full border-2 border-black text-base font-bold text-center">
          Money: ${{ game.money }}
        </div>
        <div
          class="bg-blue-600 text-gray-200 px-4 py-2 rounded-full border-2 border-black text-base font-bold text-center">
          Hype: {{ game.hype }}
        </div>
        <div
          class="bg-red-600 text-gray-200 px-4 py-2 rounded-full border-2 border-black text-base font-bold text-center">
          Regret: {{ game.regret }}
        </div>
      </div>

      <!-- Combined Quarter/Time + Score Pill -->
      <div class="flex flex-row justify-center gap-x-32 text-lg mb-5">
        <div
          class="bg-purple-600 text-gray-200 px-10 py-3 rounded-full border-2 border-black text-xl font-bold flex items-center justify-center gap-x-8 scale-[0.85]">

          <!-- Left Stack: Quarter + Time -->
          <div class="flex flex-col items-start leading-snug">
            <span> Q: {{ game.quarter }}</span>
            <span class="text-base"> Time: {{ game.time }}s</span>
          </div>

          <!-- Divider Line -->
          <div class="w-[2px] h-[40px] bg-black opacity-40 rounded-sm"></div>

          <!-- Right Stack: You vs Them -->
          <div class="flex flex-col items-start leading-snug">
            <span> You: {{ game.userScore }}</span>
            <span class="text-base">Them: {{ game.themScore }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 🏟️ Court (Floating Buttons / Overlays) -->
    <main class="relative w-full h-full overflow-hidden">
      <div v-if="showChantOverlay"
        class="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded shadow-lg text-xl font-bold animate-bounce z-50">
        🔥 FIRE NICO!! The crowd is losing it!
      </div>

      <div v-if="showQuarterOver"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-8 py-4 rounded shadow-lg text-3xl font-bold z-50">
        Quarter Over!
      </div>

      <div v-if="showGameOver"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-4 rounded shadow-lg text-4xl font-bold z-50">
        GAME OVER
      </div>

      <div v-if="showLukaMessage"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-4 rounded shadow-lg text-3xl font-bold z-50 text-center max-w-[80%] leading-snug">
        Luka traded at halftime!<br />
        Riots ensue across Texas.<br />
        Your regret increases.
      </div>

      <div v-for="(event, index) in activeButtons" :key="event.id" class="absolute animate-float-chaotic z-40"
        :style="{ top: event.top + '%', left: event.left + '%' }">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition m-2"
          @click="handleButtonClick(event)">
          {{ event.label }}
        </button>
      </div>
    </main>

    <!-- 👑 Courtside Celebs -->
    <div class="absolute bottom-[1%] left-1/2 transform -translate-x-1/2 flex justify-center gap-x-3 z-30 w-[720px]">
      <img :src="riri" alt="Rihanna" class="w-[89px] h-auto object-contain animate-bounce-gently" />
      <img :src="sandler" alt="Sandler" class="w-[47px] h-auto object-contain animate-bounce-gently" />
      <img :src="drake" alt="Drake" class="w-[57px] h-auto object-contain animate-bounce-gently" />
      <img :src="mister" alt="Mister" class="w-[35px] h-auto object-contain animate-bounce-gently" />
      <img :src="spike" alt="Spike" class="w-[111px] h-auto object-contain animate-bounce-gently" />
      <img :src="leo" alt="Leo" class="w-[70px] h-auto object-contain animate-bounce-gently" />
      <img :src="kimk" alt="Kim Kardashian" class="w-[130px] h-auto object-contain animate-bounce-gently" />
      <img :src="brad" alt="Brad Pitt" class="w-[70px] h-auto object-contain animate-bounce-gently" />
      <img :src="keanu" alt="Keanu Reeves" class="w-[100px] h-auto object-contain animate-bounce-gently" />
      <img :src="gosling" alt="Ryan Gosling" class="w-[70px] h-auto object-contain animate-bounce-gently" />
      <img :src="trav" alt="Travis Scott" class="w-[99px] h-auto object-contain animate-bounce-gently" />
      <img :src="clippy" alt="Clippy" class="w-[80px] h-auto object-contain animate-bounce-gently" />
      <img :src="bey" alt="Beyonce" class="w-[101px] h-auto object-contain animate-bounce-gently" />
      <img :src="buggy" alt="Buggy" class="w-[80px] h-auto object-contain animate-bounce-gently" />
    </div>

    <footer class="p-4 text-center">
      <!-- Optional Row here -->
    </footer>
  </div>
</template>



<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from './stores/game'
import { buttonEvents } from './data/buttonEvents'

// Background + Assets
import courtBg from './assets/images/court-bg.png'
import bball from './assets/images/bball.png'

// Players
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

// Celebs
import clippy from './assets/images/courtside/clippy.png'
import drake from './assets/images/courtside/drake.png'
import riri from './assets/images/courtside/riri.png'
import sandler from './assets/images/courtside/sandler.png'
import mister from './assets/images/courtside/mister.png'
import spike from './assets/images/courtside/spike.png'
import leo from './assets/images/courtside/leo.png'
import kimk from './assets/images/courtside/kimk.png'
import brad from './assets/images/courtside/brad.png'
import keanu from './assets/images/courtside/keanu.png'
import gosling from './assets/images/courtside/gosling.png'
import trav from './assets/images/courtside/trav.png'
import bey from './assets/images/courtside/bey.png'
import buggy from './assets/images/courtside/buggy.png'

const game = useGameStore()
const showChantOverlay = ref(false)
const activeButtons = ref([])
const showQuarterOver = ref(false)
const showGameOver = ref(false)
const showLukaMessage = ref(false)
const floatUps = ref([])
const isBallPopped = ref(false)

// Players animation data
const players = [
  { src: shai, name: 'Shai', class: 'animate-chaotic-1' },
  { src: luka, name: 'Luka', class: 'animate-chaotic-2' },
  { src: durant, name: 'Durant', class: 'animate-chaotic-3' },
  { src: ja, name: 'Ja', class: 'animate-chaotic-4' },
  { src: caruso, name: 'Caruso', class: 'animate-chaotic-5' },
  { src: jokic, name: 'Jokic', class: 'animate-chaotic-6' },
  { src: steph, name: 'Steph', class: 'animate-chaotic-7' },
  { src: lebrugh, name: 'LeBrugh', class: 'animate-chaotic-8' },
  { src: russ, name: 'Russ', class: 'animate-chaotic-9' },
  { src: jimmy, name: 'Jimmy', class: 'animate-chaotic-10' },
]

onMounted(() => {
  game.time = 15

  const gameInterval = setInterval(() => {
    if (game.time > 0) {
      game.time--
    } else {
      if (game.quarter < 4) {
        game.advanceQuarter()
        game.time = 15
        showQuarterOver.value = true

        if (game.quarter === 3 && !game.lukaTraded) {
          game.lukaTraded = true
          game.addRegret(20)
          showLukaMessage.value = true
          showQuarterOver.value = false
          setTimeout(() => {
            showLukaMessage.value = false
          }, 5000)
        }

        setTimeout(() => {
          showQuarterOver.value = false
        }, 2000)
      } else {
        showGameOver.value = true
      }
    }

    if (game.hype > 75) {
      game.increaseUserScore(1)
    }

    if (game.hype < 20) {
      game.increaseThemScore(1)
    }
  }, 1000)

  const buttonInterval = setInterval(() => {
    spawnRandomButton()
  }, 3000)

  onUnmounted(() => {
    clearInterval(gameInterval)
    clearInterval(buttonInterval)
  })
})

function spawnRandomButton() {
  const randomIndex = Math.floor(Math.random() * buttonEvents.length)
  const randomEvent = buttonEvents[randomIndex]

  // 🛑 Block Rage Chant!! if Luka hasn't been traded yet
  if (randomEvent.label === "Rage Chant!!" && !game.lukaTraded) {
    return
  }

  const id = Date.now() + Math.random()

  activeButtons.value.push({
    id,
    ...randomEvent,
    top: Math.random() * 60 + 10,
    left: Math.random() * 80 + 10,
  })

  setTimeout(() => {
    activeButtons.value = activeButtons.value.filter(btn => btn.id !== id)
  }, 4000)
}

function handleButtonClick(event) {
  if (event.cost) {
    game.spendMoney(event.cost)
  }

  const roll = Math.random()
  let cumulativeChance = 0

  for (const outcome of event.outcomes) {
    cumulativeChance += outcome.chance
    if (roll <= cumulativeChance) {
      if (outcome.effect.hype) {
        game.increaseHype(outcome.effect.hype)
      }
      if (outcome.effect.regret) {
        game.addRegret(outcome.effect.regret)
      }
      break
    }
  }

  activeButtons.value = activeButtons.value.filter(btn => btn.id !== event.id)
}

function handleBallClick() {
  game.increaseUserScore(1)

  // Pop animation reset
  isBallPopped.value = false
  requestAnimationFrame(() => {
    isBallPopped.value = true
    setTimeout(() => {
      isBallPopped.value = false
    }, 150)
  })

  // 🎈 Spawn a +1 float-up (no mouse coords needed)
  const id = Date.now() + Math.random()
  floatUps.value.push({ id })

  // Remove after 600ms
  setTimeout(() => {
    floatUps.value = floatUps.value.filter(f => f.id !== id)
  }, 600)
}


</script>




<style scoped>
/* 🏀 Floating chaotic drift for buttons */
@keyframes float-chaotic {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(10px, -5px);
  }

  50% {
    transform: translate(-8px, 6px);
  }

  75% {
    transform: translate(5px, -10px);
  }

  100% {
    transform: translate(0, 0);
  }
}

.animate-float-chaotic {
  animation: float-chaotic 6s ease-in-out infinite;
}

/* 🏀 Bouncing Celebs */
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

/* 🏀 Floating Basketball */
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

.animate-bounce-dvd {
  animation: bounce-chaotic 51s linear infinite;
  position: absolute;
}

.pop {
  transform: scale(1.15);
  transition: transform 45ms ease;
}


/* 🏀 Floating NBA Players (chaotic) */
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
    top: 10vh;
    left: 10vw;
  }

  25% {
    top: 60vh;
    left: 75vw;
  }

  50% {
    top: 70vh;
    left: 40vw;
  }

  75% {
    top: 30vh;
    left: 20vw;
  }

  100% {
    top: 11vh;
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
    top: 14vh;
    left: 15vw;
  }

  25% {
    top: 70vh;
    left: 60vw;
  }

  50% {
    top: 71vh;
    left: 10vw;
  }

  75% {
    top: 20vh;
    left: 90vw;
  }

  100% {
    top: 11vh;
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
    top: 70vh;
    left: 80vw;
  }

  75% {
    top: 12vh;
    left: 40vw;
  }

  100% {
    top: 15vh;
    left: 25vw;
  }
}

@keyframes bounce-chaotic-7 {
  0% {
    top: 14vh;
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
    top: 12vh;
    left: 30vw;
  }
}

@keyframes bounce-chaotic-8 {
  0% {
    top: 12vh;
    left: 5vw;
  }

  25% {
    top: 60vh;
    left: 30vw;
  }

  50% {
    top: 70vh;
    left: 90vw;
  }

  75% {
    top: 20vh;
    left: 60vw;
  }

  100% {
    top: 19vh;
    left: 5vw;
  }
}

@keyframes bounce-chaotic-9 {
  0% {
    top: 20vh;
    left: 40vw;
  }

  25% {
    top: 71vh;
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
    top: 70vh;
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
  animation: bounce-chaotic-9 3s linear infinite;
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

/* This selector disables image/text drag globally within this component */
* {
  -webkit-user-drag: none;
  user-drag: none;
}

@keyframes float-up {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -100px) scale(1.1);
  }
}

.animate-float-up {
  animation: float-up 0.6s ease-out forwards;
}
</style>
