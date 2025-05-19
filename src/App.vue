<template>
  <!-- Root layout with background image and full screen dimensions -->
  <div class="relative flex flex-col justify-between h-screen w-screen bg-cover bg-center bg-no-repeat select-none"
    :style="{ backgroundImage: `url(${courtBg})` }">

    <!-- Clickable floating basketball -->
    <div class="absolute w-[65px] h-[65px] z-50 animate-bounce-dvd flex items-center justify-center"
      @click="handleBallClick">

      <img :src="bball" alt="Floating Ball" class="w-[70px] h-[70px] object-contain" :class="[
        { 'pop': isBallPopped },
        { 'turnover-flash': isTurnoverPeriod },
        { 'hot-hand-flash': isHotHand }
      ]" draggable="false" />

      <!-- Floating score text above the ball -->
      <div v-for="float in floatUps" :key="float.id" :class="[
        'absolute text-2xl font-bold pointer-events-none animate-float-up z-60',
        float.isTurnover ? 'text-red-500' : 'text-green-600'
      ]" style="top: 0; left: 0; transform: translate(-50%, -50%)">
        {{ float.text }}
      </div>
    </div>

    <!-- Chaotically animated player images -->
    <img v-for="(player, idx) in players" :key="idx" :src="player.src" :alt="player.name" :class="player.class"
      class="player-face" />

    <!-- Score + meters HUD -->
    <header class="p-4 flex flex-col items-center font-['Press_Start_2P']">

      <!-- Regret meter (dual-color bar) -->
      <div class="w-[80%] mx-auto mt-4 mb-3 relative">
        <p class="text-center text-sm font-bold mb-1 tracking-widest">REGRET</p>
        <div class="w-full h-6 rounded-full overflow-hidden flex border-2 border-black relative">
          <div class="w-1/2 relative" style="background: linear-gradient(to right, #7f1d1d, #dc2626, #f87171);">
            <div v-if="regretFlashColor === 'red'" class="absolute inset-0 shine-overlay"></div>
          </div>
          <div class="w-1/2 relative" style="background: linear-gradient(to left, #065f46, #10b981, #6ee7b7);">
            <div v-if="regretFlashColor === 'green'" class="absolute inset-0 shine-overlay"></div>
          </div>
        </div>
        <div
          class="absolute top-1/2 -translate-y-1/2 text-black text-lg pointer-events-none transition-all duration-200"
          :style="{ left: `${100 - Math.min(100, Math.max(0, game.regret))}%`, transform: 'translateX(-50%)' }">
          ▼
        </div>
      </div>

      <!-- Money, hype, and score row -->
      <div class="w-[60%] mx-auto relative left-[-29px] flex items-center justify-between">

        <!-- Money pill -->
        <div class="bg-purple-300 text-black px-4 py-2 rounded-full border-2 border-black text-sm font-bold">
          Money: ${{ game.money }}
        </div>

        <!-- Hype meter -->
        <div class="flex flex-col items-center w-[60%] relative -top-[16px]">
          <p class="text-sm font-bold mb-1 tracking-widest">HYPE</p>
          <div class="w-full h-4 rounded-full overflow-hidden flex border-2 border-black relative">
            <div class="w-1/2 relative" style="background: linear-gradient(to right, #7f1d1d, #dc2626, #f87171);">
              <div v-if="hypeFlashColor === 'red'" class="absolute inset-0 shine-overlay"></div>
            </div>
            <div class="w-1/2 relative" style="background: linear-gradient(to left, #065f46, #10b981, #6ee7b7);">
              <div v-if="hypeFlashColor === 'green'" class="absolute inset-0 shine-overlay"></div>
            </div>
            <div
              class="absolute top-1/2 -translate-y-1/2 text-black text-sm pointer-events-none transition-all duration-200"
              :style="{ left: `${Math.min(100, Math.max(0, game.hype))}%`, transform: 'translate(-50%, -50%)' }">
              ▼
            </div>
          </div>
        </div>

        <!-- Score pill -->
        <div
          class="bg-purple-300 text-black px-4 py-2 rounded-full border-2 border-black text-sm font-bold text-center">
          You: {{ game.userScore }}<br />Them: {{ game.themScore }}
        </div>
      </div>

      <!-- Quarter and time pill -->
      <div
        class="-mt-5 bg-purple-300 text-black px-2 py-1.5 rounded-full border-2 border-black text-xs font-bold text-center tracking-tight max-w-fit">
        Q: {{ game.quarter }} | Time: {{ game.time }}s
      </div>
    </header>

    <!-- Game court -->
    <main class="relative w-full h-full overflow-hidden">

      <!-- Temporary overlays triggered by game state -->
      <div v-if="showQuarterOver"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-8 py-4 rounded shadow-lg text-3xl font-bold z-50 border-black border-4">
        Quarter Over!
      </div>

      <div v-if="isTurnoverPeriod"
        class="absolute top-[25%] inset-x-0 mx-auto w-fit bg-black text-red-500 border-4 border-white px-8 py-4 rounded-xl shadow-2xl text-4xl font-extrabold z-[9999] animate-pulse pointer-events-none mix-blend-difference tracking-widest text-center">
        LeTURNOVER‼ 😟
      </div>

      <div v-if="isHotHand"
        class="absolute top-[25%] inset-x-0 mx-auto w-fit bg-yellow-500 text-black border-4 border-white px-8 py-4 rounded-xl shadow-2xl text-4xl font-extrabold z-[9999] animate-pulse pointer-events-none mix-blend-difference tracking-widest text-center">
        HOT HAND! 🔥
      </div>

      <div v-if="showGameOver"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-4 rounded shadow-lg text-4xl font-bold z-50">
        GAME OVER
      </div>

      <div v-if="showLukaMessage"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-8 py-4 rounded shadow-lg text-3xl font-bold z-50 text-center max-w-[80%] leading-snug border-black border-4">
        Luka traded at the half!!
      </div>

      <!-- Final judgment overlay (multi-phase) -->
      <div v-if="showFinalResults"
        class="fixed inset-0 z-[99999] bg-yellow-300 bg-opacity-95 flex flex-col items-center justify-center text-center p-8 space-y-8 border-4 border-black">
        <h1 v-if="resultPhase === 0" class="text-3xl font-bold font-['Press_Start_2P']">
          As you reflect on your experience, judgment awaits.
        </h1>
        <p v-if="resultPhase === 0" class="text-2xl mt-6 font-['Press_Start_2P'] tracking-wide">
          ⌛ Calculating your fate...
        </p>

        <!-- Phase 1: Analysis details -->
        <div v-else-if="resultPhase >= 1"
          class="text-left text-base md:text-lg mt-4 space-y-3 font-sans leading-relaxed text-black">
          <p class="text-xl font-bold font-['Press_Start_2P'] tracking-wide">📊 Analysis complete.</p>
          <p class="italic text-sm md:text-base font-mono text-gray-800">Based on:</p>
          <ul class="ml-4 space-y-1 list-disc marker:text-pink-600 font-mono text-gray-800">
            <li>Your final score</li>
            <li>Your emotional state (Hype & Regret)</li>
            <li>Your spending habits...</li>
          </ul>
        </div>

        <!-- Phase 2: Final tagline and reset button -->
        <p v-if="resultPhase === 2"
          class="text-4xl md:text-5xl mt-6 text-center max-w-2xl font-serif text-black italic tracking-tight leading-snug">
          {{ getFinalTagline() }}
        </p>
        <button v-if="resultPhase === 2" @click="resetGame"
          class="mt-8 px-6 py-3 bg-pink-500 hover:bg-pink-700 text-white text-lg border-2 border-black rounded-full shadow-md glow-button font-['Press_Start_2P']">
          PLAY AGAIN?
        </button>
      </div>

      <!-- Dynamic pink buttons (spawn randomly) -->
      <div v-for="(event, index) in activeButtons" :key="event.id" class="absolute animate-float-chaotic z-40"
        :style="{ top: event.top + '%', left: event.left + '%' }">
        <button
          :class="['font-bold py-2 px-4 rounded transition m-2 border-2 bg-pink-500 hover:bg-pink-700 text-white border-white glow-button']"
          @click="handleButtonClick(event)">
          {{ event.label }}
        </button>
      </div>

      <!-- Stacked messages (like taglines) in lower corner -->
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

    <!-- Courtside celebs bouncing gently -->
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

    <!-- Start screen with game rules -->
    <div v-if="showStartMenu"
      class="absolute inset-0 z-[99999] bg-yellow-300 bg-opacity-95 flex flex-col items-center justify-center text-center p-8 space-y-8">
      <h1 class="text-3xl font-bold font-['Press_Start_2P']">Welcome to NBA Purgatory</h1>
      <p class="text-xl md:text-2xl font-serif italic font-semibold text-black tracking-tight leading-snug max-w-3xl mx-auto"
        style="word-spacing: 0.4em;">
        You show up. You feel. You take in the spectacle. Then you ask yourself: was it worth losing your mind, your
        money — and possibly your soul?
      </p>

      <!-- Rule list -->
      <ul class="text-base md:text-lg font-sans font-normal text-gray-800 leading-relaxed space-y-6 max-w-md">
        <li>
          <strong>1.</strong> <span class="font-bold">Click the ball to score.</span><br />
          <span class="text-base font-normal">Bonus points if you time it right.</span>
        </li>
        <li>
          <strong>2.</strong> <span class="font-bold">Click the pink buttons. Keep REGRET low. Keep HYPE
            high.</span><br />
          <span class="text-base font-normal">Your vibe controls your destiny (and the scoreboard).</span>
        </li>
        <li>
          <strong>3.</strong> <span class="font-bold">High HYPE = your team scores faster. Low HYPE = they score
            faster.</span><br />
          <span class="text-base font-normal">Simple math. Chaotic execution.</span>
        </li>
      </ul>

      <!-- Final tagline before game begins -->
      <p
        class="text-4xl md:text-5xl mt-6 text-center max-w-2xl font-serif text-black italic tracking-tight leading-snug">
        The sum of your stat sheet determines your fate.
      </p>

      <!-- Start game button -->
      <button @click="showStartMenu = false; startGame()"
        class="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-700 text-white text-lg border-2 border-black rounded-full shadow-md glow-button font-['Press_Start_2P']">
        START GAME
      </button>
    </div>

  </div>
