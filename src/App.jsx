import { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { generateDailyWorkout, calculateStreak } from './utils/workoutAlgorithm';
import { DIFFICULTY } from './data/exercises';
import PinScreen from './components/PinScreen';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import WorkoutView from './components/WorkoutView';
import WorkoutPlayer from './components/WorkoutPlayer';
import Progress from './components/Progress';
import History from './components/History';
import Stats from './components/Stats';
import './App.css';

const DEFAULT_PIN = '2309';

function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useLocalStorage('fithome_pin', DEFAULT_PIN);

  // Navigation
  const [currentView, setCurrentView] = useState('dashboard');
  const [isPlayingWorkout, setIsPlayingWorkout] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);

  // User data
  const [difficulty, setDifficulty] = useLocalStorage('fithome_difficulty', DIFFICULTY.INTERMEDIATE);
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('fithome_history', []);
  const [weightHistory, setWeightHistory] = useLocalStorage('fithome_weight', []);
  const [userProfile, setUserProfile] = useLocalStorage('fithome_profile', {
    name: '',
    startWeight: 100,
    goalWeight: 85,
    height: 175
  });

  // Generate today's workout
  const todaysWorkout = generateDailyWorkout(new Date(), difficulty, 30);
  const streak = calculateStreak(workoutHistory);

  // Check if already completed today
  const todayStr = new Date().toISOString().split('T')[0];
  const completedToday = workoutHistory.some(w => w.date === todayStr);

  // Handle PIN authentication
  const handlePinSubmit = (enteredPin) => {
    if (enteredPin === pin) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Start workout
  const handleStartWorkout = (workout) => {
    setCurrentWorkout(workout || todaysWorkout);
    setIsPlayingWorkout(true);
  };

  // Complete workout
  const handleCompleteWorkout = (completedWorkout) => {
    const workoutRecord = {
      ...completedWorkout,
      completedAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    };
    setWorkoutHistory(prev => [...prev, workoutRecord]);
    setIsPlayingWorkout(false);
    setCurrentWorkout(null);
    setCurrentView('dashboard');
  };

  // Cancel workout
  const handleCancelWorkout = () => {
    setIsPlayingWorkout(false);
    setCurrentWorkout(null);
  };

  // Log weight
  const handleLogWeight = (weight) => {
    const entry = {
      weight: parseFloat(weight),
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };
    setWeightHistory(prev => {
      // Replace if same day, otherwise add
      const filtered = prev.filter(w => w.date !== entry.date);
      return [...filtered, entry].sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  };

  // Update difficulty
  const handleSetDifficulty = (level) => {
    setDifficulty(level);
  };

  // Show PIN screen if not authenticated
  if (!isAuthenticated) {
    return <PinScreen onSubmit={handlePinSubmit} />;
  }

  // Show workout player if playing
  if (isPlayingWorkout && currentWorkout) {
    return (
      <WorkoutPlayer
        workout={currentWorkout}
        onComplete={handleCompleteWorkout}
        onCancel={handleCancelWorkout}
      />
    );
  }

  // Render main app
  const renderCurrentView = () => {
    switch (currentView) {
      case 'workout':
        return (
          <WorkoutView
            todaysWorkout={todaysWorkout}
            difficulty={difficulty}
            onSetDifficulty={handleSetDifficulty}
            onStartWorkout={handleStartWorkout}
            completedToday={completedToday}
          />
        );
      case 'progress':
        return (
          <Progress
            weightHistory={weightHistory}
            onLogWeight={handleLogWeight}
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
          />
        );
      case 'history':
        return (
          <History
            workoutHistory={workoutHistory}
          />
        );
      case 'stats':
        return (
          <Stats
            workoutHistory={workoutHistory}
            weightHistory={weightHistory}
            userProfile={userProfile}
            streak={streak}
          />
        );
      default:
        return (
          <Dashboard
            todaysWorkout={todaysWorkout}
            streak={streak}
            completedToday={completedToday}
            weightHistory={weightHistory}
            workoutHistory={workoutHistory}
            onStartWorkout={handleStartWorkout}
            onNavigate={setCurrentView}
          />
        );
    }
  };

  return (
    <div className="app">
      <main className="app-main">
        {renderCurrentView()}
      </main>
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
}

export default App;
