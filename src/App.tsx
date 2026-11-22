import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './site/Layout';
import HomePage from './site/HomePage';
import JanetsLightPage from './site/janets-light/JanetsLightPage';
import PrivacyPage from './site/janets-light/PrivacyPage';
import TermsPage from './site/janets-light/TermsPage';
import SupportPage from './site/janets-light/SupportPage';
import ClearlyPage from './site/clearly/ClearlyPage';
import ClearlyPrivacyPage from './site/clearly/ClearlyPrivacyPage';
import ClearlyTermsPage from './site/clearly/ClearlyTermsPage';
import ClearlySupportPage from './site/clearly/ClearlySupportPage';
import OishiScanPage from './site/oishiscan/OishiScanPage';
import OishiScanPrivacyPage from './site/oishiscan/PrivacyPage';
import OishiScanTermsPage from './site/oishiscan/TermsPage';
import OishiScanSupportPage from './site/oishiscan/SupportPage';
import OishiScanDeleteAccountPage from './site/oishiscan/DeleteAccountPage';
import SitePrivacyPage from './site/SitePrivacyPage';
import NotFoundPage from './site/NotFoundPage';

const App: React.FC = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/janets-light" component={JanetsLightPage} />
                <Route exact path="/janets-light/privacy" component={PrivacyPage} />
                <Route exact path="/janets-light/terms" component={TermsPage} />
                <Route exact path="/janets-light/support" component={SupportPage} />
                <Route exact path="/clearly" render={() => <ClearlyPage lang="en" />} />
                <Route exact path="/clearly/ja" render={() => <ClearlyPage lang="ja" />} />
                <Route exact path="/clearly/privacy" render={() => <ClearlyPrivacyPage lang="en" />} />
                <Route exact path="/clearly/ja/privacy" render={() => <ClearlyPrivacyPage lang="ja" />} />
                <Route exact path="/clearly/terms" render={() => <ClearlyTermsPage lang="en" />} />
                <Route exact path="/clearly/ja/terms" render={() => <ClearlyTermsPage lang="ja" />} />
                <Route exact path="/clearly/support" render={() => <ClearlySupportPage lang="en" />} />
                <Route exact path="/clearly/ja/support" render={() => <ClearlySupportPage lang="ja" />} />
                <Route exact path="/oishiscan" component={OishiScanPage} />
                <Route exact path="/oishiscan/privacy" component={OishiScanPrivacyPage} />
                <Route exact path="/oishiscan/terms" component={OishiScanTermsPage} />
                <Route exact path="/oishiscan/support" component={OishiScanSupportPage} />
                <Route exact path="/oishiscan/delete-account" component={OishiScanDeleteAccountPage} />
                <Route exact path="/privacy" component={SitePrivacyPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default App;
