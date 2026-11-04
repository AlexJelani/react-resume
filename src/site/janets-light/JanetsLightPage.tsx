import React from 'react';
import { Link } from 'react-router-dom';
import { janetsLight } from '../company';
import usePageTitle from '../usePageTitle';

const features = [
    {
        title: 'Learn the cancers that matter most',
        text: 'Plain-language guides to breast, cervical, uterine, ovarian, colorectal and lung cancer.',
    },
    {
        title: 'Check your signs and screenings',
        text: 'A short check-in shows when something is worth getting checked and which screenings you may be due for.',
    },
    {
        title: 'Find low-cost care nearby',
        text: 'A map of community health centers, with phone numbers and directions.',
    },
    {
        title: 'Reminders and a visit summary',
        text: 'Gentle reminders, plus a summary you can bring to your doctor if you choose.',
    },
];

const JanetsLightPage: React.FC = () => {
    usePageTitle(janetsLight.name);
    return (
        <>
            <section className="hero jl-hero">
                <div className="wrap jl-hero-row">
                    <img src={janetsLight.icon} alt="" className="app-icon large" width={112} height={112} />
                    <div>
                        <p className="eyebrow">Free app · Coming soon to iPhone and Android</p>
                        <h1>{janetsLight.name}</h1>
                        <p className="lead">{janetsLight.tagline}</p>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="wrap">
                    <p className="section-lead wide">
                        Janet's Light helps women, especially Black women, learn the cancers that affect them
                        most, check their warning signs and screening needs, and find low-cost care nearby. It
                        is named for our founder's mother, Janet, whose cancer was found too late.
                    </p>
                    <div className="service-grid">
                        {features.map((f) => (
                            <div className="card" key={f.title}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section alt">
                <div className="wrap two-col">
                    <div>
                        <h2>Private by design</h2>
                        <p>
                            No account. No ads. Your answers stay on your phone and are never sold or shared.
                        </p>
                        <Link to="/janets-light/privacy">Read the Privacy Policy</Link>
                    </div>
                    <div>
                        <h2>Information, not a diagnosis</h2>
                        <p>
                            Results follow public screening guidelines from the USPSTF and the American Cancer
                            Society. Only a health professional can tell you what is going on.
                        </p>
                        <Link to="/janets-light/terms">Read the Terms of Use</Link>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="wrap narrow center">
                    <h2>Need help?</h2>
                    <p>Questions about the app, or found something wrong? We'd love to hear from you.</p>
                    <Link className="button" to="/janets-light/support">
                        Get support
                    </Link>
                </div>
            </section>
        </>
    );
};

export default JanetsLightPage;
