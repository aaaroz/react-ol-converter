import React, { useEffect } from "react";
import useCoordinateContext from "../libs/useCoordinateContext";
import { toDMS } from "../libs/toDms";

interface Coordinates {
  latitude: number;
  longitude: number;
  direction: "N" | "S" | "E" | "W";
}
interface DmsCoordinates {
  latitude: string;
  longitude: string;
}

export const FormDDtoDMS: React.FC = () => {
  const [coordinate, setCoordinate] = React.useState<Coordinates>({
    latitude: 0,
    longitude: 0,
    direction: "N",
  });

  const [dmsCoordinates, setDmsCoordinates] =
    React.useState<DmsCoordinates | null>(null);

  const { coordinates, setCoordinates } = useCoordinateContext();

  useEffect(() => {
    const latDMS = toDMS(coordinates[1], coordinates[1] > 0 ? "N" : "S");
    const longDMS = toDMS(coordinates[0], coordinates[0] > 0 ? "E" : "W");
    setCoordinate({
      latitude: parseFloat(coordinates[1].toFixed(6)),
      longitude: parseFloat(coordinates[0].toFixed(6)),
      direction: coordinates[1] > 0 ? "N" : "S",
    });
    setDmsCoordinates({
      latitude: `${latDMS.degrees}° ${latDMS.minutes}' ${latDMS.seconds}" ${latDMS.direction}`,
      longitude: `${longDMS.degrees}° ${longDMS.minutes}' ${longDMS.seconds}" ${longDMS.direction}`,
    });
  }, [coordinates]);

  const handleConvert: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { latitude, longitude } = coordinate;

    const latDMS = toDMS(latitude, latitude > 0 ? "N" : "S");
    const longDMS = toDMS(longitude, longitude > 0 ? "E" : "W");

    setDmsCoordinates({
      latitude: `${latDMS.degrees}° ${latDMS.minutes}' ${latDMS.seconds}" ${latDMS.direction}`,
      longitude: `${longDMS.degrees}° ${longDMS.minutes}' ${longDMS.seconds}" ${longDMS.direction}`,
    });
  };

  const handleAddToMap: React.MouseEventHandler<HTMLButtonElement> = () => {
    const { latitude, longitude } = coordinate;
    setCoordinates([
      parseFloat(longitude.toFixed(6)),
      parseFloat(latitude.toFixed(6)),
    ]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        Decimal Degrees to Degrees Minutes Seconds Converter
      </h1>
      <form onSubmit={handleConvert}>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <div className="mr-5">
              <h2 className="text-xl font-semibold mt-3">Latitude</h2>
              <input
                type="number"
                id="latitude"
                name="latitude"
                min="-1800"
                max="1800"
                step="0.0000001"
                required
                value={coordinate.latitude}
                onChange={(e) =>
                  setCoordinate({
                    ...coordinate,
                    latitude: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-52"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mr-5">
              <h2 className="text-xl font-semibold mt-3">Longitude</h2>
              <input
                type="number"
                id="longitude"
                name="longitude"
                min="-1800"
                max="1800"
                step="0.0000001"
                required
                value={coordinate.longitude}
                onChange={(e) =>
                  setCoordinate({
                    ...coordinate,
                    longitude: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-52"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded text-sm"
        >
          Convert
        </button>
      </form>
      <div className="flex flex-col gap-2 mt-3 pt-3 border-t-2">
        <span>
          Degrees Minutes Seconds Latitude:{" "}
          {dmsCoordinates && (
            <span className="px-2 py-1 bg-slate-600 rounded-full text-white">
              {dmsCoordinates?.latitude}
            </span>
          )}
        </span>
        <span>
          Degrees Minutes Seconds Longitude:
          {dmsCoordinates && (
            <span className="px-2 py-1 bg-slate-600 rounded-full text-white">
              {dmsCoordinates?.longitude}
            </span>
          )}
        </span>
      </div>
      <button
        onClick={handleAddToMap}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded text-sm"
      >
        Add To Map
      </button>
    </div>
  );
};
