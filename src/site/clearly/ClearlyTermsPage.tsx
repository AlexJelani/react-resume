import React from 'react';
import { Link } from 'react-router-dom';
import { clearly, company } from '../company';
import usePageTitle from '../usePageTitle';
import { clearlyPath, Lang, LangSwitch } from './lang';

const email = clearly.supportEmail;
const mail = <a href={`mailto:${email}`}>{email}</a>;
const playLink = (label: string) => <a href={clearly.playSubscriptions}>{label}</a>;

const English: React.FC = () => (
    <>
        <h1>Terms of Use</h1>
        <p className="meta">Effective date: {clearly.policyDate}</p>
        <p>
            These terms are an agreement between you and {company.legalName} ("we"), the maker of Clearly. By
            using Clearly, you agree to them. Our <Link to={clearlyPath('en', 'privacy')}>Privacy Policy</Link>{' '}
            explains how we handle your data.
        </p>

        <h2>What Clearly is</h2>
        <p>
            Clearly helps you practice English pronunciation. Scores are made automatically by speech technology
            and are estimates to guide your practice. They are not an official test result or a certificate, and
            they can sometimes be wrong, for example in a noisy room.
        </p>

        <h2>Free plan and daily limits</h2>
        <p>
            Every sentence we score costs us money, so scoring has a daily limit. The free plan includes 5
            scored sentences a day, and Clearly Pro includes up to 50 a day. Days reset at midnight Japan time.
            We may change these limits; if we lower the Pro limit, we will tell you in the app first.
        </p>

        <h2>Clearly Pro subscriptions</h2>
        <ul>
            <li>
                Clearly Pro is sold as a monthly or yearly subscription through Google Play, at the price shown in
                the app before you buy.
            </li>
            <li>
                If a free trial is offered, you are charged when it ends unless you cancel before then. One trial
                per person.
            </li>
            <li>
                Subscriptions renew automatically at the same price until you cancel. Your Google account is
                charged at each renewal unless you cancel at least 24 hours before the current period ends.
            </li>
            <li>
                To cancel, open {playLink('Google Play > Payments & subscriptions > Subscriptions')}. Pro stays
                on until the end of the period you paid for.
            </li>
            <li>
                Deleting your Clearly account does not cancel your subscription. Please cancel it in Google Play.
            </li>
            <li>Refunds are handled by Google under Google Play's refund policy.</li>
        </ul>

        <h2>Your account</h2>
        <p>
            You can use Clearly without an account. If you sign in, keep your email account and Google account
            secure, because anyone who can sign in to them can sign in to Clearly. You can delete your Clearly
            account at any time in Settings.
        </p>

        <h2>Fair use</h2>
        <p>
            Please use Clearly for your own practice. Do not try to get around the daily limits, use bots or
            scripts with the app, copy or resell its content, or interfere with the service. We may suspend an
            account that does.
        </p>

        <h2>Changes to the app</h2>
        <p>
            We keep improving Clearly, so features, lessons and sentences may change. We may stop offering the
            app; if we do, we will give paying users notice in the app.
        </p>

        <h2>Limits of responsibility</h2>
        <p>
            Clearly is provided as it is. We work hard to keep it accurate and available, but we cannot promise
            it will always work or be error-free. Unless the law says otherwise, we are not responsible for
            indirect losses from using the app. Nothing in these terms limits rights you have under consumer
            protection laws, including Japan's Consumer Contract Act.
        </p>

        <h2>Law</h2>
        <p>
            These terms are governed by the laws of Japan. Any dispute will be handled by the Nagoya District
            Court as the court of first instance.
        </p>

        <h2>Changes and contact</h2>
        <p>
            If these terms change, we will update the date above and tell you in the app if the change is
            important. Questions: {mail}
        </p>
    </>
);

