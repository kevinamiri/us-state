import React from "react";
import { geoCentroid } from "d3-geo";
import { Geographies, Geography, Marker } from "react-simple-maps";
import allStates from "./data/allstates.json";
import {
  updateAnswer,
  updateIsOpenStatus,
  updateVaultValue,
} from "../slices/fieldsValue";
import { useDispatch, useSelector } from "react-redux";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const USMap = () => {
  const dispatch = useDispatch();

  const handleOpen = (e: any) => {
    e.persist();
  };

  /* nearByState : This will calculates the differences distance between two different points
 and returns distance base on km
1. It takes the latitude and longitude of the two points.
2. It converts the latitude and longitude to radians.
3. It calculates the distance between the two points using the haversine formula.
4. It returns the distance in km.
*/
  const nearByState = (geographies, geo, area) => {
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };
      let R = 6371; // Radius of the earth in km
      let dLat = deg2rad(lat2 - lat1); // deg2rad below
      let dLon = deg2rad(lon2 - lon1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c; // Distance in km
      return d;
    };

    /* nearPoint will shows the closes states to the point that has been selected.
1- It takes the geographies and the geo object.
2- It calculates the centroid of the geo object.
3- It loops through the geographies and calculates the centroid of each geography.
4- It calculates the distance between the centroid of the geo object and the centroid of each geography.
5- It returns the name of the state if the distance is less than the area.
6- It filters out the undefined values.
*/

    const centroid = geoCentroid(geo);
    const nearPoint = geographies
      // eslint-disable-next-line array-callback-return
      .map((s) => {
        const point = geoCentroid(s);
        if (getDistance(point[0], point[1], centroid[0], centroid[1]) < area) {
          return s.properties.name;
        }
      })
      .filter((x) => x !== undefined);
    return nearPoint;
  };

  const { selected } = useSelector((state: any) => state.fieldsValue);
  const { isOpen } = useSelector((state: any) => state.fieldsValue);
  console.log(`%c USMap`, "background: #FFCDA3; color: #222");
  return (
    <>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              // const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              const clicked: React.MouseEventHandler<SVGPathElement> = (e) => {
                const nearPoints = nearByState(geographies, geo, 300);
                dispatch(updateVaultValue(nearPoints));
                dispatch(updateAnswer(cur));
                handleOpen(e);
                dispatch(updateIsOpenStatus(true));
              };
              return (
                <Geography
                  key={geo.rsmKey}
                  onClick={clicked}
                  style={{
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                  stroke='#F0BB62'
                  geography={geo}
                  fill={selected.includes(cur.name) ? "#519259" : "#F4EEA9"}
                />
              );
            })}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  <>
                    {selected.includes(cur.name) && (
                      <Marker coordinates={centroid}>
                        <text
                          textAnchor='middle'
                          y={2}
                          style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                        >
                          {cur.id}
                        </text>
                      </Marker>
                    )}
                  </>
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </>
  );
};

export default USMap;
