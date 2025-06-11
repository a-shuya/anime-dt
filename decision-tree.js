// decision-tree.js - 決定木の実装とアニメーション機能

class DecisionTreeVisualizer {
    constructor() {
        this.canvas = document.getElementById('tree-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataset = null;
        this.tree = null;
        this.prunedTree = null;
        this.currentMode = 'beginner';
        this.pyodide = null;
        this.pythonReady = false;
        this.animationState = {
            currentStep: 0,
            isAnimating: false,
            isPaused: false,
            animationId: null
        };
        this.nodePositions = new Map();
        this.nodeRadius = 35;
        this.levelHeight = 120;
        this.minNodeSpacing = 100;
        this.canvasWidth = 1500;
        this.canvasHeight = 1200;
        
        this.initializePython().then(() => {
            this.setupCanvas();
            this.setupEventListeners();
            this.setupTooltips();
            this.setupModeSystem();
            this.generateNewDataset();
        });
    }

    async initializePython() {
        try {
            // Pyodideの初期化
            console.log('Pyodideを初期化中...');
            this.pyodide = await loadPyodide();
            
            // NumPyをインストール
            await this.pyodide.loadPackage("numpy");
            
            // Python決定木モジュールを読み込み
            const response = await fetch('./decision_tree_python.py');
            const pythonCode = await response.text();
            this.pyodide.runPython(pythonCode);
            
            this.pythonReady = true;
            console.log('Python環境の準備完了');
            
            // ロード状況を表示
            this.updateLoadingStatus('Python環境の準備完了');
        } catch (error) {
            console.error('Python初期化エラー:', error);
            this.pythonReady = false;
            this.updateLoadingStatus('Python初期化エラー - JavaScript版を使用');
        }
    }

    updateLoadingStatus(message) {
        // ローディング状況をUIに表示
        const statusElement = document.getElementById('loading-status');
        if (statusElement) {
            statusElement.textContent = message;
            
            // Python準備完了時はステータスを隠す
            if (message.includes('準備完了') || message.includes('JavaScript版を使用')) {
                setTimeout(() => {
                    statusElement.classList.add('hidden');
                }, 2000);
            }
        }
    }

    setupCanvas() {
        // 拡張されたキャンバスサイズを設定
        this.canvas.width = this.canvasWidth * window.devicePixelRatio;
        this.canvas.height = this.canvasHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = this.canvasWidth + 'px';
        this.canvas.style.height = this.canvasHeight + 'px';
    }

    setupEventListeners() {
        const sliders = [
            'max-depth', 'min-samples-split', 'min-samples-leaf', 
            'min-impurity-decrease', 'animation-speed', 'dataset-size',
            'ccp-alpha', 'max-leaf-nodes'
        ];
        
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                const display = document.getElementById(id + '-value');
                slider.addEventListener('input', (e) => {
                    let value = e.target.value;
                    if (id === 'min-impurity-decrease' || id === 'ccp-alpha') {
                        value = parseFloat(value).toFixed(3);
                    } else if (id === 'animation-speed') {
                        value = value + 'ms';
                    }
                    if (display) display.textContent = value;
                });
            }
        });

        // データセット選択の監視
        const datasetSelect = document.getElementById('dataset-type');
        if (datasetSelect) {
            datasetSelect.addEventListener('change', () => {
                this.generateNewDataset();
            });
        }

        window.addEventListener('resize', () => this.setupCanvas());
    }

    setupModeSystem() {
        // モード切替ボタンの設定
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.switchMode(mode);
            });
        });

        // 初期モード設定
        this.switchMode('beginner');
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        // モードボタンの状態更新
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });

        // モード別UIの表示/非表示
        this.updateModeVisibility();
        this.updateGuideContent();
        this.updateMetricsExplanation();
    }

    updateModeVisibility() {
        const formulaSection = document.getElementById('formula-section');
        const metricsExplanation = document.getElementById('metrics-explanation');
        
        switch(this.currentMode) {
            case 'beginner':
                if (formulaSection) formulaSection.style.display = 'none';
                if (metricsExplanation) metricsExplanation.style.display = 'block';
                this.showSimplifiedControls();
                break;
            case 'intermediate':
                if (formulaSection) formulaSection.style.display = 'none';
                if (metricsExplanation) metricsExplanation.style.display = 'block';
                this.showAllControls();
                break;
            case 'advanced':
                if (formulaSection) formulaSection.style.display = 'block';
                if (metricsExplanation) metricsExplanation.style.display = 'block';
                this.showAllControls();
                break;
        }
    }

    showSimplifiedControls() {
        // 初心者モードでは基本的なコントロールのみ表示
        const advancedControls = ['min-impurity-decrease', 'ccp-alpha'];
        advancedControls.forEach(id => {
            const control = document.getElementById(id)?.closest('.control-group');
            if (control) control.style.display = 'none';
        });
    }

    showAllControls() {
        // 全てのコントロールを表示
        document.querySelectorAll('.control-group').forEach(group => {
            group.style.display = 'flex';
        });
    }

    updateGuideContent() {
        const guideContent = document.getElementById('guide-content');
        if (!guideContent) return;

        const guides = {
            beginner: `
                <div class="guide-step">
                    <div class="guide-step-title">🌱 初心者向けガイド</div>
                    <div class="guide-step-content">
                        <p><strong>ステップ1:</strong> まずは「新しいデータセット生成」をクリックしてデータを作成しましょう</p>
                        <p><strong>ステップ2:</strong> 「アニメーション開始」で決定木の成長過程を観察</p>
                        <p><strong>ステップ3:</strong> 最大深度を変更して、木の複雑さがどう変わるか確認</p>
                        <p><strong>💡ヒント:</strong> 深度を深くしすぎると過学習が起こりやすくなります</p>
                    </div>
                </div>
            `,
            intermediate: `
                <div class="guide-step">
                    <div class="guide-step-title">🌿 中級者向けガイド</div>
                    <div class="guide-step-content">
                        <p><strong>実験1:</strong> 異なるデータセットで同じパラメータを試して性能を比較</p>
                        <p><strong>実験2:</strong> min_samples_splitを変更して過学習の影響を観察</p>
                        <p><strong>実験3:</strong> 剪定パラメータ(ccp_alpha)を調整して最適なバランスを見つける</p>
                        <p><strong>📊 注目ポイント:</strong> 訓練精度とテスト精度の差に注意</p>
                    </div>
                </div>
            `,
            advanced: `
                <div class="guide-step">
                    <div class="guide-step-title">🌳 上級者向けガイド</div>
                    <div class="guide-step-content">
                        <p><strong>アルゴリズム理解:</strong> 下部のGini係数計算過程を確認しながら実験</p>
                        <p><strong>パラメータ最適化:</strong> グリッドサーチ的にパラメータを系統的に変更</p>
                        <p><strong>性能分析:</strong> 各評価指標の変化を詳細に分析</p>
                        <p><strong>🧮 数式理解:</strong> 情報利得とGini係数の関係を数式で確認</p>
                    </div>
                </div>
            `
        };

        guideContent.innerHTML = guides[this.currentMode];
    }

    updateMetricsExplanation() {
        const metricsExplanation = document.getElementById('metrics-explanation');
        if (!metricsExplanation) return;

        const explanations = {
            beginner: `
                <div class="metric-explanation">
                    <div class="metric-name">精度 (Accuracy)</div>
                    <div class="metric-description">
                        全体の予測のうち、正しく予測できた割合です。
                        簡単に言うと「どれだけ当たったか」を表します。
                    </div>
                </div>
                <div class="metric-explanation">
                    <div class="metric-name">F1スコア</div>
                    <div class="metric-description">
                        精度と再現率のバランスを表す指標です。
                        一般的な分類問題では最も重要な指標の一つです。
                    </div>
                </div>
            `,
            intermediate: `
                <div class="metric-explanation">
                    <div class="metric-name">適合率 (Precision)</div>
                    <div class="metric-description">
                        「陽性」と予測したもののうち、実際に陽性だった割合。
                        偽陽性（間違って陽性と判定）を避けたい場合に重要。
                    </div>
                </div>
                <div class="metric-explanation">
                    <div class="metric-name">再現率 (Recall)</div>
                    <div class="metric-description">
                        実際の陽性のうち、正しく陽性と予測できた割合。
                        見逃し（偽陰性）を避けたい場合に重要。
                    </div>
                </div>
            `,
            advanced: `
                <div class="metric-explanation">
                    <div class="metric-name">マクロ平均 vs 重み付き平均</div>
                    <div class="metric-description">
                        <strong>マクロ平均:</strong> 各クラスの指標を単純平均。クラス間のバランスを重視。<br>
                        <strong>重み付き平均:</strong> サンプル数で重み付け。全体性能を重視。<br>
                        不均衡データでは両者に大きな差が生じることがあります。
                    </div>
                </div>
                <div class="metric-explanation">
                    <div class="metric-name">混同行列の読み方</div>
                    <div class="metric-description">
                        TP(真陽性)、TN(真陰性)、FP(偽陽性)、FN(偽陰性)の関係を理解し、
                        どの種類の誤りが多いかを分析することが重要です。
                    </div>
                </div>
            `
        };

        metricsExplanation.innerHTML = explanations[this.currentMode];
    }

    updateFormulaVisualization(parentLabels, bestSplit, allCandidates) {
        const currentSplitInfo = document.getElementById('current-split-info');
        const giniCalculation = document.getElementById('gini-calculation');
        const informationGain = document.getElementById('information-gain');

        if (!currentSplitInfo || !giniCalculation || !informationGain) return;

        // 現在の分割候補情報
        const featureName = this.dataset && this.dataset.featureNames ? 
                          this.dataset.featureNames[bestSplit.feature] : `X${bestSplit.feature}`;
        
        currentSplitInfo.innerHTML = `
            <div class="formula-math">
                ${featureName} ≤ ${bestSplit.threshold.toFixed(3)}
            </div>
            <div class="calculation-step">
                <strong>分割結果:</strong><br>
                左: ${bestSplit.leftLabels.length} サンプル<br>
                右: ${bestSplit.rightLabels.length} サンプル
            </div>
        `;

        // Gini係数計算の詳細
        const parentGini = this.calculateGini(parentLabels);
        const parentCounts = this.getClassCounts(parentLabels);
        const leftCounts = this.getClassCounts(bestSplit.leftLabels);
        const rightCounts = this.getClassCounts(bestSplit.rightLabels);

        giniCalculation.innerHTML = `
            <div class="formula-math">
                Gini = 1 - Σ(p<sub>i</sub>)<sup>2</sup>
            </div>
            <div class="calculation-step">
                <strong>親ノード:</strong><br>
                ${this.formatGiniCalculation(parentLabels, parentCounts, parentGini)}
            </div>
            <div class="calculation-step">
                <strong>左の子:</strong><br>
                ${this.formatGiniCalculation(bestSplit.leftLabels, leftCounts, bestSplit.leftGini)}
            </div>
            <div class="calculation-step">
                <strong>右の子:</strong><br>
                ${this.formatGiniCalculation(bestSplit.rightLabels, rightCounts, bestSplit.rightGini)}
            </div>
        `;

        // 情報利得計算
        const totalSamples = parentLabels.length;
        const leftWeight = bestSplit.leftLabels.length / totalSamples;
        const rightWeight = bestSplit.rightLabels.length / totalSamples;
        const weightedGini = leftWeight * bestSplit.leftGini + rightWeight * bestSplit.rightGini;

        informationGain.innerHTML = `
            <div class="formula-math">
                情報利得 = Gini(親) - [重み付きGini(子)]
            </div>
            <div class="calculation-step">
                <strong>重み付きGini計算:</strong><br>
                = ${leftWeight.toFixed(3)} × ${bestSplit.leftGini.toFixed(3)} + ${rightWeight.toFixed(3)} × ${bestSplit.rightGini.toFixed(3)}<br>
                = ${weightedGini.toFixed(3)}
            </div>
            <div class="calculation-step">
                <strong>情報利得:</strong><br>
                = ${parentGini.toFixed(3)} - ${weightedGini.toFixed(3)}<br>
                = <strong>${bestSplit.impurityDecrease.toFixed(3)}</strong>
            </div>
            <div class="calculation-step">
                <small>💡 この値が最大となる分割を選択します</small>
            </div>
        `;

        // 他の候補との比較（上位3つ）
        if (allCandidates.length > 1) {
            const topCandidates = allCandidates
                .sort((a, b) => b.impurityDecrease - a.impurityDecrease)
                .slice(0, 3);

            const comparison = topCandidates.map((candidate, index) => {
                const candidateFeatureName = this.dataset && this.dataset.featureNames ? 
                                            this.dataset.featureNames[candidate.feature] : `X${candidate.feature}`;
                const isSelected = candidate === bestSplit;
                return `
                    <div class="candidate-comparison ${isSelected ? 'selected' : ''}">
                        <div class="candidate-rank">${index + 1}</div>
                        <div class="candidate-info">
                            ${candidateFeatureName} ≤ ${candidate.threshold.toFixed(3)}
                        </div>
                        <div class="candidate-gain">
                            利得: ${candidate.impurityDecrease.toFixed(3)} ${isSelected ? '✓' : ''}
                        </div>
                    </div>
                `;
            }).join('');

            informationGain.innerHTML += `
                <div class="calculation-step">
                    <strong>分割候補比較 (上位3つ):</strong><br>
                    ${comparison}
                </div>
            `;
        }
    }

    formatGiniCalculation(labels, counts, gini) {
        const total = labels.length;
        if (total === 0) return 'サンプルなし';

        const classProbs = Object.keys(counts).map(cls => {
            const count = counts[cls];
            const prob = count / total;
            return `p<sub>${cls}</sub> = ${count}/${total} = ${prob.toFixed(3)}`;
        }).join(', ');

        const squaredSum = Object.values(counts).reduce((sum, count) => {
            const prob = count / total;
            return sum + prob * prob;
        }, 0);

        return `
            ${classProbs}<br>
            Gini = 1 - (${Object.keys(counts).map(cls => `(${(counts[cls]/total).toFixed(3)})²`).join(' + ')})<br>
            = 1 - ${squaredSum.toFixed(3)} = <strong>${gini.toFixed(3)}</strong>
        `;
    }

    setupTooltips() {
        const tooltipData = {
            'max-depth': '決定木の最大深度を制限します。深すぎると過学習の原因となります。',
            'min-samples-split': 'ノードを分割するために必要な最小サンプル数。大きくすると過学習を防げます。',
            'min-samples-leaf': '葉ノードに必要な最小サンプル数。小さすぎる葉を防ぎます。',
            'min-impurity-decrease': 'この値以上不純度が減少しない限り分割しません。過学習を防ぐのに効果的です。',
            'animation-speed': 'アニメーションの速度を調整します。低い値ほど高速になります。',
            'dataset-size': '生成する合成データセットのサンプル数を指定します。',
            'ccp-alpha': 'Cost Complexity Pruning のパラメータ。大きくするほど積極的に剪定されます。'
        };

        Object.keys(tooltipData).forEach(id => {
            const controlGroup = document.getElementById(id)?.closest('.control-group');
            if (controlGroup) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipData[id];
                controlGroup.appendChild(tooltip);

                const slider = document.getElementById(id);
                if (slider) {
                    slider.addEventListener('mouseenter', () => {
                        tooltip.classList.add('show');
                    });

                    slider.addEventListener('mouseleave', () => {
                        tooltip.classList.remove('show');
                    });
                }
            }
        });
    }

    calculateGini(labels) {
        if (labels.length === 0) return 0;
        const counts = {};
        labels.forEach(label => {
            counts[label] = (counts[label] || 0) + 1;
        });

        let gini = 1;
        const total = labels.length;
        Object.values(counts).forEach(count => {
            gini -= (count / total) ** 2;
        });

        return gini;
    }

    findBestSplit(data, labels, minSamplesSplit, minSamplesLeaf) {
        if (data.length < minSamplesSplit) return null;

        let bestSplit = null;
        let bestScore = Infinity;
        let splitCandidates = [];

        for (let feature = 0; feature < data[0].length; feature++) {
            const values = data.map(row => row[feature]).sort((a, b) => a - b);

            for (let i = 1; i < values.length; i++) {
                if (values[i] === values[i-1]) continue;

                const threshold = (values[i] + values[i-1]) / 2;
                const leftIndices = [];
                const rightIndices = [];

                data.forEach((row, idx) => {
                    if (row[feature] <= threshold) {
                        leftIndices.push(idx);
                    } else {
                        rightIndices.push(idx);
                    }
                });

                if (leftIndices.length < minSamplesLeaf || rightIndices.length < minSamplesLeaf) {
                    continue;
                }

                const leftLabels = leftIndices.map(idx => labels[idx]);
                const rightLabels = rightIndices.map(idx => labels[idx]);

                const leftGini = this.calculateGini(leftLabels);
                const rightGini = this.calculateGini(rightLabels);
                const weightedGini = (leftLabels.length * leftGini + rightLabels.length * rightGini) / labels.length;
                const impurityDecrease = this.calculateGini(labels) - weightedGini;

                const candidate = {
                    feature,
                    threshold,
                    leftIndices,
                    rightIndices,
                    gini: weightedGini,
                    impurityDecrease,
                    leftGini,
                    rightGini,
                    leftLabels,
                    rightLabels
                };

                splitCandidates.push(candidate);

                if (weightedGini < bestScore) {
                    bestScore = weightedGini;
                    bestSplit = candidate;
                }
            }
        }

        // 上級者モードの場合、数式可視化を更新
        if (this.currentMode === 'advanced' && bestSplit) {
            this.updateFormulaVisualization(labels, bestSplit, splitCandidates);
        }

        return bestSplit;
    }

    async buildTree(data, labels, depth = 0, nodeId = 'root') {
        if (this.pythonReady && this.pyodide) {
            return await this.buildTreePython(data, labels);
        } else {
            // フォールバック: JavaScript版
            return this.buildTreeJavaScript(data, labels, depth, nodeId);
        }
    }

    async buildTreePython(data, labels) {
        try {
            const params = {
                max_depth: parseInt(document.getElementById('max-depth').value),
                min_samples_split: parseInt(document.getElementById('min-samples-split').value),
                min_samples_leaf: parseInt(document.getElementById('min-samples-leaf').value),
                min_impurity_decrease: parseFloat(document.getElementById('min-impurity-decrease').value),
                ccp_alpha: 0.0,
                feature_names: this.dataset?.featureNames || ['X0', 'X1'],
                class_names: this.dataset?.classNames || ['Class 0', 'Class 1']
            };

            // PythonにデータとパラメータをJavaScriptオブジェクトとして渡す
            this.pyodide.globals.set("X_data", data);
            this.pyodide.globals.set("y_data", labels);
            this.pyodide.globals.set("params", params);

            // Python関数を実行
            const result = this.pyodide.runPython(`
                import json
                result = build_decision_tree(X_data, y_data, params)
                json.dumps(result)
            `);

            const parsedResult = JSON.parse(result);
            
            // メトリクスを保存
            this.currentMetrics = parsedResult.metrics;
            
            return parsedResult.tree;
        } catch (error) {
            console.error('Python決定木構築エラー:', error);
            // フォールバック: JavaScript版
            return this.buildTreeJavaScript(data, labels);
        }
    }

    buildTreeJavaScript(data, labels, depth = 0, nodeId = 'root') {
        const maxDepth = parseInt(document.getElementById('max-depth').value);
        const minSamplesSplit = parseInt(document.getElementById('min-samples-split').value);
        const minSamplesLeaf = parseInt(document.getElementById('min-samples-leaf').value);
        const minImpurityDecrease = parseFloat(document.getElementById('min-impurity-decrease').value);

        const node = {
            id: nodeId,
            depth,
            samples: data.length,
            gini: this.calculateGini(labels),
            majorityClass: this.getMajorityClass(labels),
            isLeaf: true,
            data: data.map((row, idx) => [...row, labels[idx]]),
            classCounts: this.getClassCounts(labels)
        };

        if (depth >= maxDepth || data.length < minSamplesSplit) {
            return node;
        }

        const split = this.findBestSplit(data, labels, minSamplesSplit, minSamplesLeaf);

        if (!split || split.impurityDecrease < minImpurityDecrease) {
            return node;
        }

        node.isLeaf = false;
        node.feature = split.feature;
        node.threshold = split.threshold;
        node.impurityDecrease = split.impurityDecrease;

        const leftData = split.leftIndices.map(idx => data[idx]);
        const leftLabels = split.leftIndices.map(idx => labels[idx]);
        const rightData = split.rightIndices.map(idx => data[idx]);
        const rightLabels = split.rightIndices.map(idx => labels[idx]);

        node.left = this.buildTreeJavaScript(leftData, leftLabels, depth + 1, nodeId + 'L');
        node.right = this.buildTreeJavaScript(rightData, rightLabels, depth + 1, nodeId + 'R');

        return node;
    }

    getMajorityClass(labels) {
        const counts = {};
        labels.forEach(label => {
            counts[label] = (counts[label] || 0) + 1;
        });
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    getClassCounts(labels) {
        const counts = {};
        labels.forEach(label => {
            counts[label] = (counts[label] || 0) + 1;
        });
        return counts;
    }

    // 改良されたノード位置計算（重なりを完全に防ぐ）
    calculateNodePositions(node) {
        if (!node) return;

        // 各レベルのノード情報を収集
        const levelNodes = new Map();
        this.collectLevelNodes(node, levelNodes);

        // 各レベルで位置を計算
        levelNodes.forEach((nodes, level) => {
            const y = 60 + level * this.levelHeight;
            const nodeCount = nodes.length;
            
            if (level === 0) {
                // ルートノードは中央
                this.nodePositions.set(nodes[0].id, { 
                    x: this.canvasWidth / 2, 
                    y: y 
                });
            } else {
                // 各ノードの推奨位置を計算
                const positions = this.calculateOptimalPositions(nodes, nodeCount);
                nodes.forEach((node, index) => {
                    this.nodePositions.set(node.id, { 
                        x: positions[index], 
                        y: y 
                    });
                });
            }
        });
    }

    collectLevelNodes(node, levelNodes, level = 0) {
        if (!node) return;
        
        if (!levelNodes.has(level)) {
            levelNodes.set(level, []);
        }
        levelNodes.get(level).push(node);
        
        if (!node.isLeaf) {
            this.collectLevelNodes(node.left, levelNodes, level + 1);
            this.collectLevelNodes(node.right, levelNodes, level + 1);
        }
    }

    calculateOptimalPositions(nodes, nodeCount) {
        const margin = 80;
        const availableWidth = this.canvasWidth - 2 * margin;
        const minSpacing = this.nodeRadius * 2 + 20;
        
        // ノード間の最小間隔を保証した配置
        if (nodeCount === 1) {
            return [this.canvasWidth / 2];
        }
        
        const totalMinWidth = (nodeCount - 1) * minSpacing;
        const actualSpacing = Math.max(minSpacing, availableWidth / (nodeCount - 1));
        
        // 必要に応じてキャンバス幅を拡張
        if (totalMinWidth > availableWidth) {
            this.canvasWidth = Math.max(this.canvasWidth, totalMinWidth + 2 * margin);
            this.setupCanvas(); // キャンバスサイズを更新
        }
        
        const positions = [];
        const startX = margin;
        const usedSpacing = Math.min(actualSpacing, (this.canvasWidth - 2 * margin) / (nodeCount - 1));
        
        for (let i = 0; i < nodeCount; i++) {
            if (nodeCount === 1) {
                positions.push(this.canvasWidth / 2);
            } else {
                positions.push(startX + i * usedSpacing);
            }
        }
        
        return positions;
    }

    countNodesAtLevel(node, targetLevel, currentLevel = 0) {
        if (!node) return 0;
        if (currentLevel === targetLevel) return 1;
        if (currentLevel > targetLevel) return 0;

        return this.countNodesAtLevel(node.left, targetLevel, currentLevel + 1) +
               this.countNodesAtLevel(node.right, targetLevel, currentLevel + 1);
    }

    drawNode(node, opacity = 1) {
        const pos = this.nodePositions.get(node.id);
        if (!pos) return;

        this.ctx.save();
        this.ctx.globalAlpha = opacity;

        // ノードの色を決定
        let color;
        if (node.isLeaf) {
            // 葉ノードは多数派クラスに基づいて色を決定
            const classColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
            color = classColors[parseInt(node.majorityClass)] || '#96CEB4';
        } else {
            color = '#45B7D1'; // 内部ノード
        }

        // ノードの描画
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, this.nodeRadius, 0, 2 * Math.PI);
        this.ctx.fill();

        // 境界線
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // テキストの描画
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 11px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (node.isLeaf) {
            // 葉ノードの情報
            this.ctx.fillText(`Class: ${node.majorityClass}`, pos.x, pos.y - 12);
            this.ctx.font = '10px Arial';
            this.ctx.fillText(`n=${node.samples}`, pos.x, pos.y);
            this.ctx.fillText(`gini=${node.gini.toFixed(3)}`, pos.x, pos.y + 12);
        } else {
            // 内部ノードの情報
            const featureName = this.dataset && this.dataset.featureNames ? 
                              this.dataset.featureNames[node.feature] : `X${node.feature}`;
            this.ctx.fillText(`${featureName} ≤ ${node.threshold.toFixed(2)}`, pos.x, pos.y - 12);
            this.ctx.font = '10px Arial';
            this.ctx.fillText(`gini=${node.gini.toFixed(3)}`, pos.x, pos.y);
            this.ctx.fillText(`n=${node.samples}`, pos.x, pos.y + 12);
        }

        this.ctx.restore();
    }

    drawEdge(fromNode, toNode, opacity = 1) {
        const fromPos = this.nodePositions.get(fromNode.id);
        const toPos = this.nodePositions.get(toNode.id);

        if (!fromPos || !toPos) return;

        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        // エッジの開始点と終了点を調整（ノードの境界から始まるように）
        const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
        const fromX = fromPos.x + Math.cos(angle) * this.nodeRadius;
        const fromY = fromPos.y + Math.sin(angle) * this.nodeRadius;
        const toX = toPos.x - Math.cos(angle) * this.nodeRadius;
        const toY = toPos.y - Math.sin(angle) * this.nodeRadius;
        
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();

        // エッジラベル（True/False）
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;
        const isLeftChild = toNode.id.endsWith('L');
        
        this.ctx.font = '10px Arial';
        this.ctx.fillStyle = '#555';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(isLeftChild ? 'True' : 'False', midX, midY - 5);

        this.ctx.restore();
    }

    getAllNodes(node, nodes = []) {
        if (!node) return nodes;
        nodes.push(node);
        if (!node.isLeaf) {
            this.getAllNodes(node.left, nodes);
            this.getAllNodes(node.right, nodes);
        }
        return nodes;
    }

    drawTreeUpToStep(step) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.tree) return;

        const allNodes = this.getAllNodes(this.tree);
        const nodesToShow = allNodes.slice(0, step + 1);

        // エッジを先に描画
        nodesToShow.forEach(node => {
            if (!node.isLeaf) {
                if (nodesToShow.includes(node.left)) {
                    this.drawEdge(node, node.left);
                }
                if (nodesToShow.includes(node.right)) {
                    this.drawEdge(node, node.right);
                }
            }
        });

        // ノードを描画
        nodesToShow.forEach(node => {
            this.drawNode(node);
        });

        // 進行状況の表示
        const progress = Math.round((step / Math.max(allNodes.length - 1, 1)) * 100);
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`進行状況: ${progress}% (${step + 1}/${allNodes.length} ノード)`, 15, 30);

        // 現在のステップの詳細情報
        if (step >= 0 && step < allNodes.length) {
            const currentNode = allNodes[step];
            this.ctx.font = '14px Arial';
            this.ctx.fillText(`現在: ${currentNode.isLeaf ? '葉ノード' : '分割ノード'} (深度: ${currentNode.depth})`, 15, 55);
        }
    }

    // 剪定アルゴリズムの実装
    costComplexityPruning(node, alpha) {
        if (!node || node.isLeaf) return node;

        // 子ノードを再帰的に剪定
        const prunedLeft = this.costComplexityPruning(node.left, alpha);
        const prunedRight = this.costComplexityPruning(node.right, alpha);

        // 剪定後のサブツリーのコストを計算
        const subtreeLeaves = this.countLeaves(prunedLeft) + this.countLeaves(prunedRight);
        const subtreeError = this.calculateSubtreeError(prunedLeft) + this.calculateSubtreeError(prunedRight);
        const subtreeCost = subtreeError + alpha * subtreeLeaves;

        // 葉ノードとしたときのコスト
        const leafError = this.calculateNodeError(node);
        const leafCost = leafError + alpha * 1;

        // より良いコストを選択
        if (leafCost <= subtreeCost) {
            // 剪定する（葉ノードにする）
            return {
                ...node,
                isLeaf: true,
                left: null,
                right: null
            };
        } else {
            // 剪定しない
            return {
                ...node,
                left: prunedLeft,
                right: prunedRight
            };
        }
    }

    countLeaves(node) {
        if (!node) return 0;
        if (node.isLeaf) return 1;
        return this.countLeaves(node.left) + this.countLeaves(node.right);
    }

    calculateSubtreeError(node) {
        if (!node) return 0;
        if (node.isLeaf) return this.calculateNodeError(node);
        return this.calculateSubtreeError(node.left) + this.calculateSubtreeError(node.right);
    }

    calculateNodeError(node) {
        const totalSamples = node.samples;
        const majorityCount = Math.max(...Object.values(node.classCounts));
        return (totalSamples - majorityCount) / totalSamples;
    }

    async animateStep() {
        if (!this.animationState.isAnimating || this.animationState.isPaused) return;

        const allNodes = this.getAllNodes(this.tree);

        if (this.animationState.currentStep >= allNodes.length) {
            this.finishAnimation();
            return;
        }

        this.drawTreeUpToStep(this.animationState.currentStep);
        this.animationState.currentStep++;

        const speed = parseInt(document.getElementById('animation-speed').value);
        this.animationState.animationId = setTimeout(() => this.animateStep(), speed);
    }

    startAnimation() {
        if (!this.tree) {
            alert('まずデータセットを生成してください');
            return;
        }

        this.animationState.isAnimating = true;
        this.animationState.isPaused = false;

        document.getElementById('start-btn').disabled = true;
        document.getElementById('pause-btn').disabled = false;

        this.animateStep();
    }

    pauseAnimation() {
        this.animationState.isPaused = true;
        if (this.animationState.animationId) {
            clearTimeout(this.animationState.animationId);
        }

        document.getElementById('start-btn').disabled = false;
        document.getElementById('pause-btn').disabled = true;
    }

    resetAnimation() {
        this.animationState.isAnimating = false;
        this.animationState.isPaused = false;
        this.animationState.currentStep = 0;

        if (this.animationState.animationId) {
            clearTimeout(this.animationState.animationId);
        }

        document.getElementById('start-btn').disabled = false;
        document.getElementById('pause-btn').disabled = true;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.tree) {
            this.calculateNodePositions(this.tree);
            this.drawTreeUpToStep(-1);
        }
    }

    finishAnimation() {
        this.animationState.isAnimating = false;
        document.getElementById('start-btn').disabled = false;
        document.getElementById('pause-btn').disabled = true;
    }

    applyPruning() {
        if (!this.tree) {
            alert('まず決定木を生成してください');
            return;
        }

        const ccpAlpha = parseFloat(document.getElementById('ccp-alpha').value);
        this.prunedTree = this.costComplexityPruning(JSON.parse(JSON.stringify(this.tree)), ccpAlpha);
        
        // 剪定後の木を表示
        this.tree = this.prunedTree;
        this.calculateNodePositions(this.tree);
        this.resetAnimation();
        
        // 統計情報を更新
        this.updateTreeStats();
    }

    updateTreeStats() {
        if (!this.tree) return;

        const allNodes = this.getAllNodes(this.tree);
        const leafNodes = allNodes.filter(node => node.isLeaf);
        const maxDepth = Math.max(...allNodes.map(node => node.depth));

        // 精度計算
        const accuracy = this.calculateAccuracy();
        const precision = this.calculatePrecision();
        const recall = this.calculateRecall();
        const f1Score = this.calculateF1Score();

        document.getElementById('tree-stats').innerHTML = `
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-value">${allNodes.length}</span>
                    <span class="stat-label">総ノード数</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${leafNodes.length}</span>
                    <span class="stat-label">葉ノード数</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${maxDepth}</span>
                    <span class="stat-label">最大深度</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${(this.tree.gini * 100).toFixed(1)}%</span>
                    <span class="stat-label">ルートGini</span>
                </div>
            </div>
        `;

        // 精度情報を表示
        this.updateMetrics(accuracy, precision, recall, f1Score);
    }

    calculateAccuracy() {
        if (!this.dataset || !this.tree) return 0;
        
        let correct = 0;
        const total = this.dataset.data.length;
        
        for (let i = 0; i < total; i++) {
            const predicted = this.predict(this.dataset.data[i]);
            if (predicted == this.dataset.labels[i]) {
                correct++;
            }
        }
        
        return (correct / total);
    }

    calculatePrecision() {
        if (!this.dataset || !this.tree) return { macro: 0, weighted: 0 };
        
        const classMetrics = this.calculateClassMetrics();
        const uniqueClasses = [...new Set(this.dataset.labels)];
        
        let macroPrecision = 0;
        let weightedPrecision = 0;
        
        uniqueClasses.forEach(cls => {
            const metric = classMetrics[cls];
            if (metric) {
                const precision = metric.tp / (metric.tp + metric.fp) || 0;
                macroPrecision += precision;
                weightedPrecision += precision * metric.support;
            }
        });
        
        return {
            macro: macroPrecision / uniqueClasses.length,
            weighted: weightedPrecision / this.dataset.labels.length
        };
    }

    calculateRecall() {
        if (!this.dataset || !this.tree) return { macro: 0, weighted: 0 };
        
        const classMetrics = this.calculateClassMetrics();
        const uniqueClasses = [...new Set(this.dataset.labels)];
        
        let macroRecall = 0;
        let weightedRecall = 0;
        
        uniqueClasses.forEach(cls => {
            const metric = classMetrics[cls];
            if (metric) {
                const recall = metric.tp / (metric.tp + metric.fn) || 0;
                macroRecall += recall;
                weightedRecall += recall * metric.support;
            }
        });
        
        return {
            macro: macroRecall / uniqueClasses.length,
            weighted: weightedRecall / this.dataset.labels.length
        };
    }

    calculateF1Score() {
        const precision = this.calculatePrecision();
        const recall = this.calculateRecall();
        
        const macroF1 = (2 * precision.macro * recall.macro) / (precision.macro + recall.macro) || 0;
        const weightedF1 = (2 * precision.weighted * recall.weighted) / (precision.weighted + recall.weighted) || 0;
        
        return { macro: macroF1, weighted: weightedF1 };
    }

    calculateClassMetrics() {
        const metrics = {};
        const uniqueClasses = [...new Set(this.dataset.labels)];
        
        uniqueClasses.forEach(cls => {
            metrics[cls] = { tp: 0, fp: 0, fn: 0, support: 0 };
        });
        
        for (let i = 0; i < this.dataset.data.length; i++) {
            const actual = this.dataset.labels[i];
            const predicted = this.predict(this.dataset.data[i]);
            
            metrics[actual].support++;
            
            if (predicted == actual) {
                metrics[actual].tp++;
            } else {
                metrics[actual].fn++;
                if (metrics[predicted]) {
                    metrics[predicted].fp++;
                }
            }
        }
        
        return metrics;
    }

    predict(sample) {
        let node = this.tree;
        
        while (!node.isLeaf) {
            if (sample[node.feature] <= node.threshold) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        
        return node.majorityClass;
    }

    updateMetrics(accuracy, precision, recall, f1Score) {
        const metricsElement = document.getElementById('metrics-stats');
        if (metricsElement) {
            metricsElement.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${(accuracy * 100).toFixed(1)}%</span>
                        <span class="stat-label">精度 (Accuracy)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${(precision.macro * 100).toFixed(1)}%</span>
                        <span class="stat-label">適合率 (Precision)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${(recall.macro * 100).toFixed(1)}%</span>
                        <span class="stat-label">再現率 (Recall)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${(f1Score.macro * 100).toFixed(1)}%</span>
                        <span class="stat-label">F1スコア</span>
                    </div>
                </div>
            `;
        }
    }

    generateNewDataset() {
        const datasetType = document.getElementById('dataset-type')?.value || 'synthetic_2d';
        const size = parseInt(document.getElementById('dataset-size')?.value || '200');
        
        this.dataset = DatasetGenerator.generateDataset(datasetType, size);
        this.tree = this.buildTree(this.dataset.data, this.dataset.labels);
        this.calculateNodePositions(this.tree);
        this.resetAnimation();

        // データセット情報を更新
        const class0Count = this.dataset.labels.filter(l => l == 0).length;
        const class1Count = this.dataset.labels.filter(l => l == 1).length;
        const class2Count = this.dataset.labels.filter(l => l == 2).length;

        let classInfo = `<strong>クラス 0 (${this.dataset.classNames[0]}):</strong> ${class0Count} サンプル<br>`;
        classInfo += `<strong>クラス 1 (${this.dataset.classNames[1]}):</strong> ${class1Count} サンプル<br>`;
        if (class2Count > 0) {
            classInfo += `<strong>クラス 2 (${this.dataset.classNames[2]}):</strong> ${class2Count} サンプル<br>`;
        }

        document.getElementById('dataset-details').innerHTML = `
            <strong>データセット:</strong> ${this.dataset.description}<br>
            <strong>総サンプル数:</strong> ${this.dataset.data.length}<br>
            ${classInfo}
            <strong>特徴量:</strong> ${this.dataset.featureNames.join(', ')}<br>
        `;

        // ツリー統計を更新
        this.updateTreeStats();
    }
}

// グローバル変数
let visualizer;

// イベントハンドラー関数
function generateNewDataset() {
    visualizer.generateNewDataset();
}

function startAnimation() {
    visualizer.startAnimation();
}

function pauseAnimation() {
    visualizer.pauseAnimation();
}

function resetAnimation() {
    visualizer.resetAnimation();
}

async function applyPruning() {
    await visualizer.applyPruning();
}

// 初期化
window.onload = function() {
    visualizer = new DecisionTreeVisualizer();
};