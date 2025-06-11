// datasets.js - 既存データセットの定義

class DatasetGenerator {
    static getAvailableDatasets() {
        return {
            'iris': 'Iris Dataset (3クラス分類)',
            'wine': 'Wine Dataset (3クラス分類)', 
            'breast_cancer': 'Breast Cancer Dataset (2クラス分類)',
            'synthetic_2d': 'Synthetic 2D Dataset (2クラス分類)',
            'synthetic_circles': 'Synthetic Circles Dataset (2クラス分類)',
            'synthetic_moons': 'Synthetic Moons Dataset (2クラス分類)'
        };
    }

    static generateIrisDataset() {
        // 簡化されたIrisデータセット（SepalLength, SepalWidth の2特徴量）
        const data = [
            // Setosa (Class 0)
            [5.1, 3.5], [4.9, 3.0], [4.7, 3.2], [4.6, 3.1], [5.0, 3.6],
            [5.4, 3.9], [4.6, 3.4], [5.0, 3.4], [4.4, 2.9], [4.9, 3.1],
            [5.4, 3.7], [4.8, 3.4], [4.8, 3.0], [4.3, 3.0], [5.8, 4.0],
            [5.7, 4.4], [5.4, 3.9], [5.1, 3.5], [5.7, 3.8], [5.1, 3.8],
            [5.4, 3.4], [5.1, 3.7], [4.6, 3.6], [5.1, 3.3], [4.8, 3.4],
            [5.0, 3.0], [5.0, 3.4], [5.2, 3.5], [5.2, 3.4], [4.7, 3.2],
            [4.8, 3.1], [5.4, 3.4], [5.2, 4.1], [5.5, 4.2], [4.9, 3.1],
            [5.0, 3.2], [5.5, 3.5], [4.9, 3.6], [4.4, 3.0], [5.1, 3.4],
            [5.0, 3.5], [4.5, 2.3], [4.4, 3.2], [5.0, 3.5], [5.1, 3.8],
            [4.8, 3.0], [5.1, 3.8], [4.6, 3.2], [5.3, 3.7], [5.0, 3.3],

            // Versicolor (Class 1)
            [7.0, 3.2], [6.4, 3.2], [6.9, 3.1], [5.5, 2.3], [6.5, 2.8],
            [5.7, 2.8], [6.3, 3.3], [4.9, 2.4], [6.6, 2.9], [5.2, 2.7],
            [5.0, 2.0], [5.9, 3.0], [6.0, 2.2], [6.1, 2.9], [5.6, 2.9],
            [6.7, 3.1], [5.6, 3.0], [5.8, 2.7], [6.2, 2.2], [5.6, 2.5],
            [5.9, 3.2], [6.1, 2.8], [6.3, 2.5], [6.1, 2.8], [6.4, 2.9],
            [6.6, 3.0], [6.8, 2.8], [6.7, 3.0], [6.0, 2.9], [5.7, 2.6],
            [5.5, 2.4], [5.5, 2.4], [5.8, 2.7], [6.0, 2.7], [5.4, 3.0],
            [6.0, 3.4], [6.7, 3.1], [6.3, 2.3], [5.6, 3.0], [5.5, 2.5],
            [5.5, 2.6], [6.1, 3.0], [5.8, 2.6], [5.0, 2.3], [5.6, 2.7],
            [5.7, 3.0], [5.7, 2.9], [6.2, 2.9], [5.1, 2.5], [5.7, 2.8],

            // Virginica (Class 2)
            [6.3, 3.3], [5.8, 2.7], [7.1, 3.0], [6.3, 2.9], [6.5, 3.0],
            [7.6, 3.0], [4.9, 2.5], [7.3, 2.9], [6.7, 2.5], [7.2, 3.6],
            [6.5, 3.2], [6.4, 2.7], [6.8, 3.0], [5.7, 2.5], [5.8, 2.8],
            [6.4, 3.2], [6.5, 3.0], [7.7, 3.8], [7.7, 2.6], [6.0, 2.2],
            [6.9, 3.2], [5.6, 2.8], [7.7, 2.8], [6.3, 2.7], [6.7, 3.3],
            [7.2, 3.2], [6.2, 2.8], [6.1, 3.0], [6.4, 2.8], [7.2, 3.0],
            [7.4, 2.8], [7.9, 3.8], [6.4, 2.8], [6.3, 2.8], [6.1, 2.6],
            [7.7, 3.0], [6.3, 3.4], [6.4, 3.1], [6.0, 3.0], [6.9, 3.1],
            [6.7, 3.1], [6.9, 3.1], [5.8, 2.7], [6.8, 3.2], [6.7, 3.3],
            [6.7, 3.0], [6.3, 2.5], [6.5, 3.0], [6.2, 3.4], [5.9, 3.0]
        ];

        const labels = [
            ...Array(50).fill(0),  // Setosa
            ...Array(50).fill(1),  // Versicolor  
            ...Array(50).fill(2)   // Virginica
        ];

        return {
            data,
            labels,
            featureNames: ['Sepal Length', 'Sepal Width'],
            classNames: ['Setosa', 'Versicolor', 'Virginica'],
            description: 'アヤメの品種分類データセット（150サンプル、3クラス）'
        };
    }

