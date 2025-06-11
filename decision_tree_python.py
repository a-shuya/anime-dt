"""
決定木の実装 (Python版)
scikit-learnライクなインターフェースで実装
"""

import numpy as np
from typing import List, Dict, Any, Optional, Tuple
import json

class DecisionTreeNode:
    """決定木のノード"""
    
    def __init__(self):
        self.feature = None
        self.threshold = None
        self.left = None
        self.right = None
        self.is_leaf = True
        self.prediction = None
        self.samples = 0
        self.gini = 0.0
        self.class_counts = {}
        self.depth = 0
        self.node_id = ""
        self.impurity_decrease = 0.0

class DecisionTreeClassifier:
    """決定木分類器 (scikit-learn互換)"""
    
    def __init__(self, max_depth=3, min_samples_split=2, min_samples_leaf=1, 
                 min_impurity_decrease=0.0, ccp_alpha=0.0):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.min_samples_leaf = min_samples_leaf
        self.min_impurity_decrease = min_impurity_decrease
        self.ccp_alpha = ccp_alpha
        self.tree_ = None
        self.feature_names_ = None
        self.class_names_ = None
        
    def _calculate_gini(self, y: np.ndarray) -> float:
        """Gini不純度を計算"""
        if len(y) == 0:
            return 0.0
        
        classes, counts = np.unique(y, return_counts=True)
        probabilities = counts / len(y)
        gini = 1.0 - np.sum(probabilities ** 2)
        return gini
    
    def _calculate_class_counts(self, y: np.ndarray) -> Dict[int, int]:
        """クラス別のサンプル数を計算"""
        classes, counts = np.unique(y, return_counts=True)
        return dict(zip(classes.astype(int), counts.astype(int)))
    
    def _find_best_split(self, X: np.ndarray, y: np.ndarray) -> Tuple[Optional[int], Optional[float], float]:
        """最適な分割を見つける"""
        if len(X) < self.min_samples_split:
            return None, None, 0.0
        
        best_feature = None
        best_threshold = None
        best_score = float('inf')
        best_impurity_decrease = 0.0
        
        current_gini = self._calculate_gini(y)
        
        for feature in range(X.shape[1]):
            # ソートして閾値候補を取得
            feature_values = X[:, feature]
            sorted_indices = np.argsort(feature_values)
            sorted_values = feature_values[sorted_indices]
            sorted_labels = y[sorted_indices]
            
            # 隣接する異なる値の間を閾値として試行
            for i in range(1, len(sorted_values)):
                if sorted_values[i] == sorted_values[i-1]:
                    continue
                
                threshold = (sorted_values[i] + sorted_values[i-1]) / 2
                
                # 分割
                left_mask = X[:, feature] <= threshold
                right_mask = ~left_mask
                
                left_y = y[left_mask]
                right_y = y[right_mask]
                
                # 最小葉サンプル数チェック
                if len(left_y) < self.min_samples_leaf or len(right_y) < self.min_samples_leaf:
                    continue
                
                # 重み付きGini不純度を計算
                n_total = len(y)
                left_gini = self._calculate_gini(left_y)
                right_gini = self._calculate_gini(right_y)
                weighted_gini = (len(left_y) * left_gini + len(right_y) * right_gini) / n_total
                
                # 情報利得
                impurity_decrease = current_gini - weighted_gini
                
                if weighted_gini < best_score and impurity_decrease >= self.min_impurity_decrease:
                    best_score = weighted_gini
                    best_feature = feature
                    best_threshold = threshold
                    best_impurity_decrease = impurity_decrease
        
        return best_feature, best_threshold, best_impurity_decrease
    
    def _build_tree(self, X: np.ndarray, y: np.ndarray, depth: int = 0, node_id: str = "root") -> DecisionTreeNode:
        """再帰的に決定木を構築"""
        node = DecisionTreeNode()
        node.samples = len(y)
        node.gini = self._calculate_gini(y)
        node.class_counts = self._calculate_class_counts(y)
        node.prediction = int(np.bincount(y.astype(int)).argmax())
        node.depth = depth
        node.node_id = node_id
        
        # 停止条件のチェック
        if (depth >= self.max_depth or 
            len(y) < self.min_samples_split or 
            len(np.unique(y)) == 1):
            return node
        
        # 最適分割を探索
        feature, threshold, impurity_decrease = self._find_best_split(X, y)
        
        if feature is None:
            return node
        
        # 分割実行
        node.is_leaf = False
        node.feature = feature
        node.threshold = threshold
        node.impurity_decrease = impurity_decrease
        
        left_mask = X[:, feature] <= threshold
        right_mask = ~left_mask
        
        # 再帰的に子ノードを構築
        node.left = self._build_tree(X[left_mask], y[left_mask], depth + 1, f"{node_id}L")
        node.right = self._build_tree(X[right_mask], y[right_mask], depth + 1, f"{node_id}R")
        
        return node
    
    def fit(self, X: np.ndarray, y: np.ndarray, feature_names: List[str] = None, class_names: List[str] = None):
        """モデルを訓練"""
        X = np.array(X)
        y = np.array(y)
        
        self.feature_names_ = feature_names or [f"feature_{i}" for i in range(X.shape[1])]
        self.class_names_ = class_names or [str(i) for i in np.unique(y)]
        
        self.tree_ = self._build_tree(X, y)
        return self
    
    def _predict_sample(self, x: np.ndarray, node: DecisionTreeNode) -> int:
        """単一サンプルの予測"""
        if node.is_leaf:
            return node.prediction
        
        if x[node.feature] <= node.threshold:
            return self._predict_sample(x, node.left)
        else:
            return self._predict_sample(x, node.right)
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """予測"""
        X = np.array(X)
        predictions = []
        
        for x in X:
            pred = self._predict_sample(x, self.tree_)
            predictions.append(pred)
        
        return np.array(predictions)
    
    def _node_to_dict(self, node: DecisionTreeNode) -> Dict[str, Any]:
        """ノードを辞書形式に変換（JavaScript用）"""
        if node is None:
            return None
        
        result = {
            'id': node.node_id,
            'depth': node.depth,
            'samples': node.samples,
            'gini': float(node.gini),
            'majorityClass': int(node.prediction),
            'isLeaf': node.is_leaf,
            'classCounts': {str(k): int(v) for k, v in node.class_counts.items()},
            'impurityDecrease': float(node.impurity_decrease)
        }
        
        if not node.is_leaf:
            result['feature'] = int(node.feature)
            result['threshold'] = float(node.threshold)
            result['left'] = self._node_to_dict(node.left)
            result['right'] = self._node_to_dict(node.right)
        
        return result
    
    def get_tree_dict(self) -> Dict[str, Any]:
        """決定木を辞書形式で取得（JavaScript用）"""
        if self.tree_ is None:
            return None
        return self._node_to_dict(self.tree_)
    
    def apply_cost_complexity_pruning(self, alpha: float):
        """Cost Complexity Pruning を適用"""
        if self.tree_ is None:
            return
        
        self.tree_ = self._prune_node(self.tree_, alpha)
    
    def _calculate_subtree_cost(self, node: DecisionTreeNode, alpha: float) -> float:
        """サブツリーのコストを計算"""
        if node.is_leaf:
            return self._calculate_node_error(node)
        
        left_cost = self._calculate_subtree_cost(node.left, alpha) if node.left else 0
        right_cost = self._calculate_subtree_cost(node.right, alpha) if node.right else 0
        leaves_count = self._count_leaves(node)
        
        return left_cost + right_cost + alpha * leaves_count
    
    def _calculate_node_error(self, node: DecisionTreeNode) -> float:
        """ノードのエラー率を計算"""
        if node.samples == 0:
            return 0.0
        
        majority_count = max(node.class_counts.values()) if node.class_counts else 0
        return (node.samples - majority_count) / node.samples
    
    def _count_leaves(self, node: DecisionTreeNode) -> int:
        """葉ノードの数を数える"""
        if node.is_leaf:
            return 1
        
        left_leaves = self._count_leaves(node.left) if node.left else 0
        right_leaves = self._count_leaves(node.right) if node.right else 0
        return left_leaves + right_leaves
    
    def _prune_node(self, node: DecisionTreeNode, alpha: float) -> DecisionTreeNode:
        """ノードを剪定"""
        if node.is_leaf:
            return node
        
        # 子ノードを再帰的に剪定
        if node.left:
            node.left = self._prune_node(node.left, alpha)
        if node.right:
            node.right = self._prune_node(node.right, alpha)
        
        # サブツリーのコストと葉ノードのコストを比較
        subtree_cost = self._calculate_subtree_cost(node, alpha)
        leaf_cost = self._calculate_node_error(node) + alpha
        
        if leaf_cost <= subtree_cost:
            # 剪定する（葉ノードにする）
            node.is_leaf = True
            node.left = None
            node.right = None
            node.feature = None
            node.threshold = None
        
        return node


