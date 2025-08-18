import AppLayout from '@/Layouts/AppLayout';
import IndustryList from './IndustryList';
import { Head } from '@inertiajs/react';

export default function index({ industries, industriesWithCompanies }) {
  return (
    <AppLayout>
      <Head>
        <title>業界一覧</title>
        <meta
          name="description"
          content="estion.の業界一覧ページです。業界ごとに企業を確認することができます。"
        />
      </Head>
      <div className="pt-10">
        <IndustryList industries={industries} industriesWithCompanies={industriesWithCompanies} />
      </div>
    </AppLayout>
  );
}
