import React from 'react';
import { Link } from 'react-router-dom';
import { company, janetsLight } from './company';
import usePageTitle from './usePageTitle';
import profile from '../assets/images/profile.jpeg';

const services = [
    {
        title: 'Cloud architecture',
        text: 'Plans and builds on AWS, Azure, Google Cloud and Oracle Cloud that fit your size and budget.',
    },
    {
        title: 'DevOps and CI/CD',
        text: 'Automated builds, tests and releases with GitHub Actions, Docker and Kubernetes.',
    },
    {
        title: 'Infrastructure as Code',
        text: 'Repeatable, reviewable infrastructure with Terraform, so nothing depends on clicks in a console.',
    },
    {
        title: 'Security and cost',
        text: 'Cloud security reviews (CCSK) and cost tuning, so systems stay safe and bills stay small.',
    },
];

const HomePage: React.FC = () => {
    usePageTitle();
    return (
        <>
            <section className="hero">
                <div className="wrap">
                    <p className="eyebrow">{company.legalName}</p>
                    <h1>Apps and cloud systems that make everyday life a little easier.</h1>
                    <p className="lead">
                        We are an independent studio in {company.location}. We build mobile apps for
                        health, language learning and fitness, and we help teams run secure, low-cost
                        cloud systems.
                    </p>
                    <div className="actions">
                        <Link className="button" to="/#apps">
                            See our apps
                        </Link>
                        <a className="button ghost" href={`mailto:${company.email}`}>
                            Get in touch
                        </a>
                    </div>
                </div>
            </section>

            <section id="apps" className="section">
                <div className="wrap">
                    <h2>Our apps</h2>
                    <p className="section-lead">Free, private and made with care for the people who use them.</p>
                    <div className="app-grid">
                        <article className="card app-card featured">
                            <img src={janetsLight.icon} alt="" className="app-icon" width={72} height={72} />
                            <div>
                                <span className="badge">Coming soon to iPhone and Android</span>
                                <h3>{janetsLight.name}</h3>
                                <p className="tagline">{janetsLight.tagline}</p>
                                <p>
                                    Helps women, especially Black women, learn the cancers that affect them
                                    most, check their warning signs and screening needs, and find low-cost
                                    care nearby. Free, with no account.
                                </p>
                                <div className="link-row">
                                    <Link to="/janets-light">Learn more</Link>
                                    <Link to="/janets-light/support">Support</Link>
                                    <Link to="/janets-light/privacy">Privacy</Link>
                                </div>
                            </div>
                        </article>
                        <article className="card app-card muted">
                            <span className="badge neutral">In development</span>
                            <h3>Language learning</h3>
                            <p>A friendly way to practice a new language a few minutes a day.</p>
                        </article>
                        <article className="card app-card muted">
                            <span className="badge neutral">In development</span>
                            <h3>Fitness</h3>
                            <p>Simple workouts and habits you can keep up with at home.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section id="services" className="section alt">
                <div className="wrap">
                    <h2>Cloud consulting</h2>
                    <p className="section-lead">
                        The same skills that run our apps, available for your team.
                    </p>
                    <div className="service-grid">
                        {services.map((s) => (
                            <div className="card" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="about" className="section">
                <div className="wrap about">
                    <img src={profile} alt={company.founder} className="founder" width={160} height={160} />
                    <div>
                        <h2>About us</h2>
                        <p>
                            {company.displayName} ({company.japaneseName}) is run by {company.founder}, a
                            multi-cloud certified engineer (AWS, Azure, Google Cloud and Oracle) based in{' '}
                            {company.location}.
                        </p>
                        <p>
                            Our first app, {janetsLight.name}, is named for Jelani's mother, Janet, whose
                            cancer was found too late. It exists so other families catch it early.
                        </p>
                        <p>
                            <a href={`mailto:${company.email}`}>{company.email}</a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
