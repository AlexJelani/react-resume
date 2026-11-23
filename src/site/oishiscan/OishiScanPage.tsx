import React from 'react';
import { Link } from 'react-router-dom';
import { oishiscan, studio } from '../company';
import usePageTitle from '../usePageTitle';

const features = [
    {
        title: 'Scan a label, menu or dish',
        text: 'Point your camera at a nutrition box, a barcode, a menu or a plate. You get the English name, a short description and the calories.',
    },
    {
        title: 'Ingredients in English and Japanese',
        text: 'See the printed ingredient list (原材料名) translated, with the Japanese next to it so you can show staff.',
    },
    {
        title: 'Track protein, carbs and fat',
        text: 'Log what you eat in one tap and see your day against your own goals for calories and macros.',
    },
    {
        title: 'Japanese drinks and saved foods',
        text: 'Add matcha, hojicha, mugicha or coffee with a caffeine estimate, and save your konbini favorites to log again later.',
    },
];

const OishiScanPage: React.FC = () => {
    usePageTitle(oishiscan.name);
    return (
        <>
            <section className="hero jl-hero">
                <div className="wrap jl-hero-row">
                    <img src={oishiscan.icon} alt="" className="app-icon large" width={112} height={112} />
                    <div>
                        <p className="eyebrow">Coming soon to iPhone and Android</p>
                        <h1>{oishiscan.name}</h1>
                        <p className="lead">{oishiscan.tagline}</p>
                        <p className="studio-line on-dark">
                            <img src={studio.markOnDark} alt="" width={30} height={25} />
                            By {studio.name}
                        </p>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="wrap">
                    <p className="section-lead wide">
                        OishiScan helps people who live in or visit Japan understand what they eat. Scan a
                        konbini item, a menu or a dish, and see it in English with its calories, protein, carbs,
                        fat and ingredients. Then log it and keep track of your day.
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
                        <h2>Free to start</h2>
                        <p>
                            {oishiscan.freeScansPerDay} photo scans a day are free, and logging is always free.
                            OishiScan Pro gives unlimited scans (fair use: up to {oishiscan.proFairUsePerDay} a day) for{' '}
                            {oishiscan.proMonthly} or{' '}
                            {oishiscan.proYearly}, with a {oishiscan.trialDays}-day free trial.
                        </p>
                        <Link to="/oishiscan/terms">Read the Terms of Use</Link>
                    </div>
                    <div>
                        <h2>Your data stays yours</h2>
                        <p>
                            No ads, and we never sell your data. You can delete your account and everything in it
                            from inside the app.
                        </p>
                        <Link to="/oishiscan/privacy">Read the Privacy Policy</Link>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="wrap narrow center">
                    <h2>Need help?</h2>
                    <p>Questions about the app, or a scan that came out wrong? We'd love to hear from you.</p>
                    <Link className="button" to="/oishiscan/support">
                        Get support
                    </Link>
                </div>
            </section>
        </>
    );
};

export default OishiScanPage;
