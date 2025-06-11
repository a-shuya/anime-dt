# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

これは日本語の決定木可視化Webアプリケーションで、決定木の成長過程をアニメーション表示する教育システムです。Pyodideを使用してブラウザ内でPythonを実行し、scikit-learn互換の決定木アルゴリズムを実装しています。

## ファイル構造とアーキテクチャ

### コアファイル
- **index.html**: パラメータ調整とキャンバス表示のメインインターフェース
- **tutorial.html**: 8レッスンの段階的学習システム
- **examples.html**: 実世界での応用例とベストプラクティス
- **decision-tree.js**: メイン可視化システムとPython/JavaScript統合管理
- **decision_tree_python.py**: scikit-learn互換のPython決定木実装
- **tutorial.js**: チュートリアルシステムの管理とインタラクティブデモ
- **datasets.js**: 機械学習データセット生成ユーティリティ
- **styles.css**: レスポンシブデザインと教育UI要素のスタイル

## 主要アーキテクチャコンポーネント

### DecisionTreeVisualizer (decision-tree.js)
メインコントローラーで以下を管理：
- **Python/JavaScript統合**: Pyodideを使用したハイブリッド実行システム
- **3つの学習モード**: 初心者・中級者・上級者向けの段階的UI
- **リアルタイム数式可視化**: Gini係数計算と情報利得の詳細表示
- **動的キャンバス**: 深度10+でもノード重複を防ぐ位置計算

### Python統合システム
- **Pyodideロード**: ブラウザ内でNumPyとscikit-learn互換の計算
- **フォールバック機能**: Python失敗時のJavaScript自動切り替え
- **非同期処理**: `buildTreePython()`と`applyPruning()`の非同期実装
- **評価指標**: Python計算のマクロ・重み付き平均対応

### TutorialSystem (tutorial.js)
8段階の段階的学習システム：
1. 決定木基礎概念
2. 分類デモ（インタラクティブキャンバス）
3. Gini係数計算機
4. 情報利得と分割ルール
5. 木の成長アニメーション
6. 過学習と剪定デモ
7. 性能評価計算機
8. 実践演習と修了証生成

### 教育機能アーキテクチャ
- **モード別表示制御**: 学習レベルに応じたUI要素の動的表示
- **インタラクティブデモ**: 分類境界、Gini計算、剪定効果の可視化
- **理解度評価**: 各レッスンでのクイズとフィードバック
- **進捗管理**: プログレスバーと学習状況の追跡

## 開発コマンド

純粋なクライアントサイドアプリケーションのため、ビルドプロセスは不要：

```bash
# アプリケーションの起動
open index.html
# または、ローカルサーバーで実行
python -m http.server 8000
```

## 重要な実装詳細

### Python/JavaScript統合
- **初期化**: `initializePython()`でPyodide環境をセットアップ
- **データ変換**: JavaScriptとPython間でのシームレスなデータ受け渡し
- **エラー処理**: Python実行失敗時のJavaScriptフォールバック
- **ステータス表示**: ローディング状況とPython準備状態の表示

### ノード配置アルゴリズム
`calculateNodePositions()`は以下の2段階処理：
1. `collectLevelNodes()`で各レベルのノードを収集
2. `calculateOptimalPositions()`で最適間隔を計算
3. 必要に応じてキャンバス幅を動的拡張

### 教育機能の実装
- **段階的公開**: 学習モードに応じた機能制限
- **リアルタイム計算**: パラメータ変更時の即座な木再構築
- **視覚的フィードバック**: 数式計算過程のステップバイステップ表示

### データセット統合

新しいデータセットを`datasets.js`に追加する場合：
1. `getAvailableDatasets()`にエントリを追加
2. `generate[Name]Dataset()`メソッドを実装
3. `{data, labels, featureNames, classNames, description}`オブジェクトを返す
4. 可視化互換性のため2特徴量を確保

## キャンバスアーキテクチャ

スクロール可能なキャンバスシステム：
- ベースサイズ: 1500x1200px（幅広木用の自動拡張）
- ノード半径: 35px、最小間隔100px
- レベル高: 120px
- 深度10+でも視覚的重複なし

## 日本語教育システム

- **用語統一**: 機械学習用語の一貫した日本語表記
- **段階的説明**: 初心者から上級者への学習経路
- **文脈的ヘルプ**: パラメータツールチップとガイダンス
- **実践例**: 日本の業界事例を用いた応用説明