import React from 'react';
import { Link } from 'react-router-dom';
import { clearly } from '../company';
import usePageTitle from '../usePageTitle';
import { clearlyPath, Lang, LangSwitch } from './lang';

const copy = {
    en: {
        eyebrow: 'Coming soon to Android',
        tagline: clearly.tagline,
        lead: 'Read a sentence out loud and Clearly shows which words came through clearly and which sounds need practice, like R and L, TH, and V and B. Short daily practice, with your progress saved.',
        features: [
            { title: 'A score for every word', text: 'See which words were clear and which sounds to work on, in seconds.' },
            { title: 'Made for Japanese speakers', text: 'Practice focuses on the sounds that are hardest coming from Japanese.' },
            { title: 'A few minutes a day', text: 'Short sound checks and a streak to keep you going.' },
            { title: 'Your recordings are not kept', text: 'Your voice is used only to make your score. We save the scores, not the audio.' },
        ],
        support: 'Support',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
    },
    ja: {
        eyebrow: 'Android版 近日公開',
        tagline: clearly.taglineJa,
        lead: '英文を声に出して読むと、はっきり伝わった単語と、練習が必要な音（RとL、TH、VとBなど）がわかります。1日数分の練習で、記録も残せます。',
        features: [
            { title: '単語ごとにスコア', text: 'どの単語が伝わったか、どの音を練習すればいいかが数秒でわかります。' },
            { title: '日本語話者のために', text: '日本語を話す人が特に苦手な音を中心に練習します。' },
            { title: '1日数分から', text: '短い発音チェックと連続記録で、無理なく続けられます。' },
            { title: '録音は保存しません', text: '音声は採点のためだけに使います。保存するのはスコアだけです。' },
        ],
        support: 'サポート',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
    },
};

const ClearlyPage: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = copy[lang];
    usePageTitle(clearly.name);
    return (
        <div lang={lang}>
            <section className="hero jl-hero">
                <div className="wrap jl-hero-row">
                    <img src={clearly.icon} alt="" className="app-icon large" width={112} height={112} />
                    <div>
                        <p className="eyebrow">{t.eyebrow}</p>
                        <h1>{clearly.name}</h1>
                        <p className="lead">{t.tagline}</p>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="wrap">
                    <LangSwitch lang={lang} />
                    <p className="section-lead wide">{t.lead}</p>
                    <div className="service-grid">
                        {t.features.map((f) => (
                            <div className="card" key={f.title}>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="small-links">
                        <Link to={clearlyPath(lang, 'support')}>{t.support}</Link> ·{' '}
                        <Link to={clearlyPath(lang, 'privacy')}>{t.privacy}</Link> ·{' '}
                        <Link to={clearlyPath(lang, 'terms')}>{t.terms}</Link>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ClearlyPage;
