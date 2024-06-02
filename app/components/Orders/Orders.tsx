import { Order as IOrder } from "@/app/utils/types";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Order from "../Orders/Order";
import {useEffect} from "react";

interface Props {
    orders?: IOrder[];
    refetch: () => void;
}

export default function Orders({ orders, refetch }: Props) {
    if (!orders)
        return (
            <Box width="100%">
                <LinearProgress />
            </Box>
        );

    const filteredOrders = orders.filter((o) => o.pizzas.length > 0)
    if (!filteredOrders.length) return <Typography>No orders yet.</Typography>;


    const orderPrice = filteredOrders[0].pizzas.reduce((total, pizza) => {
        //@ts-ignore
        return total + pizza.price;
    }, 0);

    const ids = new Set()
    const uniquesList = filteredOrders.filter(({ id }) => !ids.has(id) && ids.add(id));


    return (
        <Stack gap={1}>
            {uniquesList.map((order) => (
                <Order key={order.id} order={order} refetch={refetch} orderPrice = {orderPrice} />
            ))}
        </Stack>
    );
}