</template>




<script setup>
// Core Vue imports
import { ref, onMounted, onUnmounted, reactive } from 'vue'

// Global store
import { useGameStore } from './stores/game'

// Event definitions (button click effects)
import { buttonEvents } from './data/buttonEvents'

// Sound utilities
import { playSound, fadeOutSound } from './utils/sound'

// Sound assets (grouped by purpose)
import bounceSound from './assets/sounds/bounce.mp3'
import buzzerSound from './assets/sounds/buzzer.mp3'
import ourBallSound from './assets/sounds/our-ball.mp3'
import bricksSound from './assets/sounds/bricks.mp3'
import backUpTerrySound from './assets/sounds/back-up-terry.mp3'
import fireNicoSound from './assets/sounds/fire-nico.mp3'
import haHaaSound from './assets/sounds/mr-pbh-ha-haa.mp3'
import oooWeeSound from './assets/sounds/mr-pbh-ooo-wee.mp3'
import wowSound from './assets/sounds/wow.mp3'
import naeNaeSound from './assets/sounds/naenae.mp3'
import travisOmgSound from './assets/sounds/travis-omg.mp3'
import whatDeathnoteSound from './assets/sounds/what-r-u-talm-bout-deathnote.mp3'
import weFineSound from './assets/sounds/we-gonna-be-fine.mp3'
import bruhSound from './assets/sounds/bruh.mp3'
import heyBabySound from './assets/sounds/beavis-hey-baby.mp3'
import dallasSound from './assets/sounds/dallas-hank.mp3'
import sandlerGoodSound from './assets/sounds/i-am-good-sandler.mp3'
import lightPointlessSound from './assets/sounds/light-whole-thing-pointless.mp3'
import shot4MeSound from './assets/sounds/shot-4-me.mp3'
import amenSound from './assets/sounds/amen-to-that.mp3'
import sirenSound from './assets/sounds/siren.mp3'
import squeaksSound from './assets/sounds/squeaks.mp3'
import endSongSound from './assets/sounds/end-song.mp3'
import beavisBeerSound from './assets/sounds/beavis-beer.mp3'
import bojackBeerSound from './assets/sounds/bojack-beer.mp3'
import hankBeerSound from './assets/sounds/hank-beer.mp3'
import cashMeSound from './assets/sounds/cash-me.mp3'
import zzzzzSound from './assets/sounds/Zzzzz.mp3'
import bojackSoberSound from './assets/sounds/bojack-sober.mp3'
import gobertSound from './assets/sounds/gobert.mp3'
import arenaClapsSound from './assets/sounds/arena-claps.mp3'
import wthSound from './assets/sounds/wth.mp3'
import sadSongSound from './assets/sounds/sad-song.mp3'

