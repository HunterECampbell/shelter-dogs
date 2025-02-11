import { Dog, Email } from "../../globalTypes";

export interface GetDogMatchResult {
  match: Dog["id"];
}

export interface LoginBody {
  name: string;
  email: Email;
}

export interface SearchDogsQueryParams {
  breeds?: Dog["breed"][];
  zipCodes?: Dog["zip_code"][];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: `${SearchDogsSortField}:${SearchDogsSortDirection}`;
}
export enum SearchDogsSortField {
  Breed = "breed",
  Name = "name",
  Age = "age",
}
export enum SearchDogsSortDirection {
  Ascending = "asc",
  Descending = "desc",
}

export interface SearchDogsResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}
