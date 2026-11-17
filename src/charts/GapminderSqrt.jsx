import * as d3 from "d3";
import AxisBottom from "../components/axes/AxisBottom";
import AxisLeft from "../components/axes/AxisLeft";

const width = 960;
const height = 600;

const margin = {
    top: 30,
    right: 190,
    bottom: 85,
    left: 95,
};

const boundsWidth = width - margin.left - margin.right;
const boundsHeight = height - margin.top - margin.bottom;

const innerPadding = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
};

const continentColors = {
    Africa: "#e76f51",
    Americas: "#457b9d",
    Asia: "#e9c46a",
    Europe: "#2a9d8f",
    Oceania: "#9b5de5",
};

export default function GapminderSqrt({ data }) {

    // X scale: GDP per capita (square root)
    const xScale = d3
        .scaleSqrt()
        .domain([
            0,
            d3.max(data, (d) => d.gdpPercap),
        ])
        .nice()
        .range([
            innerPadding.left,
            boundsWidth - innerPadding.right,
        ]);

    // Y scale: life expectancy (linear)
    const yScale = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, (d) => d.lifeExp),
        ])
        .nice()
        .range([
            boundsHeight - innerPadding.bottom,
            innerPadding.top,
        ]);

    // Size scale: population
    const radiusScale = d3
        .scaleSqrt()
        .domain([
            0,
            d3.max(data, (d) => d.pop),
        ])
        .range([3, 28]);

    // Draw smaller bubbles before larger ones
    const sortedData = [...data].sort(
        (a, b) => a.pop - b.pop
    );

    // Population values used in the size legend
    const sizeLegendValues = [
        100000000,
        500000000,
        1000000000,
        2000000000,
    ].filter(
        (value) => value <= d3.max(data, (d) => d.pop)
    );

    const formatPopulation = (value) =>
        value >= 1e9
            ? `${value / 1e9}B`
            : `${value / 1e6}M`;

    return (
        <section className="chart">

            {/* Chart heading */}

            <div className="chart-heading">
                <h3>GDP per capita vs. Life expectancy</h3>

                <p className="chart-subtitle">
                    Each circle represents a country. Bubble size reflects
                    population, while the square root scale compresses
                    higher GDP values without eliminating zero.
                </p>

                <div className="chart-scale-label">
                    X-axis: Square root scale
                </div>
            </div>

            {/* Bubble chart */}

            <svg
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label="Bubble chart showing GDP per capita using a square root scale and life expectancy using a linear scale"
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>

                    {/* Axes */}

                    <AxisBottom
                        scale={xScale}
                        boundsHeight={boundsHeight}
                        scaleType="sqrt"
                        tickFormat={(value) => `${value / 1000}k`}
                    />

                    <AxisLeft scale={yScale} />

                    {/* X-axis label */}

                    <text
                        x={boundsWidth / 2}
                        y={boundsHeight + 58}
                        textAnchor="middle"
                        className="axis-label"
                    >
                        GDP per capita (square root scale)
                    </text>

                    {/* Y-axis label */}

                    <text
                        transform="rotate(-90)"
                        x={-boundsHeight / 2}
                        y={-65}
                        textAnchor="middle"
                        className="axis-label"
                    >
                        Life expectancy
                    </text>

                    {/* Bubbles */}

                    {sortedData.map((country) => (
                        <circle
                            key={country.country}
                            cx={xScale(country.gdpPercap)}
                            cy={yScale(country.lifeExp)}
                            r={radiusScale(country.pop)}
                            fill={
                                continentColors[country.continent] ?? "#999"
                            }
                            fillOpacity={0.72}
                            stroke="#ffffff"
                            strokeWidth={0.8}
                        />
                    ))}

                    {/* Legend column */}

                    <g transform={`translate(${boundsWidth + 25}, 10)`}>

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
                </g>
            </svg>
        </section>
    );
}
