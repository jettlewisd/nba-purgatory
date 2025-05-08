<template>
  <div class="relative flex flex-col justify-between h-screen w-screen bg-cover bg-center bg-no-repeat select-none"
    :style="{ backgroundImage: `url(${courtBg})` }">

    <!-- Floating Ball (Clickable with Bigger Hitbox) -->
    <div class="absolute w-[65px] h-[65px] z-50 animate-bounce-dvd flex items-center justify-center"
      @click="handleBallClick">

      <img :src="bball" alt="Floating Ball" class="w-[70px] h-[70px] object-contain" :class="[
        { 'pop': isBallPopped },
        { 'turnover-flash': isTurnoverPeriod }
      ]" draggable="false" />


      <!-- Float-Ups appear centered over the ball -->
      <div v-for="float in floatUps" :key="float.id" :class="[
        'absolute text-2xl font-bold pointer-events-none animate-float-up z-60',
        float.isTurnover ? 'text-red-500' : 'text-green-600'
      ]" style="top: 0; left: 0; transform: translate(-50%, -50%)">
        {{ float.text }}
      </div>
    </div>


    <!-- Floating Players -->
    <img v-for="(player, idx) in players" :key="idx" :src="player.src" :alt="player.name" :class="player.class"
      class="player-face" />



    <header class="p-4 flex flex-col items-center font-['Press_Start_2P']">

      <!-- 🧠 REGRET METER (Flipped Direction, Solid Color Thirds) -->
      <div class="w-[80%] mx-auto mt-4 mb-3 relative">
        <p class="text-center text-sm font-bold mb-1 tracking-widest">REGRET</p>

        <!-- Regret Meter (Red vs Green with Flashing Overlay) -->
        <div class="w-full h-6 rounded-full overflow-hidden flex border-2 border-black relative">
          <!-- Red Half -->
          <div class="w-1/2 bg-red-600 relative">
            <div v-if="regretFlashColor === 'red'" class="absolute inset-0 shine-overlay"></div>
          </div>

          <!-- Green Half -->
          <div class="w-1/2 bg-green-600 relative">
            <div v-if="regretFlashColor === 'green'" class="absolute inset-0 shine-overlay"></div>
          </div>
        </div>



        <!-- ▼ Indicator (flipped: more regret = left) -->
        <div
          class="absolute top-1/2 -translate-y-1/2 text-black text-lg pointer-events-none transition-all duration-200"
          :style="{ left: `${100 - Math.min(100, Math.max(0, game.regret))}%`, transform: 'translateX(-50%)' }">
          ▼
        </div>
      </div>

      <!-- 🌀 HYPE + PILLS ROW -->
      <div class="w-[60%] mx-auto relative left-[-29px] flex items-center justify-between">

        <!-- 💰 MONEY PILL -->
        <div class="bg-purple-300 text-black px-4 py-2 rounded-full border-2 border-black text-sm font-bold">
          Money: ${{ game.money }}
        </div>

        <!-- 📈 HYPE METER -->
        <div class="flex flex-col items-center w-[60%] relative -top-[16px]">
          <p class="text-sm font-bold mb-1 tracking-widest">HYPE</p>

          <!-- Hype Meter (Red vs Green with Overlay Flashing) -->
          <div class="w-full h-4 rounded-full overflow-hidden flex border-2 border-black relative">
            <!-- Red Half -->
            <div class="w-1/2 bg-red-600 relative">
              <div v-if="hypeFlashColor === 'red'" class="absolute inset-0 shine-overlay"></div>
            </div>

            <!-- Green Half -->
            <div class="w-1/2 bg-green-600 relative">
              <div v-if="hypeFlashColor === 'green'" class="absolute inset-0 shine-overlay"></div>
            </div>

            <!-- ▼ Indicator -->
            <div
              class="absolute top-1/2 -translate-y-1/2 text-black text-sm pointer-events-none transition-all duration-200"
              :style="{ left: `${Math.min(100, Math.max(0, game.hype))}%`, transform: 'translate(-50%, -50%)' }">
              ▼
            </div>
          </div>
        </div>



        <!-- 🏀 SCORE PILL -->
        <div
          class="bg-purple-300 text-black px-4 py-2 rounded-full border-2 border-black text-sm font-bold text-center">
          You: {{ game.userScore }}<br />Them: {{ game.themScore }}
        </div>

      </div>

      <!-- ⏱️ TIME + QUARTER PILL -->
      <div
        class="-mt-5 bg-purple-300 text-black px-2 py-1.5 rounded-full border-2 border-black text-xs font-bold text-center tracking-tight max-w-fit">
        Q: {{ game.quarter }} | Time: {{ game.time }}s
      </div>

    </header>



    <!-- 🏟️ Court (Floating Buttons / Overlays) -->
    <main class="relative w-full h-full overflow-hidden">

      <div v-if="showQuarterOver"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-8 py-4 rounded shadow-lg text-3xl font-bold z-50 border-black border-4">
        Quarter Over!
      </div>

      <div v-if="isTurnoverPeriod"
        class="absolute top-[25%] inset-x-0 mx-auto w-fit bg-black text-red-500 border-4 border-white px-8 py-4 rounded-xl shadow-2xl text-4xl font-extrabold z-[9999] animate-pulse pointer-events-none mix-blend-difference tracking-widest text-center">
        LeTURNOVER‼ 😟
      </div>


      <div v-if="showGameOver"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-4 rounded shadow-lg text-4xl font-bold z-50">
        GAME OVER
      </div>

      <div v-if="showLukaMessage"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-8 py-4 rounded shadow-lg text-3xl font-bold z-50 text-center max-w-[80%] leading-snug border-black border-4">
        Luka traded at the half!!
      </div>

      <div v-for="(event, index) in activeButtons" :key="event.id" class="absolute animate-float-chaotic z-40"
        :style="{ top: event.top + '%', left: event.left + '%' }">
        <button :class="[
          'font-bold py-2 px-4 rounded transition m-2 border-2 bg-pink-500 hover:bg-pink-700 text-white border-white glow-button'
        ]" @click="handleButtonClick(event)">
          {{ event.label }}
        </button>
      </div>

      <!-- 📣 Tagline Message Stack (Top-Down Order) -->
      <div
        class="absolute bottom-[220px] right-4 w-[320px] flex flex-col items-start justify-start h-[250px] z-[9999] pointer-events-none space-y-1">
        <div v-for="(msg, index) in messages" :key="msg.id" :class="[
          'bg-white border-2 border-black px-3 py-1 rounded font-bold text-base leading-tight shadow-md',
          msg.color,
          index === 0 ? 'animate-slide-bounce-down' : ''
        ]" :style="{ opacity: 1 - (index * 0.2), fontSize: '1.25rem' }">
          {{ msg.text }}
        </div>
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


    <!-- 🎬 Start Menu Overlay -->
    <div v-if="showStartMenu"
      class="absolute inset-0 z-[99999] bg-yellow-300 bg-opacity-95 flex flex-col items-center justify-center text-center p-8 space-y-8">

      <!-- Title stays in pixel font -->
      <h1 class="text-3xl font-bold font-['Press_Start_2P']">Welcome to NBA Purgatory</h1>

      <!-- Rules: larger, bolder, spaced out -->
      <ul class="text-lg space-y-6 max-w-md font-sans font-bold text-black leading-relaxed">
        <li>
          <strong>1.</strong> Click the floating ball to score. <br />
          <span class="text-base font-normal">Bonus points if you time it right.</span>
        </li>
        <li>
          <strong>2.</strong> Keep REGRET low. Keep HYPE high. <br />
          <span class="text-base font-normal">Your vibe controls your destiny (and the scoreboard).</span>
        </li>
        <li>
          <strong>3.</strong> High HYPE = your team scores. Low HYPE = they score. <br />
          <span class="text-base font-normal">Simple math. Chaotic execution.</span>
        </li>
      </ul>

      <!-- Footer line -->
      <p class="text-lg mt-4 italic font-sans text-black font-semibold">The sum of your statsheet determines your fate.
      </p>

      <!-- Button stays goofy -->
      <button @click="showStartMenu = false; startGame()"
        class="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-700 text-white text-lg border-2 border-black rounded-full shadow-md glow-button font-['Press_Start_2P']">
        START GAME
      </button>

    </div>


  </div>
