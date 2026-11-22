import React from 'react';
import { Link } from 'react-router-dom';
import { oishiscan } from '../company';
import usePageTitle from '../usePageTitle';

const faqs: { q: string; a: React.ReactNode }[] = [
    {
        q: 'A scan came out wrong. What should I do?',
        a: 'Open the food in your log and tap "Edit calories and macros" to fix the numbers. For packaged food, scanning the nutrition box (栄養成分表示) gives the most exact result. You can also email us the food name so we can improve it.',
    },
    {
        q: 'Can OishiScan tell me if a food is safe for my allergy?',
        a: 'No. The app does not check for allergens or dietary needs. Read the label yourself and ask staff before you eat.',
    },
    {
        q: 'How many free scans do I get?',
        a: `${oishiscan.freeScansPerDay} photo scans a day, counted by Japan time. Barcode scans of known products and logging are always free. OishiScan Pro gives unlimited scans.`,
    },
    {
        q: 'How do I cancel OishiScan Pro?',
        a: 'iPhone: Settings > your name > Subscriptions. Android: Google Play > Payments & subscriptions. Deleting the app or your account does not cancel it. Refunds are handled by Apple or Google.',
    },
    {
        q: 'I bought Pro but the app still shows the free plan.',
        a: 'Open the paywall and tap Restore purchases. If that doesn\'t work, email us with the date you subscribed.',
    },
    {
        q: 'How do I keep my log when I change phones?',
        a: 'Create a free account in Profile > Account before you switch. Then sign in on the new phone.',
    },
    {
        q: 'How do I delete my account and data?',
        a: (
            <>
                Open Profile &gt; Account and tap Delete account. This deletes your log, saved foods, scans, photos
                and goals for good. No longer have the app?{' '}
                <Link to="/oishiscan/delete-account">Ask us to delete it</Link>.
            </>
        ),
    },
    {
        q: 'What is the trip pass?',
        a: `A one-time ${oishiscan.tripPass} payment for ${oishiscan.tripPassDays} days of Pro. It does not renew, so there is nothing to cancel. Buy another to add ${oishiscan.tripPassDays} more days.`,
    },
];

const SupportPage: React.FC = () => {
    usePageTitle(`${oishiscan.name} Support`);
    const email = oishiscan.supportEmail;
    return (
        <article className="section page">
            <div className="wrap narrow">
                <p className="eyebrow">{oishiscan.name}</p>
                <h1>Support</h1>
                <div className="card contact-card">
                    <h2>Contact us</h2>
                    <p>
                        Email <a href={`mailto:${email}?subject=OishiScan%20support`}>{email}</a>. We usually reply
                        within two business days. Tell us your phone model and what you saw, and add a screenshot
                        if you can.
                    </p>
                </div>
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
                    <Link to="/oishiscan/privacy">Privacy Policy</Link> ·{' '}
                    <Link to="/oishiscan/terms">Terms of Use</Link> ·{' '}
                    <Link to="/oishiscan/delete-account">Delete your account</Link>
                </p>
            </div>
        </article>
    );
};

export default SupportPage;
