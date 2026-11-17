
import * as d3 from "d3";

const FEATURES = [
    (d) => d.lifeExp,
    (d) => Math.log1p(d.gdpPercap),
    (d) => Math.log1p(d.pop),
];

const CLUSTER_COLORS = [
    "#299D82", // Emerald
    "#4789CF", // Blue
    "#D69A43", // Amber
    "#9270C5", // Purple
    "#D36B78", // Rose
    "#64748B", // Slate
];

// --------------------------------------------------
// 1. Standardize the variables
// --------------------------------------------------

function normalizeData(data) {
    const columns = FEATURES.map((getValue) =>
        data.map(getValue)
    );

    const means = columns.map((column) =>
        d3.mean(column)
    );

    const deviations = columns.map(
        (column) => d3.deviation(column) || 1
    );

    return data.map((country, index) => ({
        ...country,
        vector: columns.map(
            (column, featureIndex) =>
                (column[index] - means[featureIndex]) /
                deviations[featureIndex]
        ),
    }));
}

// --------------------------------------------------
// 2. Calculate squared Euclidean distance
// --------------------------------------------------

function squaredDistance(a, b) {
    return d3.sum(
        a.map((value, index) =>
            (value - b[index]) ** 2
        )
    );
}

// --------------------------------------------------
// 3. Ward linkage distance
// --------------------------------------------------

function wardDistance(a, b) {
    const factor =
        (a.size * b.size) / (a.size + b.size);

    return Math.sqrt(
        factor * squaredDistance(a.centroid, b.centroid)
    );
}

// --------------------------------------------------
// 4. Merge two clusters
// --------------------------------------------------

function mergeClusters(a, b, distance) {
    const size = a.size + b.size;

    const centroid = a.centroid.map(
        (value, index) =>
            (
                value * a.size +
                b.centroid[index] * b.size
            ) / size
    );

    return {
        name: `${a.name} + ${b.name}`,
        distance,
        size,
        centroid,
        children: [a, b],
    };
}

// --------------------------------------------------
// 5. Hierarchical agglomerative clustering
// --------------------------------------------------

export function hierarchicalClustering(data) {
    if (!data.length) return null;

    const normalized = normalizeData(data);

    let clusters = normalized.map((country) => ({
        name: country.country,
        distance: 0,
        size: 1,
        centroid: country.vector,
        children: null,
    }));

    while (clusters.length > 1) {
        let minDistance = Infinity;
        let bestI = -1;
        let bestJ = -1;

        for (let i = 0; i < clusters.length; i++) {
            for (let j = i + 1; j < clusters.length; j++) {
                const distance = wardDistance(
                    clusters[i],
                    clusters[j]
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    bestI = i;
                    bestJ = j;
                }
            }
        }

        const merged = mergeClusters(
            clusters[bestI],
            clusters[bestJ],
            minDistance
        );

        clusters = clusters.filter(
            (_, index) =>
                index !== bestI && index !== bestJ
        );

        clusters.push(merged);
    }

    return clusters[0];
}

// --------------------------------------------------
// 6. Generate descriptive names
// --------------------------------------------------

function getClusterName(stats) {
    let income;
    let longevity;

    if (stats.gdpPercap >= 25000) {
        income = "High income";
    } else if (stats.gdpPercap >= 10000) {
        income = "Upper-middle income";
    } else if (stats.gdpPercap >= 4000) {
        income = "Middle income";
    } else {
        income = "Lower income";
    }

    if (stats.lifeExp >= 75) {
        longevity = "longer life expectancy";
    } else if (stats.lifeExp >= 65) {
        longevity = "moderate life expectancy";
    } else {
        longevity = "lower life expectancy";
    }

    return `${income} · ${longevity}`;
}

// --------------------------------------------------
// 7. Cut the dendrogram into k clusters
// --------------------------------------------------

export function assignClusters(root, k = 5, originalData = []) {
    if (!root) return [];

    let groups = [root];

    while (groups.length < k) {
        const candidates = groups
            .map((node, index) => ({ node, index }))
            .filter(({ node }) => node.children?.length)
            .sort(
                (a, b) =>
                    b.node.distance - a.node.distance
            );

        if (!candidates.length) break;

        const { node, index } = candidates[0];

        groups.splice(index, 1, ...node.children);
    }

    return groups.map((group, index) => {
        const countries = [];

        function visit(node) {
            if (!node.children) {
                countries.push(node.name);
                return;
            }

            node.children.forEach(visit);
        }

        visit(group);

        const members = originalData.filter((country) =>
            countries.includes(country.country)
        );

        const stats = {
            lifeExp: d3.mean(members, (d) => d.lifeExp) ?? 0,
            gdpPercap: d3.mean(members, (d) => d.gdpPercap) ?? 0,
            pop: d3.mean(members, (d) => d.pop) ?? 0,
        };

        return {
            id: index,
            name: getClusterName(stats),
            countries,
            stats,
            color: CLUSTER_COLORS[index % CLUSTER_COLORS.length],
        };
    });
}
