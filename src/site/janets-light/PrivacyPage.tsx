import React from 'react';
import { company, janetsLight } from '../company';
import usePageTitle from '../usePageTitle';

const PrivacyPage: React.FC = () => {
    usePageTitle(`${janetsLight.name} Privacy Policy`);
    const email = janetsLight.supportEmail;
    return (
        <article className="section page">
            <div className="wrap narrow prose">
                <p className="eyebrow">{janetsLight.name}</p>
                <h1>Privacy Policy</h1>
                <p className="meta">Effective date: {janetsLight.policyDate}</p>
                <p>
                    Janet's Light is made by {company.founder} ({company.legalName}), Japan. Your health
                    answers never leave your phone. We have no accounts and no ads, and we never sell or share
                    your answers.
                </p>

                <h2>What stays on your phone</h2>
                <ul>
                    <li>
                        <strong>Your check-in answers and history</strong> (how you feel, signs you notice, your
                        age, family history and past tests) are saved only on your phone. We cannot see them.
                    </li>
                    <li>
                        <strong>Reminders</strong> are set up on your phone. They do not go through our servers.
                    </li>
                    <li>
                        <strong>Your ZIP code or location</strong> is used on your phone to find health centers
                        near you. The list of health centers is built into the app, so your location is not sent
                        to us.
                    </li>
                    <li>
                        <strong>Your visit summary</strong> is made on your phone. It is shared only if you
                        choose to send or print it.
                    </li>
                </ul>
                <p>
                    You can delete your history any time in the app. Deleting the app also deletes everything
                    it saved.
                </p>

                <h2>Maps</h2>
                <p>
                    The Care map is drawn by Apple Maps (iPhone) or Google Maps (Android). To show it, your
                    phone asks Apple or Google for map pictures of the area on screen. Their privacy policies
                    apply to those requests.
                </p>

                <h2>Optional support payments</h2>
                <p>
                    If you choose to give, Apple (App Store) or Google (Google Play) handles the payment. We
                    never see your card or bank details. We use RevenueCat to keep track of tips and
                    subscriptions. RevenueCat receives a random ID made by the app and the purchase record. It
                    does not receive your name, email or health answers.
                </p>

                <h2>What we do not collect</h2>
                <p>
                    We do not collect your name, email, phone number, health answers, contacts or exact
                    location. We use no analytics, tracking or advertising tools.
                </p>

                <h2>Children</h2>
                <p>Janet's Light is made for adults. It is not meant for children under 13.</p>

                <h2>Changes and contact</h2>
                <p>
                    If this policy changes, we will update the date above and show a note in the app.
                    Questions: <a href={`mailto:${email}`}>{email}</a>
                </p>
            </div>
        </article>
    );
};

export default PrivacyPage;
