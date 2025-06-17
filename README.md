# 🐎 Horse Racing App

A dynamic horse racing game built with Nuxt 3(Nuxt 4 opt-in), featuring 20 horses competing across 6 rounds with real-time animations and progressive race distances.

## ✨ Features

### 🏇 Racing System
- **20 Unique Horses** - Each with individual conditions, colors, and win tracking
- **6-Round Tournament** - Progressive distances from 1200m to 2200m
- **Dynamic Race Duration** - Longer races take more time to complete
- **Random Horse Selection** - 10 horses compete per race
- **Real-time Animation** - Smooth horse movement using requestAnimationFrame

### 🎮 Game Mechanics
- **Horse Conditions** - Affects race performance (1-100 rating)
- **Win Tracking** - Persistent win counts across all races
- **Race Results** - Display winners and times after each round
- **Tournament Progression** - Automatic advancement through 6 rounds

### 🎨 User Interface
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Real-time Updates** - Live race positions and results
- **Visual Race Track** - Animated lanes with finish line
- **Race Schedule** - Overview of all 6 rounds with completion status

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd horse-race-app

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Visit `http://localhost:3000` to see the application.

You can also see the live demo at [Horse Racing App](https://horse-race-app.muratnarin.workers.dev/).

## 🎯 How to Play

1. **Generate Program** - Click to create a 6-round race schedule
2. **Start Racing** - Begin the tournament (races run automatically)
3. **Watch Races** - Enjoy real-time horse animations
4. **View Results** - See winners and race times after each round
5. **Reset** - Start a new tournament anytime

## 🏗️ Project Structure

```
📁 components/
├── 🐎 HorseList.vue      # Display all 20 horses with stats
├── 🏁 RaceTrack.vue      # Animated race visualization
├── 📊 Results.vue        # Race results and winners
└── ⚡ TopBar.vue         # Game controls and schedule

📁 stores/
└── 🎲 racing.js          # Pinia store - all game logic

📁 pages/
└── 🏠 index.vue          # Main game page

📁 tests/
└── 🧪 racing.test.js     # Store unit tests
```

## 🛠️ Technologies

- **Framework**: [Nuxt 3](https://nuxt.com/) - Vue.js meta-framework
- **UI Components**: [Nuxt UI](https://ui.nuxt.com/) - Tailwind-based components
- **State Management**: [Pinia](https://pinia.vuejs.org/) - Vue store
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Testing**: [Vitest](https://vitest.dev/) - Fast unit testing
- **Animation**: Native requestAnimationFrame for smooth performance

## 🧪 Testing

### Run Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode  
pnpm test:watch

# Run specific test file
pnpm test tests/racing.test.js
```

### Test Coverage
- ✅ Horse initialization (20 horses with proper attributes)
- ✅ Race schedule generation (6 rounds, correct distances)
- ✅ Dynamic duration calculation
- ✅ Random horse selection (10 per race)
- ✅ Store state management

---

**Enjoy the races! 🏆**