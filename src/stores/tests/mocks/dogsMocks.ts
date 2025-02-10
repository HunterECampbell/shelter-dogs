import { v4 as uuidV4 } from "uuid";
import { DogStoreState } from "../../dogs";

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
