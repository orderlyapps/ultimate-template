export const getBboxFromBoundary = (
  boundary: [number, number][] | null | undefined
): [number, number, number, number] | undefined => {
  if (!boundary || !Array.isArray(boundary) || boundary.length === 0) {
    return undefined;
  }

  const lngs = boundary.map((coord: [number, number]) => coord[0]);
  const lats = boundary.map((coord: [number, number]) => coord[1]);

  return [
    Math.min(...lngs),
    Math.min(...lats),
    Math.max(...lngs),
    Math.max(...lats),
  ];
};
