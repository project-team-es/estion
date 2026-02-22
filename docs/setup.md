## 事前準備
- [VisualStudioCode](https://code.visualstudio.com/download) のインストール
- [DockerDesktop](https://www.docker.com/ja-jp/products/docker-desktop/) のインストール
- [Homebrew](https://brew.sh/) のインストール
- [Git](https://git-scm.com/install/mac) のインストール


### GitHubとローカルPCをSSHで接続

1. ローカル環境で`ssh-keygen`
    ```
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

2. 公開鍵をコピーする
    ```
    pbcopy < ~/.ssh/id_ed25519.pub
    ```

3. GitHubに登録する
    - Settings > SSH and GPG keys > New SSH key
    - Authentification Key にコピーした公開鍵をペースト
    - Authentication Key にコピーした公開鍵をペースト

4. ローカル環境で以下を実行
    ```
    ssh -T git@github.com
    ``` 

### ローカル環境にリポジトリを作成

1. 任意のディレクトリに移動し`git clone`
    ```
    git clone https://github.com/project-team-es/estion.git
    ```

2. 共同開発者から`.env`ファイルを共有してもらう

### Dockerで環境構築

1. PHPのインストール（最新版が入ります）
    ```
    $ brew install php

    # バージョンの確認
    $ php -v
    ```

2. Composerのインストール
    ```
    $ brew install composer

    # バージョンの確認
    $ composer -v
    ```

3. ライブラリのアップデート
    ```
    composer update
    ```

4. ライブラリのインストール
    ```
    composer install
    ```

5. sailコマンドでコンテナを立ち上げる
    ```
    ./vendor/bin/sail up -d
    ```

### エイリアスの設定

毎回`./vendor/bin/sail`するのは大変なので解消したい
- `nano ~/.zshrc`を実行し、以下のエイリアスを追加

    ```
    alias sail="./vendor/bin/sail"
    ```
- ctr+x -> y で保存し、以下のコマンドを実行
    ```
    source ~/.zshrc
    ```

### npmのインストールとフロントエンドの起動

- npmのインストール

    ```
    sail npm install
    ```
- フロントエンドの起動
    ```
    sail npm run dev
    ```

### データベースの準備
- テーブルの作成
    ```
    sail artisan migrate
    ```

- シーディングを実行
    ```
    sail artisan db:seed --class=IndustrySeeder
    ```

ブラウザで`localhost`にアクセスできる

### prettierとeslintの設定
1. Node.jsがインストールされているか確認
    ```
    node -v
    ```

2. Node.jsのインストール
    ```
    brew install node
    ```

3. インストール後の確認
    ```
    node -v
    npm -v
    ```

4. prettierとeslintをインストール
    ```
    npm install --save-dev eslint eslint-plugin-react eslint-config-prettier
    ```


### ログの確認
```
sail logs -f
```