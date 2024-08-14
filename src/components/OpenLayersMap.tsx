import { useEffect, useRef, useState } from "react";
import { Feature, Map, View } from "ol";

import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import { OSM, Vector } from "ol/source";
import { Coordinate } from "ol/coordinate";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import useCoordinateContext from "../libs/useCoordinateContext";
import { DEFAULT_COORDINATES } from "../libs/DefaultCoordinate";

const OpenLayersMap = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);

  const [, setOlMap] = useState<Map>();

  const [clickedCoordinate, setClickedCoordinate] = useState<Coordinate>();
  const { coordinates, setCoordinates } = useCoordinateContext();

  useEffect(() => {
    const map = new Map({
      target: mapDivRef.current as HTMLDivElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(coordinates ? coordinates : DEFAULT_COORDINATES),
        zoom: 4,
      }),
    });

    const marker = new VectorLayer({
      source: new Vector({
        features: [
          new Feature({
            geometry: new Point(
              fromLonLat(coordinates ? coordinates : DEFAULT_COORDINATES)
            ),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: "https://docs.maptiler.com/openlayers/examples/default-marker/marker-icon.png",
          anchor: [0.5, 1],
        }),
      }),
    });

    map.addLayer(marker);

    map.on("click", (e) => {
      setClickedCoordinate(e.coordinate);
      const lonlat = toLonLat(e.coordinate);
      setCoordinates(lonlat);
    });

    setOlMap(map);

    return () => map.setTarget(undefined);
  }, [coordinates, setCoordinates]);

  return (
    <>
      <div
        ref={mapDivRef}
        className="absolute top-0 left-0 bottom-[25px] w-full cursor-pointer"
      />
      {clickedCoordinate && (
        <span className="absolute bottom-0">
          You clicked at: {clickedCoordinate[0]} / {clickedCoordinate[1]}
        </span>
      )}
    </>
  );
};

export default OpenLayersMap;
