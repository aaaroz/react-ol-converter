import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type CoordinateContextProviderProps = {
  children: ReactNode;
};

type CoordinateContext = {
  coordinates: number[];
  setCoordinates: Dispatch<SetStateAction<number[]>>;
};

export const CoordinateContext = createContext<CoordinateContext | null>(null);

export default function CoordinateContextProvider({
  children,
}: CoordinateContextProviderProps) {
  const [coordinates, setCoordinates] = useState([0, 0]);

  return (
    <CoordinateContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </CoordinateContext.Provider>
  );
}
