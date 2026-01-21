import { useState, useEffect, useCallback } from 'react';
import './WorkoutPlayer.css';

function WorkoutPlayer({ workout, onComplete, onCancel }) {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [isResting, setIsResting] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [completedExercises, setCompletedExercises] = useState([]);

    const currentExercise = workout.exercises[currentExerciseIndex];
    const totalExercises = workout.exercises.length;
    const totalSets = currentExercise?.sets || 1;
    const restTime = currentExercise?.restBetweenSets || 30;

    // Timer effect
    useEffect(() => {
        let interval = null;
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (isResting) {
                        if (prev <= 1) {
                            setIsResting(false);
                            return currentExercise.isTimeBased ? currentExercise.duration : 0;
                        }
                        return prev - 1;
                    } else if (currentExercise.isTimeBased) {
                        if (prev <= 1) {
                            handleSetComplete();
                            return 0;
                        }
                        return prev - 1;
                    } else {
                        return prev + 1;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, isPaused, isResting, currentExercise]);

    const startWorkout = useCallback(() => {
        setIsRunning(true);
        setTimer(currentExercise.isTimeBased ? currentExercise.duration : 0);
    }, [currentExercise]);

    useEffect(() => {
        startWorkout();
    }, []);

    const handleSetComplete = () => {
        if (currentSet < totalSets) {
            setCurrentSet(prev => prev + 1);
            setIsResting(true);
            setTimer(restTime);
        } else {
            setCompletedExercises(prev => [...prev, currentExerciseIndex]);

            if (currentExerciseIndex < totalExercises - 1) {
                setCurrentExerciseIndex(prev => prev + 1);
                setCurrentSet(1);
                setIsResting(true);
                setTimer(restTime);
            } else {
                handleWorkoutComplete();
            }
        }
    };

    const handleSkip = () => {
        if (isResting) {
            setIsResting(false);
            const nextExercise = workout.exercises[currentExerciseIndex];
            setTimer(nextExercise.isTimeBased ? nextExercise.duration : 0);
        } else {
            handleSetComplete();
        }
    };

    const handleWorkoutComplete = () => {
        setIsRunning(false);
        onComplete({
            ...workout,
            exercisesCompleted: completedExercises.length + 1,
            totalExercises
        });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const overallProgress = ((currentExerciseIndex / totalExercises) * 100);

    return (
        <div className="workout-player">
            {/* Header */}
            <div className="player-header">
                <button className="player-cancel" onClick={onCancel}>✕</button>
                <div className="player-progress-text">
                    Exercice {currentExerciseIndex + 1} sur {totalExercises}
                </div>
                <div style={{ width: 40 }} />
            </div>

            {/* Progress Bar */}
            <div className="player-progress-bar">
                <div
                    className="player-progress-fill"
                    style={{ width: `${overallProgress}%` }}
                />
            </div>

            {/* Main Content */}
            <div className="player-content">
                {isResting ? (
                    <div className="rest-screen animate-fade-in">
                        <div className="rest-label">REPOS</div>
                        <div className="rest-timer">{formatTime(timer)}</div>
                        <p className="rest-next">
                            Prochain : {workout.exercises[currentExerciseIndex]?.nameFr || workout.exercises[currentExerciseIndex]?.name}
                            {currentSet <= totalSets && ` (Série ${currentSet}/${totalSets})`}
                        </p>
                        <button className="btn btn-secondary" onClick={handleSkip}>
                            Passer le repos →
                        </button>
                    </div>
                ) : (
                    <div className="exercise-screen animate-fade-in">
                        <div className="exercise-icon-large">
                            {currentExercise.muscleGroup === 'cardio' ? '🏃' :
                                currentExercise.muscleGroup === 'upper' ? '💪' :
                                    currentExercise.muscleGroup === 'lower' ? '🦵' :
                                        currentExercise.muscleGroup === 'core' ? '🔥' : '🏋️'}
                        </div>

                        <h2 className="exercise-title">{currentExercise.nameFr || currentExercise.name}</h2>

                        <div className="exercise-set-indicator">
                            Série {currentSet} sur {totalSets}
                        </div>

                        <div className="exercise-timer-display">
                            {currentExercise.isTimeBased ? (
                                <div className="timer-countdown">{formatTime(timer)}</div>
                            ) : (
                                <div className="timer-reps">{currentExercise.reps} reps</div>
                            )}
                        </div>

                        <div className="exercise-instructions">
                            {currentExercise.instructions?.map((instruction, i) => (
                                <p key={i}>{instruction}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="player-controls">
                {!isResting && (
                    <>
                        <button
                            className="control-btn pause"
                            onClick={() => setIsPaused(!isPaused)}
                        >
                            {isPaused ? '▶️' : '⏸️'}
                        </button>

                        {!currentExercise.isTimeBased && (
                            <button
                                className="control-btn done"
                                onClick={handleSetComplete}
                            >
                                Terminé ✓
                            </button>
                        )}

                        <button
                            className="control-btn skip"
                            onClick={handleSkip}
                        >
                            Passer →
                        </button>
                    </>
                )}
            </div>

            {/* Exercise List Preview */}
            <div className="player-exercise-list">
                {workout.exercises.map((ex, idx) => (
                    <div
                        key={ex.id}
                        className={`player-exercise-item ${idx < currentExerciseIndex ? 'done' :
                                idx === currentExerciseIndex ? 'current' : ''
                            }`}
                    >
                        <span className="player-exercise-dot" />
                        <span className="player-exercise-name">{ex.nameFr || ex.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutPlayer;
