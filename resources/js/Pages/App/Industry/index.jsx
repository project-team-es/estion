import { AppLayout } from '@/Layouts/AppLayout';
import IndustryList from './IndustryList';
import { Head } from '@inertiajs/react';

export default function index({ industries, industriesWithCompanies }) {
  return (
    <AppLayout>
      <Head>
        <title>業界一覧｜estion.</title>
        <meta
          name="description"
          content="estion.の業界一覧ページです。業界ごとに企業を確認することができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="pt-10">
        <IndustryList industries={industries} industriesWithCompanies={industriesWithCompanies} />
      </div>
    </AppLayout>
  );
}
