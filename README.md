# Fukumaru_40 HP

NotionプロフィールページからHTML/CSS/JSの静的サイトに移行したホームページ。

## ローカル確認

`index.html` をブラウザで直接開くだけで動きます。

```
start website/index.html
```

または、Pythonの簡易サーバーを立てて確認：

```
cd website
python -m http.server 8000
# → http://localhost:8000
```

## 構成

```
website/
├── index.html       … 1ページ完結のHP本体
├── css/style.css    … 暖色オフホワイト系スタイル
├── js/script.js     … スクロール連動フェードイン＋ナビ挙動
└── README.md
```

外部依存：Google Fonts（Noto Sans JP / Shippori Mincho B1 / Inter）のみ。フレームワーク不使用。

## 公開先候補

- **GitHub Pages** … リポジトリにpushして設定で有効化
- **Netlify / Vercel** … `website/` フォルダをドラッグ&ドロップでデプロイ
- **レンタルサーバー** … FTPで `website/` の中身をアップロード

いずれも `index.html` をエントリーポイントとして公開可能。

## 編集ポイント

- 文言：`index.html` 内のテキストを直接書き換え
- 色味：`css/style.css` 冒頭の `:root` 変数を変更
- セクション追加：`<section class="section">` を増やせばOK（`reveal` クラスで自動フェードイン）
