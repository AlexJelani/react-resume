import React from 'react';
import { Link } from 'react-router-dom';
import { janetsLight } from '../company';
import usePageTitle from '../usePageTitle';

const faqs: { q: string; a: React.ReactNode }[] = [
    {
        q: 'Does Janet\'s Light tell me if I have cancer?',
        a: 'No. It shares health information and tells you when something is worth getting checked or when a screening may be due. Only a doctor or nurse can tell you what is going on.',
    },
    {
        q: 'Where are my answers saved?',
        a: 'Only on your phone. We cannot see them, and there is no account.',
    },
    {
        q: 'How do I delete my history?',
        a: 'Open the History screen in the app and tap Delete. Deleting the app also deletes everything it saved.',
    },
    {
        q: 'A health center listing is wrong. What should I do?',
        a: 'Listings come from public U.S. government data (HRSA) and can change. Please call ahead, and email us the name of the center so we can check it.',
    },
    {
        q: 'How do I cancel a monthly or yearly gift?',
        a: 'iPhone: Settings > your name > Subscriptions. Android: Google Play > Payments & subscriptions. Refunds are handled by Apple or Google.',
    },
    {
        q: 'Is my phone supported?',
        a: 'Janet\'s Light is being built for recent iPhones and Android phones. If something looks wrong on your phone, email us the phone model and what you saw.',
    },
];

const SupportPage: React.FC = () => {
    usePageTitle(`${janetsLight.name} Support`);
    const email = janetsLight.supportEmail;
    return (
        <article className="section page">
            <div className="wrap narrow">
                <p className="eyebrow">{janetsLight.name}</p>
                <h1>Support</h1>
                <div className="card contact-card">
                    <h2>Contact us</h2>
                    <p>
                        Email <a href={`mailto:${email}?subject=Janet's%20Light%20support`}>{email}</a>. We
                        usually reply within two business days. Please don't send personal health details by
                        email.
                    </p>
                </div>
                <p className="callout">
                    In an emergency, call 911 (or your local emergency number) right away. Do not wait for the
                    app or for an email reply.
                </p>
                <h2>Common questions</h2>
                <div className="faq">
                    {faqs.map((f) => (
                        <details key={f.q}>
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
                <p className="small-links">
                    <Link to="/janets-light/privacy">Privacy Policy</Link> ·{' '}
                    <Link to="/janets-light/terms">Terms of Use</Link>
                </p>
            </div>
        </article>
    );
};

export default SupportPage;