// Visual assets
import courtBg from './assets/images/court-bg.png'
import bball from './assets/images/bball.png'

// Player images
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

// Courtside celebrity images
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

// Core game store
const game = useGameStore()

// Reactive state for gameplay and UI
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
const isHotHand = ref(false)
const showFinalResults = ref(false)
const resultPhase = ref(0)

const squeaksAudio = ref(null)
const endSongAudio = ref(null)
const arenaClapsAudio = ref(null)

// Misc state
const shownButtonsGlobal = reactive(new Set())
const beerSequencePlayed = ref(false)
const buttonSpawningPaused = ref(false)
let totalBeerButtons = 5
let beerClicks = 0

// Intervals
let buttonInterval = null
let gameInterval = null

// Player config
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

// Trigger a turnover (visual + sound), lasts 5s
function activateTurnover() {
  isTurnoverPeriod.value = true
  playSound(ourBallSound, 1.0)
  setTimeout(() => {
    isTurnoverPeriod.value = false
  }, 5000)
}

// Randomly schedule a turnover event
function scheduleTurnover() {
  const delay = Math.floor(Math.random() * 20000) + 10000
  setTimeout(() => {
    if (!isHotHand.value && !isTurnoverPeriod.value) {
      activateTurnover()
    }
  }, delay)
}

