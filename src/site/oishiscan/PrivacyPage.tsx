import React from 'react';
import { company, oishiscan } from '../company';
import usePageTitle from '../usePageTitle';

const PrivacyPage: React.FC = () => {
    usePageTitle(`${oishiscan.name} Privacy Policy`);
    const email = oishiscan.supportEmail;
    return (
        <article className="section page">
            <div className="wrap narrow prose">
                <p className="eyebrow">{oishiscan.name}</p>
                <h1>Privacy Policy</h1>
                <p className="meta">Effective date: {oishiscan.policyDate}</p>
                <p>
                    OishiScan is made by {company.founder} ({company.legalName}), {company.location}. This policy
                    explains what the app collects, why, who helps us run it, and how you can delete your data.
                    We have no ads, and we never sell your data.
                </p>

                <h2>What we collect</h2>
                <ul>
                    <li>
                        <strong>Your account.</strong> You can use OishiScan as a guest, which gives you a random
                        ID and no name or email. If you create an account, we keep your email address so you can
                        sign in on another phone.
                    </li>
                    <li>
                        <strong>Photos you scan.</strong> When you scan a label, menu or dish, the photo is
                        uploaded with it (and the barcode number, in Barcode mode) and stored in your private
                        folder so you can see it again in your log.
                    </li>
                    <li>
                        <strong>What you log and save.</strong> Your food and drink log, saved foods, scan
                        results, and the answers you give during setup (such as what you want to scan and your
                        daily calorie and macro goals).
                    </li>
                    <li>
                        <strong>Your plan.</strong> Whether you have OishiScan Pro, when it ends, and how many
                        free scans you used today.
                    </li>
                </ul>

                <h2>How we use it</h2>
                <p>
                    Only to run the app: to read your photos, show results in English, keep your log and goals,
                    count free scans, and unlock Pro. We do not use your data for advertising, and we do not
                    build profiles about you.
                </p>

                <h2>Who helps us run the app</h2>
                <ul>
                    <li>
                        <strong>Google Firebase</strong> stores your account, log and photos. Our database and
                        storage are in Tokyo, Japan.
                    </li>
                    <li>
                        <strong>AI image reading.</strong> To read a photo, we send it through OpenRouter to an AI
                        model made by Anthropic (Claude). These services may process the photo outside Japan,
                        including in the United States. They use it only to return the result to us, not to
                        advertise to you.
                    </li>
                    <li>
                        <strong>RevenueCat</strong> keeps track of subscriptions. It receives your random user ID
                        and your purchase records, not your photos or your log.
                    </li>
                    <li>
                        <strong>Apple and Google</strong> handle payments. We never see your card or bank
                        details.
                    </li>
                </ul>

                <h2>Camera and photos</h2>
                <p>
                    The app asks for the camera to scan food, and for your photo library only when you choose a
                    photo to scan. It does not look at other photos.
                </p>

                <h2>Keeping and deleting your data</h2>
                <p>
                    We keep your data while you use the app. To delete it, open <strong>Profile</strong>, then{' '}
                    <strong>Account</strong>, and tap <strong>Delete account</strong>. This deletes your log,
                    saved foods, scans, photos and goals for good. Deleting your account does not cancel a Pro
                    subscription. Cancel it in your App Store or Google Play settings.
                </p>
                <p>
                    If you use OishiScan as a guest and want your data deleted, email us from the app's Support
                    page and we will help.
                </p>

                <h2>What we do not collect</h2>
                <p>
                    We do not collect your contacts, your location or your name. We use no advertising or
                    tracking tools.
                </p>

                <h2>Your rights</h2>
                <p>
                    You can ask us what data we hold about you, ask us to correct it, or ask us to delete it. We
                    handle personal information under Japan's Act on the Protection of Personal Information.
                </p>

                <h2>Children</h2>
                <p>OishiScan is not meant for children under 13.</p>

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