def calculate_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, Any]:
    """分類性能指標を計算"""
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    
    # 精度
    accuracy = np.mean(y_true == y_pred)
    
    # クラス別指標
    classes = np.unique(np.concatenate([y_true, y_pred]))
    metrics_per_class = {}
    
    total_support = len(y_true)
    macro_precision = 0
    macro_recall = 0
    macro_f1 = 0
    weighted_precision = 0
    weighted_recall = 0
    weighted_f1 = 0
    
    for cls in classes:
        tp = np.sum((y_true == cls) & (y_pred == cls))
        fp = np.sum((y_true != cls) & (y_pred == cls))
        fn = np.sum((y_true == cls) & (y_pred != cls))
        tn = np.sum((y_true != cls) & (y_pred != cls))
        
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0
        f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0
        support = np.sum(y_true == cls)
        
        metrics_per_class[int(cls)] = {
            'precision': float(precision),
            'recall': float(recall),
            'f1': float(f1),
            'support': int(support)
        }
        
        # マクロ平均
        macro_precision += precision
        macro_recall += recall
        macro_f1 += f1
        
        # 重み付き平均
        weighted_precision += precision * support
        weighted_recall += recall * support
        weighted_f1 += f1 * support
    
    n_classes = len(classes)
    macro_precision /= n_classes
    macro_recall /= n_classes
    macro_f1 /= n_classes
    
    weighted_precision /= total_support
    weighted_recall /= total_support
    weighted_f1 /= total_support
    
    return {
        'accuracy': float(accuracy),
        'macro_avg': {
            'precision': float(macro_precision),
            'recall': float(macro_recall),
            'f1': float(macro_f1)
        },
        'weighted_avg': {
            'precision': float(weighted_precision),
            'recall': float(weighted_recall),
            'f1': float(weighted_f1)
        },
        'per_class': metrics_per_class
    }


