import { useState } from 'react';
import './PinScreen.css';

function PinScreen({ onSubmit }) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleDigitClick = (digit) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setError(false);

            if (newPin.length === 4) {
                setTimeout(() => {
                    const success = onSubmit(newPin);
                    if (!success) {
                        setError(true);
                        setShake(true);
                        setTimeout(() => {
                            setPin('');
                            setShake(false);
                        }, 500);
                    }
                }, 100);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
        setError(false);
    };

    return (
        <div className="pin-screen">
            <div className="pin-content">
                <div className="pin-header">
                    <div className="pin-logo">💪</div>
                    <h1 className="pin-title">FitMaison</h1>
                    <p className="pin-subtitle">Entrez votre code PIN</p>
                </div>

                <div className={`pin-dots ${shake ? 'shake' : ''} ${error ? 'error' : ''}`}>
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`pin-dot ${pin.length > i ? 'filled' : ''}`}
                        />
                    ))}
                </div>

                {error && <p className="pin-error">Code PIN incorrect</p>}

                <div className="pin-keypad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((key, index) => (
                        <button
                            key={index}
                            className={`pin-key ${key === null ? 'empty' : ''} ${key === 'del' ? 'delete' : ''}`}
                            onClick={() => {
                                if (key === 'del') handleDelete();
                                else if (key !== null) handleDigitClick(key.toString());
                            }}
                            disabled={key === null}
                        >
                            {key === 'del' ? '⌫' : key}
                        </button>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default PinScreen;
