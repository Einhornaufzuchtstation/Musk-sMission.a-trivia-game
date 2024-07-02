# SpaceX Trivia Game

This is a SpaceX-themed trivia game that tests your knowledge about SpaceX capsules, missions, rockets, and ships. The game features multiple levels, each with a different category of questions. This project is built using Svelte for the front end and Node.js with Express for the back end.

## Features

- **Multiple Levels**: Trivia questions about SpaceX capsules, missions, rockets, and ships.
- **Dynamic Questions**: Questions are dynamically generated using OpenAI's GPT-3.5 API.
- **Intuitive User Interface**: The game offers an intuitive and user-friendly interface, making it easy and enjoyable to play.
- **Progress Tracking**: Track your progress and see which questions you answered correctly or incorrectly.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Confetti Celebration**: Enjoy a confetti celebration for correct answers.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Packages Needed

Make sure you have the following npm packages installed:

- `express`
- `axios`
- `cors`
- `dotenv`
- `svelte`
- `svelte-spa-router`
- `canvas-confetti`

You can install these packages using the following commands:

```bash
npm install express axios cors dotenv
npm install --save svelte svelte-spa-router canvas-confetti
```

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Einhornaufzuchtstation/Musk-sMission.a-trivia-game.git
cd Musk-sMission.a-trivia-game
```

2. Install the dependencies:

```bash
npm install
```

3. Set up your environment variables:

Create a `.env` file in the root directory and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the server:

```bash
node server.cjs
```

5. Start the development server for the front end:

In another terminal window, run:

```bash
npm run dev
```

### Running the Game

By default, the game runs on `http://localhost:5000`. If the port is occupied or you need to run it on a different port, you can configure it accordingly.

## API Endpoints

The server provides several endpoints for generating trivia questions:

- **Actual Question**: `/api/question
- **Generated Questions History**: `/api/questions`

The **Generated Questions History** endpoint provides a human-readable output of all generated questions.

Each endpoint fetches data from the SpaceX API, generates a trivia question using the OpenAI API, and returns a question with three answer options.

### How the API Works

1. **Fetching Data**: Each API endpoint fetches relevant data from the SpaceX API.
2. **Generating Questions**: A trivia question is generated using the OpenAI API based on the fetched data.
3. **Formatting Answers**: The answers are shuffled and formatted without prefixes.
4. **Responding to Requests**: The generated question, correct answer, and answer options are sent back as a JSON response.

## Project Structure

- **src/**: Contains the Svelte components and front-end logic.
  - **components/**: Individual Svelte components for the game.
  - **routes/**: Svelte routes for different pages of the game.
- **public/**: Static files.
- **server.cjs**: Node.js server file that handles API requests.
- **.env**: Environment variables file (not included in the repository, must be created).

## Usage

### Starting the Server

To start the server, run:

```bash
node server.cjs
```

This command starts the backend server which listens on port 3000 by default.

### Starting the Frontend

To start the frontend development server, run:

```bash
npm run dev
```

This command starts the frontend development server which listens on port 5000 by default.

### Accessing the Game

Open your web browser and navigate to:

```bash
http://localhost:5000
```

### Accessing the API

To access the generated questions, you can use the following endpoint:

```bash
http://localhost:3000/api/questions
```

This endpoint provides a human-readable output of all generated questions.

## License

This project is licensed under the EULA License.

---

Enjoy the game and may your knowledge of SpaceX be out of this world! 🚀

For more information and to contribute, please visit the [GitHub repository](https://github.com/Einhornaufzuchtstation/Musk-sMission.a-trivia-game).
