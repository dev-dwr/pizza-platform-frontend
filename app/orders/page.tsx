"use client";
import { Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import { UIContext } from "../store/ui";
import useHttp from "../hooks/use-http";
import { retrieveOrders } from "../utils/api";
import { redirect } from "next/navigation";
import OrderList from "../components/Orders/Orders";
import {Order, Role} from "../utils/types";

export default function Orders() {
    const { user } = useContext(UIContext);
    const { sendRequest, status, error, data: orders } = useHttp(retrieveOrders);
    const [orders1, setOrders] = useState();

    useEffect(() => {
        getOrders();
    }, [user]);

    useEffect(() => {
        if (status === "error") enqueueSnackbar(error, { variant: "error" });
    }, [status]);

    const getOrders = () =>
        user &&
        sendRequest(user.userRole === Role.EMPLOYEE ? undefined : user.token);

    useLayoutEffect(() => {
        if (!user) redirect("/login");
        else if (user.userRole === Role.USER) redirect("/cart");
    }, []);


    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8080/api/v1/sse/bucket`, {withCredentials: true});

        eventSource.onopen = (e) => {
            console.log("SSE  Connected !");
        };

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const updatedData = data.map(order => {
                if (order.pizza) {
                    const {pizza, delivery, ...restOfOrder} = order;
                    let expectedDelivery = null
                    if (delivery == "ON_YOUR_HOME") {
                        //@ts-ignore
                        expectedDelivery = "To Your Home"
                    } else {
                        //@ts-ignore
                        expectedDelivery = "On Pizza Place"
                    }
                    return {...restOfOrder, pizzas: pizza, delivery: expectedDelivery};
                }
                return order;
            });
            setOrders(updatedData)
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [user]);

    return (
        <Stack gap={1}>
            <Typography variant="h3">Orders</Typography>
            <OrderList orders={orders1} refetch={getOrders} />
        </Stack>
    );
}
