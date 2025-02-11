import { v4 as uuidV4 } from "uuid";
import { DogStoreState } from "../../dogs";

export const mockBreeds = ["Test breed", "Test breed 2", "Test breed 3"];

export const mockDogPagination: DogStoreState["dogPagination"] = {
  resultIds: [uuidV4(), uuidV4(), uuidV4()],
  total: 3,
};

export const mockDogs: DogStoreState["dogs"] = [
  {
    id: uuidV4(),
    img: "test image",
    name: "Test Dog",
    age: 10,
    zip_code: "00000",
    breed: "Test breed",
  },
  {
    id: uuidV4(),
    img: "test image",
    name: "Test Dog 2",
    age: 10,
    zip_code: "00000",
    breed: "Test breed 2",
  },
];

export const mockLocations: DogStoreState["dogLocations"] = [
  {
    zip_code: "00000",
    latitude: 0,
    longitude: 0,
    city: "Test City",
    state: "Test State",
    county: "Test County",
  },
  {
    zip_code: "00000",
    latitude: 0,
    longitude: 0,
    city: "Test City 2",
    state: "Test State 2",
    county: "Test County 2",
  },
];
