import React from 'react';
import { Button } from 'primereact/button';
import '../CSS/GlobalHomePage.scss';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">Road Ready Rentals</h1>
                <div className="home-actions">
                    <Button label="Login" className="p-button-primary" onClick={() => navigate('/login')} />
                    <Button label="Join as Lender" className="p-button-success p-button-outlined" onClick={() => navigate('/register-lender')} />
                </div>
            </header>

            <main className="home-main">
                <div className="info-card">
                    <h2>Affordable Rentals, Reliable Cars</h2>
                    <p>
                        Experience seamless car rentals with top-quality vehicles and trusted lenders. Whether you're a traveler, a commuter, or a car owner looking to earn, Road Ready is your perfect ride-sharing partner.
                    </p>
                </div>
            </main>
        </div>
    );
}
