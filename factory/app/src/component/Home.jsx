import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// Load local India TopoJSON map
const INDIA_TOPO_JSON = "/india.topo.json";

// Dummy AQI Data (Replace with live data if needed)
const aqiData = {
  "Gujarat": 95,
  "Maharashtra": 120,
  "Delhi": 180,
  "Uttar Pradesh": 160,
  "Tamil Nadu": 85,
  "Karnataka": 90,
  "West Bengal": 140,
};

const getAQIColor = (aqi) => {
  if (aqi <= 50) return "#4CAF50";     // Good
  if (aqi <= 100) return "#FFEB3B";    // Moderate
  if (aqi <= 150) return "#FF9800";    // Unhealthy for sensitive groups
  if (aqi <= 200) return "#F44336";    // Unhealthy
  return "#9C27B0";                    // Very Unhealthy
};

const IndiaAQIMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-4">India AQI Overview</h2>
      <div className="bg-white rounded-lg shadow p-4">
        <ComposableMap projection="geoMercator" width={800} height={600}>
          <ZoomableGroup zoom={1}>
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.st_nm;
                  const aqi = aqiData[stateName] || 60;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${stateName}: AQI ${aqi}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: getAQIColor(aqi),
                          outline: "none",
                        },
                        hover: {
                          fill: "#607D8B",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {tooltipContent && (
          <div className="mt-4 text-center text-gray-700 font-medium">
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndiaAQIMap;