// Trigger Hot Hand bonus (visual + sound), lasts 5s
function activateHotHand() {
  isHotHand.value = true
  playSound(sirenSound, 0.2)
  setTimeout(() => {
    isHotHand.value = false
  }, 5000)
}

// Randomly schedule Hot Hand event
function scheduleHotHand() {
  const delay = Math.floor(Math.random() * 15000) + 5000
  setTimeout(() => {
    if (!isTurnoverPeriod.value && !isHotHand.value) {
      activateHotHand()
    }
  }, delay)
}

// Generates a final end-game message based on performance
function getFinalTagline() {
  const scoreDiff = game.userScore - game.themScore
  const regretDelta = game.regret - 50
  const regretScore = regretDelta > 0 ? -0.3 * regretDelta : 0.3 * Math.abs(regretDelta)
  const moneyScore = 0.3 * game.money
  const fateScore = (scoreDiff * 0.5) + regretScore + moneyScore

  return fateScore >= 0
    ? "You found Heaven on Earth in the arena… this time."
    : "The game was truly a Hellish experience... ball is NOT life."
}

// Clean up intervals when component is unmounted
onMounted(() => {
  onUnmounted(() => {
    clearInterval(gameInterval)
    clearInterval(buttonInterval)
  })
})



// Spawn the beer button sequence in order, then resume normal spawns
function spawnBeerSequence() {
  clearInterval(buttonInterval)
  buttonSpawningPaused.value = true

  const beerButtons = buttonEvents
    .filter(e => e.label.includes("Beer"))
    .sort((a, b) => (a.beerLevelRequired ?? 0) - (b.beerLevelRequired ?? 0))

  let currentBeerIndex = 0

  function spawnNextBeer() {
    if (currentBeerIndex >= beerButtons.length) {
      // Resume normal button spawn after beer sequence finishes
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
      left: Math.random() * 60 + 5,
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

// Spawns a random event button unless beer buttons are paused
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
    left: Math.random() * 60 + 5,
  })

  shownButtonsGlobal.add(randomEvent.label)

  // Remove button after a short duration
  setTimeout(() => {
    activeButtons.value = activeButtons.value.filter(btn => btn.id !== id)
  }, 4000)
}

// Special cases for guaranteed positive/negative button labels
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