    static generateWineDataset() {
        // 簡化されたWineデータセット（Alcohol, Malic Acid の2特徴量）
        const data = [
            // Class 0
            [14.23, 1.71], [13.20, 1.78], [13.16, 2.36], [14.37, 1.95], [13.24, 2.59],
            [14.20, 1.76], [14.39, 1.87], [14.06, 2.15], [14.83, 1.64], [13.86, 1.35],
            [14.10, 2.16], [14.12, 1.48], [13.75, 1.73], [14.75, 1.73], [14.38, 1.87],
            [13.63, 1.81], [14.30, 1.92], [13.83, 1.57], [14.19, 1.59], [13.64, 3.03],
            [14.06, 1.63], [12.93, 3.80], [13.71, 1.86], [12.85, 1.60], [13.50, 1.81],
            [13.05, 2.05], [13.39, 1.77], [13.30, 1.72], [13.87, 1.90], [14.02, 1.68],
            [13.73, 1.50], [13.58, 1.66], [13.68, 1.83], [13.76, 1.53], [13.51, 1.80],
            [13.48, 1.81], [13.28, 1.64], [13.05, 1.65], [13.07, 1.50], [14.22, 1.70],
            [13.56, 1.71], [13.41, 1.58], [13.88, 1.89], [13.24, 3.98], [13.05, 1.77],
            [14.21, 4.04], [14.38, 3.59], [13.90, 1.68], [14.95, 1.73], [13.83, 1.65],
            [14.93, 1.64], [13.36, 1.53], [14.10, 1.41], [13.94, 1.73], [13.05, 1.73],
            [13.83, 1.50], [13.82, 1.75], [13.77, 1.90], [13.74, 1.67],

            // Class 1  
            [12.37, 0.94], [12.33, 1.10], [12.64, 1.36], [13.67, 1.25], [12.37, 1.13],
            [12.17, 1.45], [12.37, 1.21], [13.11, 1.01], [12.37, 1.17], [13.34, 0.94],
            [12.21, 1.19], [12.29, 1.61], [13.86, 1.51], [13.49, 1.66], [12.99, 1.67],
            [11.96, 1.09], [11.66, 1.88], [13.03, 0.90], [11.84, 2.89], [12.33, 0.99],
            [12.70, 0.92], [12.0, 0.92], [12.72, 1.81], [12.08, 1.13], [13.05, 1.77],
            [11.84, 0.89], [12.67, 0.98], [12.16, 1.61], [12.42, 1.61], [12.25, 1.73],
            [12.53, 1.73], [13.49, 1.66], [12.84, 2.96], [12.93, 2.81], [13.36, 2.56],
            [12.52, 2.43], [13.62, 4.95], [12.25, 3.88], [13.16, 3.57], [12.58, 1.29],
            [13.40, 4.60], [12.20, 2.25], [12.77, 2.39], [14.16, 2.51], [13.71, 5.65],
            [13.40, 3.91], [13.27, 4.28], [13.17, 2.59], [14.13, 4.10], [13.24, 3.57],
            [12.07, 2.16], [12.43, 1.53], [11.79, 2.13], [12.37, 1.63], [12.04, 4.30],
            [12.86, 1.35], [12.88, 2.99], [12.81, 2.31], [12.7, 3.55], [12.51, 1.24],
            [12.60, 2.46], [12.25, 4.72], [12.53, 5.51], [13.49, 3.59], [12.84, 4.33],
            [12.93, 3.80], [13.36, 1.90], [12.73, 1.50], [12.14, 1.48], [13.67, 1.25],
            [12.29, 1.41], [13.25, 1.60], [12.29, 2.83], [12.47, 1.52], [11.42, 2.70],
            [13.56, 1.51], [12.42, 2.55], [12.88, 1.89], [12.11, 2.05], [12.81, 1.60],
            [12.7, 1.68], [12.51, 1.73], [12.60, 2.46], [12.25, 4.72], [12.53, 5.51]
        ];

        const labels = [
            ...Array(59).fill(0),
            ...Array(71).fill(1),
            ...Array(48).fill(2)
        ];

        // Class 2のデータを追加
        const class2Data = [
            [13.20, 1.78], [13.16, 2.36], [14.37, 1.95], [13.24, 2.59], [14.20, 1.76],
            [14.39, 1.87], [14.06, 2.15], [14.83, 1.64], [13.86, 1.35], [14.10, 2.16],
            [14.12, 1.48], [13.75, 1.73], [14.75, 1.73], [14.38, 1.87], [13.63, 1.81],
            [14.30, 1.92], [13.83, 1.57], [14.19, 1.59], [13.64, 3.03], [14.06, 1.63],
            [12.93, 3.80], [13.71, 1.86], [12.85, 1.60], [13.50, 1.81], [13.05, 2.05],
            [13.39, 1.77], [13.30, 1.72], [13.87, 1.90], [14.02, 1.68], [13.73, 1.50],
            [13.58, 1.66], [13.68, 1.83], [13.76, 1.53], [13.51, 1.80], [13.48, 1.81],
            [13.28, 1.64], [13.05, 1.65], [13.07, 1.50], [14.22, 1.70], [13.56, 1.71],
            [13.41, 1.58], [13.88, 1.89], [13.24, 3.98], [13.05, 1.77], [14.21, 4.04],
            [14.38, 3.59], [13.90, 1.68], [14.95, 1.73]
        ];

        data.push(...class2Data);

        return {
            data,
            labels,
            featureNames: ['Alcohol', 'Malic Acid'],
            classNames: ['Class 0', 'Class 1', 'Class 2'],
            description: 'ワインの品質分類データセット（178サンプル、3クラス）'
        };
    }

