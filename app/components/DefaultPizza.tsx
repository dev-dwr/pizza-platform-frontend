import {Box, Button, Stack, Typography} from "@mui/material";
import Image, {StaticImageData} from "next/image";
import {Pizza} from "../utils/types"

interface Props {
    pizza: Pizza;
    photo: StaticImageData;
    onAdd: () => void;
}

export default function DefaultPizza({pizza, photo, onAdd}: Props) {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" gap={4} alignItems="center">
                <Stack>
                    <Stack>
                        <Typography>
                            <b>{pizza.name}</b>
                        </Typography>
                        <Typography>Ingredients</Typography>
                        {pizza.ingredientsList.map((ingredient) => (
                            <Typography key={ingredient} variant="body2" ml={1}>
                                • {ingredient}
                            </Typography>
                        ))}
                    </Stack>
                </Stack>
                <Box
                    overflow="hidden"
                    borderRadius={2}
                    position="relative"
                    height={100}
                    width={100}
                >
                    <Image src={photo} fill={true} alt={pizza.name}/>
                </Box>
                <Typography>
                    <b>Price: {pizza.price}zł</b>
                </Typography>
            </Stack>

            <Button onClick={onAdd} variant="contained">
                Add to cart
            </Button>
        </Stack>
    );
}