// Handles user click on a button event
function handleButtonClick(event) {
  if (event.cost) {
    game.spendMoney(event.cost)
  }

  // Determine outcome (fixed index or probability-based)
  let outcome
  if (event.outcomes.length > 1) {
    if (!(event.label in outcomeIndexes)) outcomeIndexes[event.label] = 0
    const index = outcomeIndexes[event.label]
    outcome = event.outcomes[index]
    outcomeIndexes[event.label] = (index + 1) % event.outcomes.length
  } else {
    const roll = Math.random()
    let cumulative = 0
    for (const o of event.outcomes) {
      cumulative += o.chance
      if (roll <= cumulative) {
        outcome = o
        break
      }
    }
  }

  if (outcome) {
    // Apply effect
    if (outcome.effect.hype) game.increaseHype(outcome.effect.hype)
    if (outcome.effect.regret) game.addRegret(outcome.effect.regret)
    if (outcome.effect.money) game.spendMoney(-outcome.effect.money)

    // Play associated sound
    if (outcome.sound) {
      const soundMap = {
        "mr-pbh-ooo-wee.mp3": oooWeeSound,
        "mr-pbh-ha-haa.mp3": haHaaSound,
        "back-up-terry.mp3": backUpTerrySound,
        "bricks.mp3": bricksSound,
        "wow.mp3": wowSound,
        "naenae.mp3": naeNaeSound,
        "travis-omg.mp3": travisOmgSound,
        "what-r-u-talm-bout-deathnote.mp3": whatDeathnoteSound,
        "we-gonna-be-fine.mp3": weFineSound,
        "bruh.mp3": bruhSound,
        "beavis-hey-baby.mp3": heyBabySound,
        "dallas-hank.mp3": dallasSound,
        "light-whole-thing-pointless.mp3": lightPointlessSound,
        "i-am-good-sandler.mp3": sandlerGoodSound,
        "shot-4-me.mp3": shot4MeSound,
        "amen-to-that.mp3": amenSound,
        "gobert.mp3": gobertSound,
        "wth.mp3": wthSound,
        "sad-song.mp3": sadSongSound,
      }
      const soundVolumes = {
        "wow.mp3": 0.8, "bruh.mp3": 0.8, "beavis-hey-baby.mp3": 0.95, "dallas-hank.mp3": 0.8,
        "mr-pbh-ooo-wee.mp3": 0.4, "mr-pbh-ha-haa.mp3": 0.4, "naenae.mp3": 0.4,
        "back-up-terry.mp3": 0.4, "we-gonna-be-fine.mp3": 0.4,
        "light-whole-thing-pointless.mp3": 0.3, "i-am-good-sandler.mp3": 0.5,
        "shot-4-me.mp3": 0.5, "amen-to-that.mp3": 0.6, "gobert.mp3": 0.45,
        "what-r-u-talm-bout-deathnote.mp3": 0.2, "wth.mp3": 0.5, "sad-song.mp3": 0.5,
        "travis-omg.mp3": 1.0, "bricks.mp3": 1.0,
      }
      const resolvedSound = soundMap[outcome.sound]
      const volume = soundVolumes[outcome.sound] ?? 0.75
      if (resolvedSound) {
        try {
          if (event.label === "Shoplift from the Team Shop") {
            const audio = new Audio(resolvedSound)
            audio.volume = volume
            audio.play().catch(() => { })
            setTimeout(() => fadeOutSound(audio, 4000), 5000)
          } else {
            playSound(resolvedSound, volume)
          }
        } catch (e) {
          console.warn("Sound error:", outcome.sound, e)
        }
      }
    }

    // Determine whether message is positive or negative
    let isPositive = (outcome.effect.hype > 0 || outcome.effect.money > 0 || outcome.effect.regret < 0)
    if (redFixedLabels.has(event.label)) isPositive = false
    if (greenFixedLabels.has(event.label)) isPositive = true
    if (event.label.includes("Beer")) {
      const level = event.beerLevelRequired
      if (event.label === "Beer?") isPositive = true
      else if (event.label === "Another Beer?") {
        if (level <= 2) isPositive = true
        else if (level === 3) isPositive = false
        else if (level === 4) isPositive = outcome.tagline === "ZZzzzzzzzz"
      }
    }

    showMessage(outcome.tagline, isPositive)
  }

  // Beer-specific sound effects
  if (event.label.includes("Beer")) {
    const level = event.beerLevelRequired
    switch (level) {
      case 0: playSound(beavisBeerSound, 0.7); break
      case 1: playSound(bojackBeerSound, 0.8); break
      case 2: playSound(hankBeerSound, 0.8); break
      case 3: playSound(cashMeSound, 0.6); break
      case 4:
        if (outcome?.tagline === "ZZzzzzzzzz") playSound(zzzzzSound, 0.85)
        else if (outcome?.tagline === "phone = lost") playSound(bojackSoberSound, 0.95)
        break
    }
  }

  if (event.beerLevelRequired !== undefined) game.unlockNextBeer()
  if (event.label.includes("Beer") && typeof window.__spawnNextBeer === 'function') {
    window.__spawnNextBeer()
  }

  activeButtons.value = activeButtons.value.filter(btn => btn.id !== event.id)
}

