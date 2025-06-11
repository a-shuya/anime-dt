// tutorial.js - チュートリアルシステム

class TutorialSystem {
    constructor() {
        this.currentLesson = 1;
        this.totalLessons = 8;
        this.lessons = this.initializeLessons();
        this.setupEventListeners();
        this.showLesson(1);
    }

    initializeLessons() {
        return {
            1: {
                title: "決定木とは？",
                content: `
                    <div class="lesson-intro">
                        <h2>🌳 決定木アルゴリズムの基礎</h2>
                        <p>決定木は、データを分類するための機械学習アルゴリズムです。人間の思考プロセスに似た「Yes/No」の質問を繰り返してデータを分類します。</p>
                    </div>

                    <div class="concept-explanation">
                        <h3>🤔 身近な例：果物の分類</h3>
                        <div class="example-tree">
                            <div class="tree-node root">
                                <div class="question">色は赤ですか？</div>
                                <div class="children">
                                    <div class="tree-node left">
                                        <div class="answer">はい</div>
                                        <div class="question">丸い形ですか？</div>
                                        <div class="children">
                                            <div class="tree-node">
                                                <div class="answer">はい</div>
                                                <div class="result">🍎 りんご</div>
                                            </div>
                                            <div class="tree-node">
                                                <div class="answer">いいえ</div>
                                                <div class="result">🍓 いちご</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tree-node right">
                                        <div class="answer">いいえ</div>
                                        <div class="question">黄色ですか？</div>
                                        <div class="children">
                                            <div class="tree-node">
                                                <div class="answer">はい</div>
                                                <div class="result">🍌 バナナ</div>
                                            </div>
                                            <div class="tree-node">
                                                <div class="answer">いいえ</div>
                                                <div class="result">🍊 オレンジ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="key-points">
                        <h3>🔑 重要なポイント</h3>
                        <ul>
                            <li><strong>直感的：</strong> 人間の判断プロセスに似ている</li>
                            <li><strong>解釈しやすい：</strong> なぜその結果になったかが分かる</li>
                            <li><strong>階層構造：</strong> ルートから葉まで順番に判断</li>
                        </ul>
                    </div>

                    <div class="interactive-demo">
                        <h3>🎯 理解度チェック</h3>
                        <div class="quiz">
                            <p>決定木の特徴として正しいものは？</p>
                            <div class="quiz-options">
                                <button class="quiz-option" data-correct="false">複雑な計算が必要</button>
                                <button class="quiz-option" data-correct="true">判断過程が分かりやすい</button>
                                <button class="quiz-option" data-correct="false">結果の説明ができない</button>
                            </div>
                            <div class="quiz-feedback" style="display: none;"></div>
                        </div>
                    </div>
                `
            },
            2: {
                title: "分類の基本",
                content: `
                    <div class="lesson-intro">
                        <h2>📊 データの分類方法</h2>
                        <p>決定木は特徴量（データの属性）を使ってデータを分類します。最適な分割点を見つけることが重要です。</p>
                    </div>

                    <div class="concept-explanation">
                        <h3>📈 2次元データの分類例</h3>
                        <div class="classification-demo">
                            <canvas id="classification-canvas" width="400" height="300"></canvas>
                            <div class="demo-controls">
                                <button id="add-red" class="demo-btn red">赤点追加</button>
                                <button id="add-blue" class="demo-btn blue">青点追加</button>
                                <button id="find-split" class="demo-btn">分割線を引く</button>
                                <button id="reset-demo" class="demo-btn">リセット</button>
                            </div>
                        </div>
                        <p><small>💡 クリックして点を追加し、分割線がどこに引かれるか確認してみましょう</small></p>
                    </div>

                    <div class="feature-explanation">
                        <h3>🎯 特徴量の選択</h3>
                        <div class="feature-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>特徴量</th>
                                        <th>説明</th>
                                        <th>例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>数値データ</td>
                                        <td>連続値（身長、収入など）</td>
                                        <td>身長 ≤ 170cm</td>
                                    </tr>
                                    <tr>
                                        <td>カテゴリデータ</td>
                                        <td>離散値（色、性別など）</td>
                                        <td>色 = 赤</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="split-criteria">
                        <h3>⚖️ 分割の良さを測る基準</h3>
                        <div class="criteria-comparison">
                            <div class="split-example good">
                                <h4>良い分割</h4>
                                <div class="split-visual">
                                    <div class="group pure">
                                        グループA: 🔴🔴🔴
                                    </div>
                                    <div class="group pure">
                                        グループB: 🔵🔵🔵
                                    </div>
                                </div>
                                <p>各グループが純粋（同じ色のみ）</p>
                            </div>
                            <div class="split-example bad">
                                <h4>悪い分割</h4>
                                <div class="split-visual">
                                    <div class="group mixed">
                                        グループA: 🔴🔵🔴
                                    </div>
                                    <div class="group mixed">
                                        グループB: 🔵🔴🔵
                                    </div>
                                </div>
                                <p>各グループが混在（色が混ざっている）</p>
                            </div>
                        </div>
                    </div>
                `
            },
            3: {
                title: "Gini係数",
                content: `
                    <div class="lesson-intro">
                        <h2>🧮 Gini係数の計算</h2>
                        <p>Gini係数は、データの「不純度」を測る指標です。0に近いほど純粋（同じクラスのみ）で、0.5に近いほど混合状態です。</p>
                    </div>

                    <div class="gini-formula">
                        <h3>📐 計算式</h3>
                        <div class="formula-box">
                            <div class="formula-math">
                                Gini係数 = 1 - Σ(p<sub>i</sub>)<sup>2</sup>
                            </div>
                            <p>p<sub>i</sub> = クラスiの割合</p>
                        </div>
                    </div>

                    <div class="gini-calculator">
                        <h3>🔢 実際に計算してみよう</h3>
                        <div class="calculator-interface">
                            <div class="data-input">
                                <h4>データの構成</h4>
                                <div class="class-input">
                                    <label>クラス0（赤）の個数：</label>
                                    <input type="number" id="class0-count" value="3" min="0">
                                </div>
                                <div class="class-input">
                                    <label>クラス1（青）の個数：</label>
                                    <input type="number" id="class1-count" value="2" min="0">
                                </div>
                                <button id="calculate-gini" class="calc-btn">Gini係数を計算</button>
                            </div>
                            
                            <div class="calculation-result" id="gini-result">
                                <!-- 計算結果がここに表示される -->
                            </div>
                        </div>
                    </div>

                    <div class="gini-examples">
                        <h3>📊 様々なケースでのGini係数</h3>
                        <div class="gini-cases">
                            <div class="gini-case">
                                <h4>完全に純粋な場合</h4>
                                <div class="case-data">🔴🔴🔴🔴🔴</div>
                                <div class="case-calc">
                                    p₁ = 5/5 = 1.0<br>
                                    Gini = 1 - (1.0)² = 0.0
                                </div>
                            </div>
                            <div class="gini-case">
                                <h4>完全に混合な場合</h4>
                                <div class="case-data">🔴🔴🔵🔵🔵</div>
                                <div class="case-calc">
                                    p₁ = 2/5 = 0.4, p₂ = 3/5 = 0.6<br>
                                    Gini = 1 - (0.4² + 0.6²) = 0.48
                                </div>
                            </div>
                            <div class="gini-case">
                                <h4>最大混合な場合</h4>
                                <div class="case-data">🔴🔴🔵🔵</div>
                                <div class="case-calc">
                                    p₁ = 2/4 = 0.5, p₂ = 2/4 = 0.5<br>
                                    Gini = 1 - (0.5² + 0.5²) = 0.5
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="interactive-demo">
                        <h3>🎯 理解度チェック</h3>
                        <div class="quiz">
                            <p>Gini係数が0.0の場合、データの状態は？</p>
                            <div class="quiz-options">
                                <button class="quiz-option" data-correct="false">完全に混合している</button>
                                <button class="quiz-option" data-correct="true">完全に純粋である</button>
                                <button class="quiz-option" data-correct="false">半分ずつ混合している</button>
                            </div>
                            <div class="quiz-feedback" style="display: none;"></div>
                        </div>
                    </div>
                `
            },
            4: {
                title: "分割ルール",
                content: `
                    <div class="lesson-intro">
                        <h2>🎯 最適な分割点の見つけ方</h2>
                        <p>決定木は、Gini係数を最も下げる分割点を選択します。これを「情報利得」と呼びます。</p>
                    </div>

                    <div class="information-gain">
                        <h3>📈 情報利得の計算</h3>
                        <div class="formula-box">
                            <div class="formula-math">
                                情報利得 = Gini(親) - [重み付きGini(左の子) + 重み付きGini(右の子)]
                            </div>
                        </div>
                    </div>

                    <div class="split-process">
                        <h3>🔍 分割プロセスの例</h3>
                        <div class="split-demo">
                            <div class="original-data">
                                <h4>元のデータ</h4>
                                <div class="data-visualization">
                                    <div class="data-point red" style="left: 20%;">A</div>
                                    <div class="data-point red" style="left: 30%;">B</div>
                                    <div class="data-point blue" style="left: 60%;">C</div>
                                    <div class="data-point blue" style="left: 80%;">D</div>
                                </div>
                                <div class="gini-value">Gini = 0.5</div>
                            </div>

                            <div class="split-candidates">
                                <h4>分割候補</h4>
                                <div class="candidate">
                                    <div class="split-line" style="left: 45%;">分割線1</div>
                                    <div class="groups">
                                        <div class="group">左: 🔴🔴 (Gini=0.0)</div>
                                        <div class="group">右: 🔵🔵 (Gini=0.0)</div>
                                    </div>
                                    <div class="gain">情報利得 = 0.5</div>
                                </div>
                                <div class="candidate">
                                    <div class="split-line" style="left: 25%;">分割線2</div>
                                    <div class="groups">
                                        <div class="group">左: 🔴 (Gini=0.0)</div>
                                        <div class="group">右: 🔴🔵🔵 (Gini=0.44)</div>
                                    </div>
                                    <div class="gain">情報利得 = 0.17</div>
                                </div>
                            </div>

                            <div class="best-split">
                                <h4>✨ 最適な分割</h4>
                                <p>情報利得が最大の分割線1を選択！</p>
                            </div>
                        </div>
                    </div>

                    <div class="split-types">
                        <h3>🎲 分割の種類</h3>
                        <div class="split-type-grid">
                            <div class="split-type">
                                <h4>数値特徴量</h4>
                                <div class="split-example">
                                    <code>年齢 ≤ 30</code>
                                </div>
                                <p>閾値で分割</p>
                            </div>
                            <div class="split-type">
                                <h4>カテゴリ特徴量</h4>
                                <div class="split-example">
                                    <code>職業 = エンジニア</code>
                                </div>
                                <p>カテゴリで分割</p>
                            </div>
                        </div>
                    </div>

                    <div class="stopping-criteria">
                        <h3>🛑 分割を止める条件</h3>
                        <div class="criteria-list">
                            <div class="criterion">
                                <div class="criterion-icon">📏</div>
                                <div class="criterion-text">
                                    <strong>最大深度</strong><br>
                                    木が深くなりすぎないように制限
                                </div>
                            </div>
                            <div class="criterion">
                                <div class="criterion-icon">👥</div>
                                <div class="criterion-text">
                                    <strong>最小サンプル数</strong><br>
                                    ノードのサンプル数が少なすぎる場合は停止
                                </div>
                            </div>
                            <div class="criterion">
                                <div class="criterion-icon">📊</div>
                                <div class="criterion-text">
                                    <strong>不純度改善</strong><br>
                                    情報利得が小さすぎる場合は停止
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            5: {
                title: "木の成長",
                content: `
                    <div class="lesson-intro">
                        <h2>🌱 決定木の成長過程</h2>
                        <p>決定木は根（ルート）から始まり、再帰的に分割を繰り返して成長します。各ステップで最適な分割を選択します。</p>
                    </div>

                    <div class="growth-process">
                        <h3>📋 成長のアルゴリズム</h3>
                        <div class="algorithm-steps">
                            <div class="step">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h4>初期化</h4>
                                    <p>すべてのデータをルートノードに配置</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h4>分割候補の評価</h4>
                                    <p>すべての特徴量と閾値で情報利得を計算</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h4>最適分割の選択</h4>
                                    <p>情報利得が最大の分割を選択</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <h4>再帰的分割</h4>
                                    <p>左右の子ノードに対して同じ処理を繰り返す</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">5</div>
                                <div class="step-content">
                                    <h4>停止条件の確認</h4>
                                    <p>停止条件を満たせば葉ノードとして確定</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="interactive-growth">
                        <h3>🎮 成長過程の可視化</h3>
                        <div class="growth-demo">
                            <div class="demo-controls">
                                <button id="growth-start" class="demo-btn">成長開始</button>
                                <button id="growth-step" class="demo-btn">次のステップ</button>
                                <button id="growth-reset" class="demo-btn">リセット</button>
                            </div>
                            <div class="growth-canvas-container">
                                <canvas id="growth-canvas" width="600" height="400"></canvas>
                            </div>
                            <div class="growth-info" id="growth-info">
                                ここに成長過程の説明が表示されます
                            </div>
                        </div>
                    </div>

                    <div class="depth-explanation">
                        <h3>📊 深度と複雑さの関係</h3>
                        <div class="depth-comparison">
                            <div class="depth-case">
                                <h4>浅い木（深度2）</h4>
                                <div class="tree-simple">
                                    <div class="node">ルート</div>
                                    <div class="level">
                                        <div class="node">ノード1</div>
                                        <div class="node">ノード2</div>
                                    </div>
                                    <div class="level">
                                        <div class="node leaf">葉1</div>
                                        <div class="node leaf">葉2</div>
                                        <div class="node leaf">葉3</div>
                                        <div class="node leaf">葉4</div>
                                    </div>
                                </div>
                                <div class="characteristics">
                                    <div class="pro">✅ 解釈しやすい</div>
                                    <div class="pro">✅ 一般化しやすい</div>
                                    <div class="con">❌ 表現力が限定的</div>
                                </div>
                            </div>
                            
                            <div class="depth-case">
                                <h4>深い木（深度5+）</h4>
                                <div class="tree-complex">
                                    <div class="many-nodes">
                                        <div class="node-cluster">多数のノード</div>
                                        <div class="node-cluster">複雑な分岐</div>
                                        <div class="node-cluster">細かい条件</div>
                                    </div>
                                </div>
                                <div class="characteristics">
                                    <div class="pro">✅ 高い表現力</div>
                                    <div class="con">❌ 過学習リスク</div>
                                    <div class="con">❌ 解釈困難</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="branching-factor">
                        <h3>🌿 分岐の種類</h3>
                        <div class="branch-types">
                            <div class="branch-type">
                                <h4>二分岐（Binary Split）</h4>
                                <div class="branch-visual binary">
                                    <div class="parent">親ノード</div>
                                    <div class="children">
                                        <div class="child">≤ 閾値</div>
                                        <div class="child">> 閾値</div>
                                    </div>
                                </div>
                                <p>最も一般的な分岐方法</p>
                            </div>
                            <div class="branch-type">
                                <h4>多分岐（Multi-way Split）</h4>
                                <div class="branch-visual multi">
                                    <div class="parent">親ノード</div>
                                    <div class="children">
                                        <div class="child">カテゴリA</div>
                                        <div class="child">カテゴリB</div>
                                        <div class="child">カテゴリC</div>
                                    </div>
                                </div>
                                <p>カテゴリ変数に対応</p>
                            </div>
                        </div>
                    </div>
                `
            },
            6: {
                title: "過学習と剪定",
                content: `
                    <div class="lesson-intro">
                        <h2>✂️ 過学習の問題と剪定</h2>
                        <p>決定木が深くなりすぎると「過学習」が発生し、新しいデータに対する性能が低下します。剪定により適切な複雑さに調整します。</p>
                    </div>

                    <div class="overfitting-explanation">
                        <h3>⚠️ 過学習とは？</h3>
                        <div class="overfitting-demo">
                            <div class="training-vs-test">
                                <div class="scenario">
                                    <h4>適切な学習</h4>
                                    <div class="accuracy-chart">
                                        <div class="chart-bar training" style="height: 85%;">
                                            <span>訓練精度: 85%</span>
                                        </div>
                                        <div class="chart-bar test" style="height: 83%;">
                                            <span>テスト精度: 83%</span>
                                        </div>
                                    </div>
                                    <p>✅ 訓練とテストの精度が近い</p>
                                </div>
                                
                                <div class="scenario overfitted">
                                    <h4>過学習</h4>
                                    <div class="accuracy-chart">
                                        <div class="chart-bar training" style="height: 98%;">
                                            <span>訓練精度: 98%</span>
                                        </div>
                                        <div class="chart-bar test" style="height: 65%;">
                                            <span>テスト精度: 65%</span>
                                        </div>
                                    </div>
                                    <p>❌ 大きな精度差が発生</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pruning-types">
                        <h3>✂️ 剪定の種類</h3>
                        <div class="pruning-methods">
                            <div class="pruning-method">
                                <h4>事前剪定（Pre-pruning）</h4>
                                <div class="method-description">
                                    <div class="method-icon">🛑</div>
                                    <div class="method-text">
                                        <p>木の成長中に停止条件を設定</p>
                                        <ul>
                                            <li>最大深度の制限</li>
                                            <li>最小サンプル数</li>
                                            <li>最小不純度改善</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pruning-method">
                                <h4>事後剪定（Post-pruning）</h4>
                                <div class="method-description">
                                    <div class="method-icon">✂️</div>
                                    <div class="method-text">
                                        <p>完全に成長させた後に不要な枝を削除</p>
                                        <ul>
                                            <li>Cost Complexity Pruning</li>
                                            <li>Reduced Error Pruning</li>
                                            <li>クロスバリデーション</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ccp-explanation">
                        <h3>🧮 Cost Complexity Pruning (CCP)</h3>
                        <div class="ccp-formula">
                            <div class="formula-box">
                                <div class="formula-math">
                                    コスト = エラー率 + α × 葉ノード数
                                </div>
                                <p>α (アルファ) = 複雑さペナルティパラメータ</p>
                            </div>
                        </div>
                        
                        <div class="alpha-effect">
                            <h4>αの効果</h4>
                            <div class="alpha-scenarios">
                                <div class="alpha-case">
                                    <div class="alpha-value">α = 0.0</div>
                                    <div class="alpha-result">剪定なし（元の木）</div>
                                </div>
                                <div class="alpha-case">
                                    <div class="alpha-value">α = 0.01</div>
                                    <div class="alpha-result">軽い剪定</div>
                                </div>
                                <div class="alpha-case">
                                    <div class="alpha-value">α = 0.1</div>
                                    <div class="alpha-result">強い剪定</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pruning-demo">
                        <h3>🎮 剪定の実演</h3>
                        <div class="demo-interface">
                            <div class="pruning-controls">
                                <label for="alpha-slider">α値：</label>
                                <input type="range" id="alpha-slider" min="0" max="0.1" step="0.001" value="0">
                                <span id="alpha-value">0.000</span>
                                <button id="apply-pruning" class="demo-btn">剪定適用</button>
                            </div>
                            
                            <div class="pruning-comparison">
                                <div class="tree-before">
                                    <h4>剪定前</h4>
                                    <div class="tree-stats">
                                        <div>ノード数: <span id="nodes-before">15</span></div>
                                        <div>葉数: <span id="leaves-before">8</span></div>
                                        <div>深度: <span id="depth-before">4</span></div>
                                    </div>
                                </div>
                                
                                <div class="tree-after">
                                    <h4>剪定後</h4>
                                    <div class="tree-stats">
                                        <div>ノード数: <span id="nodes-after">9</span></div>
                                        <div>葉数: <span id="leaves-after">5</span></div>
                                        <div>深度: <span id="depth-after">3</span></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="performance-comparison">
                                <div class="performance-metric">
                                    <div class="metric-name">訓練精度</div>
                                    <div class="metric-change">92% → 89% <span class="change-indicator">↓3%</span></div>
                                </div>
                                <div class="performance-metric">
                                    <div class="metric-name">テスト精度</div>
                                    <div class="metric-change">76% → 84% <span class="change-indicator improve">↑8%</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pruning-guidelines">
                        <h3>💡 剪定のガイドライン</h3>
                        <div class="guidelines">
                            <div class="guideline">
                                <div class="guideline-icon">📊</div>
                                <div class="guideline-text">
                                    <strong>データサイズに応じて調整</strong><br>
                                    小さなデータセットほど強い剪定が必要
                                </div>
                            </div>
                            <div class="guideline">
                                <div class="guideline-icon">🔄</div>
                                <div class="guideline-text">
                                    <strong>クロスバリデーションで最適化</strong><br>
                                    複数の分割でα値を評価
                                </div>
                            </div>
                            <div class="guideline">
                                <div class="guideline-icon">⚖️</div>
                                <div class="guideline-text">
                                    <strong>精度と解釈性のバランス</strong><br>
                                    ビジネス要件に応じて調整
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            7: {
                title: "性能評価",
                content: `
                    <div class="lesson-intro">
                        <h2>📈 性能評価指標</h2>
                        <p>決定木の性能を正しく評価するために、様々な指標を理解し、適切に使い分けることが重要です。</p>
                    </div>

                    <div class="metrics-overview">
                        <h3>📊 主要な評価指標</h3>
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <div class="metric-icon">🎯</div>
                                <h4>精度 (Accuracy)</h4>
                                <div class="metric-formula">
                                    (TP + TN) / (TP + TN + FP + FN)
                                </div>
                                <p>全体の予測がどれだけ正確か</p>
                            </div>
                            
                            <div class="metric-card">
                                <div class="metric-icon">🔍</div>
                                <h4>適合率 (Precision)</h4>
                                <div class="metric-formula">
                                    TP / (TP + FP)
                                </div>
                                <p>陽性予測のうち実際に陽性の割合</p>
                            </div>
                            
                            <div class="metric-card">
                                <div class="metric-icon">📡</div>
                                <h4>再現率 (Recall)</h4>
                                <div class="metric-formula">
                                    TP / (TP + FN)
                                </div>
                                <p>実際の陽性のうち正しく予測できた割合</p>
                            </div>
                            
                            <div class="metric-card">
                                <div class="metric-icon">⚖️</div>
                                <h4>F1スコア</h4>
                                <div class="metric-formula">
                                    2 × (Precision × Recall) / (Precision + Recall)
                                </div>
                                <p>適合率と再現率の調和平均</p>
                            </div>
                        </div>
                    </div>

                    <div class="confusion-matrix">
                        <h3>🔢 混同行列（Confusion Matrix）</h3>
                        <div class="matrix-explanation">
                            <div class="matrix-visual">
                                <table class="confusion-table">
                                    <thead>
                                        <tr>
                                            <th rowspan="2">実際</th>
                                            <th colspan="2">予測</th>
                                        </tr>
                                        <tr>
                                            <th>陽性</th>
                                            <th>陰性</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>陽性</th>
                                            <td class="tp">TP<br><span class="tp-example">85</span></td>
                                            <td class="fn">FN<br><span class="fn-example">15</span></td>
                                        </tr>
                                        <tr>
                                            <th>陰性</th>
                                            <td class="fp">FP<br><span class="fp-example">10</span></td>
                                            <td class="tn">TN<br><span class="tn-example">90</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="matrix-calculations">
                                <h4>📊 計算例</h4>
                                <div class="calc-results">
                                    <div class="calc-item">
                                        <strong>精度:</strong> (85+90)/(85+15+10+90) = 87.5%
                                    </div>
                                    <div class="calc-item">
                                        <strong>適合率:</strong> 85/(85+10) = 89.5%
                                    </div>
                                    <div class="calc-item">
                                        <strong>再現率:</strong> 85/(85+15) = 85.0%
                                    </div>
                                    <div class="calc-item">
                                        <strong>F1スコア:</strong> 2×(0.895×0.85)/(0.895+0.85) = 87.2%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="interactive-metrics">
                        <h3>🎮 指標の計算練習</h3>
                        <div class="metrics-calculator">
                            <div class="input-section">
                                <h4>混同行列の値を入力</h4>
                                <div class="matrix-inputs">
                                    <div class="input-group">
                                        <label>TP (真陽性):</label>
                                        <input type="number" id="tp-input" value="80" min="0">
                                    </div>
                                    <div class="input-group">
                                        <label>FN (偽陰性):</label>
                                        <input type="number" id="fn-input" value="20" min="0">
                                    </div>
                                    <div class="input-group">
                                        <label>FP (偽陽性):</label>
                                        <input type="number" id="fp-input" value="10" min="0">
                                    </div>
                                    <div class="input-group">
                                        <label>TN (真陰性):</label>
                                        <input type="number" id="tn-input" value="90" min="0">
                                    </div>
                                </div>
                                <button id="calculate-metrics" class="calc-btn">指標を計算</button>
                            </div>
                            
                            <div class="results-section" id="metrics-results">
                                <!-- 計算結果がここに表示される -->
                            </div>
                        </div>
                    </div>

                    <div class="multiclass-metrics">
                        <h3>🎨 多クラス分類の評価</h3>
                        <div class="multiclass-explanation">
                            <div class="averaging-methods">
                                <div class="method">
                                    <h4>マクロ平均</h4>
                                    <div class="method-description">
                                        各クラスの指標を平均<br>
                                        <code>(Metric₁ + Metric₂ + Metric₃) / 3</code>
                                    </div>
                                    <div class="method-use">📊 クラス間のバランスを重視</div>
                                </div>
                                
                                <div class="method">
                                    <h4>重み付き平均</h4>
                                    <div class="method-description">
                                        サンプル数で重み付けして平均<br>
                                        <code>Σ(Metric_i × Support_i) / Total</code>
                                    </div>
                                    <div class="method-use">📈 全体性能を重視</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="evaluation-strategy">
                        <h3>🔄 評価戦略</h3>
                        <div class="strategies">
                            <div class="strategy">
                                <h4>ホールドアウト法</h4>
                                <div class="strategy-visual">
                                    <div class="data-split">
                                        <div class="train-data">訓練データ (70%)</div>
                                        <div class="test-data">テストデータ (30%)</div>
                                    </div>
                                </div>
                                <p>🎯 シンプルで高速、大きなデータセット向け</p>
                            </div>
                            
                            <div class="strategy">
                                <h4>K分割クロスバリデーション</h4>
                                <div class="strategy-visual">
                                    <div class="cv-folds">
                                        <div class="fold">Fold 1</div>
                                        <div class="fold">Fold 2</div>
                                        <div class="fold">Fold 3</div>
                                        <div class="fold">Fold 4</div>
                                        <div class="fold">Fold 5</div>
                                    </div>
                                </div>
                                <p>📊 より信頼性の高い評価、小さなデータセット向け</p>
                            </div>
                        </div>
                    </div>

                    <div class="metric-selection">
                        <h3>🎯 指標の選び方</h3>
                        <div class="selection-guide">
                            <div class="use-case">
                                <div class="case-icon">🏥</div>
                                <div class="case-content">
                                    <h4>医療診断</h4>
                                    <p><strong>重視：</strong> 再現率（見逃しを防ぐ）</p>
                                    <p><strong>理由：</strong> 病気を見逃すリスクが高い</p>
                                </div>
                            </div>
                            
                            <div class="use-case">
                                <div class="case-icon">📧</div>
                                <div class="case-content">
                                    <h4>スパムフィルタ</h4>
                                    <p><strong>重視：</strong> 適合率（誤検知を防ぐ）</p>
                                    <p><strong>理由：</strong> 重要メールを誤って削除しない</p>
                                </div>
                            </div>
                            
                            <div class="use-case">
                                <div class="case-icon">⚖️</div>
                                <div class="case-content">
                                    <h4>一般的な分類</h4>
                                    <p><strong>重視：</strong> F1スコア（バランス）</p>
                                    <p><strong>理由：</strong> 適合率と再現率の両方が重要</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            8: {
                title: "実践演習",
                content: `
                    <div class="lesson-intro">
                        <h2>🎓 実践演習</h2>
                        <p>これまで学んだ内容を総合して、実際の問題に決定木を適用してみましょう。</p>
                    </div>

                    <div class="practice-scenarios">
                        <h3>🎯 演習シナリオ</h3>
                        <div class="scenarios-grid">
                            <div class="scenario-card">
                                <div class="scenario-icon">🏠</div>
                                <h4>不動産価格予測</h4>
                                <div class="scenario-details">
                                    <p><strong>目標：</strong> 住宅が高価格帯かどうかの分類</p>
                                    <p><strong>特徴量：</strong> 面積、築年数、駅からの距離</p>
                                    <p><strong>課題：</strong> 適切なパラメータ設定</p>
                                </div>
                                <button class="scenario-btn" data-scenario="housing">挑戦する</button>
                            </div>
                            
                            <div class="scenario-card">
                                <div class="scenario-icon">💳</div>
                                <h4>信用リスク評価</h4>
                                <div class="scenario-details">
                                    <p><strong>目標：</strong> ローンの承認可否判定</p>
                                    <p><strong>特徴量：</strong> 年収、勤続年数、借入履歴</p>
                                    <p><strong>課題：</strong> 偽陽性の最小化</p>
                                </div>
                                <button class="scenario-btn" data-scenario="credit">挑戦する</button>
                            </div>
                            
                            <div class="scenario-card">
                                <div class="scenario-icon">🌱</div>
                                <h4>植物種分類</h4>
                                <div class="scenario-details">
                                    <p><strong>目標：</strong> 花の画像特徴から種類を判定</p>
                                    <p><strong>特徴量：</strong> 花弁の長さ、幅、色相</p>
                                    <p><strong>課題：</strong> 多クラス分類の最適化</p>
                                </div>
                                <button class="scenario-btn" data-scenario="plants">挑戦する</button>
                            </div>
                        </div>
                    </div>

                    <div class="practice-workspace" id="practice-workspace" style="display: none;">
                        <h3>🔬 実践ワークスペース</h3>
                        <div class="workspace-content">
                            <div class="scenario-info" id="scenario-info">
                                <!-- 選択されたシナリオの詳細 -->
                            </div>
                            
                            <div class="parameter-tuning">
                                <h4>⚙️ パラメータ調整</h4>
                                <div class="tuning-controls">
                                    <div class="param-control">
                                        <label>最大深度:</label>
                                        <input type="range" id="practice-max-depth" min="1" max="10" value="3">
                                        <span id="practice-max-depth-value">3</span>
                                    </div>
                                    <div class="param-control">
                                        <label>最小分割サンプル数:</label>
                                        <input type="range" id="practice-min-samples" min="2" max="20" value="2">
                                        <span id="practice-min-samples-value">2</span>
                                    </div>
                                    <div class="param-control">
                                        <label>剪定パラメータ (α):</label>
                                        <input type="range" id="practice-alpha" min="0" max="0.1" step="0.001" value="0">
                                        <span id="practice-alpha-value">0.000</span>
                                    </div>
                                </div>
                                <button id="apply-parameters" class="apply-btn">パラメータ適用</button>
                            </div>
                            
                            <div class="results-display">
                                <h4>📊 結果</h4>
                                <div class="results-grid" id="practice-results">
                                    <!-- 結果がここに表示される -->
                                </div>
                            </div>
                            
                            <div class="improvement-suggestions" id="improvement-suggestions">
                                <!-- 改善提案がここに表示される -->
                            </div>
                        </div>
                    </div>

                    <div class="best-practices">
                        <h3>💡 ベストプラクティス</h3>
                        <div class="practices-list">
                            <div class="practice-item">
                                <div class="practice-icon">🔍</div>
                                <div class="practice-content">
                                    <h4>データの前処理</h4>
                                    <ul>
                                        <li>欠損値の適切な処理</li>
                                        <li>カテゴリ変数のエンコーディング</li>
                                        <li>外れ値の検出と対処</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="practice-item">
                                <div class="practice-icon">⚙️</div>
                                <div class="practice-content">
                                    <h4>パラメータ調整</h4>
                                    <ul>
                                        <li>グリッドサーチによる最適化</li>
                                        <li>クロスバリデーションでの評価</li>
                                        <li>過学習の監視</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="practice-item">
                                <div class="practice-icon">📈</div>
                                <div class="practice-content">
                                    <h4>性能向上</h4>
                                    <ul>
                                        <li>特徴量エンジニアリング</li>
                                        <li>アンサンブル手法の活用</li>
                                        <li>ドメイン知識の組み込み</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="quiz-final">
                        <h3>🏆 総合理解度テスト</h3>
                        <div class="final-quiz">
                            <div class="quiz-question">
                                <p><strong>問題1:</strong> Gini係数が0.3のノードと0.1のノードでは、どちらがより純粋ですか？</p>
                                <div class="quiz-options">
                                    <button class="quiz-option" data-correct="false">0.3のノード</button>
                                    <button class="quiz-option" data-correct="true">0.1のノード</button>
                                    <button class="quiz-option" data-correct="false">同じ</button>
                                </div>
                            </div>
                            
                            <div class="quiz-question">
                                <p><strong>問題2:</strong> 過学習を防ぐために最も効果的な手法は？</p>
                                <div class="quiz-options">
                                    <button class="quiz-option" data-correct="false">深度を深くする</button>
                                    <button class="quiz-option" data-correct="true">剪定を適用する</button>
                                    <button class="quiz-option" data-correct="false">特徴量を増やす</button>
                                </div>
                            </div>
                            
                            <div class="quiz-question">
                                <p><strong>問題3:</strong> 医療診断システムで最も重視すべき指標は？</p>
                                <div class="quiz-options">
                                    <button class="quiz-option" data-correct="false">適合率</button>
                                    <button class="quiz-option" data-correct="true">再現率</button>
                                    <button class="quiz-option" data-correct="false">精度</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="quiz-score" id="final-quiz-score" style="display: none;">
                            <!-- スコアがここに表示される -->
                        </div>
                    </div>

                    <div class="completion-certificate">
                        <h3>🎓 修了証</h3>
                        <div class="certificate-container" id="certificate" style="display: none;">
                            <div class="certificate-content">
                                <div class="certificate-header">
                                    <h2>🌳 決定木マスター認定証</h2>
                                </div>
                                <div class="certificate-body">
                                    <p>この証明書は、</p>
                                    <div class="recipient-name">学習者</div>
                                    <p>が決定木アルゴリズムのチュートリアルを</p>
                                    <p>完了したことを証明します</p>
                                </div>
                                <div class="certificate-footer">
                                    <div class="certificate-date" id="certificate-date"></div>
                                    <div class="certificate-signature">🌳 Decision Tree Learning System</div>
                                </div>
                            </div>
                        </div>
                        <button id="generate-certificate" class="certificate-btn" style="display: none;">修了証を生成</button>
                    </div>
                `
            }
        };
    }

    setupEventListeners() {
        // レッスン選択ボタン
        document.querySelectorAll('.lesson-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lesson = parseInt(e.currentTarget.dataset.lesson);
                this.showLesson(lesson);
            });
        });

        // ナビゲーションボタン
        document.getElementById('prev-lesson').addEventListener('click', () => {
            if (this.currentLesson > 1) {
                this.showLesson(this.currentLesson - 1);
            }
        });

        document.getElementById('next-lesson').addEventListener('click', () => {
            if (this.currentLesson < this.totalLessons) {
                this.showLesson(this.currentLesson + 1);
            }
        });

        document.getElementById('start-practice').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    showLesson(lessonNumber) {
        this.currentLesson = lessonNumber;
        
        // レッスンボタンの状態更新
        document.querySelectorAll('.lesson-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.lesson) === lessonNumber) {
                btn.classList.add('active');
            }
        });

        // プログレスバー更新
        const progress = (lessonNumber / this.totalLessons) * 100;
        document.getElementById('tutorial-progress-fill').style.width = progress + '%';
        document.getElementById('current-lesson').textContent = lessonNumber;

        // レッスンコンテンツ表示
        const lesson = this.lessons[lessonNumber];
        document.getElementById('lesson-content').innerHTML = lesson.content;

        // ナビゲーションボタンの状態更新
        document.getElementById('prev-lesson').disabled = lessonNumber === 1;
        document.getElementById('next-lesson').disabled = lessonNumber === this.totalLessons;
        
        if (lessonNumber === this.totalLessons) {
            document.getElementById('next-lesson').style.display = 'none';
            document.getElementById('start-practice').style.display = 'inline-block';
        } else {
            document.getElementById('next-lesson').style.display = 'inline-block';
            document.getElementById('start-practice').style.display = 'none';
        }

        // レッスン固有の初期化
        this.initializeLessonSpecific(lessonNumber);
    }

    initializeLessonSpecific(lessonNumber) {
        // 前回のイベントリスナーをクリア
        this.clearEventListeners();
        
        switch(lessonNumber) {
            case 1:
                this.initializeLesson1();
                break;
            case 2:
                this.initializeLesson2();
                break;
            case 3:
                this.initializeLesson3();
                break;
            case 4:
                this.initializeLesson4();
                break;
            case 5:
                this.initializeLesson5();
                break;
            case 6:
                this.initializeLesson6();
                break;
            case 7:
                this.initializeLesson7();
                break;
            case 8:
                this.initializeLesson8();
                break;
        }
    }

    clearEventListeners() {
        // 既存のイベントリスナーを削除するためのクリーンアップ
        document.querySelectorAll('.quiz-option').forEach(option => {
            const newOption = option.cloneNode(true);
            // 選択状態をリセット
            newOption.classList.remove('selected');
            option.replaceWith(newOption);
        });
        
        // クイズフィードバックをリセット
        document.querySelectorAll('.quiz-feedback').forEach(feedback => {
            feedback.style.display = 'none';
            feedback.innerHTML = '';
        });
        
        // デモボタンもクリア
        const demoButtons = ['add-red', 'add-blue', 'find-split', 'reset-demo', 'calculate-gini', 'apply-parameters', 'growth-start', 'growth-step', 'growth-reset', 'apply-pruning', 'calculate-metrics'];
        demoButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.replaceWith(btn.cloneNode(true));
            }
        });
    }

    initializeLesson1() {
        // レッスン1のクイズ初期化
        this.initializeLessonQuiz();
    }

    initializeLessonQuiz() {
        // 現在表示されているレッスンのクイズを初期化
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const quiz = e.target.closest('.quiz');
                const options = quiz.querySelectorAll('.quiz-option');
                const feedback = quiz.querySelector('.quiz-feedback');
                
                // 同じクイズ内の他のオプションの選択を解除
                options.forEach(opt => opt.classList.remove('selected'));
                
                // 現在のオプションを選択状態にする
                e.target.classList.add('selected');
                
                const isCorrect = e.target.dataset.correct === 'true';
                
                if (isCorrect) {
                    feedback.innerHTML = this.getCorrectFeedback(e.target);
                    feedback.style.color = '#28a745';
                    feedback.style.background = '#d4edda';
                    feedback.style.border = '1px solid #28a745';
                } else {
                    feedback.innerHTML = this.getIncorrectFeedback(e.target);
                    feedback.style.color = '#dc3545';
                    feedback.style.background = '#f8d7da';
                    feedback.style.border = '1px solid #dc3545';
                }
                feedback.style.display = 'block';
            });
        });
    }

    getCorrectFeedback(option) {
        // オプションに応じた正解フィードバックを返す
        const optionText = option.textContent.trim();
        
        if (optionText.includes('判断過程')) {
            return '✅ 正解！決定木は判断過程が分かりやすいのが特徴です。';
        } else if (optionText.includes('0.1')) {
            return '✅ 正解！Gini係数が小さいほど純粋（同じクラスのみ）です。';
        } else if (optionText.includes('剪定')) {
            return '✅ 正解！剪定は過学習を防ぐ最も効果的な手法です。';
        } else if (optionText.includes('再現率')) {
            return '✅ 正解！医療診断では見逃し（偽陰性）を避けることが最重要です。';
        } else {
            return '✅ 正解です！';
        }
    }

    getIncorrectFeedback(option) {
        // オプションに応じた不正解フィードバックを返す
        const optionText = option.textContent.trim();
        
        if (optionText.includes('複雑な計算') || optionText.includes('説明ができない')) {
            return '❌ 不正解。決定木の最大の特徴は解釈しやすさです。';
        } else if (optionText.includes('0.3') || optionText.includes('同じ')) {
            return '❌ 不正解。Gini係数は0に近いほど純粋です。';
        } else if (optionText.includes('深度を深く') || optionText.includes('特徴量を増やす')) {
            return '❌ 不正解。これらは過学習を悪化させる可能性があります。';
        } else if (optionText.includes('適合率') || optionText.includes('精度')) {
            return '❌ 不正解。医療診断では病気を見逃さないことが最重要です。';
        } else {
            return '❌ 不正解です。もう一度考えてみましょう。';
        }
    }

    initializeLesson2() {
        // 分類デモの初期化
        const canvas = document.getElementById('classification-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            this.demoPoints = {red: [], blue: []};
            this.drawClassificationDemo(ctx);
            this.setupClassificationDemo();
        }
    }

    setupClassificationDemo() {
        const addRedBtn = document.getElementById('add-red');
        const addBlueBtn = document.getElementById('add-blue');
        const findSplitBtn = document.getElementById('find-split');
        const resetDemoBtn = document.getElementById('reset-demo');
        const canvas = document.getElementById('classification-canvas');

        if (addRedBtn) {
            addRedBtn.addEventListener('click', () => {
                this.addRandomPoint('red');
            });
        }

        if (addBlueBtn) {
            addBlueBtn.addEventListener('click', () => {
                this.addRandomPoint('blue');
            });
        }

        if (findSplitBtn) {
            findSplitBtn.addEventListener('click', () => {
                this.findAndDrawSplit();
            });
        }

        if (resetDemoBtn) {
            resetDemoBtn.addEventListener('click', () => {
                this.resetDemo();
            });
        }

        if (canvas) {
            canvas.addEventListener('click', (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                // デフォルトで赤い点を追加
                this.addPoint('red', x, y);
            });
        }
    }

    addRandomPoint(color) {
        const canvas = document.getElementById('classification-canvas');
        if (!canvas) return;

        const x = Math.random() * (canvas.width - 40) + 20;
        const y = Math.random() * (canvas.height - 40) + 20;
        this.addPoint(color, x, y);
    }

    addPoint(color, x, y) {
        if (!this.demoPoints) this.demoPoints = {red: [], blue: []};
        
        this.demoPoints[color].push({x, y});
        this.redrawCanvas();
    }

    findAndDrawSplit() {
        const canvas = document.getElementById('classification-canvas');
        if (!canvas) return;

        // 簡単な分割線を計算（X座標の中央値）
        const allPoints = [...this.demoPoints.red, ...this.demoPoints.blue];
        if (allPoints.length < 2) return;

        const xValues = allPoints.map(p => p.x).sort((a, b) => a - b);
        const splitX = xValues[Math.floor(xValues.length / 2)];

        const ctx = canvas.getContext('2d');
        this.redrawCanvas();
        
        // 分割線を描画
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(splitX, 0);
        ctx.lineTo(splitX, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // 分割の評価を表示
        const leftRed = this.demoPoints.red.filter(p => p.x <= splitX).length;
        const leftBlue = this.demoPoints.blue.filter(p => p.x <= splitX).length;
        const rightRed = this.demoPoints.red.filter(p => p.x > splitX).length;
        const rightBlue = this.demoPoints.blue.filter(p => p.x > splitX).length;

        console.log(`分割結果: 左(赤:${leftRed}, 青:${leftBlue}) 右(赤:${rightRed}, 青:${rightBlue})`);
    }

    resetDemo() {
        this.demoPoints = {red: [], blue: []};
        this.redrawCanvas();
    }

    redrawCanvas() {
        const canvas = document.getElementById('classification-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        this.drawClassificationDemo(ctx);
    }

    initializeLesson3() {
        // Gini計算機の初期化
        const calculateBtn = document.getElementById('calculate-gini');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateGiniExample();
            });
        }

        // レッスン3のクイズ初期化
        this.initializeLessonQuiz();
    }

    initializeLesson8() {
        // 実践演習の初期化
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const scenario = e.target.dataset.scenario;
                this.startPracticeScenario(scenario);
            });
        });

        // 最終クイズの初期化
        this.initializeFinalQuiz();
        this.initializeCertificate();
    }

    initializeFinalQuiz() {
        this.quizAnswers = [];
        document.querySelectorAll('.quiz-question').forEach((question, questionIndex) => {
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    // 同じ質問の他のオプションの選択を解除
                    options.forEach(opt => opt.classList.remove('selected'));
                    
                    // 現在のオプションを選択
                    e.target.classList.add('selected');
                    
                    // 答えを記録
                    this.quizAnswers[questionIndex] = e.target.dataset.correct === 'true';
                    
                    // 全ての質問に答えたかチェック
                    this.checkQuizCompletion();
                });
            });
        });
    }

    checkQuizCompletion() {
        const totalQuestions = document.querySelectorAll('.quiz-question').length;
        if (this.quizAnswers.length === totalQuestions && this.quizAnswers.every(answer => answer !== undefined)) {
            this.showQuizResults();
        }
    }

    showQuizResults() {
        const correctCount = this.quizAnswers.filter(answer => answer === true).length;
        const totalQuestions = this.quizAnswers.length;
        const percentage = (correctCount / totalQuestions) * 100;
        
        const scoreElement = document.getElementById('final-quiz-score');
        if (scoreElement) {
            let message = '';
            let badgeClass = '';
            
            if (percentage >= 80) {
                message = '🎉 素晴らしい！決定木を完璧に理解しています！';
                badgeClass = 'excellent';
                this.enableCertificate();
            } else if (percentage >= 60) {
                message = '👍 良くできました！基本的な概念は理解できています。';
                badgeClass = 'good';
                this.enableCertificate();
            } else {
                message = '📚 もう一度チュートリアルを復習してみましょう。';
                badgeClass = 'needs-review';
            }
            
            scoreElement.innerHTML = `
                <div class="quiz-result ${badgeClass}">
                    <div class="score-display">
                        <div class="score-number">${correctCount}/${totalQuestions}</div>
                        <div class="score-percentage">${percentage.toFixed(0)}%</div>
                    </div>
                    <div class="score-message">${message}</div>
                </div>
            `;
            scoreElement.style.display = 'block';
        }
    }

    initializeCertificate() {
        const generateBtn = document.getElementById('generate-certificate');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateCertificate();
            });
        }
    }

    enableCertificate() {
        const generateBtn = document.getElementById('generate-certificate');
        if (generateBtn) {
            generateBtn.style.display = 'inline-block';
        }
    }

    generateCertificate() {
        const certificate = document.getElementById('certificate');
        const dateElement = document.getElementById('certificate-date');
        
        if (certificate && dateElement) {
            const today = new Date();
            const dateString = today.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            dateElement.textContent = dateString;
            certificate.style.display = 'block';
            
            // 修了証をスクロール表示
            certificate.scrollIntoView({ behavior: 'smooth' });
        }
    }

    drawClassificationDemo(ctx) {
        const canvas = document.getElementById('classification-canvas');
        if (!canvas) return;
        
        // キャンバスサイズを確認
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 背景
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 既存の点を描画
        if (this.demoPoints) {
            // 赤い点
            ctx.fillStyle = '#FF6B6B';
            this.demoPoints.red.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
                ctx.fill();
            });
            
            // 青い点
            ctx.fillStyle = '#4ECDC4';
            this.demoPoints.blue.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
                ctx.fill();
            });
        } else {
            // 初期のデモ点
            ctx.fillStyle = '#FF6B6B';
            [[50, 50], [80, 70], [60, 100], [90, 80]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fill();
            });
            
            // 青い点
            ctx.fillStyle = '#4ECDC4';
            [[250, 150], [300, 180], [280, 200], [320, 170]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
    }

    calculateGiniExample() {
        const class0Count = parseInt(document.getElementById('class0-count').value) || 0;
        const class1Count = parseInt(document.getElementById('class1-count').value) || 0;
        const total = class0Count + class1Count;
        
        if (total === 0) {
            document.getElementById('gini-result').innerHTML = '<p>データを入力してください</p>';
            return;
        }
        
        const p0 = class0Count / total;
        const p1 = class1Count / total;
        const gini = 1 - (p0 * p0 + p1 * p1);
        
        document.getElementById('gini-result').innerHTML = `
            <h4>計算結果</h4>
            <div class="calculation-steps">
                <div class="step">総サンプル数: ${total}</div>
                <div class="step">クラス0の割合: p₀ = ${class0Count}/${total} = ${p0.toFixed(3)}</div>
                <div class="step">クラス1の割合: p₁ = ${class1Count}/${total} = ${p1.toFixed(3)}</div>
                <div class="step">Gini係数 = 1 - (p₀² + p₁²)</div>
                <div class="step">= 1 - (${p0.toFixed(3)}² + ${p1.toFixed(3)}²)</div>
                <div class="step">= 1 - ${(p0*p0 + p1*p1).toFixed(3)}</div>
                <div class="result">= <strong>${gini.toFixed(3)}</strong></div>
            </div>
        `;
    }

    initializeLesson4() {
        // 分割ルールのデモを初期化
        this.initializeLessonQuiz();
        console.log('Lesson 4 initialized');
    }

    initializeLesson5() {
        // 木の成長デモを初期化
        const startBtn = document.getElementById('growth-start');
        const stepBtn = document.getElementById('growth-step');
        const resetBtn = document.getElementById('growth-reset');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startGrowthDemo();
            });
        }

        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                this.growthStepDemo();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetGrowthDemo();
            });
        }

        // クイズ初期化
        this.initializeLessonQuiz();
    }

    initializeLesson6() {
        // 剪定デモを初期化
        const alphaSlider = document.getElementById('alpha-slider');
        const alphaValue = document.getElementById('alpha-value');
        const applyPruningBtn = document.getElementById('apply-pruning');

        if (alphaSlider && alphaValue) {
            alphaSlider.addEventListener('input', (e) => {
                alphaValue.textContent = parseFloat(e.target.value).toFixed(3);
            });
        }

        if (applyPruningBtn) {
            applyPruningBtn.addEventListener('click', () => {
                this.applyPruningDemo();
            });
        }

        // クイズ初期化
        this.initializeLessonQuiz();
    }

    initializeLesson7() {
        // 性能評価の計算機を初期化
        const calculateBtn = document.getElementById('calculate-metrics');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateMetricsExample();
            });
        }

        // 入力値の変更監視
        ['tp-input', 'fn-input', 'fp-input', 'tn-input'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    this.updateMetricsPreview();
                });
            }
        });

        // クイズ初期化
        this.initializeLessonQuiz();
    }

    // Growth Demo Methods
    startGrowthDemo() {
        this.currentGrowthStep = 0;
        this.updateGrowthInfo('成長を開始します...');
        this.drawGrowthStep();
    }

    growthStepDemo() {
        if (this.currentGrowthStep < 4) {
            this.currentGrowthStep++;
            this.drawGrowthStep();
        }
    }

    resetGrowthDemo() {
        this.currentGrowthStep = 0;
        const canvas = document.getElementById('growth-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        this.updateGrowthInfo('成長デモをリセットしました');
    }

    drawGrowthStep() {
        const canvas = document.getElementById('growth-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const steps = [
            'ルートノード作成',
            '最初の分割',
            '左の子ノード分割',
            '右の子ノード分割',
            '成長完了'
        ];

        // 簡単な木の描画
        ctx.fillStyle = '#667eea';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;

        switch(this.currentGrowthStep) {
            case 0:
                // ルートノードのみ
                this.drawNode(ctx, 300, 100, 'Root');
                break;
            case 1:
                // ルート + 2つの子
                this.drawNode(ctx, 300, 100, 'Root');
                this.drawNode(ctx, 200, 200, 'Left');
                this.drawNode(ctx, 400, 200, 'Right');
                this.drawEdge(ctx, 300, 100, 200, 200);
                this.drawEdge(ctx, 300, 100, 400, 200);
                break;
            case 2:
                // 左の子をさらに分割
                this.drawNode(ctx, 300, 100, 'Root');
                this.drawNode(ctx, 200, 200, 'Left');
                this.drawNode(ctx, 400, 200, 'Right');
                this.drawNode(ctx, 150, 300, 'LL');
                this.drawNode(ctx, 250, 300, 'LR');
                this.drawEdge(ctx, 300, 100, 200, 200);
                this.drawEdge(ctx, 300, 100, 400, 200);
                this.drawEdge(ctx, 200, 200, 150, 300);
                this.drawEdge(ctx, 200, 200, 250, 300);
                break;
            case 3:
                // 右の子も分割
                this.drawNode(ctx, 300, 100, 'Root');
                this.drawNode(ctx, 200, 200, 'Left');
                this.drawNode(ctx, 400, 200, 'Right');
                this.drawNode(ctx, 150, 300, 'LL');
                this.drawNode(ctx, 250, 300, 'LR');
                this.drawNode(ctx, 350, 300, 'RL');
                this.drawNode(ctx, 450, 300, 'RR');
                this.drawEdge(ctx, 300, 100, 200, 200);
                this.drawEdge(ctx, 300, 100, 400, 200);
                this.drawEdge(ctx, 200, 200, 150, 300);
                this.drawEdge(ctx, 200, 200, 250, 300);
                this.drawEdge(ctx, 400, 200, 350, 300);
                this.drawEdge(ctx, 400, 200, 450, 300);
                break;
        }

        this.updateGrowthInfo(`ステップ ${this.currentGrowthStep + 1}: ${steps[this.currentGrowthStep]}`);
    }

    drawNode(ctx, x, y, label) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
    }

    drawEdge(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    updateGrowthInfo(text) {
        const infoElement = document.getElementById('growth-info');
        if (infoElement) {
            infoElement.textContent = text;
        }
    }

    // Pruning Demo Methods
    applyPruningDemo() {
        const alpha = parseFloat(document.getElementById('alpha-slider').value);
        
        // 剪定前後の統計を更新
        const nodesBefore = 15 - Math.floor(alpha * 100);
        const leavesBefore = 8 - Math.floor(alpha * 50);
        const depthBefore = 4 - Math.floor(alpha * 20);

        document.getElementById('nodes-after').textContent = Math.max(1, nodesBefore);
        document.getElementById('leaves-after').textContent = Math.max(1, leavesBefore);
        document.getElementById('depth-after').textContent = Math.max(1, depthBefore);

        console.log(`剪定適用: α=${alpha}`);
    }

    // Metrics calculation
    calculateMetricsExample() {
        const tp = parseInt(document.getElementById('tp-input').value) || 0;
        const fn = parseInt(document.getElementById('fn-input').value) || 0;
        const fp = parseInt(document.getElementById('fp-input').value) || 0;
        const tn = parseInt(document.getElementById('tn-input').value) || 0;

        const total = tp + fn + fp + tn;
        if (total === 0) return;

        const accuracy = (tp + tn) / total;
        const precision = tp / (tp + fp) || 0;
        const recall = tp / (tp + fn) || 0;
        const f1 = 2 * (precision * recall) / (precision + recall) || 0;

        const resultsElement = document.getElementById('metrics-results');
        if (resultsElement) {
            resultsElement.innerHTML = `
                <div class="result-item">
                    <strong>精度 (Accuracy):</strong> ${(accuracy * 100).toFixed(1)}%
                </div>
                <div class="result-item">
                    <strong>適合率 (Precision):</strong> ${(precision * 100).toFixed(1)}%
                </div>
                <div class="result-item">
                    <strong>再現率 (Recall):</strong> ${(recall * 100).toFixed(1)}%
                </div>
                <div class="result-item">
                    <strong>F1スコア:</strong> ${(f1 * 100).toFixed(1)}%
                </div>
            `;
        }
    }

    updateMetricsPreview() {
        // リアルタイムプレビュー
        this.calculateMetricsExample();
    }

    startPracticeScenario(scenario) {
        document.getElementById('practice-workspace').style.display = 'block';
        
        const scenarios = {
            housing: {
                title: '🏠 不動産価格予測',
                description: '住宅の特徴から高価格帯かどうかを予測するモデルを構築します。',
                features: ['面積 (㎡)', '築年数', '最寄り駅距離 (分)'],
                target: '高価格帯 (1) / 標準価格帯 (0)'
            },
            credit: {
                title: '💳 信用リスク評価',
                description: 'ローン申請者の情報から承認可否を判定するモデルを構築します。',
                features: ['年収 (万円)', '勤続年数', '過去の借入回数'],
                target: '承認 (1) / 否認 (0)'
            },
            plants: {
                title: '🌱 植物種分類',
                description: '花の特徴から植物の種類を分類するモデルを構築します。',
                features: ['花弁長 (cm)', '花弁幅 (cm)', '色相値'],
                target: '種類A / 種類B / 種類C'
            }
        };
        
        const selectedScenario = scenarios[scenario];
        document.getElementById('scenario-info').innerHTML = `
            <h4>${selectedScenario.title}</h4>
            <p>${selectedScenario.description}</p>
            <div class="scenario-details">
                <div><strong>特徴量:</strong> ${selectedScenario.features.join(', ')}</div>
                <div><strong>目標変数:</strong> ${selectedScenario.target}</div>
            </div>
        `;

        // 実践用のパラメータ調整機能
        this.setupPracticeControls();
    }

    setupPracticeControls() {
        const applyBtn = document.getElementById('apply-parameters');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyPracticeParameters();
            });
        }

        // パラメータスライダーの値表示
        ['practice-max-depth', 'practice-min-samples', 'practice-alpha'].forEach(id => {
            const slider = document.getElementById(id);
            const valueSpan = document.getElementById(id + '-value');
            if (slider && valueSpan) {
                slider.addEventListener('input', (e) => {
                    let value = e.target.value;
                    if (id === 'practice-alpha') {
                        value = parseFloat(value).toFixed(3);
                    }
                    valueSpan.textContent = value;
                });
            }
        });
    }

    applyPracticeParameters() {
        const maxDepth = document.getElementById('practice-max-depth').value;
        const minSamples = document.getElementById('practice-min-samples').value;
        const alpha = document.getElementById('practice-alpha').value;

        // 模擬的な結果を表示
        const accuracy = 0.7 + Math.random() * 0.25;
        const precision = 0.65 + Math.random() * 0.3;
        const recall = 0.6 + Math.random() * 0.35;

        const resultsElement = document.getElementById('practice-results');
        if (resultsElement) {
            resultsElement.innerHTML = `
                <div class="practice-result">
                    <strong>精度:</strong> ${(accuracy * 100).toFixed(1)}%
                </div>
                <div class="practice-result">
                    <strong>適合率:</strong> ${(precision * 100).toFixed(1)}%
                </div>
                <div class="practice-result">
                    <strong>再現率:</strong> ${(recall * 100).toFixed(1)}%
                </div>
                <div class="practice-result">
                    <strong>パラメータ:</strong> 深度=${maxDepth}, 最小サンプル=${minSamples}, α=${alpha}
                </div>
            `;
        }

        // 改善提案
        const suggestionsElement = document.getElementById('improvement-suggestions');
        if (suggestionsElement) {
            let suggestions = '';
            if (accuracy < 0.8) {
                suggestions += '<p>💡 精度改善のため、最大深度を調整してみてください。</p>';
            }
            if (precision < 0.75) {
                suggestions += '<p>🎯 適合率向上のため、剪定パラメータを調整してみてください。</p>';
            }
            if (!suggestions) {
                suggestions = '<p>✅ 良好な性能です！他のデータセットでも試してみてください。</p>';
            }
            suggestionsElement.innerHTML = suggestions;
        }
    }
}

// 初期化
window.onload = function() {
    new TutorialSystem();
};