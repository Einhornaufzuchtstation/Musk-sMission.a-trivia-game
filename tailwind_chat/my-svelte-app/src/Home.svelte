<script>
    import { push } from 'svelte-spa-router';
  
    function startCapsulesGame() {
      push('/trivia');
    }
  
    function startMissionsGame() {
      push('/trivia-missions');
    }

    function startRocketsGame() {
      push('/trivia-rockets');
    }

    function startShipsGame() {
      push('/trivia-ships');
    }

  </script>
  
  <style>
    .bg-image {
      background-image: url('https://cdn.unitycms.io/images/Dl5YRKY84gO9ku3HI5lwku.jpg?op=ocroped&val=1200,1200,1000,1000,0,0&sum=DJJGNi9i1EQ');
      background-size: cover;
      background-position: center;
    }
  </style>
  
  <div class="flex fixed inset-0 z-[99] w-screen h-screen bg-white">
    <div class="relative top-0 bottom-0 right-0 flex-shrink-0 hidden w-1/3 overflow-hidden lg:block bg-image">
      <a href="#_" class="absolute bottom-0 left-0 z-30 inline-flex items-end mb-4 ml-3 font-sans text-2xl font-extrabold text-left text-white no-underline bg-transparent cursor-pointer group focus:no-underline">
        <span class="flex opacity-90 group-hover:scale-150 group-hover:opacity-100 items-center h-full group-hover:-rotate-6 ease-out duration-500 px-0.5 py-px ml-2 -translate-x-px text-[0.6rem] font-bold leading-none border-[2px] rounded border-white -translate-y-px">Musk's Mission 🚀</span>
      </a>
      <div class="absolute inset-0 z-20 w-full h-full opacity-70 bg-gradient-to-t from-black"></div>
    </div>
    <div class="relative flex flex-wrap items-center w-full h-full px-8">
      <div class="relative w-full max-w-sm mx-auto lg:mb-0">
        <div class="relative text-center">
          <div class="flex flex-col mb-6 space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight text-left">Musk's Mission: A SpaceX Trivia Game</h1>
          </div>
          <div class="answers space-y-4">
            <button class="block w-full px-8 py-4 text-white rounded-md bg-gray-800 hover:bg-gray-700" on:click={startCapsulesGame}>Capsules</button>
            <button class="block w-full px-8 py-4 text-white rounded-md bg-gray-800 hover:bg-gray-700" on:click={startMissionsGame}>Missions</button>
            <button class="block w-full px-8 py-4 text-white rounded-md bg-gray-800 hover:bg-gray-700" on:click={startRocketsGame}>Rockets</button>
            <button class="block w-full px-8 py-4 text-white rounded-md bg-gray-800 hover:bg-gray-700" on:click={startShipsGame}>Ships</button>
            <!-- Add more game options here if needed -->
          </div>
        </div>
      </div>
    </div>
  </div>
  