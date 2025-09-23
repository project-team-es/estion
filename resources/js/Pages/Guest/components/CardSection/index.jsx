import React from 'react';

// 共通のカードスタイル
const cardStyle = "card-item mb-12 rounded-xl border border-gray-200 bg-white p-8 shadow-lg md:p-12";
const headingStyle = "mb-5 text-3xl font-bold";

// 各カードを独立したコンポーネントとして定義
const AboutCard = () => (
  <div className={cardStyle}>
    <div className={headingStyle}>
      <p>estion. とは</p>
    </div>
    <div>
      <p>
        estion.とは新卒就活生向けのエントリーシート管理アプリケーションです。
        <br />
        これまで〇〇だった〇〇を〜〜〜
        <br />
        etc...
      </p>
    </div>
  </div>
);

const FeaturesCard = () => (
  <div className={cardStyle}>
    <div className={headingStyle}>
      <p>できること</p>
    </div>
    <ul className="list-inside">
      <li>応募企業の管理</li>
      <li>エントリーシートの管理</li>
      <li>etc...</li>
    </ul>
  </div>
);

const UsageCard = () => (
  <div className={cardStyle}>
    <div className={headingStyle}>
      <p>使い方</p>
    </div>
    <div>
      <p>ここに実際に軽く動くものを配置する予定</p>
    </div>
  </div>
);

// 全体のコンポーネントとして、各カードを配置
function CardSection() {
  return (
    <>
      <div className="mx-auto my-10 max-w-4xl px-4 text-center">
        <AboutCard />
        <FeaturesCard />
        <UsageCard />
      </div>
    </>
  );
}

export default CardSection;