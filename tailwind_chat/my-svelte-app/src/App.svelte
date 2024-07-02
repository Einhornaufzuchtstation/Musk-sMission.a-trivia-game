<script>
  import Router from 'svelte-spa-router';
  import Home from './Home.svelte';
  import TriviaGame from './TriviaGame.svelte';
  import DifferentTriviaGame from './DifferentTriviaGame.svelte';
  import DifferentTriviaGameRockets from './DifferentTriviaGameRockets.svelte';
  import DifferentTriviaGameShips from './DifferentTriviaGameShips.svelte';

  // Define routes
  const routes = {
    '/': Home,
    '/trivia': TriviaGame,
    '/trivia-missions': DifferentTriviaGame,
    '/trivia-rockets': DifferentTriviaGameRockets,
    '/trivia-ships': DifferentTriviaGameShips,
  };
</script>

<Router {routes} />