    static generateBreastCancerDataset() {
        // 簡化されたBreast Cancerデータセット（Mean Radius, Mean Texture の2特徴量）
        const data = [];
        const labels = [];

        // Malignant (Class 1) - より大きな値
        for (let i = 0; i < 100; i++) {
            const radius = 15 + Math.random() * 10;  // 15-25
            const texture = 20 + Math.random() * 15; // 20-35
            data.push([radius, texture]);
            labels.push(1);
        }

        // Benign (Class 0) - より小さな値
        for (let i = 0; i < 150; i++) {
            const radius = 8 + Math.random() * 8;   // 8-16
            const texture = 10 + Math.random() * 12; // 10-22
            data.push([radius, texture]);
            labels.push(0);
        }

        return {
            data,
            labels,
            featureNames: ['Mean Radius', 'Mean Texture'],
            classNames: ['Benign', 'Malignant'],
            description: '乳がん診断データセット（250サンプル、2クラス）'
        };
    }

    static generateSynthetic2D(size = 200) {
        const data = [];
        const labels = [];

        for (let i = 0; i < size; i++) {
            const x1 = Math.random() * 10;
            const x2 = Math.random() * 10;

            let label;
            if (x1 + x2 > 10) {
                label = Math.random() > 0.2 ? 1 : 0;
            } else if (x1 * x2 > 15) {
                label = Math.random() > 0.3 ? 1 : 0;
            } else {
                label = Math.random() > 0.7 ? 1 : 0;
            }

            data.push([x1, x2]);
            labels.push(label);
        }

        return {
            data,
            labels,
            featureNames: ['X1', 'X2'],
            classNames: ['Class 0', 'Class 1'],
            description: '合成2次元データセット（非線形分離可能）'
        };
    }

    static generateSyntheticCircles(size = 200) {
        const data = [];
        const labels = [];

        for (let i = 0; i < size; i++) {
            const angle = Math.random() * 2 * Math.PI;
            let radius, label;

            if (Math.random() > 0.5) {
                // 内側の円
                radius = 2 + Math.random() * 1;
                label = 0;
            } else {
                // 外側の円
                radius = 4 + Math.random() * 1;
                label = 1;
            }

            const x1 = radius * Math.cos(angle) + (Math.random() - 0.5) * 0.5;
            const x2 = radius * Math.sin(angle) + (Math.random() - 0.5) * 0.5;

            data.push([x1 + 5, x2 + 5]); // 中心を(5,5)に移動
            labels.push(label);
        }

        return {
            data,
            labels,
            featureNames: ['X1', 'X2'],
            classNames: ['Inner Circle', 'Outer Circle'],
            description: '合成円形データセット（同心円パターン）'
        };
    }

    static generateSyntheticMoons(size = 200) {
        const data = [];
        const labels = [];

        for (let i = 0; i < size; i++) {
            const t = Math.random() * Math.PI;
            const noise_x = (Math.random() - 0.5) * 0.3;
            const noise_y = (Math.random() - 0.5) * 0.3;

            if (Math.random() > 0.5) {
                // 上の月
                const x1 = Math.cos(t) + noise_x + 5;
                const x2 = Math.sin(t) + noise_y + 3;
                data.push([x1, x2]);
                labels.push(0);
            } else {
                // 下の月
                const x1 = 1 - Math.cos(t) + noise_x + 5;
                const x2 = 1 - Math.sin(t) - 0.5 + noise_y + 3;
                data.push([x1, x2]);
                labels.push(1);
            }
        }

        return {
            data,
            labels,
            featureNames: ['X1', 'X2'],
            classNames: ['Upper Moon', 'Lower Moon'],
            description: '合成半月データセット（非線形分離）'
        };
    }

    static generateDataset(type, size = 200) {
        switch (type) {
            case 'iris':
                return this.generateIrisDataset();
            case 'wine':
                return this.generateWineDataset();
            case 'breast_cancer':
                return this.generateBreastCancerDataset();
            case 'synthetic_2d':
                return this.generateSynthetic2D(size);
            case 'synthetic_circles':
                return this.generateSyntheticCircles(size);
            case 'synthetic_moons':
                return this.generateSyntheticMoons(size);
            default:
                return this.generateSynthetic2D(size);
        }
    }
}