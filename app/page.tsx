"use client";
import { Stack, Typography } from "@mui/material";
import PizzaForm from "./components/PizzaForm";
import { DEFAULT_PIZZA } from "./utils/constants";
import useHttp from "./hooks/use-http";
import { addPizza } from "./utils/api";
import React, { useContext, useEffect } from "react";
import { UIContext } from "./store/ui";
import { enqueueSnackbar } from "notistack";
import { Dough, Ingredient, Pizza, Role, Sauce, Size } from "./utils/types";
import Link from "next/link";
// import DefaultPizza from "./components/DefaultPizza";
// @ts-ignore
import salami from "./assets/salami.jpg";
// @ts-ignore
import hawaii from "./assets/hawaii.jpg";
// @ts-ignore
import funghi from "./assets/funghi.jpg";
import DefaultPizza from "./components/DefaultPizza";

const DEFAULT_PIZZAS = [
  {
    photo: salami,
    pizza: {
      name: "Pizza Salami",
      dough: Dough.ITALIAN,
      size: Size.MEGA_LARGE,
      sauce: Sauce.TOMATO_CHEESE,
      price: 40,
      ingredientsList: [Ingredient.SALAMI],
    },
  },
  {
    photo: hawaii,
    pizza: {
      name: "Pizza Hawaii",
      dough: Dough.ITALIAN,
      size: Size.MEGA_LARGE,
      sauce: Sauce.TOMATO,
      price: 40,
      ingredientsList: [Ingredient.HAM, Ingredient.PINEAPPLE],
    },
  },
  {
    photo: funghi,
    pizza: {
      name: "Pizza Funghi",
      dough: Dough.ITALIAN,
      size: Size.MEGA_LARGE,
      sauce: Sauce.TOMATO,
      price: 40,
      ingredientsList: [Ingredient.HAM, Ingredient.MUSHROOMS],
    },
  },
];

export default function Home() {
  const { user } = useContext(UIContext);
  const { sendRequest, status, error } = useHttp(addPizza);

  useEffect(() => {
    if (status === "error") enqueueSnackbar(error, { variant: "error" });
    else if (status === "success")
      enqueueSnackbar("Pizza added to cart", {
        variant: "success",
      });
  }, [status]);

  const handleAdd = (pizza: Pizza) => {
    sendRequest({ token: user?.token, pizza });
  };

  return (
    <Stack>
      {!user && (
        <Typography>
          Welcome to Pizza. Log in to order OUR best pizzas!
        </Typography>
      )}
      {user?.userRole === Role.EMPLOYEE && (
        <Typography>
          <Link href="/orders">Click here to manage Orders</Link>
        </Typography>
      )}
      {user?.userRole === Role.USER && (
        <Stack gap={4}>
          {DEFAULT_PIZZAS.map(({ photo, pizza }) => (
            <DefaultPizza
              key={pizza.name}
              //@ts-ignore
              pizza={pizza}
              photo={photo}
                //@ts-ignore
              onAdd={() => handleAdd(pizza)}
            />
          ))}

          <PizzaForm pizza={DEFAULT_PIZZA} onAdd={handleAdd} />
        </Stack>
      )}
    </Stack>
  );
}
