
const continentColors = {
    Africa: "#e76f51",
    Americas: "#457b9d",
    Asia: "#e9c46a",
    Europe: "#2a9d8f",
    Oceania: "#9b5de5",
};

const populationValues = [
    100000000,
    500000000,
    1000000000,
    2000000000,
];

const formatPopulation = (value) =>
    value >= 1e9
        ? `${value / 1e9}B`
        : `${value / 1e6}M`;

export { continentColors };

export default function ChartLegend({
    radiusScale,
    maxPopulation,
}) {
    const sizeLegendValues = populationValues.filter(
        (value) => value <= maxPopulation
    );

    // If the population is below the first reference value,
    // use the actual maximum as the legend reference.
    if (
        sizeLegendValues.length === 0 &&
        maxPopulation > 0
    ) {
        sizeLegendValues.push(maxPopulation);
    }

    return (
        <g>
            {/* Legend background */}
            <rect
                x={-10}
                y={-10}
                width={165}
                height={465}
                rx={10}
                fill="#f8fafc"
                stroke="#e2e8f0"
            />

            {/* Continent legend */}
            <text
                x={0}
                y={12}
                fontSize={11}
                fontWeight="600"
                letterSpacing="1.2"
                fill="#475569"
            >
                CONTINENTS
            </text>

            {Object.entries(continentColors).map(
                ([continent, color], index) => (
                    <g
                        key={continent}
                        transform={`translate(0, ${40 + index * 24})`}
                    >
                        <circle
                            cx={5}
                            cy={0}
                            r={5}
                            fill={color}
                        />

                        <text
                            x={18}
                            y={4}
                            fontSize={12}
                            fill="#334155"
                        >
                            {continent}
                        </text>
                    </g>
                )
            )}

            {/* Separator */}
            <line
                x1={0}
                x2={145}
                y1={170}
                y2={170}
                stroke="#e2e8f0"
            />

            {/* Population legend */}
            <g transform="translate(0, 190)">
                <text
                    x={0}
                    y={0}
                    fontSize={11}
                    fontWeight="600"
                    letterSpacing="1.2"
                    fill="#475569"
                >
                    POPULATION
                </text>

                <text
                    x={0}
                    y={20}
                    fontSize={9}
                    fill="#888"
                >
                    Bubble area represents population
                </text>

                {sizeLegendValues.map((value, index) => {
                    const radius = radiusScale(value);
                    const centerY = 58 + index * 58;

                    return (
                        <g key={value}>
                            <circle
                                cx={28}
                                cy={centerY}
                                r={radius}
                                fill="#94a3b8"
                                fillOpacity={0.25}
                                stroke="#64748b"
                                strokeWidth={1}
                            />

                            <text
                                x={72}
                                y={centerY + 4}
                                fontSize={12}
                                fill="#334155"
                            >
                                {formatPopulation(value)}
                            </text>
                        </g>
                    );
                })}
            </g>
        </g>
    );
}
