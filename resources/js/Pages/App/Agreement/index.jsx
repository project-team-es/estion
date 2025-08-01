import React from 'react';

export default function Agreement() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20">
      <h1 className="mb-8 text-3xl font-bold">利用規約</h1>
      <section className="mb-8">
        <p className="leading-relaxed">
          この利用規約（以下，「本規約」といいます。）は，estion.（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第1条（適用）</h2>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>
            本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </li>
          <li>
            当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
          </li>
          <li>
            本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第2条（利用登録）</h2>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>
            本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。
          </li>
          <li>
            当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
            <ol className="list-inside list-decimal space-y-2 pl-4">
              <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他、当社が利用登録を相当ではないと判断した場合</li>
            </ol>
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第3条（ユーザーID及びパスワードの管理）</h2>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>
            ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
          </li>
          <li>
            ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。当社は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
          </li>
          <li>
            ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当社に故意又は重大な過失がある場合を除き，当社は一切の責任を負わないものとします。
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第4条（利用料金および支払方法）</h2>
        <p className="leading-relaxed">
          ユーザーは、本サービス利用の対価として、当社が別途定め、本ウェブサイトに表示する利用料金を、当社が指定する方法により支払うものとします。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第5条（禁止事項）</h2>
        <p className="mb-4 leading-relaxed">
          ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
        </p>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>
            本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為
          </li>
          <li>
            当社，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
          </li>
          <li>当社のサービスの運営を妨害するおそれのある行為</li>
          <li>不正アクセスをし，またはこれを試みる行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>不正な目的を持って本サービスを利用する行為</li>
          <li>本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第6条（本サービスの提供の停止等）</h2>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>
            当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            <ol className="list-inside list-decimal space-y-2 pl-4">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>
                地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
              </li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当社が本サービスの提供が困難と判断した場合</li>
            </ol>
          </li>
          <li>
            当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第7条（著作権）</h2>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>
            利用者は、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た情報のみ、本サービスを利用し登録することができるものとします。
          </li>
          <li>
            利用者が本サービスに登録した情報については、利用者自身が著作権を有し、当社は著作権を有しません。ただし、当社は、本サービスの運営に必要な範囲で、当該情報を利用できるものとします。
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第8条（免責事項）</h2>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>
            当社は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </li>
          <li>
            当社は，本サービスに起因してユーザーに生じたあらゆる損害について，当社の故意または重過失による場合を除き，一切の責任を負わないものとします。ただし，本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
          </li>
          <li>
            前項ただし書に定める場合であっても，当社は，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
          </li>
          <li>
            当社は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第9条（サービス内容の変更等）</h2>
        <p className="leading-relaxed">
          当社は，ユーザーに通知することなく，本サービスの内容を変更し，または本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負わないものとします。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第10条（利用規約の変更）</h2>
        <p className="leading-relaxed">
          当社は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第11条（個人情報の取扱い）</h2>
        <p className="leading-relaxed">
          当社は，本サービスの利用によって取得する個人情報については，当社「プライバシーポリシー」に従い適切に取り扱うものとします。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第12条（通知または連絡）</h2>
        <p className="leading-relaxed">
          ユーザーと当社との間の通知または連絡は，当社の定める方法によって行うものとします。当社は，ユーザーから，当社が別途定める方式に従った変更届け出がない限り，現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い，これらは発信時にユーザーへ到達したものとみなします。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">第13条（準拠法・裁判管轄）</h2>
        <ul className="list-inside list-disc space-y-2 pl-4">
          <li>本規約の解釈にあたっては，日本法を準拠法とします。</li>
          <li>
            本サービスに関して紛争が生じた場合には，当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
          </li>
        </ul>
      </section>
    </div>
  );
}
