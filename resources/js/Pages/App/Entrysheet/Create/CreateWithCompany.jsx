import React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import CreateForm from './CreateForm';
//通常のES作成と引数が違うからとりあえずファイルを分けて修正
//もっといいやり方があると思います。
export default function CreateWithCompany({ industries, company, presetTitles }) {
  return (
    <AppLayout>
      <CreateForm industries={industries} company={company} presetTitles={presetTitles} />
    </AppLayout>
  );
}
