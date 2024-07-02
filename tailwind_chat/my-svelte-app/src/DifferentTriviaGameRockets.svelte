<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import confetti from 'canvas-confetti';
  import axios from 'axios';
  import { push } from 'svelte-spa-router';

  let selectedQuestion = '';
  let answers = [];
  let correctAnswer = '';
  let showToast = writable(false);
  let toastMessage = writable('');
  let toastType = writable('success'); // 'success' or 'error'
  let questionIndex = 0;
  const totalQuestions = 10;
  let progress = writable(Array(totalQuestions).fill(null));
  let loading = writable(false);
  let showFeedback = false;
  let explanation = '';
  let questionHistory = [];
  let showModal = writable(false);
  let selectedQuestionForReview = null;
  let selectedAnswer = null;
  let selectedAnswerIndex = null;
  let quizCompleted = writable(false);

  onMount(async () => {
    await generateQuestion();
  });

  async function generateQuestion() {
    loading.set(true);
    showFeedback = false;
    selectedAnswer = null;
    selectedAnswerIndex = null;

    try {
      const response = await axios.post('http://localhost:3000/api/rocket-question');
      const data = response.data;

      selectedQuestion = data.question;
      correctAnswer = data.correctAnswer;
      answers = data.answers;
    } catch (error) {
      console.error('Error fetching question:', error);
    }

    loading.set(false);
  }

  async function fetchExplanation(question) {
    const prompt = `Explain why the given answer is incorrect for the question: "${question}"`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    };
    const data = {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
      explanation = response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error fetching explanation:', error);
      explanation = "Failed to fetch explanation. Please try again.";
    }
  }

  function selectAnswer(answer, index) {
    selectedAnswer = answer;
    selectedAnswerIndex = index;

    const isCorrect = answer === correctAnswer;
    if (isCorrect) {
      toastMessage.set('That is correct!');
      toastType.set('success');
      showFeedback = true;
      explanation = '';
      confetti({
        particleCount: 150,
        spread: 60,
        origin: { y: 0.6 },
      }); // Trigger confetti
    } else {
      toastMessage.set('Sorry, that is incorrect.');
      toastType.set('error');
      showFeedback = true;
      fetchExplanation(selectedQuestion);
    }

    progress.update(p => {
      p[questionIndex] = isCorrect ? 'correct' : 'incorrect';
      return p;
    });

    questionHistory.push({
      question: selectedQuestion,
      correctAnswer,
      userAnswer: answer,
      isCorrect,
    });

    setTimeout(() => {
      showToast.set(false);
      questionIndex++;
      if (questionIndex < totalQuestions) {
        generateQuestion();
      } else {
        quizCompleted.set(true);
      }
    }, 3000);
  }

  function viewQuestionDetails(index) {
    selectedQuestionForReview = questionHistory[index];
    showModal.set(true);
  }

  function backToHome() {
    push('/');
  }

  function nextLevel() {
    questionIndex = 0;
    quizCompleted.set(false);
    generateQuestion();
  }
</script>

