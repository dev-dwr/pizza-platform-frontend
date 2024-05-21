import { DEFAULT_ORDER, DEFAULT_PIZZA } from "./constants";
import { Delivery, Order, Pizza, Status, User } from "./types";
import {
  OrderDtoToOrder,
  OrderToOrderDto,
  PizzaDtoToPizza,
  PizzaToPizzaDto,
} from "./utils";

export async function login(user: User) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return {
    ...data.user,
    userRole: data.user.appUserRole,
    token: data.token,
  } as User;
}

export async function logout(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  );

  if (response.status === 403) return;

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function register(user: User) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/registration`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function addPizza({
  token,
  pizza,
}: {
  token: string;
  pizza: Pizza;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(PizzaToPizzaDto(pizza)),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
}

export async function removePizza({
  token,
  id,
}: {
  token: string;
  id: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function changeOrderStatus({
  id,
  status,
}: {
  id: number;
  status: Status;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/bucket/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        OrderToOrderDto({ ...DEFAULT_ORDER, currentStatus: status })
      ),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function changeOrderDelivery({
  token,
  delivery,
}: {
  token: string;
  delivery: Delivery;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/update-order`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderToOrderDto({ ...DEFAULT_ORDER, delivery })),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function getPizzaPrice(pizza: Pizza) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/current-price`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([PizzaToPizzaDto(pizza)]),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data as number;
}

export async function increasePizza({
  pizza,
  token,
}: {
  pizza: Pizza;
  token: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/increase-pizza-amount`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PizzaToPizzaDto(pizza)),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
}

export async function decreasePizza({
  pizza,
  token,
}: {
  pizza: Pizza;
  token: string;
}) {
  if (pizza.quantity === 1) {
    return removePizza({ token, id: pizza.id });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/decrease-pizza-amount`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PizzaToPizzaDto(pizza)),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
}

export async function retrieveOrders(token?: string) {
  if (token) return retrieveUserOrders(token);
  return retrieveAllOrders();
}

async function retrieveUserOrders(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/get-order`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  const pizzas = await retrieveUserPizzas(token);

  return [
    { ...OrderDtoToOrder(data), pizzas: pizzas.map((p) => PizzaDtoToPizza(p)) },
  ] as Order[];
}

async function retrieveAllOrders() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/order/all`
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  const pizzas: any[] = await retrieveAllPizzas();

  return data.map(
    (order: any) =>
      ({
        ...OrderDtoToOrder(order),
        pizzas: pizzas
          .filter((p) => p.appUser.email === order.email)
          .map((p) => PizzaDtoToPizza(p)),
      } as Order)
  ) as Order[];
}

async function retrieveUserPizzas(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/own`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data as Pizza[];
}
async function retrieveAllPizzas() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/v1/pizza/all`
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
}
