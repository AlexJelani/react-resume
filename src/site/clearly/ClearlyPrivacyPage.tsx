import React from 'react';
import { clearly, company } from '../company';
import usePageTitle from '../usePageTitle';
import { Lang, LangSwitch } from './lang';

const email = clearly.supportEmail;
const mail = <a href={`mailto:${email}`}>{email}</a>;

const English: React.FC = () => (
    <>
        <h1>Privacy Policy</h1>
        <p className="meta">Effective date: {clearly.policyDate}</p>
        <p>
            Clearly is made by {company.legalName} ({company.founder}, {company.location}). This policy explains
            what the app collects, why, and how you can delete it. We never sell your data, and the app has no
            ads.
        </p>

        <h2>Your voice</h2>
        <p>
            When you tap the microphone, Clearly records the sentence you read and sends it securely to our
            server, which passes it to Microsoft Azure AI Speech (Japan East region) to score your
            pronunciation. We use the recording only to make your score. We do not save your recordings, and we
            do not use them for advertising or to train AI. Microsoft processes the audio under the{' '}
            <a href="https://privacy.microsoft.com/privacystatement">Microsoft Privacy Statement</a>. The app
            only records while you are reading a sentence.
        </p>

        <h2>What we save</h2>
        <ul>
            <li>
                <strong>Your scores:</strong> for each sentence you read, the scores for pronunciation, accuracy,
                fluency and completeness, the score for each English sound, and the date. These make your Today
                and Progress screens.
            </li>
            <li>
                <strong>How many sentences you score each day,</strong> so we can apply the daily limit. We use
                these counts for nothing else.
            </li>
            <li>
                <strong>Your account, if you make one:</strong> your email address. If you sign in with Google,
                Google also gives us your name and profile photo, which the app shows in Settings and on Today.
            </li>
            <li>
                <strong>If you don't sign in,</strong> your scores are linked to a random ID made by the app. It
                does not contain your name or email.
            </li>
        </ul>
        <p>
            This data is stored with Supabase in Tokyo, Japan. Your app settings (such as language and sound
            effects) stay on your phone, and your sign-in is kept in your phone's secure storage.
        </p>

        <h2>Sign-in emails</h2>
        <p>
            If you sign in with email, we send you a 6-digit code. The email is sent by our email provider,
            Resend, which receives your email address only to deliver it.
        </p>

        <h2>Subscriptions</h2>
        <p>
            Clearly Pro is bought through Google Play. Google handles the payment, and we never see your card or
            bank details. We use RevenueCat to check who has Pro. RevenueCat receives your account ID and your
            purchase record, but not your recordings or scores.
        </p>

        <h2>Crash reports</h2>
        <p>
            If the app crashes, we may receive a crash report through Sentry, with your phone model, system
            version, app version and what went wrong. Crash reports do not include your recordings, name or
            email, and we use them only to fix bugs.
        </p>

        <h2>Who processes your data</h2>
        <p>
            We share data only with the services above, and only so the app can work: Supabase (storage and
            sign-in, Japan), Microsoft Azure (pronunciation scoring, Japan), Google (Google sign-in and Google
            Play), Resend (sign-in emails), RevenueCat (subscriptions, USA) and Sentry (crash reports, USA). Some
            of these companies may handle data outside Japan. Each one protects it under its own privacy policy
            and agreements with us.
        </p>

        <h2>Deleting your data</h2>
        <ul>
            <li>
                <strong>Signed in:</strong> open Settings and tap Delete account. Your account, scores and usage
                counts are deleted from our servers right away. This does not cancel a Google Play subscription;
                cancel that in Google Play first.
            </li>
            <li>
                <strong>Not signed in:</strong> sign in and delete the account, or email us and we'll help.
                Deleting the app removes everything saved on your phone.
            </li>
        </ul>
        <p>
            You can also ask us to see, correct or delete your data at any time, as allowed by Japan's Act on the
            Protection of Personal Information and other laws that apply to you.
        </p>

        <h2>Children</h2>
        <p>
            Clearly is for people aged 13 and over. If you are under 18, please use it with a parent's
            permission. If you think a child under 13 has given us personal data, email us and we will delete
            it.
        </p>

        <h2>Changes and contact</h2>
        <p>
            If this policy changes, we will update the date above and tell you in the app if the change is
            important. Questions or requests: {mail}
        </p>
    </>
);

