const MOTIVATIONAL_QUOTES = [
    { quote: "Le seul mauvais entraînement est celui que tu n'as pas fait.", author: "Inconnu" },
    { quote: "Ton corps peut supporter presque tout. C'est ton esprit qu'il faut convaincre.", author: "Inconnu" },
    { quote: "La sueur, c'est juste la graisse qui pleure.", author: "Inconnu" },
    { quote: "La douleur d'aujourd'hui sera ta force de demain.", author: "Inconnu" },
    { quote: "Ne limite pas tes défis. Défie tes limites.", author: "Inconnu" },
    { quote: "Chaque entraînement est un pas vers ton objectif.", author: "Inconnu" },
    { quote: "Tombe amoureux de prendre soin de toi.", author: "Inconnu" }
];

function Dashboard({ todaysWorkout, streak, completedToday, weightHistory, workoutHistory, onStartWorkout, onNavigate }) {
    const today = new Date();
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(today.getDate() % MOTIVATIONAL_QUOTES.length)];

    // Get latest weight
    const latestWeight = weightHistory.length > 0
        ? weightHistory[weightHistory.length - 1].weight
        : '--';

    // Get this week's workout count
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeekWorkouts = workoutHistory.filter(w =>
        new Date(w.date) >= startOfWeek
    ).length;

    const getGreeting = () => {
        const hour = today.getHours();
        if (hour < 12) return 'Bonjour';
        if (hour < 18) return 'Bon après-midi';
        return 'Bonsoir';
    };

    return (
        <div className="page">
            <header className="page-header">
                <p className="page-subtitle">{dayNames[today.getDay()]} {today.getDate()} {monthNames[today.getMonth()]}</p>
                <h1 className="page-title">
                    <span className="gradient-text">{getGreeting()} !</span>
                </h1>
            </header>

            {/* Streak Display */}
            {streak > 0 && (
                <div className="streak-display animate-slide-up">
                    <span className="streak-icon">🔥</span>
                    <div className="streak-info">
                        <div className="streak-count">{streak} jours de suite !</div>
                        <div className="streak-label">Continue comme ça !</div>
                    </div>
                </div>
            )}

            {/* Today's Workout Card */}
            <section className="section" style={{ marginTop: 'var(--space-xl)' }}>
                <h2 className="section-title">Entraînement du jour</h2>
                <div className="workout-card animate-slide-up">
                    <div className="workout-card-header">
                        <div className="workout-icon">{todaysWorkout.type.icon}</div>
                        <div className="workout-info">
                            <h3>{todaysWorkout.type.nameFr || todaysWorkout.type.name}</h3>
                            <div className="workout-meta">
                                <span>⏱️ {todaysWorkout.estimatedDuration} min</span>
                                <span>🔥 ~{todaysWorkout.estimatedCalories} cal</span>
                            </div>
                        </div>
                    </div>

                    <div className="workout-exercises">
                        {todaysWorkout.exercises.slice(0, 3).map((exercise, index) => (
                            <div key={exercise.id} className="exercise-preview">
                                <span className="exercise-preview-number">{index + 1}</span>
                                <span>{exercise.nameFr || exercise.name}</span>
                            </div>
                        ))}
                        {todaysWorkout.exercises.length > 3 && (
                            <div className="exercise-preview" style={{ color: 'var(--text-muted)' }}>
                                <span className="exercise-preview-number">+</span>
                                <span>{todaysWorkout.exercises.length - 3} exercices de plus</span>
                            </div>
                        )}
                    </div>

                    {completedToday ? (
                        <div className="completed-badge">
                            ✓ Terminé aujourd'hui
                        </div>
                    ) : (
                        <button className="btn btn-primary btn-block btn-lg" onClick={() => onStartWorkout(todaysWorkout)}>
                            Commencer l'entraînement 💪
                        </button>
                    )}
                </div>
            </section>

            {/* Quick Stats */}
            <section className="section">
                <h2 className="section-title">Aperçu rapide</h2>
                <div className="stat-grid">
                    <div className="stat-card" onClick={() => onNavigate('progress')}>
                        <div className="stat-value">{latestWeight}</div>
                        <div className="stat-label">Poids actuel (kg)</div>
                    </div>
                    <div className="stat-card" onClick={() => onNavigate('history')}>
                        <div className="stat-value">{thisWeekWorkouts}</div>
                        <div className="stat-label">Entraînements cette semaine</div>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="section">
                <h2 className="section-title">Actions rapides</h2>
                <div className="quick-actions">
                    <button className="quick-action" onClick={() => onNavigate('progress')}>
                        <span className="quick-action-icon">⚖️</span>
                        <span className="quick-action-label">Noter mon poids</span>
                    </button>
                    <button className="quick-action" onClick={() => onNavigate('history')}>
                        <span className="quick-action-icon">📅</span>
                        <span className="quick-action-label">Voir le calendrier</span>
                    </button>
                </div>
            </section>

            {/* Motivation */}
            <section className="section">
                <div className="motivation-card">
                    <p className="motivation-quote">« {randomQuote.quote} »</p>
                    <p className="motivation-author">— {randomQuote.author}</p>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