# JavaScriptからの呼び出し用関数
def build_decision_tree(X_list, y_list, params_dict):
    """JavaScript から呼び出される決定木構築関数"""
    X = np.array(X_list)
    y = np.array(y_list)
    
    clf = DecisionTreeClassifier(
        max_depth=params_dict.get('max_depth', 3),
        min_samples_split=params_dict.get('min_samples_split', 2),
        min_samples_leaf=params_dict.get('min_samples_leaf', 1),
        min_impurity_decrease=params_dict.get('min_impurity_decrease', 0.0),
        ccp_alpha=params_dict.get('ccp_alpha', 0.0)
    )
    
    feature_names = params_dict.get('feature_names', [f"X{i}" for i in range(X.shape[1])])
    class_names = params_dict.get('class_names', [str(i) for i in np.unique(y)])
    
    clf.fit(X, y, feature_names, class_names)
    
    # 予測と評価
    y_pred = clf.predict(X)
    metrics = calculate_metrics(y, y_pred)
    
    return {
        'tree': clf.get_tree_dict(),
        'metrics': metrics,
        'predictions': y_pred.tolist()
    }


def apply_pruning(tree_dict, X_list, y_list, alpha, params_dict):
    """剪定を適用"""
    X = np.array(X_list)
    y = np.array(y_list)
    
    # 新しい分類器を作成して剪定適用
    clf = DecisionTreeClassifier(
        max_depth=params_dict.get('max_depth', 3),
        min_samples_split=params_dict.get('min_samples_split', 2),
        min_samples_leaf=params_dict.get('min_samples_leaf', 1),
        min_impurity_decrease=params_dict.get('min_impurity_decrease', 0.0),
        ccp_alpha=0.0  # 初期構築時は剪定なし
    )
    
    feature_names = params_dict.get('feature_names', [f"X{i}" for i in range(X.shape[1])])
    class_names = params_dict.get('class_names', [str(i) for i in np.unique(y)])
    
    clf.fit(X, y, feature_names, class_names)
    clf.apply_cost_complexity_pruning(alpha)
    
    # 予測と評価
    y_pred = clf.predict(X)
    metrics = calculate_metrics(y, y_pred)
    
    return {
        'tree': clf.get_tree_dict(),
        'metrics': metrics,
        'predictions': y_pred.tolist()
    }