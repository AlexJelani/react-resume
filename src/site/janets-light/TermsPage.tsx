import React from 'react';
import { janetsLight } from '../company';
import usePageTitle from '../usePageTitle';

const TermsPage: React.FC = () => {
    usePageTitle(`${janetsLight.name} Terms of Use`);
    const email = janetsLight.supportEmail;
    return (
        <article className="section page">
            <div className="wrap narrow prose">
                <p className="eyebrow">{janetsLight.name}</p>
                <h1>Terms of Use</h1>
                <p className="meta">Effective date: {janetsLight.policyDate}</p>
                <p>By using Janet's Light, you agree to these terms.</p>

                <h2>Information, not medical advice</h2>
                <p>
                    Janet's Light gives general health information and reminders based on public screening
                    guidelines from the U.S. Preventive Services Task Force (USPSTF) and the American Cancer
                    Society (ACS). It does not diagnose cancer or any other condition, and it does not replace
                    a doctor or nurse. Results tell you when something is worth getting checked. Only a health
                    professional can tell you what it is.
                </p>

                <h2>In an emergency</h2>
                <p className="callout">
                    Call 911 (or your local emergency number) right away for very heavy bleeding, sudden bad
                    pain, or trouble breathing or peeing. Do not wait for the app.
                </p>

                <h2>Health center listings</h2>
                <p>
                    Health center names, addresses and phone numbers come from public U.S. government data
                    (HRSA). They can change. Please call ahead to check hours, costs and services.
                </p>

                <h2>Optional support</h2>
                <p>
                    Janet's Light is free, and every feature works whether you give or not. Support payments
                    are tips to the developer, not charitable donations, and are not tax-deductible.
                </p>
                <ul>
                    <li>
                        <strong>Give once:</strong> a one-time payment.
                    </li>
                    <li>
                        <strong>Monthly or yearly:</strong> a subscription that renews automatically at the
                        price shown until you cancel. Your Apple ID or Google account is charged when you
                        confirm and again at each renewal, unless you cancel at least 24 hours before the period
                        ends.
                    </li>
                    <li>
                        <strong>To cancel:</strong> iPhone: Settings &gt; your name &gt; Subscriptions.
                        Android: Google Play &gt; Payments &amp; subscriptions.
                    </li>
                    <li>Refunds are handled by Apple or Google under their rules.</li>
                </ul>

                <h2>Limits</h2>
                <p>
                    The app is provided as it is. We work hard to keep its information accurate, but we cannot
                    promise it is complete or error-free. We are not responsible for decisions made from it
                    without a health professional.
                </p>

                <h2>Contact</h2>
                <p>
                    Questions: <a href={`mailto:${email}`}>{email}</a>
                </p>
            </div>
        </article>
    );
};

export default TermsPage;
