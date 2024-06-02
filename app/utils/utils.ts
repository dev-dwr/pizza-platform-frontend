import {
  Delivery, Delivery2,
  Dough,
  Ingredient,
  Order,
  Pizza,
  Sauce,
  Size,
  Status,
} from "./types";

export function getDough(value: string): Dough {
  switch (value.toLowerCase()) {
    default:
    case "italian":
      return Dough.ITALIAN;
    case "polish":
      return Dough.POLISH;
    case "american":
      return Dough.AMERICAN;
  }
}
export function getIngredient(value: { id: number, ingredient: string }): Ingredient {
  switch (value.ingredient.toLowerCase()) {
    default:
    case "ham":
      return Ingredient.HAM;
    case "tomato":
      return Ingredient.TOMATO;
    case "mushrooms":
      return Ingredient.MUSHROOMS;
    case "bacon":
      return Ingredient.BACON;
    case "SALAMI":
      return Ingredient.SALAMI;
    case "chilli":
    case "chili":
      return Ingredient.CHILLI;
    case "pineapple":
      return Ingredient.PINEAPPLE;
  }
}

export function getSize(value: string): Size {
  switch (value.toLowerCase()) {
    case "small":
      return Size.SMALL;
    case "medium":
      return Size.MEDIUM;
    case "large":
      return Size.LARGE;
    default:
    case "mega":
    case "mega_large":
      return Size.MEGA_LARGE;
  }
}

export function getSauce(value: string): Sauce {
  switch (value.toLowerCase()) {
    case "tomato":
      return Sauce.TOMATO;
    case "cheese":
      return Sauce.CHEESE;
    default:
    case "tomato with cheese":
    case "tomato_cheese":
      return Sauce.TOMATO_CHEESE;
    case "paprika":
      return Sauce.PAPRIKA;
  }
}

export function getStatus(value: string): Status {
  switch (value.toLowerCase()) {
    case "init":
      return Status.INIT;
    case "start":
      return Status.START;
    default:
    case "finish":
      return Status.FINISH;
  }
}

export function getDelivery(value: string): Delivery {
  switch (value.toLowerCase()) {
    case "on pizza place":
    case "on_pizza_place":
    default:
      return Delivery.ON_PIZZA_PLACE;
    case "on_your_home":
    case "to your home":
      return Delivery.ON_YOUR_HOME;
  }
}

export function getDoughs() {
  return Object.values(Dough).filter((key) => isNaN(Number(key)));
}

export function getIngredients() {
  return Object.values(Ingredient).filter((key) => isNaN(Number(key)));
}

export function getSizes() {
  return Object.values(Size).filter((key) => isNaN(Number(key)));
}

export function getSauces() {
  return Object.values(Sauce).filter((key) => isNaN(Number(key)));
}

export function getStatuses() {
  return Object.values(Status).filter((key) => isNaN(Number(key)));
}

export function getDeliveries() {
  return Object.values(Delivery).filter((key) => isNaN(Number(key)));
}

export function getDeliveries2() {
  return Object.values(Delivery2).filter((key) => isNaN(Number(key)));
}

export function PizzaToPizzaDto(pizza: Pizza) {

  const size = (
    pizza.size === Size.MEGA_LARGE ? "MEGA_LARGE" : pizza.size
  ).toUpperCase();

  const sauce = (
    pizza.sauce === Sauce.TOMATO_CHEESE ? "TOMATO_CHEESE" : pizza.sauce
  ).toUpperCase();

  const isArrOfStrings = Array.isArray(pizza.ingredientsList) && pizza.ingredientsList.every(item => typeof item === 'string');
  if(!isArrOfStrings){
    return {
      id: pizza.id || 0,
      name: pizza.name,
      dough: pizza.dough.toUpperCase(),
      size,
      sauce,
      ingredientsList: pizza.ingredientsList.map((ingredientItem) => ({
            id: null,
          //@ts-ignore
            ingredient: ingredientItem.ingredient.toUpperCase()
          }))
          .sort((a, b) => a.ingredient.localeCompare(b.ingredient)),
    };
  }else{
    return {
      id: pizza.id || 0,
      name: pizza.name,
      dough: pizza.dough.toUpperCase(),
      size,
      sauce,
      ingredientsList: pizza.ingredientsList
          .map((ingredientItem) => ({
            id: null,
            ingredient: ingredientItem.toUpperCase()
          }))
          .sort((a, b) => a.ingredient.localeCompare(b.ingredient)),
    };
  }


}

export function PizzaDtoToPizza(pizza: any): Pizza {
  return {
    id: pizza.id || 0,
    name: pizza.name,
    dough: getDough(pizza.dough),
    size: getSize(pizza.size),
    sauce: getSauce(pizza.sauce),
    //@ts-ignore
    ingredientsList: (pizza.ingredientsList as any[])
        .map((ingredient) => ({id: ingredient.id, ingredient: ingredient.ingredient})),
    price: pizza.price || 0,
    quantity: pizza.quantity || 0,
  };
}


export function OrderToOrderDto(order: Order) {
  return {
    currentStatus: order.currentStatus,
    delivery: getEnumKey(Delivery, order.delivery),
    price: order.price,
    email: order.email,
  };
}

export function OrderDtoToOrder(order: any): Order {
  return {
    id: order.id,
    currentStatus: getStatus(order.currentStatus),
    delivery: getDelivery(order.delivery),
    price: order.price,
    email: order.email,
    pizzas: order.pizzas,
  };
}

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.substring(1);
}

export function getEnumKey(e: any, value: string) {
  return Object.entries(e).find(
    ([k, v]) => typeof k === "string" && v === value
  )?.[0];
}
