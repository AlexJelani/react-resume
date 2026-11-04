import React from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from './usePageTitle';

const NotFoundPage: React.FC = () => {
    usePageTitle('Page not found');
    return (
        <section className="section page">
            <div className="wrap narrow">
                <h1>We couldn't find that page</h1>
                <p>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        </section>
    );
};

export default NotFoundPage;
