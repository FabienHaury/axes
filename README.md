
# Understanding the World Through Data

An interactive data visualization project exploring how different scale transformations influence the interpretation of global patterns, using the Gapminder dataset.

**Same data, different perspectives.**

## Overview

This project explores the relationship between economic development, life expectancy, and population across countries around the world.

Using interactive visualizations built with **React** and **D3.js**, it investigates how the choice of scale influences the way numerical data is represented and interpreted.

The project compares three approaches to numerical scaling — linear, logarithmic, and square root — before introducing hierarchical clustering as a complementary method for exploring similarities between countries.

The objective is to demonstrate that the same dataset can reveal different patterns depending on the visualization and analytical methods used.

## Visualizations

### 1. Linear Scale

Explores the distribution of GDP per capita using a linear scale.

- Preserves absolute differences between numerical values.
- Maintains equal visual distances for equal numerical intervals.
- Highlights the limitations of linear representations when data spans a wide range of values.

### 2. Logarithmic Scale

Uses a logarithmic transformation to make relative differences easier to observe.

- Equal visual distances represent equal multiplication factors.
- Spreads out lower and intermediate values.
- Compresses larger values.
- Requires strictly positive values.

### 3. Square Root Scale

Introduces an intermediate transformation between linear and logarithmic scaling.

- Compresses larger values progressively.
- Gives smaller and intermediate values more visual space.
- Supports zero values.
- Provides a less aggressive compression than logarithmic scaling.

### 4. Hierarchical Clustering

Explores similarities between countries using multiple indicators simultaneously.

The clustering analysis considers three variables:

- Life expectancy
- GDP per capita
- Population

The methodology includes:

- Log-transforming GDP per capita and population to reduce skewness.
- Standardizing variables before calculating distances.
- Applying hierarchical agglomerative clustering.
- Using Ward's linkage method.
- Dividing the resulting hierarchy into six clusters.

The radial dendrogram illustrates relationships between countries and helps identify groups with similar economic, demographic, and health characteristics.

## Dataset

The project uses the **Gapminder dataset**, which provides country-level indicators relating to population, economic development, and health.

The visualizations focus on three variables:

| Indicator | Description |
|---|---|
| GDP per capita | Economic output per person |
| Life expectancy | Average expected lifespan |
| Population | Total population of each country |

These indicators provide complementary perspectives on global development.

## Technologies

- **React** – Component-based application development.
- **JavaScript** – Data processing and application logic.
- **D3.js** – Data visualization, scales, and hierarchical layouts.
- **CSS** – Styling and responsive page design.

## Project Structure

```text
.
├── src/
│   ├── charts/
│   │   ├── GapminderLinear.jsx
│   │   ├── GapminderLog.jsx
│   │   ├── GapminderSqrt.jsx
│   │   └── Dendrogram.jsx
│   │
│   ├── data/
│   │   └── gapminder.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

*The structure above represents the main application files; additional configuration and assets may be present.*

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project directory:

```bash
cd <repository-name>
```

Install the dependencies:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to explore the application.

## Methodological Considerations

Each visualization offers a different perspective on the same underlying data.

Linear scaling preserves absolute differences, logarithmic scaling emphasizes proportional differences, and square root scaling provides an intermediate transformation.

Hierarchical clustering takes a different approach by examining multiple variables simultaneously rather than simply transforming the visual representation of one variable.

These methods are complementary, but their results must be interpreted in the context of their underlying assumptions and limitations.

In particular, clustering identifies statistical similarities rather than causal relationships, and its results depend on the selected variables, transformations, and clustering parameters.

## Project Objective

The central question behind this project is:

**How does the way we represent data influence the patterns we perceive?**

By combining different scale transformations with hierarchical clustering, this project demonstrates how visualization and analytical choices shape our understanding of complex datasets.

Effective data visualization is not only about representing information accurately, but also about making meaningful relationships visible without misleading the viewer.

## Acknowledgements

Developed as part of the **React & D3 Data Visualization Course**.

Course: [React D3 Data Visualization Course](https://www.react-graph-gallery.com/react-d3-dataviz-course)

Dataset: [Gapminder](https://www.gapminder.org/data/)

## Project

Created by [Fabien Haury](https://github.com/FabienHaury).

Part of an exploration of React, D3.js and data visualisation.

---

**Built with React and D3.js.**
