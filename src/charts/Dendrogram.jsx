
import { useMemo, useState, useRef, useEffect } from "react";
import * as d3 from "d3";

import {
    hierarchicalClustering,
    assignClusters,
} from "../utils/clustering";

const MIXED_COLOR = "#94A3B8";

const MARGIN = 35;
const LABEL_SPACE = 175;
const LABEL_GAP = 12;

export default function Dendrogram({
    data,
    numberOfClusters = 6,
}) {
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [containerWidth, setContainerWidth] = useState(900);

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    const containerElement = useRef(null);

    // Responsive container width
    useEffect(() => {
        if (!containerElement.current) return;

        const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width;

            if (width > 0) {
                setContainerWidth(Math.round(width));
            }
        });

        observer.observe(containerElement.current);

        return () => observer.disconnect();
    }, []);

    const width = Math.max(320, containerWidth);
    const height = Math.max(850, width * 0.95);

    const radius =
        Math.min(width, height) / 2 -
        LABEL_SPACE -
        MARGIN;

    const outerRadius = radius;

    const result = useMemo(() => {
        if (!data?.length) return null;

        const clusterData = hierarchicalClustering(data);

        const clusterGroups = assignClusters(
            clusterData,
            numberOfClusters,
            data
        );

        const clusterAssignments = new Map();

        clusterGroups.forEach((cluster) => {
            cluster.countries.forEach((country) => {
                clusterAssignments.set(country, cluster);
            });
        });

        const hierarchy = d3.hierarchy(
            clusterData,
            (node) => node.children
        );

        const radialLayout = d3
            .cluster()
            .size([2 * Math.PI, 1]);

        const root = radialLayout(hierarchy);

        return {
            root,
            clusterGroups,
            clusterAssignments,
        };
    }, [data, numberOfClusters]);

    if (!result) {
        return <p>No country data available.</p>;
    }

    const {
        root,
        clusterGroups,
        clusterAssignments,
    } = result;

    const links = root.links();
    const leaves = root.leaves();

    const countryByName = new Map(
        data.map((country) => [
            country.country,
            country,
        ])
    );

    // Polar coordinates to SVG coordinates
    function polarToCartesian(angle, distance) {
        const adjustedAngle = angle - Math.PI / 2;

        return {
            x: Math.cos(adjustedAngle) * distance,
            y: Math.sin(adjustedAngle) * distance,
        };
    }

    // Branch colors based on cluster membership
    function getBranchColor(node) {
        const descendantClusters = new Set(
            node.leaves().map((leaf) =>
                clusterAssignments.get(leaf.data.name)?.id
            )
        );

        if (descendantClusters.size !== 1) {
            return MIXED_COLOR;
        }

        const clusterId = [...descendantClusters][0];

        return (
            clusterGroups.find(
                (cluster) => cluster.id === clusterId
            )?.color ?? MIXED_COLOR
        );
    }

    // Radial branch path
    function getLinkPath(link) {
        const source = polarToCartesian(
            link.source.x,
            link.source.y * outerRadius
        );

        const middle = polarToCartesian(
            link.target.x,
            link.source.y * outerRadius
        );

        const target = polarToCartesian(
            link.target.x,
            link.target.y * outerRadius
        );

        return [
            `M ${source.x} ${source.y}`,
            `L ${middle.x} ${middle.y}`,
            `L ${target.x} ${target.y}`,
        ].join(" ");
    }

    // Country label position and orientation
    function getLabelPosition(node) {
        const position = polarToCartesian(
            node.x,
            outerRadius + LABEL_GAP
        );

        const angle =
            Math.atan2(position.y, position.x) *
            (180 / Math.PI);

        const isLeftSide = position.x < 0;

        const rotation = isLeftSide
            ? angle + 180
            : angle;

        return {
            x: position.x,
            y: position.y,
            rotation,
            anchor: isLeftSide ? "end" : "start",
        };
    }

    // Mouse position relative to the dendrogram container
    function handleCountryMouseMove(event) {
        if (!containerElement.current) return;

        const rect =
            containerElement.current.getBoundingClientRect();

        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    }

    // Tooltip position
    const tooltipWidth = 260;
    const tooltipHeight = 225;

    const tooltipLeft = Math.max(
        8,
        Math.min(
            mousePosition.x + 16,
            width - tooltipWidth - 8
        )
    );

    const tooltipTop = Math.max(
        8,
        Math.min(
            mousePosition.y + 16,
            height - tooltipHeight - 8
        )
    );

    const activeCountry =
        selectedCountry || hoveredCountry;

    const activeCountryData = activeCountry
        ? countryByName.get(activeCountry)
        : null;

    const activeCluster = activeCountry
        ? clusterAssignments.get(activeCountry)
        : null;

    return (
        <div
            ref={containerElement}
            className="dendrogram-container"
        >


            <div className="radial-chart-scroll">
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    role="img"
                    aria-label="Circular hierarchical dendrogram of countries"
                >
                    <g
                        transform={`translate(${width / 2}, ${height / 2})`}
                    >
                        {/* Circular reference rings */}

                        {[0.25, 0.5, 0.75, 1].map((fraction) => (
                            <circle
                                key={fraction}
                                r={outerRadius * fraction}
                                fill="none"
                                stroke="#94A3B8"
                                strokeWidth={0.7}
                                opacity={0.15}
                                strokeDasharray="3 5"
                            />
                        ))}

                        {/* Branches */}

                        {links.map((link, index) => (
                            <path
                                key={index}
                                d={getLinkPath(link)}
                                fill="none"
                                stroke={getBranchColor(link.target)}
                                strokeWidth={1.4}
                                strokeOpacity={0.85}
                                strokeLinecap="round"
                            />
                        ))}

                        {/* Country leaves and labels */}

                        {leaves.map((node) => {
                            const country = countryByName.get(
                                node.data.name
                            );

                            const cluster = clusterAssignments.get(
                                node.data.name
                            );

                            if (!country || !cluster) return null;

                            const position = polarToCartesian(
                                node.x,
                                outerRadius
                            );

                            const label = getLabelPosition(node);

                            const isSelected =
                                selectedCountry === country.country;

                            const isHovered =
                                hoveredCountry === country.country;

                            return (
                                <g
                                    key={country.country}
                                    className="radial-country"
                                    onMouseEnter={(event) => {
                                        setHoveredCountry(country.country);
                                        handleCountryMouseMove(event);
                                    }}
                                    onMouseMove={handleCountryMouseMove}
                                    onMouseLeave={() =>
                                        setHoveredCountry(null)
                                    }
                                    onClick={() =>
                                        setSelectedCountry((previous) =>
                                            previous === country.country
                                                ? null
                                                : country.country
                                        )
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {/* Endpoint dot */}

                                    <circle
                                        cx={position.x}
                                        cy={position.y}
                                        r={isSelected || isHovered ? 7 : 4.5}
                                        fill={cluster.color}
                                        stroke="white"
                                        strokeWidth={1}
                                    />

                                    {/* Country name */}

                                    <text
                                        x={label.x}
                                        y={label.y}
                                        transform={`rotate(${label.rotation}, ${label.x}, ${label.y})`}
                                        textAnchor={label.anchor}
                                        dominantBaseline="middle"
                                        direction="ltr"
                                        fontSize={11}
                                        fontWeight={
                                            isSelected || isHovered ? 700 : 400
                                        }
                                        fill={
                                            isSelected || isHovered
                                                ? cluster.color
                                                : "currentColor"
                                        }
                                    >
                                        {country.country}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>

            {/* Floating country information card */}

            {activeCountryData && (
                <div
                    className="country-tooltip"
                    style={{
                        position: "absolute",
                        left: `${tooltipLeft}px`,
                        top: `${tooltipTop}px`,
                        zIndex: 20,
                        pointerEvents: "none",
                        borderColor: `${activeCluster?.color}55`,
                        backgroundColor: `${activeCluster?.color}18`,
                    }}
                >
                    <div className="country-tooltip-header">
                        <span
                            className="legend-dot"
                            style={{
                                backgroundColor: activeCluster?.color,
                            }}
                        />

                        <strong>
                            {activeCountryData.country}
                        </strong>
                    </div>

                    <div className="country-tooltip-stat">
                        <span>Continent</span>
                        <strong>{activeCountryData.continent}</strong>
                    </div>

                    <div className="country-tooltip-stat">
                        <span>Cluster</span>
                        <strong>{activeCluster?.name}</strong>
                    </div>

                    <div className="country-tooltip-stat">
                        <span>Life expectancy</span>
                        <strong>
                            {activeCountryData.lifeExp.toFixed(1)} years
                        </strong>
                    </div>

                    <div className="country-tooltip-stat">
                        <span>GDP per capita</span>
                        <strong>
                            ${activeCountryData.gdpPercap.toLocaleString(
                                undefined,
                                { maximumFractionDigits: 0 }
                            )}
                        </strong>
                    </div>

                    <div className="country-tooltip-stat">
                        <span>Population</span>
                        <strong>
                            {activeCountryData.pop.toLocaleString()}
                        </strong>
                    </div>
                </div>
            )}

            {/* Cluster legend */}

            <div className="cluster-legend">
                {clusterGroups.map((cluster) => (
                    <div
                        key={cluster.id}
                        className="cluster-card"
                        style={{
                            backgroundColor: `${cluster.color}18`,
                            borderColor: `${cluster.color}55`,
                        }}
                    >
                        <div className="cluster-card-header">
                            <span
                                className="legend-dot"
                                style={{
                                    background: cluster.color,
                                }}
                            />

                            <strong>{cluster.name}</strong>
                        </div>

                        <p className="cluster-count">
                            {cluster.countries.length} countries
                        </p>

                        <div className="cluster-stat">
                            <span>Average life expectancy</span>
                            <strong>
                                {cluster.stats.lifeExp.toFixed(1)} years
                            </strong>
                        </div>

                        <div className="cluster-stat">
                            <span>Average GDP per capita</span>
                            <strong>
                                ${Math.round(
                                    cluster.stats.gdpPercap
                                ).toLocaleString()}
                            </strong>
                        </div>

                        <div className="cluster-stat">
                            <span>Average population</span>
                            <strong>
                                {Math.round(
                                    cluster.stats.pop
                                ).toLocaleString()}
                            </strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
