export enum Role {
  USER = "USER",
  EMPLOYEE = "EMPLOYEE",
}

export type User = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  userRole: Role;
  token: string;
};

export enum Dough {
  ITALIAN = "italian",
  POLISH = "polish",
  AMERICAN = "american",
}

export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  MEGA_LARGE = "mega",
}

export enum Sauce {
  TOMATO = "tomato",
  CHEESE = "cheese",
  TOMATO_CHEESE = "tomato and cheese",
  PAPRIKA = "paprika",
}

export enum Ingredient {
  HAM = "ham",
  BACON = "bacon",
  SALAMI = "salami",
  MUSHROOMS = "mushrooms",
  TOMATO = "tomato",
  PINEAPPLE = "pineapple",
  CHILLI = "chilli",
}

export enum Status {
  INIT = "INIT",
  START = "START",
  FINISH = "FINISH",
}

export enum Delivery {
  ON_PIZZA_PLACE = "On Pizza Place",
  ON_YOUR_HOME = "To Your Home",
}

export enum Delivery2 {
  ON_PIZZA_PLACE = "ON_PIZZA_PLACE",
  ON_YOUR_HOME = "ON_YOUR_HOME",
}

export type IngredientItem = {
  id: number;
  ingredient: Ingredient;
};

export type Pizza = {
  id: number;
  name: string;
  dough: Dough;
  size: Size;
  sauce: Sauce;
  ingredientsList: Ingredient[];
  price?: number;
  quantity?: number;
};

export type Order = {
  id?: number;
  currentStatus: Status;
  delivery: Delivery;
  price: number;
  email: string;
  pizzas: Pizza[];
};