</template>



<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
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
const activeButtons = ref([])
const showQuarterOver = ref(false)
const showGameOver = ref(false)
const showLukaMessage = ref(false)
const floatUps = ref([])
const isBallPopped = ref(false)
const messages = ref([])
const isTurnoverPeriod = ref(false)
const outcomeIndexes = reactive({})
const hypeFlashColor = ref(null)
const regretFlashColor = ref(null)
const showStartMenu = ref(true)

const shownButtonsGlobal = reactive(new Set())
const beerSequencePlayed = ref(false)
const buttonSpawningPaused = ref(false)
let totalBeerButtons = 5
let beerClicks = 0

let buttonInterval = null
let gameInterval = null

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

function scheduleTurnover() {
  const delay = Math.floor(Math.random() * 20000) + 10000 // 10–30s
  setTimeout(() => {
    isTurnoverPeriod.value = true
    setTimeout(() => {
      isTurnoverPeriod.value = false
    }, 5000)
  }, delay)
}

onMounted(() => {
  onUnmounted(() => {
    clearInterval(gameInterval)
    clearInterval(buttonInterval)
  })
})


function spawnBeerSequence() {
  clearInterval(buttonInterval)
  buttonSpawningPaused.value = true

  const beerButtons = buttonEvents
    .filter(e => e.label.includes("Beer"))
    .sort((a, b) => (a.beerLevelRequired ?? 0) - (b.beerLevelRequired ?? 0))

  let currentBeerIndex = 0

  function spawnNextBeer() {
    if (currentBeerIndex >= beerButtons.length) {
      setTimeout(() => {
        buttonSpawningPaused.value = false
        buttonInterval = setInterval(spawnRandomButton, 4000)
      }, 3000)
      return
    }

    const beer = beerButtons[currentBeerIndex]
    const id = Date.now() + Math.random()

    activeButtons.value.push({
      id,
      ...beer,
      top: Math.random() * 60 + 10,
      left: Math.random() * 60 + 5
    })

    shownButtonsGlobal.add(beer.label)
    game.unlockNextBeer()

    currentBeerIndex++
  }

  function delayedSpawnNextBeer() {
    setTimeout(() => {
      spawnNextBeer()
    }, 2000)
  }

  delayedSpawnNextBeer()
  window.__spawnNextBeer = delayedSpawnNextBeer
}

