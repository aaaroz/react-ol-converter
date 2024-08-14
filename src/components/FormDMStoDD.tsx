import React, { useEffect } from "react";
import useCoordinateContext from "../libs/useCoordinateContext";
import { toDMS } from "../libs/toDms";

interface DmsFormValues {
  latitudeDegrees: number;
  latitudeMinutes: number;
  latitudeSeconds: number;
  longitudeDegrees: number;
  longitudeMinutes: number;
  longitudeSeconds: number;
}

export const FormDMStoDD: React.FC = () => {
  const [formValues, setFormValues] = React.useState<DmsFormValues>({
    latitudeDegrees: 0,
    latitudeMinutes: 0,
    latitudeSeconds: 0,
    longitudeDegrees: 0,
    longitudeMinutes: 0,
    longitudeSeconds: 0,
  });

  const [decimalLat, setDecimalLat] = React.useState<number>(0);
  const [decimalLong, setDecimalLong] = React.useState<number>(0);
  const { coordinates, setCoordinates } = useCoordinateContext();

  useEffect(() => {
    const latDMS = toDMS(coordinates[1], coordinates[1] > 0 ? "N" : "S");
    const longDMS = toDMS(coordinates[0], coordinates[0] > 0 ? "E" : "W");

    setFormValues({
      latitudeDegrees: latDMS.degrees,
      latitudeMinutes: latDMS.minutes,
      latitudeSeconds: latDMS.seconds,
      longitudeDegrees: longDMS.degrees,
      longitudeMinutes: longDMS.minutes,
      longitudeSeconds: longDMS.seconds,
    });

    setDecimalLat(coordinates[1]);
    setDecimalLong(coordinates[0]);
  }, [coordinates]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const {
      latitudeDegrees,
      latitudeMinutes,
      latitudeSeconds,
      longitudeDegrees,
      longitudeMinutes,
      longitudeSeconds,
    } = formValues;

    const calculatedDecimalLat =
      latitudeDegrees + latitudeMinutes / 60 + latitudeSeconds / 3600;
    const calculatedDecimalLong =
      longitudeDegrees + longitudeMinutes / 60 + longitudeSeconds / 3600;

    setDecimalLat(calculatedDecimalLat);
    setDecimalLong(calculatedDecimalLong);
  };

  const handleAddToMap: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCoordinates([
      parseFloat(decimalLong.toFixed(6)),
      parseFloat(decimalLat.toFixed(6)),
    ]);
  };

  return (
    <div className="p-4 pb-0">
      <h1 className="text-2xl font-bold">
        Degrees Minutes Seconds to Decimal Degrees Converter
      </h1>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mt-3">Latitude</h2>
        <div className="flex">
          <div className="flex flex-col gap-2">
            <label htmlFor="latitudeDegrees">Degrees:</label>
            <div className="space-x-2 mr-5">
              <input
                type="number"
                id="latitudeDegrees"
                name="latitudeDegrees"
                min="-18000"
                max="18000"
                step="0.0000001"
                required
                value={formValues.latitudeDegrees}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    latitudeDegrees: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-28"
              />
              <span className="text-lg font-bold">°</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="latitudeMinutes">Minutes:</label>
            <div className="space-x-2 mr-5">
              <input
                type="number"
                id="latitudeMinutes"
                name="latitudeMinutes"
                min="-6000"
                max="6000"
                required
                value={formValues.latitudeMinutes}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    latitudeMinutes: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-28"
              />
              <span className="text-lg font-bold">'</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="latitudeSeconds">Seconds:</label>
            <div className="space-x-2 mr-5">
              <input
                type="number"
                id="latitudeSeconds"
                name="latitudeSeconds"
                min="-7200"
                max="7200"
                step="0.000001"
                required
                value={formValues.latitudeSeconds}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    latitudeSeconds: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-28"
              />
              <span className="text-lg font-bold">"</span>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-3">Longitude</h2>
        <div className="flex">
          <div className="flex flex-col gap-2">
            <label htmlFor="longitudeDegrees">Degrees:</label>
            <div className="space-x-2 mr-5">
              <input
                type="number"
                id="longitudeDegrees"
                name="longitudeDegrees"
                value={formValues.longitudeDegrees}
                required
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    longitudeDegrees: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-28"
              />
              <span className="text-lg font-bold">°</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="longitudeMinutes">Minutes:</label>
            <div className="space-x-2 mr-5">
              <input
                type="number"
                id="longitudeMinutes"
                name="longitudeMinutes"
                value={formValues.longitudeMinutes}
                required
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    longitudeMinutes: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-28"
              />
              <span className="text-lg font-bold">'</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="longitudeSeconds">Seconds:</label>
            <div className="space-x-2 mr-5">
              <input
                type="number"
                id="longitudeSeconds"
                name="longitudeSeconds"
                value={formValues.longitudeSeconds}
                required
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    longitudeSeconds: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-300 rounded px-2 py-1 w-28"
              />
              <span className="text-lg font-bold">"</span>
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
          Decimal Degrees Latitude:{" "}
          <span className="px-2 py-1 bg-slate-600 rounded-full text-white">
            {decimalLat.toFixed(6)}
          </span>
        </span>
        <span>
          Decimal Degrees Longitude:{" "}
          <span className="px-2 py-1 bg-slate-600 rounded-full text-white">
            {decimalLong.toFixed(6)}
          </span>
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