// Ball click triggers scoring, turnover penalty, or hot hand bonus
function handleBallClick() {
  playSound(bounceSound, 0.6)
  const id = Date.now() + Math.random()
  const isTurnover = isTurnoverPeriod.value

  floatUps.value.push({
    id,
    text: isTurnover ? '+10' : `+${isHotHand.value ? 5 : 1}`,
    isTurnover,
  })

  setTimeout(() => {
    floatUps.value = floatUps.value.filter(f => f.id !== id)
  }, 600)

  if (isTurnover) {
    game.increaseThemScore(10)
    return
  }

  const points = isHotHand.value ? 5 : 1
  game.increaseUserScore(points)

  // Trigger visual pop effect
  isBallPopped.value = false
  requestAnimationFrame(() => {
    isBallPopped.value = true
    setTimeout(() => (isBallPopped.value = false), 150)
  })
}

// Displays a floating message and flashes the meters
function showMessage(tagline, isPositive = false) {
  const id = Date.now() + Math.random()
  const color = isPositive ? 'text-green-600' : 'text-red-600'
  messages.value.unshift({ id, text: tagline, color })

  hypeFlashColor.value = isPositive ? 'green' : 'red'
  regretFlashColor.value = isPositive ? 'green' : 'red'

  setTimeout(() => {
    hypeFlashColor.value = null
    regretFlashColor.value = null
  }, 1200)
}

// Starts the game: resets values, begins timers, audio, spawns, etc.
function startGame() {
  game.time = 40

  squeaksAudio.value = new Audio(squeaksSound)
  squeaksAudio.value.loop = true
  squeaksAudio.value.volume = 0.2
  squeaksAudio.value.play().catch(() => { })

  arenaClapsAudio.value = new Audio(arenaClapsSound)
  arenaClapsAudio.value.loop = true
  arenaClapsAudio.value.volume = 0.05
  arenaClapsAudio.value.play().catch(() => { })

  scheduleTurnover()
  scheduleHotHand()

  buttonEvents.forEach(event => {
    if (event.outcomes.length > 1) {
      outcomeIndexes[event.label] = Math.floor(Math.random() * event.outcomes.length)
    }
  })

  gameInterval = setInterval(() => {
    if (game.time > 0) {
      game.time--
    } else {
      // Quarter handling
      if (game.quarter < 4) {
        game.advanceQuarter()
        game.time = 40
        showQuarterOver.value = true
        scheduleTurnover()
        scheduleHotHand()

        if (game.quarter === 2 && !beerSequencePlayed.value) {
          beerSequencePlayed.value = true
          spawnBeerSequence()
        }

        if (game.quarter === 3 && !game.lukaTraded) {
          game.lukaTraded = true
          game.addRegret(20)
          showLukaMessage.value = true
          try { playSound(fireNicoSound, 0.75) } catch { }
          setTimeout(() => { showLukaMessage.value = false }, 4000)
        }

        setTimeout(() => { showQuarterOver.value = false }, 2000)
      } else {
        // End game
        showGameOver.value = true
        playSound(buzzerSound, 0.7)
        clearInterval(gameInterval)

        squeaksAudio.value?.pause()
        squeaksAudio.value.currentTime = 0

        setTimeout(() => {
          showGameOver.value = false
          showFinalResults.value = true
          setTimeout(() => {
            resultPhase.value = 2
            endSongAudio.value = new Audio(endSongSound)
            endSongAudio.value.loop = true
            endSongAudio.value.volume = 0.75
            endSongAudio.value.play().catch(() => { })
          }, 5000)
        }, 2000)
      }
    }

    if (game.hype >= 50) game.increaseUserScore(1)
    else game.increaseThemScore(3)
  }, 1000)

  buttonInterval = setInterval(() => {
    spawnRandomButton()
  }, 4000)
}

