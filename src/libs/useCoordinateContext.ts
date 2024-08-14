import { useContext } from "react";
import { CoordinateContext } from "./CoordinateContext";

/**
 * Retrieves the context from the CoordinateContext.
 *
 * This hook must be used within a CoordinateContextProvider.
 *
 * @return {CoordinateContext} The context from the CoordinateContext.
 */
export default function useCoordinateContext() {
  const context = useContext(CoordinateContext);
  if (!context) {
    throw new Error(
      "useCoordinateContext must be used within a CoordinateContextProvider"
    );
  }
  return context;
}
