export interface Alert {
  message: string;
  type: AlertType;
}

export enum AlertType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export type Email = `${string}@${string}.${string}`;

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

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