const Japanese: React.FC = () => (
    <>
        <h1>利用規約</h1>
        <p className="meta">施行日：{clearly.policyDateJa}</p>
        <p>
            この規約は、Clearlyの提供者である{company.japaneseName}（以下「当社」）とお客さまとの間の約束です。Clearlyを利用することで、この規約に同意したものとみなします。データの取り扱いについては
            <Link to={clearlyPath('ja', 'privacy')}>プライバシーポリシー</Link>をご覧ください。
        </p>

        <h2>Clearlyについて</h2>
        <p>
            Clearlyは英語の発音を練習するためのアプリです。スコアは音声技術により自動で算出される練習の目安で、公式の試験結果や資格ではありません。騒がしい場所などでは正しく採点されないこともあります。
        </p>

        <h2>無料プランと1日の上限</h2>
        <p>
            採点には1文ごとに費用がかかるため、1日の上限があります。無料プランは1日5文、Clearly Proは1日50文まで採点できます。日付は日本時間の午前0時に切り替わります。上限は変更することがあり、Proの上限を下げる場合は事前にアプリでお知らせします。
        </p>

        <h2>Clearly Pro（サブスクリプション）</h2>
        <ul>
            <li>Clearly ProはGoogle Playで月額または年額のサブスクリプションとして、購入前にアプリに表示される価格で販売します。</li>
            <li>無料トライアルがある場合、終了前に解約しない限り、終了時に料金が発生します。トライアルはお一人さま1回です。</li>
            <li>
                サブスクリプションは解約するまで同じ価格で自動更新されます。現在の期間が終わる24時間前までに解約しない限り、更新のたびにGoogleアカウントに請求されます。
            </li>
            <li>
                解約は{playLink('Google Play ＞ お支払いと定期購入 ＞ 定期購入')}から行えます。支払い済みの期間が終わるまでProは使えます。
            </li>
            <li>Clearlyのアカウントを削除しても、サブスクリプションは解約されません。Google Playで解約してください。</li>
            <li>返金はGoogle Playの返金ポリシーに従ってGoogleが対応します。</li>
        </ul>

        <h2>アカウント</h2>
        <p>
            Clearlyはアカウントなしでも使えます。ログインする場合は、メールアカウントとGoogleアカウントを安全に管理してください。それらにログインできる人はClearlyにもログインできます。Clearlyのアカウントは設定からいつでも削除できます。
        </p>

        <h2>適切な利用</h2>
        <p>
            ご自身の練習のためにお使いください。1日の上限を回避すること、ボットやスクリプトでアプリを使うこと、コンテンツを複製・転売すること、サービスを妨害することは禁止します。これらを行ったアカウントは利用を停止することがあります。
        </p>

        <h2>アプリの変更</h2>
        <p>
            Clearlyは改善を続けるため、機能やレッスン、文は変わることがあります。アプリの提供を終了する場合は、有料のお客さまにアプリ内で事前にお知らせします。
        </p>

        <h2>責任の範囲</h2>
        <p>
            Clearlyは現状のまま提供されます。正確で安定したサービスに努めますが、常に動作することや誤りがないことは保証できません。法律で別に定める場合を除き、アプリの利用による間接的な損害について当社は責任を負いません。この規約は、消費者契約法などの消費者保護法でお客さまが持つ権利を制限するものではありません。
        </p>

        <h2>準拠法と管轄</h2>
        <p>この規約は日本法に準拠します。紛争は名古屋地方裁判所を第一審の専属的合意管轄裁判所とします。</p>

        <h2>変更とお問い合わせ</h2>
        <p>
            この規約を変更する場合は上記の日付を更新し、重要な変更はアプリ内でお知らせします。ご質問：{mail}
        </p>
    </>
);

const ClearlyTermsPage: React.FC<{ lang: Lang }> = ({ lang }) => {
    usePageTitle(lang === 'ja' ? 'Clearly 利用規約' : 'Clearly Terms of Use');
    return (
        <article className="section page" lang={lang}>
            <div className="wrap narrow prose">
                <p className="eyebrow">{clearly.name}</p>
                <LangSwitch lang={lang} page="terms" />
                {lang === 'ja' ? <Japanese /> : <English />}
            </div>
        </article>
    );
};

export default ClearlyTermsPage;
