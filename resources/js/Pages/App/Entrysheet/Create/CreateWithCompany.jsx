import { AppLayout } from '@/Layouts/AppLayout';
import { CreateForm } from './CreateForm';

export default function CreateWithCompany({ industries, company, presetTitles }) {
  return (
    <AppLayout>
      <CreateForm industries={industries} company={company} presetTitles={presetTitles} />
    </AppLayout>
  );
}
