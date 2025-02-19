# estion.

## はじめに
「estion.」は、エントリーシート（ES）の管理を効率化するためのWebアプリケーションです。<br>
就職活動で複数の企業に応募する際の **応募企業とエントリーシートの管理** をサポートし、効率的な就職活動を実現します。

[**デモ動画を見る**](https://github.com/geekcamp-estion/estion/issues/27#issue-2863702863)
&nbsp;

## 機能について

**基本機能**
- **企業管理**：登録 / 編集 / 削除（企業名・業界・ホームページURL・マイページ_URL・選考状況 など）
- **エントリーシート管理**：登録 / 編集 / 削除（タイトル・提出状況・締切日）
- **質問・回答の管理**：登録 / 編集 / 削除（質問・文字数制限・回答内容）

**追加機能**
- **Googleログイン**（OAuth認証）
- **Googleカレンダー連携**（ESの締切日をカレンダーに追加）
- **企業・ESのフィルタリング検索**
- **文字数カウント & コピー機能**（設問ごと）
- **企業ごとのファイルアップロード**
- **PDF出力機能**
- **GeminiAPIを活用した深堀り面接機能**
- **ブックマーク機能**（登録 / 編集 / 削除 / 簡易アクセス）

&nbsp;

## 工夫した点
- **GeminiAPIを活用したエントリーシート深堀り機能**
- **OAuth 2.0 を使用したGoogleアカウンでのログイン・サインアップ**
- **Google Calendar API を利用した提出締切日管理**
- **シンプルなUI・UXの設計（Tailwind CSS）**

## 使用技術
**フロントエンド**
<p style="display: inline">
<img src="https://img.shields.io/badge/-HTML5-FFFFFF.svg?logo=html5&style=popout">
<img src="https://img.shields.io/badge/-CSS3-0277BD.svg?logo=css3&style=popout">
<img src="https://img.shields.io/badge/-TailwindCSS-00ACC1.svg?logo=zerply&style=popout">
</p>

**バックエンド**
<p style="display: inline">
<img src="https://img.shields.io/badge/-PHP-3C3C3C.svg?logo=php&style=popout">
<img src="https://img.shields.io/badge/-Laravel-FFFFFF.svg?logo=laravel&style=popout">
</p>

**データベース**
<p style="display: inline">
<img src="https://img.shields.io/badge/-MySQL-E87912.svg?logo=mysql&style=popout">

**認証**<br>
Laravel Breez・Google OAuth 2.0

**外部API**<br>
Gemini API・Google Calendar API

<!--
<img src="https://img.shields.io/badge/-Nginx-269539.svg?logo=nginx&style=popout">
**インフラ**
<p style="display: inline">
<img src="https://img.shields.io/badge/-Linux-212121.svg?logo=linux&style=popout">
<img src="https://img.shields.io/badge/-AWS-252F3E.svg?logo=amazon&style=popout">
<img src="https://img.shields.io/badge/-Docker-FFFFFF.svg?logo=docker&style=popout">
-->
</p>
