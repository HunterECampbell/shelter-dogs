export const chooseRandomFloatBetween = ({
  min,
  max,
}: {
  min: number;
  max: number;
}): number => Math.random() * (max - min + 1) + min;

export const chooseRandomIntegerBetween = ({
  min,
  max,
}: {
  min: number;
  max: number;
}): number => Math.floor(Math.random() * (max - min + 1) + min);
