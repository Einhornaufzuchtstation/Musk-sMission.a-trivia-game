const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = 3000;

const apiKey = process.env.VITE_OPENAI_API_KEY;

let currentQuestion = {};
let questions = [];
let questionHistory = [];

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/api/question', (req, res) => {
  res.json(currentQuestion);
});

app.get('/api/questions', (req, res) => {
  res.json(questionHistory);
});

app.post('/api/question', async (req, res) => {
  try {
    console.log('Fetching SpaceX data...');
    const response = await axios.get('https://api.spacexdata.com/v3/capsules');
    questions = response.data.map(capsule => capsule.capsule_serial);

    console.log('Generating random question...');
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedCapsule = questions[randomIndex];

    const systemMessage = { role: 'system', content: 'You are a trivia game creator. Create a simple, interesting question with three different answer options about the SpaceX capsule data.' };
    const userMessage = { role: 'user', content: `Formulate a trivia question with three answer options based on the capsule with serial ${selectedCapsule}.` };

    console.log('Requesting OpenAI API...');
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, userMessage],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const botMessage = openaiResponse.data.choices[0].message.content.split('\n').filter(line => line.trim());
    let answers = [botMessage[1], ...botMessage.slice(2, 4)];
    answers = answers.map(answer => answer.replace(/^[A-C]\)\s*/, '')); // Remove prefixes
    const correctAnswer = answers[0];
    answers = answers.sort(() => Math.random() - 0.5); // Shuffle answers

    currentQuestion = {
      question: botMessage[0],
      correctAnswer: correctAnswer,
      answers: answers
    };

    questionHistory.push(currentQuestion);

    console.log('Question generated successfully:', currentQuestion);
    res.json(currentQuestion);
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/different-question', async (req, res) => {
  try {
    console.log('Fetching SpaceX mission data...');
    const response = await axios.get('https://api.spacexdata.com/v3/missions');
    questions = response.data.map(mission => mission.mission_name);

    console.log('Generating random question...');
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedMission = questions[randomIndex];

    const systemMessage = { role: 'system', content: 'You are a trivia game creator. Create a simple, interesting question with three different answer options about the SpaceX mission data.' };
    const userMessage = { role: 'user', content: `Formulate a trivia question with three answer options based on the mission named ${selectedMission}.` };

    console.log('Requesting OpenAI API...');
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, userMessage],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const botMessage = openaiResponse.data.choices[0].message.content.split('\n').filter(line => line.trim());
    let answers = [botMessage[1], ...botMessage.slice(2, 4)];
    answers = answers.map(answer => answer.replace(/^[A-C]\)\s*/, '')); // Remove prefixes
    const correctAnswer = answers[0];
    answers = answers.sort(() => Math.random() - 0.5); // Shuffle answers

    currentQuestion = {
      question: botMessage[0],
      correctAnswer: correctAnswer,
      answers: answers
    };

    questionHistory.push(currentQuestion);

    console.log('Question generated successfully:', currentQuestion);
    res.json(currentQuestion);
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/rocket-question', async (req, res) => {
  try {
    console.log('Fetching SpaceX rocket data...');
    const response = await axios.get('https://api.spacexdata.com/v3/rockets');
    questions = response.data.map(rocket => rocket.rocket_name);

    console.log('Generating random question...');
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedRocket = questions[randomIndex];

    const systemMessage = { role: 'system', content: 'You are a trivia game creator. Create a simple, interesting question with three different answer options about the SpaceX rocket data.' };
    const userMessage = { role: 'user', content: `Formulate a trivia question with three answer options based on the rocket named ${selectedRocket}.` };

    console.log('Requesting OpenAI API...');
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, userMessage],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const botMessage = openaiResponse.data.choices[0].message.content.split('\n').filter(line => line.trim());
    let answers = [botMessage[1], ...botMessage.slice(2, 4)];
    answers = answers.map(answer => answer.replace(/^[A-C]\)\s*/, '')); // Remove prefixes
    const correctAnswer = answers[0];
    answers = answers.sort(() => Math.random() - 0.5); // Shuffle answers

    currentQuestion = {
      question: botMessage[0],
      correctAnswer: correctAnswer,
      answers: answers
    };

    questionHistory.push(currentQuestion);

    console.log('Question generated successfully:', currentQuestion);
    res.json(currentQuestion);
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/ship-question', async (req, res) => {
  try {
    console.log('Fetching SpaceX ship data...');
    const response = await axios.get('https://api.spacexdata.com/v3/ships');
    questions = response.data.map(ship => ship.ship_name);

    console.log('Generating random question...');
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedShip = questions[randomIndex];

    const systemMessage = { role: 'system', content: 'You are a trivia game creator. Create a simple, interesting question with three different answer options about the SpaceX ship data.' };
    const userMessage = { role: 'user', content: `Formulate a trivia question with three answer options based on the ship named ${selectedShip}.` };

    console.log('Requesting OpenAI API...');
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, userMessage],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const botMessage = openaiResponse.data.choices[0].message.content.split('\n').filter(line => line.trim());
    let answers = [botMessage[1], ...botMessage.slice(2, 4)];
    answers = answers.map(answer => answer.replace(/^[A-C]\)\s*/, '')); // Remove prefixes
    const correctAnswer = answers[0];
    answers = answers.sort(() => Math.random() - 0.5); // Shuffle answers

    currentQuestion = {
      question: botMessage[0],
      correctAnswer: correctAnswer,
      answers: answers
    };

    questionHistory.push(currentQuestion);

    console.log('Question generated successfully:', currentQuestion);
    res.json(currentQuestion);
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});