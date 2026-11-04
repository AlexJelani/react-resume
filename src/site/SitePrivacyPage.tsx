import React from 'react';
import { company } from './company';
import usePageTitle from './usePageTitle';

const SitePrivacyPage: React.FC = () => {
    usePageTitle('Website privacy');
    return (
        <article className="section page">
            <div className="wrap narrow prose">
                <h1>Website privacy</h1>
                <p className="meta">This page covers this website only. Each app has its own privacy policy.</p>
                <p>
                    This website has no accounts, no forms, no cookies, no ads and no analytics or tracking
                    tools.
                </p>
                <p>
                    Like any website, the companies that host and deliver it (Microsoft Azure and Cloudflare)
                    keep short-lived technical logs, such as your IP address and the pages requested, to keep
                    the site running and secure.
                </p>
                <p>
                    If you email us, we use your email only to reply to you.
                </p>
                <p>
                    Questions: <a href={`mailto:${company.email}`}>{company.email}</a>
                </p>
            </div>
        </article>
    );
};

export default SitePrivacyPage;
