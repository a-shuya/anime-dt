# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese-language decision tree visualization web application that provides animated visualization of decision tree growth processes. The application implements sklearn-compatible decision tree algorithms with real-time animation and interactive parameter controls.

## File Structure & Architecture

### Core Files
- **index.html**: Main HTML interface with parameter controls and canvas container
- **styles.css**: Modern CSS styling with gradients, tooltips, and responsive design
- **decision-tree.js**: Main decision tree implementation and animation logic
- **datasets.js**: Dataset generation utilities for machine learning datasets

### Key Architectural Components

#### DecisionTreeVisualizer Class (decision-tree.js)
- Main application controller managing canvas, animation state, and tree visualization
- Implements complete decision tree algorithm with Gini impurity calculations
- Features dynamic canvas resizing to prevent node overlap at deep levels
- Includes Cost Complexity Pruning (CCP) for overfitting prevention
- Calculates machine learning metrics (accuracy, precision, recall, F1-score)

#### DatasetGenerator Class (datasets.js)
- Provides both classic ML datasets (Iris, Wine, Breast Cancer) and synthetic datasets
- All datasets are simplified to 2 features for 2D visualization
- Includes pattern-based synthetic data generation (circles, moons, non-linear)

#### Animation System
- Step-by-step tree growth visualization with configurable speed
- Node positioning algorithm prevents overlap even at depth 10+
- Canvas automatically expands horizontally when needed for large trees

#### Parameter Controls
- All sklearn decision tree parameters: max_depth, min_samples_split, min_samples_leaf, min_impurity_decrease, ccp_alpha
- Interactive tooltips explain each parameter's effect on overfitting
- Real-time updates trigger tree rebuilding and re-animation

## Development Commands

Since this is a pure client-side HTML/CSS/JavaScript application, no build process is required:

```bash
# Open the application
open index.html
# or serve locally
python -m http.server 8000
```

## Key Features Implementation

### Node Overlap Prevention
The `calculateNodePositions()` method uses a two-pass algorithm:
1. Collect all nodes by level using `collectLevelNodes()`
2. Calculate optimal spacing with `calculateOptimalPositions()` 
3. Dynamically expand canvas width when needed

### Tooltips System
`setupTooltips()` creates hover explanations for each parameter slider, helping users understand machine learning concepts.

### Metrics Calculation
Complete sklearn-style evaluation metrics with proper handling of multi-class classification through macro and weighted averaging.

### Japanese Localization
All UI text, parameter names, and tooltips are in Japanese for educational use in Japanese-speaking contexts.

## Canvas Architecture

The visualization uses a scrollable canvas system:
- Base canvas size: 1500x1200px (auto-expands for wide trees)
- Node radius: 35px with minimum 100px spacing
- Level height: 120px between tree levels
- Supports trees up to depth 10+ without visual overlap

## Dataset Integration

When adding new datasets to `datasets.js`:
1. Add entry to `getAvailableDatasets()`
2. Implement `generate[Name]Dataset()` method
3. Return object with: `{data, labels, featureNames, classNames, description}`
4. Ensure 2 features for visualization compatibility