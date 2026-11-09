import React from 'react';
import { Link } from 'react-router-dom';
import { clearly } from '../company';
import usePageTitle from '../usePageTitle';
import { clearlyPath, Lang, LangSwitch } from './lang';

type Faq = { q: string; a: string };

const copy: Record<Lang, { title: string; contact: string; body: string; faqTitle: string; faqs: Faq[]; privacy: string; terms: string; subject: string }> = {
    en: {
        title: 'Support',
        contact: 'Contact us',
        body: 'We usually reply within two business days, in English or Japanese.',
        faqTitle: 'Common questions',
        subject: 'Clearly support',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        faqs: [
            {
                q: 'Why does my score seem wrong?',
                a: 'Scores are automatic estimates. Try a quiet room, hold the phone about 20 cm from your mouth, and read the whole sentence at a natural speed.',
            },
            {
                q: 'Why can I only score 5 sentences a day?',
                a: 'Every scored sentence costs us money, so the free plan includes 5 a day, which is one full sound check. Clearly Pro includes up to 50 a day. The count resets at midnight Japan time.',
            },
            {
                q: 'Are my recordings saved?',
                a: 'No. Your recording is used only to make your score, then it is gone. We save the scores so you can see your progress.',
            },
            {
                q: 'How do I keep my progress on a new phone?',
                a: 'Sign in with email or Google in Settings. Your scores move to your account, and you can sign in on the new phone to see them.',
            },
            {
                q: 'How do I cancel Clearly Pro?',
                a: 'Open Google Play > Payments & subscriptions > Subscriptions and choose Clearly. Pro stays on until the end of the period you paid for. Refunds are handled by Google.',
            },
            {
                q: 'How do I delete my account?',
                a: 'Open Settings and tap Delete account. Your account and scores are deleted right away. This does not cancel a Google Play subscription, so cancel that first.',
            },
        ],
    },
    ja: {
        title: 'サポート',
        contact: 'お問い合わせ',
        body: '通常2営業日以内に、日本語または英語でお返事します。',
        faqTitle: 'よくある質問',
        subject: 'Clearly サポート',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        faqs: [
            {
                q: 'スコアが正しくない気がします。',
                a: 'スコアは自動で算出される目安です。静かな場所で、スマートフォンを口から20 cmほど離し、文全体を自然な速さで読んでみてください。',
            },
            {
                q: 'なぜ1日5文までなのですか？',
                a: '採点には1文ごとに費用がかかるため、無料プランは1日5文（発音チェック1回分）です。Clearly Proは1日50文まで採点できます。回数は日本時間の午前0時にリセットされます。',
            },
            {
                q: '録音は保存されますか？',
                a: 'いいえ。録音は採点のためだけに使い、保存しません。進み具合を見られるよう、スコアだけを保存します。',
            },
            {
                q: '機種変更しても記録を残せますか？',
                a: '設定からメールまたはGoogleでログインしてください。スコアがアカウントに移り、新しいスマートフォンでログインすると表示されます。',
            },
            {
                q: 'Clearly Proを解約するには？',
                a: 'Google Play ＞ お支払いと定期購入 ＞ 定期購入 でClearlyを選んでください。支払い済みの期間が終わるまでProは使えます。返金はGoogleが対応します。',
            },
            {
                q: 'アカウントを削除するには？',
                a: '設定の「アカウントを削除」をタップすると、アカウントとスコアがすぐに削除されます。Google Playのサブスクリプションは解約されないため、先に解約してください。',
            },
        ],
    },
};

const ClearlySupportPage: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = copy[lang];
    usePageTitle(`Clearly ${t.title}`);
    const email = clearly.supportEmail;
    return (
        <article className="section page" lang={lang}>
            <div className="wrap narrow">
                <p className="eyebrow">{clearly.name}</p>
                <LangSwitch lang={lang} page="support" />
                <h1>{t.title}</h1>
                <div className="card contact-card">
                    <h2>{t.contact}</h2>
                    <p>
                        <a href={`mailto:${email}?subject=${encodeURIComponent(t.subject)}`}>{email}</a>
                        <br />
                        {t.body}
                    </p>
                </div>
                <h2>{t.faqTitle}</h2>
                <div className="faq">
                    {t.faqs.map((f) => (
                        <details key={f.q}>
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
                <p className="small-links">
                    <Link to={clearlyPath(lang, 'privacy')}>{t.privacy}</Link> ·{' '}
                    <Link to={clearlyPath(lang, 'terms')}>{t.terms}</Link>
                </p>
            </div>
        </article>
    );
};

export default ClearlySupportPage;
