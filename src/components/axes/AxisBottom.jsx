
import * as d3 from "d3";

export default function AxisBottom({
    scale,
    boundsHeight,
    tickCount = 12,
    tickFormat,
    scaleType = "linear",
}) {
    const [rangeStart, rangeEnd] = scale.range();
    const [min, max] = scale.domain();

    let ticks;

    if (scaleType === "sqrt") {
        // Custom ticks for the square root scale
        ticks = [
            0,
            500,
            1000,
            2000,
            3000,
            4000,
            5000,
            7500,
            10000,
            15000,
            20000,
            25000,
            30000,
            35000,
            40000,
            45000,
            50000,
        ].filter((value) => value >= min && value <= max);

    } else if (scaleType === "log") {
        // Logarithmic ticks: 1, 2, 5
        const minPower = Math.floor(Math.log10(min));
        const maxPower = Math.ceil(Math.log10(max));

        const candidates = [];

        for (let power = minPower; power <= maxPower; power++) {
            const base = Math.pow(10, power);

            [1, 2, 5].forEach((multiplier) => {
                const value = base * multiplier;

                if (value >= min && value <= max) {
                    candidates.push(value);
                }
            });
        }

        ticks = candidates;

    } else {
        // Automatic linear ticks
        ticks = scale.ticks(tickCount);
    }

    const formatTick = (value) => {
        if (tickFormat) return tickFormat(value);

        if (Math.abs(value) >= 1000) {
            return `${d3.format("~g")(value / 1000)}k`;
        }

        return d3.format("~g")(value);
    };

    return (
        <g>
            {/* Main X-axis line */}
            <line
                x1={rangeStart}
                x2={rangeEnd}
                y1={boundsHeight}
                y2={boundsHeight}
                stroke="currentColor"
                strokeWidth={1}
            />

            {/* Ticks and labels */}
            {ticks.map((tick) => (
                <g
                    key={tick}
                    transform={`translate(${scale(tick)}, ${boundsHeight})`}
                >
                    <line
                        x1={0}
                        x2={0}
                        y1={0}
                        y2={6}
                        stroke="currentColor"
                        strokeWidth={1}
                    />

                    <text
                        y={20}
                        textAnchor="middle"
                        fontSize={11}
                        fill="currentColor"
                    >
                        {formatTick(tick)}
                    </text>
                </g>
            ))}
        </g>
    );
}
