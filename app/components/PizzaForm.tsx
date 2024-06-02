"use client";
import {
  Typography,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Ingredient, Pizza } from "../utils/types";
import { useEffect, useState } from "react";
import {
  getDough,
  getDoughs,
  getIngredients,
  getSauce,
  getSauces,
  getSize,
  getSizes,
} from "../utils/utils";
import Select from "../UI/Select";
import useHttp from "../hooks/use-http";
import { getPizzaPrice } from "../utils/api";
import { enqueueSnackbar } from "notistack";

interface Props {
  pizza: Pizza;
  onAdd: (Pizza: Pizza) => void;
}

export default function PizzaForm({ pizza: startPizza, onAdd }: Props) {
  const [pizza, setPizza] = useState<Pizza>(startPizza);
  const { sendRequest, status, error, data } = useHttp(getPizzaPrice);

  useEffect(() => {
    if (status === "error") enqueueSnackbar(error, { variant: "error" });
  }, [status]);

  useEffect(() => {
    sendRequest(pizza);
  }, [pizza]);

  const isIngredient = (ingredient: Ingredient) => {
    return (
      pizza.ingredientsList.findIndex((curr) => curr === ingredient) !== -1
    );
  };

  const toggleIngredient = (ingredient: Ingredient) => {
    if (isIngredient(ingredient)) {
      setPizza((prev) => ({
        ...prev,
        ingredientsList: prev.ingredientsList.filter(
          (curr) => curr !== ingredient
        ),
      }));
    } else {
      setPizza((prev) => ({
        ...prev,
        ingredientsList: [...prev.ingredientsList, ingredient],
      }));
    }
  };

  return (
    <Stack mx={2} mt={4} minWidth={120} gap={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Create completely <u>YOURS</u> Pizza
      </Typography>
      <Stack
        gap={1}
        direction="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        <Select
          sx={{ minWidth: 120, mt: 1 }}
          label="Size"
          value={pizza.size}
          onValueChange={(value) =>
            setPizza((prev) => ({ ...prev, size: getSize(value) }))
          }
          items={getSizes()}
        />
        <Select
          sx={{ minWidth: 120, mt: 1 }}
          label="Dough"
          value={pizza.dough}
          onValueChange={(dough) =>
            setPizza((prev) => ({ ...prev, dough: getDough(dough) }))
          }
          items={getDoughs()}
        />
        <Select
          sx={{ minWidth: 200, mt: 1 }}
          label="Sauce"
          value={pizza.sauce}
          onValueChange={(value) =>
            setPizza((prev) => ({ ...prev, sauce: getSauce(value) }))
          }
          items={getSauces()}
        />
      </Stack>
      <Stack maxWidth={500} direction="row" flexWrap="wrap" gap={1}>
        {getIngredients().map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            label={ingredient}
            control={
              <Checkbox
                checked={isIngredient(ingredient)}
                onChange={() => toggleIngredient(ingredient)}
              />
            }
          />
        ))}
      </Stack>
      <Typography><b>Price: {data}zł</b></Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => onAdd(pizza)}
      >
        Add to Cart
      </Button>
    </Stack>
  );
}
