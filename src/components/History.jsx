import { useState } from 'react';

function History({ workoutHistory }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const days = [];

        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push({ empty: true, key: `empty-${i}` });
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const hasWorkout = workoutHistory.some(w => w.date === dateStr);
            const isToday = date.getTime() === today.getTime();

            days.push({
                day,
                date: dateStr,
                hasWorkout,
                isToday,
                isCurrentMonth: true,
                key: dateStr
            });
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    const recentWorkouts = [...workoutHistory]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (dateStr === today.toISOString().split('T')[0]) return "Aujourd'hui";
        if (dateStr === yesterday.toISOString().split('T')[0]) return 'Hier';

        return date.toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="page">
            <header className="page-header">
                <h1 className="page-title">Historique</h1>
                <p className="page-subtitle">Votre parcours d'entraînement</p>
            </header>

            {/* Calendar */}
            <section className="section">
                <div className="calendar-nav">
                    <button className="calendar-nav-btn" onClick={prevMonth}>←</button>
                    <span className="calendar-month">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button className="calendar-nav-btn" onClick={nextMonth}>→</button>
                </div>

                <div className="card">
                    <div className="calendar-header">
                        {dayNames.map(day => (
                            <div key={day} className="calendar-day-name">{day}</div>
                        ))}
                    </div>

                    <div className="calendar-grid">
                        {calendarDays.map((day) => (
                            <div
                                key={day.key}
                                className={`calendar-day ${day.empty ? 'empty' : ''
                                    } ${day.isCurrentMonth ? 'current-month' : ''} ${day.isToday ? 'today' : ''
                                    } ${day.hasWorkout ? 'has-workout' : ''}`}
                            >
                                {!day.empty && day.day}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Workouts */}
            <section className="section">
                <h2 className="section-title">Entraînements récents</h2>
                {recentWorkouts.length > 0 ? (
                    <div className="history-list">
                        {recentWorkouts.map((workout, index) => (
                            <div key={`${workout.date}-${index}`} className="history-item">
                                <div className="history-item-header">
                                    <span className="history-date">{formatDate(workout.date)}</span>
                                    <span className="history-type">{workout.type?.icon} {workout.type?.nameFr || workout.type?.name}</span>
                                </div>
                                <div className="history-stats">
                                    <span>⏱️ {workout.estimatedDuration} min</span>
                                    <span>🔥 ~{workout.estimatedCalories} cal</span>
                                    <span>💪 {workout.exercises?.length || 0} exercices</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📅</div>
                        <p className="empty-state-text">Aucun entraînement pour l'instant</p>
                        <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-sm)' }}>
                            Terminez votre premier entraînement pour le voir apparaître ici !
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default History;
