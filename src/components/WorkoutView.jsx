import { DIFFICULTY } from '../data/exercises';
import { getDifficultyLabel } from '../utils/workoutAlgorithm';

const DIFFICULTY_LABELS_FR = {
    [DIFFICULTY.BEGINNER]: 'Débutant',
    [DIFFICULTY.INTERMEDIATE]: 'Intermédiaire',
    [DIFFICULTY.ADVANCED]: 'Avancé'
};

function WorkoutView({ todaysWorkout, difficulty, onSetDifficulty, onStartWorkout, completedToday }) {
    return (
        <div className="page">
            <header className="page-header">
                <h1 className="page-title">Entraînement du jour</h1>
                <p className="page-subtitle">{todaysWorkout.type.nameFr || todaysWorkout.type.name} • {todaysWorkout.estimatedDuration} minutes</p>
            </header>

            {/* Difficulty Selector */}
            <section className="section">
                <h2 className="section-title">Niveau de difficulté</h2>
                <div className="difficulty-selector">
                    {[DIFFICULTY.BEGINNER, DIFFICULTY.INTERMEDIATE, DIFFICULTY.ADVANCED].map((level) => (
                        <button
                            key={level}
                            className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                            onClick={() => onSetDifficulty(level)}
                        >
                            {DIFFICULTY_LABELS_FR[level]}
                        </button>
                    ))}
                </div>
            </section>

            {/* Workout Overview */}
            <section className="section">
                <div className="workout-card">
                    <div className="workout-card-header">
                        <div className="workout-icon">{todaysWorkout.type.icon}</div>
                        <div className="workout-info">
                            <h3>{todaysWorkout.type.nameFr || todaysWorkout.type.name}</h3>
                            <div className="workout-meta">
                                <span>⏱️ {todaysWorkout.estimatedDuration} min</span>
                                <span>🔥 ~{todaysWorkout.estimatedCalories} cal</span>
                                <span>💪 {todaysWorkout.exercises.length} exercices</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exercise List */}
            <section className="section">
                <h2 className="section-title">Exercices</h2>
                <div className="exercise-list">
                    {todaysWorkout.exercises.map((exercise, index) => (
                        <div key={exercise.id} className="exercise-item">
                            <div className="exercise-number">{index + 1}</div>
                            <div className="exercise-details">
                                <div className="exercise-name">
                                    {exercise.isWarmup && '🔥 '}
                                    {exercise.nameFr || exercise.name}
                                </div>
                                <div className="exercise-sets">
                                    {exercise.isTimeBased
                                        ? `${exercise.duration}s × ${exercise.sets} séries`
                                        : `${exercise.reps} reps × ${exercise.sets} séries`
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Start Button */}
            <section className="section">
                {completedToday ? (
                    <div style={{ textAlign: 'center' }}>
                        <div className="completed-badge" style={{ marginBottom: 'var(--space-md)' }}>
                            ✓ Entraînement terminé aujourd'hui !
                        </div>
                        <button
                            className="btn btn-secondary btn-block btn-lg"
                            onClick={() => onStartWorkout(todaysWorkout)}
                        >
                            Le refaire 🔄
                        </button>
                    </div>
                ) : (
                    <button
                        className="btn btn-primary btn-block btn-lg animate-glow"
                        onClick={() => onStartWorkout(todaysWorkout)}
                    >
                        Commencer l'entraînement 💪
                    </button>
                )}
            </section>
        </div>
    );
}

export default WorkoutView;
