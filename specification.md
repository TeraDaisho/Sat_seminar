# 土曜ゼミホームページ プロジェクト仕様書
更新日: 2026年3月5日

## 1. プロジェクト概要
本作は、土曜ゼミの開講講座一覧を表示するシングルページアプリケーション (SPA) です。
元々はGoogle Apps Script (GAS) 上でHTMLとして直接配信されていましたが、GitHub Pagesへのホスティング移行に伴い、バックエンド (GAS API) とフロントエンド (React + Vite, GitHub Pages) が分離されたアーキテクチャとなりました。

## 2. システム構成

### 2.1 フロントエンド (React + Vite)
- **フレームワーク**: React 18, Vite
- **スタイリング**: Tailwind CSS
- **ホスティング**: GitHub Pages
  - **URL**: `https://TeraDaisho.github.io/Sat_seminar/`
  - **公開ブランチ**: `gh-pages` (ビルド済みの `dist` フォルダの内容が配置される)
  - **ソースコード管理**: `main` ブランチ
- **設定の特徴**:
  - `vite.config.ts` で `base: '/Sat_seminar/'` が設定されており、GitHub Pagesのサブディレクトリ構成に対応しています。
  - `vite-plugin-singlefile` を使用しており、本来は1つのHTMLファイルにCSS/JSをインライン化する設定が含まれています（GAS時代の名残ですが、GitHub Pagesでも動作上の支障はありません）。

### 2.2 バックエンド (Google Apps Script)
- **役割**: スプレッドシートのデータを読み取り、JSON形式でフロントエンドに提供する読み取り専用のAPI。
- **エンドポイント**: `https://script.google.com/macros/s/AKfycbyxKuhHj6W4IxN1bx7dK5gcjws54Q37EVVjIQ55ZhsnlTtFr1d4Z-GJ0et9ZofPmWii/exec` (2026/03/05時点)
- **ソース管理**: `gas/Code.ts` (およびコンパイル後の `Code.js`, `appsscript.json`, `index.html`) がリポジトリ内で管理されています。
- **データソース (Google Spreadsheet)**:
  - **ID**: `1nfMyi5AgEjGpNVuazF74sZAvH_EWQQhVNY5rIqHeSPc`
  - **シート名**: `フォームの回答 2`
  - ※ データをこのシートで更新することで、リアルタイムにHPへ反映されます。

## 3. データフローと連携仕様

1. **ユーザー**がブラウザでGitHub PagesのURL（`https://TeraDaisho.github.io/Sat_seminar/`）を開く。
2. Reactアプリ (SPA) がマウントされる。
3. `src/App.tsx` 内の `useEffect` が発火し、`fetch(GAS_WEBAPP_URL)` を用いてGETリクエストをGAS APIへ送信する。
4. GAS ( `doGet()` 関数) は、対象のスプレッドシートからデータを取得し、JSONフォーマットに変換 (`ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)`) してCross-Origin(CORS)レスポンスを返す。
5. フロントエンドがJSONデータを受け取り、ReactのStateを更新して画面に講座一覧を描画する。
6. ※GASへのリクエストが失敗した場合は、ローカルの `src/data/mockData.ts` のモックデータにフォールバックして表示する設計になっています。

## 4. 開発・デプロイ ワークフロー

今後の保守や改修を行う際の手順です。

### 4.1 フロントエンドの改修・反映手順
1. リポジトリの `main` ブランチをチェックアウトし、ローカル環境で開発する。
2. `npm run dev` でローカルサーバーを起動し、動作確認を行う。
3. 開発完了後、`npm run build` を実行して `dist` フォルダを生成する。
4. **ソースコードの保存**: 変更をコミットし、`main` ブランチに Push する。
5. **公開環境の更新 (gh-pages)**: 以下の手順でビルド結果を `gh-pages` ブランチにプッシュする（手動デプロイ例）。
   ```bash
   git checkout gh-pages
   # distフォルダの内容をルートにコピー
   cp -a dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   git checkout main
   ```
   ※もしくは `gh-pages` npmパッケージなどを使用して `npx gh-pages -d dist` で自動デプロイを行う。

### 4.2 バックエンド (GAS) の改修・反映手順
1. `gas/Code.ts` を修正する。
2. Claspや手動コピー等を用いて、変更をGoogle Apps Scriptのエディタ環境へ反映する。
3. **重要: GASエディタ上で右上「デプロイ」>「新しいデプロイ」を選択してURLを再発行する。**
4. 新しく生成されたウェブアプリのURLをコピーし、フロントエンドの `src/App.tsx` 内の `GAS_WEBAPP_URL` 変数を新しいURLに更新する。
5. その後、「4.1 フロントエンドの反映手順」に従って再ビルドとデプロイを行う。

## 5. 主要なコンポーネント構成
- `src/App.tsx`: アプリケーションのエントリポイント。レイアウトの枠組み、データ取得処理（`fetch`）、一覧のフィルタリングロジックを持つ。ヘッダーの「青空と白い雲」のデザインもここに直書き。
- `src/components/LectureCard.tsx`: 各講座の詳細を表示するカード型コンポーネント。講座に紐づく画像の出し分けや「こんな人におすすめ」の展開トグル機能を持つ。
- `src/components/FilterBar.tsx`: ターム（Aターム、Bタームなど）で講座を絞り込むためのボタンUIコンポーネント。
- `src/data/mockData.ts`: サーバーと通信できなかった際やローカル開発用のダミーデータ。
