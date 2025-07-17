import AppLayout from '@/Layouts/AppLayout';
import IndustryList from './IndustryList';

export default function index({ industries, industriesWithCompanies }) {
  return (
    <AppLayout title="企業一覧">
      <div className="pt-10">
        <IndustryList industries={industries} industriesWithCompanies={industriesWithCompanies} />
      </div>
    </AppLayout>
  );
}
