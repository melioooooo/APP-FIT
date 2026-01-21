import { useState } from 'react';

function Progress({ weightHistory, onLogWeight, userProfile, onUpdateProfile }) {
    const [newWeight, setNewWeight] = useState('');
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [tempProfile, setTempProfile] = useState(userProfile);

    const handleSubmitWeight = (e) => {
        e.preventDefault();
        if (newWeight && parseFloat(newWeight) > 0) {
            onLogWeight(newWeight);
            setNewWeight('');
        }
    };

    const handleSaveProfile = () => {
        onUpdateProfile(tempProfile);
        setShowProfileEdit(false);
    };

    const latestWeight = weightHistory.length > 0
        ? weightHistory[weightHistory.length - 1].weight
        : userProfile.startWeight;

    const startWeight = userProfile.startWeight || 100;
    const goalWeight = userProfile.goalWeight || 85;
    const weightLost = startWeight - latestWeight;
    const weightToGo = latestWeight - goalWeight;
    const progressPercent = Math.min(100, Math.max(0, (weightLost / (startWeight - goalWeight)) * 100));

    const weights = weightHistory.map(w => w.weight);
    const minWeight = weights.length > 0 ? Math.min(...weights) - 2 : goalWeight - 5;
    const maxWeight = weights.length > 0 ? Math.max(...weights) + 2 : startWeight + 5;
    const range = maxWeight - minWeight;

    return (
        <div className="page">
            <header className="page-header">
                <h1 className="page-title">Progrès</h1>
                <p className="page-subtitle">Suivez votre parcours de perte de poids</p>
            </header>

            {/* Current Weight Card */}
            <section className="section">
                <div className="workout-card">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>
                            Poids actuel
                        </div>
                        <div className="stat-value" style={{ fontSize: 'var(--font-size-4xl)' }}>
                            {latestWeight} <span style={{ fontSize: 'var(--font-size-xl)' }}>kg</span>
                        </div>
                        {weightLost > 0 && (
                            <div style={{ color: 'var(--accent-success)', marginTop: 'var(--space-sm)' }}>
                                ↓ {weightLost.toFixed(1)} kg perdus
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Log Weight */}
            <section className="section">
                <h2 className="section-title">Noter le poids du jour</h2>
                <form onSubmit={handleSubmitWeight}>
                    <div className="weight-input-group">
                        <input
                            type="number"
                            step="0.1"
                            min="30"
                            max="300"
                            className="input"
                            placeholder="Entrez votre poids en kg"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </section>

            {/* Progress to Goal */}
            <section className="section">
                <h2 className="section-title">Progression vers l'objectif</h2>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
                        <div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Départ</div>
                            <div style={{ fontWeight: '600' }}>{startWeight} kg</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Objectif</div>
                            <div style={{ fontWeight: '600' }}>{goalWeight} kg</div>
                        </div>
                    </div>

                    <div style={{
                        height: '12px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                        marginBottom: 'var(--space-md)'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${progressPercent}%`,
                            background: 'var(--accent-gradient)',
                            borderRadius: 'var(--radius-full)',
                            transition: 'width 0.5s ease'
                        }} />
                    </div>

                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                        {weightToGo > 0 ? (
                            <span>Encore {weightToGo.toFixed(1)} kg ! 💪</span>
                        ) : (
                            <span>🎉 Objectif atteint ! Félicitations !</span>
                        )}
                    </div>
                </div>
            </section>

            {/* Weight Chart */}
            <section className="section">
                <h2 className="section-title">Historique du poids</h2>
                <div className="chart-container">
                    {weightHistory.length > 0 ? (
                        <div className="simple-chart">
                            {weightHistory.slice(-14).map((entry, index) => {
                                const height = ((entry.weight - minWeight) / range) * 100;
                                return (
                                    <div
                                        key={entry.date}
                                        className="chart-bar"
                                        style={{
                                            height: `${Math.max(10, height)}%`,
                                            opacity: 0.5 + (index / 28)
                                        }}
                                        title={`${entry.date}: ${entry.weight} kg`}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="chart-placeholder">
                            <div style={{ fontSize: '48px', marginBottom: 'var(--space-md)' }}>📊</div>
                            <p>Enregistrez votre poids pour voir votre courbe de progression</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Goals Section */}
            <section className="section">
                <h2 className="section-title">Vos objectifs</h2>
                {!showProfileEdit ? (
                    <div className="card">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Poids de départ</span>
                                <span style={{ fontWeight: '600' }}>{userProfile.startWeight} kg</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Poids objectif</span>
                                <span style={{ fontWeight: '600' }}>{userProfile.goalWeight} kg</span>
                            </div>
                            <button
                                className="btn btn-secondary btn-block"
                                onClick={() => {
                                    setTempProfile(userProfile);
                                    setShowProfileEdit(true);
                                }}
                            >
                                Modifier les objectifs
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <div className="profile-form">
                            <div className="form-group">
                                <label className="form-label">Poids de départ (kg)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={tempProfile.startWeight}
                                    onChange={(e) => setTempProfile({ ...tempProfile, startWeight: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Poids objectif (kg)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={tempProfile.goalWeight}
                                    onChange={(e) => setTempProfile({ ...tempProfile, goalWeight: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowProfileEdit(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1 }}
                                    onClick={handleSaveProfile}
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Progress;
