


<template> 
   <div class="flex flex-col justify-between h-screen w-screen bg-neutral-900 text-white">

        <!-- TOP: GAME INFO (score, hype, etc)-->
    <header class="p-4 text-center">
        <!-- TODO: Add scores / stats here -->
      <h2 class="text-2xl font-bold">Quarter: {{ game.quarter }}</h2>
      <h2 class="text-xl">Time: {{ game.time }}sec</h2>
      <h2 class="text-2xl font-bold">Money: {{ game.money }}</h2>
      <h2 class="text-2xl font-bold">Hype Level: {{ game.hype }}</h2>
      <h2 class="text-xl">Regret: {{ game.regret }}</h2>
      
      <h3 class="text-md text-red-400" v-if="game.lukaTraded">
        Luka traded at halftime! Riots ensue across Texas and your regret increases.
      </h3>
      
     
    </header>



        <!-- MIDDLE: Court area (bouncing faces / buttons go here)-->
    <main class="flex-1 flex items-center justify-center relative">
        <!-- TODO: Add court bg and floating components  **(TEST BUTTON RN)-->
        <button
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            @click="game.increaseHype(10)"
        >
          Hype Me Up!
        </button>
        <button
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          @click="game.spendMoney(5)"
        >
          Spend Money
        </button>
    </main>


        
    
    <!-- Bottom: Empty for now (we’ll remove or repurpose later) -->
    <footer class="p-4 text-center">
        <!-- optional test area -->
    </footer>

  </div>
</template>






<script setup>
import { useGameStore } from './stores/game';
import { onMounted, onUnmounted } from 'vue';

const game = useGameStore();

onMounted(() => {
  const interval = setInterval(() => {
    // 1️⃣ increase time
    game.time++

    // 2️⃣ advance quarter every 60 seconds
    if (game.time % 60 === 0 && game.quarter < 4) {
      game.advanceQuarter()
      console.log(`Quarter ${game.quarter}`)
      // ⛔ you could trigger a sound/alert here later
    }

    // 3️⃣ update scoreGap based on hype
    if (game.hype > 50) {
      game.updateScoreGap(1)
    } else if (game.hype < 50) {
      game.updateScoreGap(-1)
    }

    // 4️⃣ Luka Trade at Halftime (start of Q3)
    if (game.quarter === 3 && !game.lukaTraded) {
    game.lukaTraded = true
    game.addRegret(20)
    console.log('Luka traded at halftime! Riots ensue across Texas.')
    // TODO: show sad popup or animation here later
    }

  }, 1000)

  onUnmounted(() => clearInterval(interval))
})





</script>


