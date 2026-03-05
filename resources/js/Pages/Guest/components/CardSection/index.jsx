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

          <div className="space-y-12">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-bold text-blue-600">
                  1. Dashboard：ESや締切を一元管理
                </h3>
                <p className="leading-relaxed text-gray-600">
                  ログイン後、最初に表示されるダッシュボードでは、直近のESの内容や提出締切を一覧で確認できます。
                </p>
              </div>
              <div className="w-full flex-1 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <img
                  src="/image/guset/demo1.png"
                  alt="Dashboard：直近のES提出締切やステータスを一覧表示する画面"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-bold text-blue-600">
                  2. Company：志望企業をスマートに管理
                </h3>
                <p className="leading-relaxed text-gray-600">
                  気になる企業をリストに追加。各社のマイページURLや、忘れがちなログインID・パスワードもセットで保存可能です。ブックマーク機能を使えば、志望度の高い企業へ瞬時にアクセスできます。
                </p>
              </div>
              <div className="w-full flex-1 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <img
                  src="/image/guset/demo2.png"
                  alt="Dashboard：直近のES提出締切やステータスを一覧表示する画面"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-bold text-blue-600">
                  3. Entry Sheet：エピソードの資産化
                </h3>
                <p className="leading-relaxed text-gray-600">
                  企業ごとに提出したESの内容を保存します。設問ごとに管理できるため、他社の選考で過去の回答を再利用する際も、検索機能で必要なエピソードをすぐに見つけ出せます。
                </p>
              </div>
              <div className="w-full flex-1 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <img
                  src="/image/guset/demo3.png"
                  alt="Dashboard：直近のES提出締切やステータスを一覧表示する画面"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-bold text-blue-600">
                  4. Interview：AIによる実践的な面接対策
                </h3>
                <p className="leading-relaxed text-gray-600">
                  登録したESのデータをAIが読み取り、あなた専用の模擬面接を実施します。「ガクチカを深掘りしてほしい」「圧迫面接風に」といったリクエストにも対応し、本番さながらの演習が可能です。
                </p>
              </div>
              <div className="w-full flex-1 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <img
                  src="/image/guset/demo4.png"
                  alt="Dashboard：直近のES提出締切やステータスを一覧表示する画面"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
