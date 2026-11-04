import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './site/Layout';
import HomePage from './site/HomePage';
import JanetsLightPage from './site/janets-light/JanetsLightPage';
import PrivacyPage from './site/janets-light/PrivacyPage';
import TermsPage from './site/janets-light/TermsPage';
import SupportPage from './site/janets-light/SupportPage';
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
                <Route exact path="/privacy" component={SitePrivacyPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default App;