function spawnRandomButton() {
  if (buttonSpawningPaused.value) return

  const eligible = buttonEvents.filter(e => {
    if (e.label.includes("Beer")) return false
    return e.beerLevelRequired === undefined || e.beerLevelRequired === game.beerLevel
  })

  const unseen = eligible.filter(e => !shownButtonsGlobal.has(e.label))

  if (unseen.length === 0) {
    shownButtonsGlobal.clear()
    return spawnRandomButton()
  }

  const randomEvent = unseen[Math.floor(Math.random() * unseen.length)]
  const id = Date.now() + Math.random()

  activeButtons.value.push({
    id,
    ...randomEvent,
    top: Math.random() * 60 + 10,
    left: Math.random() * 60 + 5
  })

  shownButtonsGlobal.add(randomEvent.label)

  setTimeout(() => {
    activeButtons.value = activeButtons.value.filter(btn => btn.id !== id)
  }, 4000)
}

const redFixedLabels = new Set([
  "Venmo Devin Booker – \"Do something\"",
  "Heckle Detroit",
  "Shoplift from the Team Shop",
])

const greenFixedLabels = new Set([
  "Blow Kiss at Kelly Oubre",
  "“LETS GO [your fav team]”",
  "Nachos?",
  "Moss a Kid for a T-Shirt",
  "Beer?",
])

function handleButtonClick(event) {
  if (event.cost) {
    game.spendMoney(event.cost)
  }

  let outcome

  if (event.outcomes.length > 1) {
    const label = event.label
    if (!(label in outcomeIndexes)) {
      outcomeIndexes[label] = 0
    }
    const index = outcomeIndexes[label]
    outcome = event.outcomes[index]
    outcomeIndexes[label] = (index + 1) % event.outcomes.length
  } else {
    const roll = Math.random()
    let cumulativeChance = 0
    for (const o of event.outcomes) {
      cumulativeChance += o.chance
      if (roll <= cumulativeChance) {
        outcome = o
        break
      }
    }
  }

  if (outcome) {
    if (outcome.effect.hype) game.increaseHype(outcome.effect.hype)
    if (outcome.effect.regret) game.addRegret(outcome.effect.regret)
    if (outcome.effect.money) game.spendMoney(-outcome.effect.money)

    let isPositive =
      (outcome.effect.hype > 0 || outcome.effect.money > 0 || outcome.effect.regret < 0)

    if (redFixedLabels.has(event.label)) {
      isPositive = false
    } else if (greenFixedLabels.has(event.label)) {
      isPositive = true
    }

    if (event.label.includes("Beer")) {
      const level = event.beerLevelRequired

      if (event.label === "Beer?") {
        isPositive = true
      } else if (event.label === "Another Beer?") {
        if (level === 1 || level === 2) {
          isPositive = true
        } else if (level === 3) {
          isPositive = false
        } else if (level === 4) {
          isPositive = (outcome.tagline === "ZZzzzzzzzz")
        }
      }
    }

    showMessage(outcome.tagline, isPositive)
  }

  if (event.label.includes("Beer") && typeof window.__spawnNextBeer === 'function') {
    window.__spawnNextBeer()
  }

  if (event.beerLevelRequired !== undefined) {
    game.unlockNextBeer()
  }

  activeButtons.value = activeButtons.value.filter(btn => btn.id !== event.id)
}

