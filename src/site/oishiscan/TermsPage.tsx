import React from 'react';
import { oishiscan } from '../company';
import usePageTitle from '../usePageTitle';

const TermsPage: React.FC = () => {
    usePageTitle(`${oishiscan.name} Terms of Use`);
    const email = oishiscan.supportEmail;
    return (
        <article className="section page">
            <div className="wrap narrow prose">
                <p className="eyebrow">{oishiscan.name}</p>
                <h1>Terms of Use</h1>
                <p className="meta">Effective date: {oishiscan.policyDate}</p>
                <p>By using OishiScan, you agree to these terms.</p>

                <h2>Results are estimates</h2>
                <p>
                    OishiScan uses AI to read photos and translate them. Names, translations, ingredients,
                    calories and macros can be wrong, especially for dishes and menus without a printed label,
                    where the numbers are estimates. Check the package or ask staff when it matters.
                </p>
                <p className="callout">
                    OishiScan does not check for allergens or dietary needs. If you have a food allergy or a
                    medical diet, do not rely on the app. Read the label yourself and ask staff before you eat.
                </p>

                <h2>Not medical advice</h2>
                <p>
                    Calorie and macro goals are general guides. They are not medical or nutrition advice. Talk
                    to a doctor or dietitian before making big changes to what you eat.
                </p>

                <h2>OishiScan Pro</h2>
                <p>
                    Logging is free, and you get {oishiscan.freeScansPerDay} free photo scans a day (counted by
                    Japan time). OishiScan Pro gives unlimited scans.
                </p>
                <ul>
                    <li>
                        <strong>Plans:</strong> {oishiscan.proMonthly} or {oishiscan.proYearly}, or the price
                        shown in the app in your currency.
                    </li>
                    <li>
                        <strong>Free trial:</strong> new subscribers get {oishiscan.trialDays} days free. If you
                        don't cancel at least 24 hours before the trial ends, the subscription starts.
                    </li>
                    <li>
                        <strong>Renewal:</strong> the subscription renews automatically at the price shown until
                        you cancel. Your Apple ID or Google account is charged when the trial ends and again at
                        each renewal, unless you cancel at least 24 hours before the period ends.
                    </li>
                    <li>
                        <strong>To cancel:</strong> iPhone: Settings &gt; your name &gt; Subscriptions. Android:
                        Google Play &gt; Payments &amp; subscriptions.
                    </li>
                    <li>Refunds are handled by Apple or Google under their rules.</li>
                </ul>

                <h2>Fair use</h2>
                <p>
                    Please scan food only, and don't try to break, overload or copy the service. We may limit or
                    close accounts that misuse it.
                </p>

                <h2>Limits</h2>
                <p>
                    The app is provided as it is. We work hard to keep it accurate and available, but we cannot
                    promise it is complete, error-free or always online. We are not responsible for what you eat
                    or decide based on its results.
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
