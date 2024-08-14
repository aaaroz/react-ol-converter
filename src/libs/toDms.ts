export const toDMS = (decimal: number, direction: string) => {
  const degrees = Math.trunc(decimal);
  const minutes = Math.trunc((decimal - degrees) * 60);
  const seconds = Math.round((decimal - degrees - minutes / 60) * 3600);
  return { degrees, minutes, seconds, direction };
};
