# 🐍🎲 Snakes and Ladders - React Game

A dynamic and responsive multiplayer **Snakes and Ladders** web game built with **React**. Enjoy a modern, colorful twist on the classic board game, featuring animated pawn movement, persistent state, and support for up to **5 players**, each with **2 pawns**.

**Demo:** [snake-and-ladders-game.vercel.app](https://snake-and-ladders-game.vercel.app/)

---

## 📌 Project Overview

A web-based reimagining of the traditional Snakes and Ladders board game using modern frontend technologies.

### 🎮 Features

- Dynamic **10x10 game board** (cells 1–100)
- **Random generation** of 9 snakes and 9 ladders per session
- **Up to 5 players**, each with **2 distinct pawns**
- Turn-based dice rolling and pawn selection
- Snake and ladder logic (slide down, climb up)
- **Animated pawn movements** and interaction effects
- **Win condition** with victory popup
- **Persistent state** using `localStorage` to resume after refresh
- **Dice and Pawn** have sound and vibration features

---

## ⚙️ Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/snakes-and-ladders.git
cd snakes-and-ladders
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

> The game will now be running at [http://localhost:5173/](http://localhost:5173/).

---

## 🎲 How to Play

1. Choose the number of players (up to 5).
2. Each player gets 2 pawns.
3. Click the "Roll Dice" button or the dice itself to begin your turn.
4. Choose one of your pawns to move the number of spaces rolled.
5. If a pawn lands on:
  - The head of a snake, it slides down.
  - The bottom of a ladder, it climbs up.
6. First player to reach square 100 with any pawn wins.
7. Click **Restart** after the win screen to begin a new game with the same snake and ladder positions.

---

## 🧠 Technical Details

### 🛠️ Tech Stack

- **ReactJS (TypeScript)** – Frontend framework
- **Tailwind CSS** – Utility-first CSS for responsive design
- **React Hooks** – `useState`, `useEffect`, `useReducer`, `useContext` for state management
- **localStorage** – Game persistence across refreshes
- **CSS transitions** – Pawn and dice animations
- **AutoAnimate** – Smooth form animations

### 📁 Folder Structure & Component Responsibilities

<details>
<summary><strong>components/</strong></summary>

- **BackModal.tsx**: Modal for returning to the main menu or canceling the game
- **Dice.tsx & Dice.css**: Dice rolling functionality and animation (shows 1–6)
- **GameBoard.tsx**: Renders the 10x10 board, snakes, ladders, and player pawns
- **GameSetupModal.tsx**: Modal for selecting players and starting the game
- **PawnOverlay.tsx**: Renders pawns on board cells; manages selection logic
- **WinModal.tsx**: Displays the winner and options to play again or return to menu

</details>

<details>
<summary><strong>context/</strong></summary>

- **GameContext.tsx**: Manages and shares global game state (players, board, turn, settings)

</details>

<details>
<summary><strong>routes/</strong></summary>

- **MainMenu.tsx**: Entry screen with options to start the game and view rules
- **Game.tsx**: Main game route; brings together board, dice, overlays, and gameplay logic

</details>

<details>
<summary><strong>types/</strong></summary>

- **index.ts**: Centralized TypeScript interfaces and types (Player, Pawn, Snake, Ladder, BoardCell)

</details>

<details>
<summary><strong>utils/</strong></summary>

- **boardGenerator.ts**: Generates 9 snakes and 9 ladders with constraints (no overlap/duplicates)
- **position.ts**: Calculates board coordinates (cell index to grid/screen position)
- **storage.ts**: Persists and retrieves game data from localStorage

</details>

<details>
<summary><strong>Root Files</strong></summary>

- **App.tsx**: Main application wrapper; defines routing and layout
- **main.tsx**: App entry point; renders the app into the DOM
- **App.css / index.css**: Global styles and Tailwind CSS customizations

</details>

### ✨ Optional Enhancements Implemented

- ✅ Animated pawn movement using transitions
- ✅ Dice roll bounce animation
- ✅ localStorage persistence — reload the page and resume your game
- ✅ Victory modal with confetti (optional)
- ✅ Responsive UI for mobile and tablet support
- ✅ Highlight current player visually
