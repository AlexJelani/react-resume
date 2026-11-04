import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { company } from './company';

const Logo: React.FC = () => (
    <Link to="/" className="logo" aria-label={`${company.displayName} home`}>
        <img src={company.logo} alt="" className="logo-mark" width={44} height={44} />
        <span className="logo-text">{company.displayName}</span>
    </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { pathname, hash } = useLocation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
        if (hash) {
            const el = document.getElementById(hash.slice(1));
            if (el) {
                el.scrollIntoView();
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return (
        <>
            <a className="skip" href="#main">
                Skip to content
            </a>
            <header className="site-header">
                <div className="wrap header-row">
                    <Logo />
                    <button
                        className="menu-button"
                        aria-expanded={open}
                        aria-controls="site-nav"
                        onClick={() => setOpen(!open)}
                    >
                        Menu
                    </button>
                    <nav id="site-nav" className={open ? 'nav open' : 'nav'} aria-label="Main">
                        <Link to="/#apps">Apps</Link>
                        <Link to="/#services">Services</Link>
                        <Link to="/#about">About</Link>
                        <NavLink to="/janets-light/support">Support</NavLink>
                        <a className="nav-cta" href={`mailto:${company.email}`}>
                            Contact
                        </a>
                    </nav>
                </div>
            </header>
            <main id="main">{children}</main>
            <footer className="site-footer">
                <div className="wrap footer-grid">
                    <div>
                        <img src={company.logo} alt="" className="footer-logo" width={96} height={96} />
                        <p className="footer-name">{company.legalName}</p>
                        <p>{company.japaneseName}</p>
                        <p>
                            {company.location} · Founder {company.founder}
                        </p>
                        <p>
                            <a href={`mailto:${company.email}`}>{company.email}</a>
                        </p>
                    </div>
                    <div>
                        <p className="footer-head">Janet's Light</p>
                        <ul>
                            <li>
                                <Link to="/janets-light">About the app</Link>
                            </li>
                            <li>
                                <Link to="/janets-light/support">Support</Link>
                            </li>
                            <li>
                                <Link to="/janets-light/privacy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/janets-light/terms">Terms of Use</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="footer-head">Company</p>
                        <ul>
                            <li>
                                <Link to="/#services">Cloud services</Link>
                            </li>
                            <li>
                                <Link to="/privacy">Website privacy</Link>
                            </li>
                            <li>
                                <a href={company.linkedinCompany}>LinkedIn</a>
                            </li>
                            <li>
                                <a href={company.github}>GitHub</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wrap footer-base">
                    © {new Date().getFullYear()} {company.legalName}. All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default Layout;
