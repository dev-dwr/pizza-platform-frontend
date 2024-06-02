"use client";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { Button, Stack, Typography } from "@mui/material";
import { UIContext } from "../store/ui";
import { enqueueSnackbar } from "notistack";
import { redirect, useRouter } from "next/navigation";
import { logout } from "../utils/api";
import {Avatar, AvatarIcon} from "@nextui-org/avatar";


export default function Account() {
  const { push } = useRouter();
  const { user, logout: deleteUser } = useContext(UIContext);
  const { sendRequest, status, error } = useHttp(logout);

  useEffect(() => {
    if (status === "error") {
      enqueueSnackbar(error, { variant: "error" });
    } else if (status === "success") {
      deleteUser();
      enqueueSnackbar("Successfully logged out.", { variant: "success" });
      push("/");
    }
  }, [status]);


  useLayoutEffect(() => {
    if (!user) redirect("/login");
  }, []);
  return (
      <Stack alignItems="left" gap={4}>
        <Typography variant="h5">
          <b>
            Name: {user?.username}
          </b>
        </Typography>
        <Avatar icon={<AvatarIcon/>}/>
        <Button onClick={() => sendRequest(user?.token)} variant="contained">
          Logout
        </Button>
      </Stack>
  );
}
