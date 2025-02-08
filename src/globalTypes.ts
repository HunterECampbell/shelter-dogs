export interface Position {
  x: number;
  y: number;
}

export type Size =
  | number
  | `${number}px`
  | `${number}$`
  | `${number}vw`
  | `${number}vh`;

export interface WindowSize {
  height: number;
  width: number;
}
