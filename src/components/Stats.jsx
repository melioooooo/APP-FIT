function Stats({ workoutHistory, weightHistory, userProfile, streak }) {
    const totalWorkouts = workoutHistory.length;
    const totalCalories = workoutHistory.reduce((sum, w) => sum + (w.estimatedCalories || 0), 0);
    const totalMinutes = workoutHistory.reduce((sum, w) => sum + (w.estimatedDuration || 0), 0);

    const startWeight = userProfile.startWeight || 100;
    const currentWeight = weightHistory.length > 0
        ? weightHistory[weightHistory.length - 1].weight
        : startWeight;
    const weightLost = startWeight - currentWeight;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const workoutsLast30Days = workoutHistory.filter(w => new Date(w.date) >= last30Days).length;
    const avgPerWeek = ((workoutsLast30Days / 30) * 7).toFixed(1);

    const typeBreakdown = workoutHistory.reduce((acc, w) => {
        const typeName = w.type?.nameFr || w.type?.name || 'Inconnu';
        acc[typeName] = (acc[typeName] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="page">
            <header className="page-header">
                <h1 className="page-title">Statistiques</h1>
                <p className="page-subtitle">Votre parcours fitness en chiffres</p>
            </header>

            {/* Streak Card */}
            {streak > 0 && (
                <section className="section">
                    <div className="streak-display">
                        <span className="streak-icon">🔥</span>
                        <div className="streak-info">
                            <div className="streak-count">{streak} jours consécutifs</div>
                            <div className="streak-label">Continuez comme ça !</div>
                        </div>
                    </div>
                </section>
            )}

            {/* Main Stats Grid */}
            <section className="section">
                <h2 className="section-title">Depuis le début</h2>
                <div className="stat-grid">
                    <div className="stat-card">
                        <div className="stat-value">{totalWorkouts}</div>
                        <div className="stat-label">Entraînements</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{totalMinutes}</div>
                        <div className="stat-label">Minutes d'effort</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{totalCalories}</div>
                        <div className="stat-label">Calories brûlées</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{weightLost > 0 ? weightLost.toFixed(1) : '0'}</div>
                        <div className="stat-label">Kg perdus</div>
                    </div>
                </div>
            </section>

            {/* Weekly Average */}
            <section className="section">
                <h2 className="section-title">Régularité</h2>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--accent-gradient)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 'var(--font-size-2xl)',
                            fontWeight: '700'
                        }}>
                            {avgPerWeek}
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600' }}>
                                Entraînements par semaine
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                Sur les 30 derniers jours
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workout Type Breakdown */}
            {Object.keys(typeBreakdown).length > 0 && (
                <section className="section">
                    <h2 className="section-title">Types d'entraînement</h2>
                    <div className="card">
                        {Object.entries(typeBreakdown)
                            .sort(([, a], [, b]) => b - a)
                            .map(([type, count]) => {
                                const percentage = (count / totalWorkouts) * 100;
                                return (
                                    <div key={type} style={{ marginBottom: 'var(--space-md)' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: 'var(--space-xs)'
                                        }}>
                                            <span>{type}</span>
                                            <span style={{ color: 'var(--text-muted)' }}>{count}</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'var(--bg-tertiary)',
                                            borderRadius: 'var(--radius-full)',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${percentage}%`,
                                                background: 'var(--accent-gradient)',
                                                borderRadius: 'var(--radius-full)'
                                            }} />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </section>
            )}

            {/* Weight Progress */}
            <section className="section">
                <h2 className="section-title">Évolution du poids</h2>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700' }}>
                                {startWeight}
                            </div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                                Départ (kg)
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: weightLost > 0 ? 'var(--accent-success)' : 'var(--text-muted)'
                        }}>
                            {weightLost > 0 ? '↓' : '→'} {Math.abs(weightLost).toFixed(1)} kg
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700' }}>
                                {currentWeight}
                            </div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                                Actuel (kg)
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: 'var(--space-lg)',
                        padding: 'var(--space-md)',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                    }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Objectif : </span>
                        <span style={{ fontWeight: '600' }}>{userProfile.goalWeight} kg</span>
                        <span style={{ color: 'var(--text-muted)' }}> (encore {(currentWeight - userProfile.goalWeight).toFixed(1)} kg)</span>
                    </div>
                </div>
            </section>

            {/* Achievements Preview */}
            <section className="section">
                <h2 className="section-title">Récompenses</h2>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-lg)', fontSize: '32px' }}>
                        {totalWorkouts >= 1 && <span title="Premier entraînement">🏅</span>}
                        {totalWorkouts >= 7 && <span title="7 entraînements">🥈</span>}
                        {totalWorkouts >= 30 && <span title="30 entraînements">🥇</span>}
                        {streak >= 7 && <span title="7 jours consécutifs">🔥</span>}
                        {weightLost >= 5 && <span title="5kg perdus">⭐</span>}
                    </div>
                    {totalWorkouts === 0 && (
                        <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-md)' }}>
                            Terminez des entraînements pour débloquer des récompenses !
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Stats;
