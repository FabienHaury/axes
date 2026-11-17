export default function AxisLeft({
    scale,
    tickCount = 8,
    tickFormat,
}) {
    const [rangeStart, rangeEnd] = scale.range();
    const [min, max] = scale.domain();

    const ticks = [
        min,
        ...scale.ticks(tickCount).filter((tick) => tick > min && tick < max),
        max,
    ];

    return (
        <g>
            {/* Main Y-axis line */}
            <line
                x1={0}
                x2={0}
                y1={rangeStart}
                y2={rangeEnd}
                stroke="currentColor"
                strokeWidth={1}
            />

            {ticks.map((tick, index) => {
                const isBoundary = index === 0 || index === ticks.length - 1;

                return (
                    <g
                        key={tick}
                        transform={`translate(0, ${scale(tick)})`}
                    >
                        {/* Tick mark */}
                        <line
                            x1={isBoundary ? -8 : -6}
                            x2={0}
                            y1={0}
                            y2={0}
                            stroke="currentColor"
                            strokeWidth={isBoundary ? 1.5 : 1}
                        />

                        {/* Tick label */}
                        <text
                            x={-10}
                            dy="0.32em"
                            textAnchor="end"
                            fontSize={11}
                            fill="currentColor"
                        >
                            {tickFormat ? tickFormat(tick) : tick}
                        </text>
                    </g>
                );
            })}
        </g>
    );
}
