export function CardSection() {
  return (
    <>
      <div className="mx-auto my-10 max-w-4xl px-4 text-start">
        <div className="card-item mb-12 rounded-xl border border-gray-200 bg-white p-8 shadow-lg md:p-12">
          <div className="mb-5 text-3xl font-bold">
            <p>estion. とは</p>
          </div>
          <div>
            <p>
              「estion.」は、膨大な量になりがちなESを一括管理し、選考の質を向上させるための就活生専用アプリケーションです。
              これまで「どの企業に、どのエピソードを提出したのか」がバラバラのドキュメントやExcelに散乱していた状況を、一目で把握できるスマートなダッシュボードへと進化させます。
              また、管理が煩雑になりがちな各社の企業マイページへのログインIDやパスワード、URLなどもESとセットで一元管理が可能。「ログイン情報が見当たらない」「締め切り直前にマイページを探す」といった無駄なタイムロスを徹底的に排除します。
              さらに、登録したESのエピソードや、具体的な面接へのリクエスト（「深掘りしてほしい」「英語で」など）を基にした「AI模擬面接」機能を搭載。書いた内容をアウトプットする練習までをワンストップで完結させます。
              単なる保存ツールではなく、締め切り管理から面接対策まで、内定獲得に向けたあらゆるプロセスを強力にサポートします。
            </p>
          </div>
        </div>
        <div className="card-item mb-12 rounded-xl border border-gray-200 bg-white p-8 shadow-lg md:p-12">
          <div className="mb-5 text-3xl font-bold">
            <p>できること</p>
          </div>
          <div className="space-y-8">
            <div>
              <p className="mb-2 text-lg font-semibold">
                1. 企業情報とエントリーシート（ES）の一元管理
              </p>
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  <span className="font-medium">応募状況の整理: </span>
                  複数の応募企業の情報を整理し、それぞれの企業に紐づくエントリーシートを管理・サポートします。
                </li>
                <li>
                  <span className="font-medium">ESの作成・保存: </span>
                  企業ごとにエントリーシートの内容を記録し、就職活動の進捗に合わせて効率的に管理できます。
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-lg font-semibold">2. AI（Gemini）を活用した選考対策</p>
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  <span className="font-medium">AI模擬面接: </span>
                  登録したエントリーシートの内容に基づいた模擬面接機能を利用できます。
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-lg font-semibold">3. その他の基本機能</p>
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  <span className="font-medium">ダッシュボード: </span>
                  自身の活動状況をひと目で確認できるダッシュボード機能があります。
                </li>
                <li>
                  <span className="font-medium">ブックマーク: </span>
                  重要な情報の管理に役立つブックマーク機能を利用できます。
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-item mb-12 rounded-xl border border-gray-200 bg-white p-8 shadow-lg md:p-12">
          <div className="mb-5 text-3xl font-bold">
            <p>使い方</p>
          </div>
          <div>
            <p>ここに実際に軽く動くものを配置する予定</p>
          </div>
        </div>
      </div>
    </>
  );
}