const Japanese: React.FC = () => (
    <>
        <h1>プライバシーポリシー</h1>
        <p className="meta">施行日：{clearly.policyDateJa}</p>
        <p>
            Clearlyは{company.japaneseName}（{company.legalName}、代表 {company.founder}、愛知県）が提供しています。このポリシーでは、アプリが集める情報、その目的、削除の方法を説明します。データを販売することはなく、アプリに広告はありません。
        </p>

        <h2>あなたの音声</h2>
        <p>
            マイクをタップすると、Clearlyは読み上げた文を録音し、暗号化して当社のサーバーへ送ります。サーバーはそれをMicrosoft Azure AI Speech（東日本リージョン）に渡し、発音を採点します。録音は採点のためだけに使い、保存しません。広告やAIの学習にも使いません。音声はMicrosoftにより<a href="https://privacy.microsoft.com/ja-jp/privacystatement">Microsoftプライバシーに関する声明</a>
            に従って処理されます。録音するのは文を読んでいる間だけです。
        </p>

        <h2>保存する情報</h2>
        <ul>
            <li>
                <strong>スコア：</strong>
                読んだ文ごとの発音・正確さ・流暢さ・完全性のスコア、英語の音ごとのスコア、日付。「今日」と「記録」の画面に使います。
            </li>
            <li>
                <strong>1日に採点した文の数：</strong>1日の上限を適用するためです。それ以外には使いません。
            </li>
            <li>
                <strong>アカウント（作成した場合）：</strong>
                メールアドレス。Googleでログインした場合は、Googleから名前とプロフィール写真も受け取り、設定画面と「今日」に表示します。
            </li>
            <li>
                <strong>ログインしない場合：</strong>
                スコアはアプリが作るランダムなIDにひも付きます。名前やメールアドレスは含まれません。
            </li>
        </ul>
        <p>
            これらのデータはSupabase（東京）に保存されます。アプリの設定（言語や効果音など）はスマートフォンの中だけに保存され、ログイン情報はスマートフォンの安全な保存領域に保管されます。
        </p>

        <h2>ログイン用メール</h2>
        <p>
            メールでログインする場合、6桁のコードをお送りします。メールはResendが送信し、Resendは配信のためだけにメールアドレスを受け取ります。
        </p>

        <h2>サブスクリプション</h2>
        <p>
            Clearly ProはGoogle Playで購入します。支払いはGoogleが処理し、当社がカードや銀行の情報を見ることはありません。Proの確認にはRevenueCatを使います。RevenueCatはアカウントIDと購入記録を受け取りますが、録音やスコアは受け取りません。
        </p>

        <h2>クラッシュレポート</h2>
        <p>
            アプリが異常終了した場合、Sentryを通じてクラッシュレポート（機種、OSのバージョン、アプリのバージョン、エラーの内容）を受け取ることがあります。録音、名前、メールアドレスは含まれず、不具合の修正だけに使います。
        </p>

        <h2>データを取り扱う事業者</h2>
        <p>
            アプリを動かすために必要な範囲で、次の事業者とだけデータを共有します：Supabase（保存とログイン、日本）、Microsoft Azure（発音の採点、日本）、Google（GoogleログインとGoogle Play）、Resend（ログイン用メール）、RevenueCat（サブスクリプション、米国）、Sentry（クラッシュレポート、米国）。一部の事業者は日本国外でデータを取り扱うことがあり、それぞれのプライバシーポリシーと当社との契約に基づいて保護されます。
        </p>

        <h2>データの削除</h2>
        <ul>
            <li>
                <strong>ログインしている場合：</strong>
                設定の「アカウントを削除」をタップすると、アカウント、スコア、利用回数の記録がサーバーからすぐに削除されます。Google Playのサブスクリプションは自動では解約されないため、先にGoogle Playで解約してください。
            </li>
            <li>
                <strong>ログインしていない場合：</strong>
                ログインしてからアカウントを削除するか、メールでご連絡ください。アプリを削除すると、スマートフォンに保存された情報はすべて消えます。
            </li>
        </ul>
        <p>
            個人情報の保護に関する法律などに基づき、いつでもご自身のデータの開示・訂正・削除を求めることができます。
        </p>

        <h2>お子さまについて</h2>
        <p>
            Clearlyは13歳以上の方を対象としています。18歳未満の方は保護者の同意を得てご利用ください。13歳未満のお子さまの個人情報が送られたと思われる場合は、メールでご連絡ください。削除いたします。
        </p>

        <h2>変更とお問い合わせ</h2>
        <p>
            このポリシーを変更する場合は上記の日付を更新し、重要な変更はアプリ内でお知らせします。ご質問・ご依頼：{mail}
        </p>
    </>
);

const ClearlyPrivacyPage: React.FC<{ lang: Lang }> = ({ lang }) => {
    usePageTitle(lang === 'ja' ? 'Clearly プライバシーポリシー' : 'Clearly Privacy Policy');
    return (
        <article className="section page" lang={lang}>
            <div className="wrap narrow prose">
                <p className="eyebrow">{clearly.name}</p>
                <LangSwitch lang={lang} page="privacy" />
                {lang === 'ja' ? <Japanese /> : <English />}
            </div>
        </article>
    );
};

export default ClearlyPrivacyPage;
