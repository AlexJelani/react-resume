import React from 'react';
import { Link } from 'react-router-dom';
import { company, oishiscan } from '../company';
import usePageTitle from '../usePageTitle';

// Google Play's Data safety form asks for a web page where people can ask to
// delete their account, including people who no longer have the app.

const DeleteAccountPage: React.FC = () => {
    usePageTitle(`Delete your ${oishiscan.name} account`);
    const email = oishiscan.supportEmail;
    const subject = encodeURIComponent('Delete my OishiScan account');
    return (
        <article className="section page">
            <div className="wrap narrow prose">
                <p className="eyebrow">{oishiscan.name}</p>
                <h1>Delete your account and data</h1>
                <p>
                    {oishiscan.name} is made by {company.founder} ({company.legalName}). You can delete your
                    account and everything in it at any time.
                </p>

                <h2>In the app</h2>
                <ol>
                    <li>
                        Open <strong>Profile</strong>, then <strong>Account</strong>.
                    </li>
                    <li>
                        Tap <strong>Delete account</strong> and confirm. If you use the app as a guest, tap{' '}
                        <strong>Delete my data</strong>.
                    </li>
                </ol>
                <p>Your data is deleted straight away.</p>

                <h2>Without the app</h2>
                <p>
                    Email <a href={`mailto:${email}?subject=${subject}`}>{email}</a> from the email address you
                    signed in with (your Google account's address if you used Google), with the subject
                    &ldquo;Delete my OishiScan account&rdquo;. We delete the account within 30 days and email you
                    when it's done.
                </p>
                <p>
                    If you used {oishiscan.name} as a guest and no longer have the app, your data has no name or
                    email on it. Email us the date you last used the app and, if you can, a food you logged, and
                    we'll find and delete it.
                </p>

                <h2>What is deleted</h2>
                <ul>
                    <li>Your account and sign-in (email, and the name and photo from Google sign-in)</li>
                    <li>Your food and drink log, saved foods and scan history</li>
                    <li>Every photo you scanned</li>
                    <li>Your goals and setup answers, and your Pro status</li>
                </ul>

                <h2>What is kept</h2>
                <ul>
                    <li>
                        Foods the app learned from label photos (a product's name, ingredients and nutrition) may
                        stay in our food list. They contain nothing that links them to you.
                    </li>
                    <li>
                        Purchase records stay with Apple, Google and RevenueCat, who keep them as the law and
                        their own rules require. RevenueCat's record only carries a random user ID.
                    </li>
                </ul>
                <p className="callout">
                    Deleting your account does not cancel OishiScan Pro. Cancel it first in Google Play
                    (Payments &amp; subscriptions) or on iPhone (Settings &gt; your name &gt; Subscriptions).
                </p>

                <p className="small-links">
                    <Link to="/oishiscan/privacy">Privacy Policy</Link> ·{' '}
                    <Link to="/oishiscan/support">Support</Link>
                </p>
            </div>
        </article>
    );
};

export default DeleteAccountPage;
