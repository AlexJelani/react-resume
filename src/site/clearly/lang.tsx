import React from 'react';
import { Link } from 'react-router-dom';

export type Lang = 'en' | 'ja';

/** Clearly pages live at /clearly/<page> (English) and /clearly/ja/<page> (Japanese). */
export const clearlyPath = (lang: Lang, page = '') =>
    `/clearly${lang === 'ja' ? '/ja' : ''}${page ? `/${page}` : ''}`;

/** "日本語" on English pages, "English" on Japanese ones, pointing at the same page. */
export const LangSwitch: React.FC<{ lang: Lang; page?: string }> = ({ lang, page }) => {
    const other: Lang = lang === 'en' ? 'ja' : 'en';
    return (
        <p className="lang-switch">
            <Link to={clearlyPath(other, page)} lang={other} hrefLang={other}>
                {other === 'ja' ? '日本語' : 'English'}
            </Link>
        </p>
    );
};