// Resets game state and UI
function resetGame() {
  squeaksAudio.value?.pause()
  arenaClapsAudio.value?.pause()
  endSongAudio.value?.pause()
  squeaksAudio.value.currentTime = 0
  arenaClapsAudio.value.currentTime = 0
  endSongAudio.value.currentTime = 0

  game.hype = 49
  game.regret = 50
  game.money = 100
  game.userScore = 0
  game.themScore = 0
  game.time = 0
  game.quarter = 1
  game.lukaTraded = false
  game.isEjected = false
  game.beerLevel = 0

  floatUps.value = []
  messages.value = []
  activeButtons.value = []
  shownButtonsGlobal.clear()
  showGameOver.value = false
  showStartMenu.value = true
  showFinalResults.value = false
  resultPhase.value = 0
  beerSequencePlayed.value = false
  isHotHand.value = false
  isTurnoverPeriod.value = false

  clearInterval(gameInterval)
  clearInterval(buttonInterval)
}
</script>



<style scoped>
/* ========== GLOBAL RULES ========== */

/* Prevent dragging images/text in the component */

* {
  -webkit-user-drag: none;
  user-drag: none;
}

/* ========== FLOATING BUTTONS ========== */

/* Chaotic drift animation for buttons */
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

/* ========== CELEBS BOUNCE ========== */

/* Gentle vertical bounce for courtside celebs */
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

/* ========== DVD BALL MOVEMENT ========== */

/* Long, slow chaotic bounce for the floating basketball */
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
  animation: bounce-chaotic 53s linear infinite;
  position: absolute;
}

/* Bounce pop effect on ball click */
.pop {
  transform: scale(1.15);
  transition: transform 45ms ease;
}

/* ========== FLOATING PLAYERS ========== */

/* Each player gets their own unique chaotic animation */
@keyframes bounce-chaotic-1 {
  /* ... */
}

@keyframes bounce-chaotic-2 {
  /* ... */
}

/* (Omitted here for brevity – you already have each custom pattern) */

.animate-chaotic-1 {
  animation: bounce-chaotic-1 12s linear infinite;
  position: absolute;
}

.animate-chaotic-2 {
  animation: bounce-chaotic-2 175s linear infinite;
  position: absolute;
}

/* (Continue through animate-chaotic-10) */

/* Base style for player avatars */
.player-face {
  width: 90px;
  height: 90px;
  object-fit: contain;
  position: absolute;
  z-index: 10;
}

/* ========== FLOAT-UP TEXT (Scoring) ========== */

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

/* ========== SLIDE-DOWN MESSAGE STACK ========== */

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
    transform: translateY(0);
  }
}

.animate-slide-bounce-down {
  animation: slide-bounce-down 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ========== GLOWING BUTTON EFFECT ========== */

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

/* ========== STATE FLASH EFFECTS ========== */

/* Rapid flash for turnover effect */
@keyframes turnover-flash {
  50% {
    filter: brightness(2);
  }

  100% {
    filter: none;
  }
}

.turnover-flash {
  animation: turnover-flash 0.3s step-start infinite;
}

/* Rapid pulse during Hot Hand state */
@keyframes hot-hand-flash {
  50% {
    filter: brightness(1.7) saturate(1.5);
  }

  100% {
    filter: none;
  }
}

.hot-hand-flash {
  animation: hot-hand-flash 0.3s step-start infinite;
}

/* Shine overlay animation (used on hype/regret meters) */
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

/* General chaotic visual pulse */
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
</style>