<style>
  .skeleton {
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
  }
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .skeleton-text {
    height: 5rem;
    width: 100%;
    margin-bottom: 1rem;
  }
  .skeleton-button {
    height: 2.5rem;
    width: 100%;
    margin-bottom: 1rem;
  }
  .correct {
    background-color: #38a169; /* Green */
  }
  .incorrect {
    background-color: #e53e3e; /* Red */
  }
  .dot-indicator {
    display: flex;
    justify-content: center;
    gap: 1rem;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .dot {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dot svg {
    color: white;
    width: 1rem;
    height: 1rem;
    animation: fadeIn 0.5s ease-in-out both;
  }
  .dot.correct {
    background-color: #38a169; /* Green */
  }
  .dot.incorrect {
    background-color: #e53e3e; /* Red */
  }
  .dot.pending {
    background-color: #e0e0e0; /* Gray */
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

{#if $quizCompleted}
  <div class="flex fixed inset-0 z-[99] w-screen h-screen bg-white">
    <div class="relative top-0 bottom-0 right-0 flex-shrink-0 hidden w-1/3 overflow-hidden bg-cover lg:block">
      <a href="#_" class="absolute bottom-0 left-0 z-30 inline-flex items-end mb-4 ml-3 font-sans text-2xl font-extrabold text-left text-white no-underline bg-transparent cursor-pointer group focus:no-underline">
        <span class="flex opacity-90 group-hover:scale-150 group-hover:opacity-100 items-center h-full group-hover:-rotate-6 ease-out duration-500 px-0.5 py-px ml-2 -translate-x-px text-[0.6rem] font-bold leading-none border-[2px] rounded border-white -translate-y-px">Musk's Mission 🚀</span>
      </a>
      <div class="absolute inset-0 z-20 w-full h-full opacity-70 bg-gradient-to-t from-black"></div>
      <img src="https://apod.nasa.gov/apod/image/2307/HH46-47_JWST1030.jpg" class="z-10 object-cover w-full h-full" alt="NASA starlight" />
    </div>
    <div class="relative flex flex-wrap items-center w-full h-full px-8">
      <div class="relative w-full max-w-sm mx-auto lg:mb-0">
        <div class="relative text-center">
          <div class="flex flex-col mb-6 space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight text-left">Quiz Completed</h1>
          </div>
          <div class="answers space-y-4">
            <button class="block w-full px-8 py-4 text-white rounded-md bg-gray-800 hover:bg-gray-700" on:click={backToHome}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="flex fixed inset-0 z-[99] w-screen h-screen bg-white">
    <div class="relative top-0 bottom-0 right-0 flex-shrink-0 hidden w-1/3 overflow-hidden bg-cover lg:block">
      <a href="#_" class="absolute bottom-0 left-0 z-30 inline-flex items-end mb-4 ml-3 font-sans text-2xl font-extrabold text-left text-white no-underline bg-transparent cursor-pointer group focus:no-underline">
        <span class="flex opacity-90 group-hover:scale-150 group-hover:opacity-100 items-center h-full group-hover:-rotate-6 ease-out duration-500 px-0.5 py-px ml-2 -translate-x-px text-[0.6rem] font-bold leading-none border-[2px] rounded border-white -translate-y-px">Musk's Mission 🚀</span>
      </a>
      <div class="absolute inset-0 z-20 w-full h-full opacity-70 bg-gradient-to-t from-black"></div>
      <img src="https://apod.nasa.gov/apod/image/2307/HH46-47_JWST1030.jpg" class="z-10 object-cover w-full h-full" alt="NASA starlight"/>
    </div>
    <div class="relative flex flex-wrap items-center w-full h-full px-8">
      <div class="relative w-full max-w-sm mx-auto lg:mb-0">
        <div class="relative text-center">
          <div class="flex flex-col mb-6 space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight text-left">{#if $loading}<div class="skeleton skeleton-text"></div>{:else}{selectedQuestion}{/if}</h1>
          </div>
          <p class="text-sm text-neutral-500 mb-4">Select the correct answer:</p>
          {#if $loading}
            <div class="skeleton skeleton-button"></div>
            <div class="skeleton skeleton-button"></div>
            <div class="skeleton skeleton-button"></div>
          {:else}
            <div class="answers space-y-4">
              {#each answers as answer, i}
                <button class="block w-full px-8 py-4 text-white rounded-md
                  {selectedAnswerIndex === i && selectedAnswer === correctAnswer ? 'correct' : 
                   selectedAnswerIndex === i && selectedAnswer !== correctAnswer ? 'incorrect' : 
                   selectedAnswer && answer === correctAnswer && selectedAnswer !== correctAnswer ? 'correct' : 
                   'bg-gray-800 hover:bg-gray-700'}" 
                  on:click={() => selectAnswer(answer, i)}>{answer}</button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
      <div class="dot-indicator w-full mt-6">
        {#each $progress as status, index (index)}
          <div class="dot {status === 'correct' ? 'correct' : status === 'incorrect' ? 'incorrect' : 'pending'}">
            {#if status === 'correct'}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            {:else if status === 'incorrect'}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            {:else}
              <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}