function handleBallClick() {
  const id = Date.now() + Math.random()
  const isTurnover = isTurnoverPeriod.value

  floatUps.value.push({
    id,
    text: isTurnover ? '+10' : '+1',
    isTurnover,
  })

  setTimeout(() => {
    floatUps.value = floatUps.value.filter(f => f.id !== id)
  }, 600)

  if (isTurnover) {
    game.increaseThemScore(10)
    return
  }

  game.increaseUserScore(1)

  isBallPopped.value = false
  requestAnimationFrame(() => {
    isBallPopped.value = true
    setTimeout(() => {
      isBallPopped.value = false
    }, 150)
  })
}

function showMessage(tagline, isPositive = false) {
  const id = Date.now() + Math.random()
  const color = isPositive ? 'text-green-600' : 'text-red-600'
  messages.value.unshift({ id, text: tagline, color })

  // Flash the appropriate meter side
  if (isPositive) {
    hypeFlashColor.value = 'green'
    regretFlashColor.value = 'green'
  } else {
    hypeFlashColor.value = 'red'
    regretFlashColor.value = 'red'
  }

  setTimeout(() => {
    hypeFlashColor.value = null
    regretFlashColor.value = null
  }, 1200) // short flash
}

function startGame() {
  game.time = 40
  scheduleTurnover() // ✅ start turnover effect timer

  buttonEvents.forEach(event => {
    if (event.outcomes.length > 1) {
      outcomeIndexes[event.label] = Math.floor(Math.random() * event.outcomes.length)
    }
  })

  // ⏱️ Game timer loop
  gameInterval = setInterval(() => {
    if (game.time > 0) {
      game.time--
    } else {
      if (game.quarter < 4) {
        game.advanceQuarter()
        game.time = 40
        showQuarterOver.value = true

        scheduleTurnover()

        if (game.quarter === 2 && !beerSequencePlayed.value) {
          beerSequencePlayed.value = true
          spawnBeerSequence()
        }

        if (game.quarter === 3 && !game.lukaTraded) {
          game.lukaTraded = true
          game.addRegret(20)
          showLukaMessage.value = true
          showQuarterOver.value = false
          setTimeout(() => {
            showLukaMessage.value = false
          }, 2000)
        }

        setTimeout(() => {
          showQuarterOver.value = false
        }, 2000)
      } else {
        showGameOver.value = true
      }
    }

    if (game.hype >= 50) {
      game.increaseUserScore(1)
    } else {
      game.increaseThemScore(3)
    }
  }, 1000)

  // 🧃 Button spawning
  buttonInterval = setInterval(() => {
    spawnRandomButton()
  }, 4000)
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

@keyframes slide-bounce-down {
  0% {
    transform: translateY(-60%);
    opacity: 0;
  }

  50% {
    transform: translateY(10%);
    opacity: 1;
  }

  70% {
    transform: translateY(-4%);
  }

  100% {
    transform: translateY(0%);
  }
}

.animate-slide-bounce-down {
  animation: slide-bounce-down 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.glow-button {
  box-shadow: 0 0 8px rgba(255, 105, 180, 0.8), 0 0 12px rgba(255, 105, 180, 0.6);
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {

  0%,
  100% {
    box-shadow: 0 0 8px rgba(255, 105, 180, 0.8), 0 0 12px rgba(255, 105, 180, 0.6);
  }

  50% {
    box-shadow: 0 0 16px rgba(255, 105, 180, 1), 0 0 24px rgba(255, 105, 180, 0.8);
  }
}


.turnover-flash {
  animation: turnover-flash 0.3s step-start infinite;
}

@keyframes turnover-flash {
  50% {
    filter: brightness(2);
  }

  100% {
    filter: none;
  }
}

@keyframes chaotic-pulse {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.1) rotate(-2deg);
  }
}

.animate-pulse {
  animation: chaotic-pulse 0.6s ease-in-out infinite;
}

@keyframes shine {
  0% {
    background: rgba(255, 255, 255, 0);
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }

  50% {
    background: rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
    box-shadow: 0 0 12px 6px rgba(255, 255, 255, 0.5);
  }

  100% {
    background: rgba(255, 255, 255, 0);
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
}

.shine-overlay {
  animation: shine 0.6s ease-in-out forwards;
  pointer-events: none;
  z-index: 10;
  border-radius: 9999px;
}
</style>
