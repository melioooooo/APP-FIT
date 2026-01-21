import './Navigation.css';

function Navigation({ currentView, onNavigate }) {
    const navItems = [
        { id: 'dashboard', icon: '🏠', label: 'Accueil' },
        { id: 'workout', icon: '💪', label: 'Entraînement' },
        { id: 'progress', icon: '⚖️', label: 'Progrès' },
        { id: 'history', icon: '📅', label: 'Historique' },
        { id: 'stats', icon: '📊', label: 'Stats' }
    ];

    return (
        <nav className="navigation">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}

export default Navigation;
