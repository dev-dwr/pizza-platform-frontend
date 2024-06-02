import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
// @ts-ignore
import { Delivery, Order, Role, Status } from "../../utils/types";
import Select from "../../UI/Select";
import { useContext, useEffect, useState } from "react";
import {
    getDeliveries, getDeliveries2,
    getDelivery,
    getStatus,
    getStatuses,
} from "../../utils/utils";
import useHttp from "../../hooks/use-http";
import { changeOrderDelivery, changeOrderStatus } from "../../utils/api";
import { UIContext } from "../../store/ui";
import { enqueueSnackbar } from "notistack";
import Pizza from "./Pizza";

function getStatusDesc(status: Status, name: string) {
    switch (status) {
        case Status.INIT:
            return `We received Your order and are preparing it, for ${name}`;
        case Status.START:
            return `We started preparing the order, for ${name}`;
        case Status.FINISH:
            return `The order has been finished. for ${name}`;
    }
}

interface Props {
    orderPrice: number
    order: Order;
    refetch: () => void;
}

export default function Order({ order, refetch, orderPrice }: Props) {
    const { user } = useContext(UIContext);
    const {
        sendRequest: sendChangeStatus,
        status: changeStatus,
        error: changeError,
    } = useHttp(changeOrderStatus);

    const {
        sendRequest: sendChangeDelivery,
        status: deliveryStatus,
        error: deliveryError,
    } = useHttp(changeOrderDelivery);

    useEffect(() => {
        if (changeStatus === "error")
            enqueueSnackbar(changeError, { variant: "error" });
        else if (changeStatus === "success") refetch();
    }, [changeStatus]);

    useEffect(() => {
        if (deliveryStatus === "error")
            enqueueSnackbar(deliveryError, { variant: "error" });
        else if (deliveryStatus === "success") refetch();
    }, [deliveryStatus]);

    const handleStatusChange = (value: string) => {
        sendChangeStatus({ id: order?.id, status: getStatus(value) });
    };
    const handleDeliveryChange = (value: string) =>
        sendChangeDelivery({ token: user?.token, delivery: getDelivery(value) });

    if (!order.pizzas.length) return null;

    let newPrice = null
    if(order.delivery === "To Your Home"){
        //@ts-ignore
        newPrice = orderPrice + 15
    }else{
        //@ts-ignore
        newPrice = orderPrice
    }

    const calculatedOrderPrice = order.pizzas.reduce((total, pizza) => {
        //@ts-ignore
        return total + pizza.price;
    }, 0);


    let newPriceAdmin = null
    if(order.delivery === "To Your Home"){
        //@ts-ignore
        newPriceAdmin = calculatedOrderPrice + 15
    }else{
        //@ts-ignore
        newPriceAdmin = calculatedOrderPrice
    }

    console.log(order)

    return (
        <Card>
            <CardContent component={Stack} gap={1}>
                {order.currentStatus && (
                    <Card sx={{ bgcolor: "rgba(0, 255, 0, 0.1)" }}>
                        <CardContent>
                            <Typography>
                                <b>Status of Your Order:</b>
                            </Typography>
                            <Typography>{getStatusDesc(order.currentStatus, order.email)}</Typography>
                        </CardContent>
                    </Card>
                )}
                {order.pizzas.map((p) => (
                    //@ts-ignore
                    <Pizza role={user!!.userRole} pizza={p} refetch={refetch} />
                ))}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>
                        Price: {user?.userRole === Role.USER ? <b>{newPrice}zł</b> : <b>{newPriceAdmin}zł</b> }
                    </Typography>
                    {user?.userRole === Role.USER && (
                        <Stack direction="row" gap={1} alignItems="center">
                            <Select
                                sx={{ minWidth: 160, mt: 1 }}
                                label="Delivery"
                                value={order.delivery}
                                onValueChange={handleDeliveryChange}
                                items={getDeliveries()}
                            />
                        </Stack>
                    )}
                    {user?.userRole === Role.EMPLOYEE && (
                        <Stack direction="row" gap={1} alignItems="center">
                            <Select
                                sx={{ minWidth: 120, mt: 1 }}
                                label="Status"
                                value={order.currentStatus}
                                onValueChange={handleStatusChange}
                                items={getStatuses()}
                            />
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
