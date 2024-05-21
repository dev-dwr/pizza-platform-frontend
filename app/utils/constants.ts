import {
  Delivery,
  Dough,
  Order,
  Pizza,
  Role,
  Sauce,
  Size,
  Status,
  User,
} from "./types";

export const PLUM = "#552647";
export const GREEN = "#254137";
export const LIGHT_GREY = "#e7dfdf";
export const DARK_GREY = "#d6c7c8";
export const BLACK = "#201c21";
export const WHITE = "#f2efed";
export const DEFAULT_PIZZA: Pizza = {
  id: 0,
  name: "",
  dough: Dough.ITALIAN,
  size: Size.MEGA_LARGE,
  sauce: Sauce.TOMATO_CHEESE,
  ingredientsList: [],
};
export const DEFAULT_USER: User = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  userRole: Role.USER,
  token: "",
};
export const DEFAULT_ORDER: Order = {
  currentStatus: Status.START,
  delivery: Delivery.ON_PIZZA_PLACE,
  price: 0,
  email: "",
  pizzas: [],
};
