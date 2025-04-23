


<template> 
   <div class="flex flex-col justify-between h-screen w-screen bg-neutral-900 text-white">

        <!-- TOP: GAME INFO (score, hype, etc)-->
    <header class="p-4 text-center">
        <!-- TODO: Add scores / stats here -->
      <h1 class="text-2xl font-bold">Hype Level: {{ game.hype }}</h1>
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
    </main>


        
    
    <!-- Bottom: Empty for now (we’ll remove or repurpose later) -->
    <footer class="p-4 text-center">
        <!-- optional test area -->
    </footer>

  </div>
</template>






<script setup>
import { useGameStore } from './stores/game';

const game = useGameStore();
</script>


