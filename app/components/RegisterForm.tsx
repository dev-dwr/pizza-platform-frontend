"use client";
import {Typography, TextField, Button, Box} from "@mui/material";
import useForm from "../hooks/use-form";
import {Role, User} from "../utils/types";
import {useState} from "react";


const validatePassword = (password: string): boolean => /^[\p{L}\p{M}\p{S}\p{N}\p{P}]+$/u.test(password)

const validateName = (name: string): boolean => /^[a-zA-Z]+$/.test(name);
const validateUsername = (username: string): boolean => /^[\p{L}\p{M}\p{S}\p{N}\p{P}]+$/u.test(username);


const validateEmail = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);


interface Props {
    title: string;
    onSubmit: (value: User) => void;
    register?: boolean;
}

export default function RegisterForm({title, onSubmit, register}: Props) {
    const [submit, setSubmit] = useState(false);


    const {
        value: username,
        onChange: usernameChange,
        onBlur: usernameBlur,
        valid: usernameValid,
        touched: usernameTouched,
    } = useForm(validateUsername);

    const {
        value: firstname,
        onChange: nameChange,
        onBlur: nameBlur,
        valid: nameValid,
        touched: nameTouched,
    } = useForm(validateName);

    const {
        value: lastname,
        onChange: lastNameChange,
        onBlur: lastNameBlur,
        valid: lastNameValid,
        touched: lastNameTouched,
    } = useForm(validateName);

    const {
        value: email,
        onChange: emailChange,
        onBlur: emailBlur,
        valid: emailValid,
        touched: emailTouched,
    } = useForm(validateEmail);

    const {
        value: password,
        onChange: passwordChange,
        onBlur: passwordBlur,
        valid: passwordValid,
        touched: passwordTouched,
    } = useForm(validatePassword);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmit(true);

        if (register && (!nameValid || !lastNameValid)) return;

        onSubmit({
            username: username,
            firstname,
            lastname,
            email,
            password,
            userRole: Role.USER,
            token: "",
        });
    };

    const isError = (touched: boolean, valid: boolean) =>
        (submit || touched) && !valid;

    return (
        <Box sx={{maxWidth: 400, mx: "auto", mt: 4}}>
            <Typography variant="h4" align="center" gutterBottom>
                {title}
            </Typography>
            <form onSubmit={handleSubmit}>
                {title === "Login" && (
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={usernameChange}
                        onBlur={usernameBlur}
                        helperText={
                            isError(usernameTouched, usernameValid)
                                ? "This is not valid username"
                                : ""
                        }
                        error={isError(usernameTouched, usernameValid)}
                    />
                )}

                {register && (
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={usernameChange}
                        onBlur={usernameBlur}
                        helperText={
                            isError(usernameTouched, usernameValid)
                                ? "This is not valid username"
                                : ""
                        }
                        error={isError(usernameTouched, usernameValid)}
                    />
                )}
                {register && (
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={firstname}
                        onChange={nameChange}
                        onBlur={nameBlur}
                        helperText={
                            isError(nameTouched, nameValid)
                                ? "This is not valid first name"
                                : ""
                        }
                        error={isError(nameTouched, nameValid)}
                    />
                )}
                {register && (
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={lastname}
                        onChange={lastNameChange}
                        onBlur={lastNameBlur}
                        helperText={
                            isError(lastNameTouched, lastNameValid)
                                ? "This is not valid last name."
                                : ""
                        }
                        error={isError(lastNameTouched, lastNameValid)}
                    />
                )}
                {title === "Register" && (
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={emailChange}
                        onBlur={emailBlur}
                        helperText={
                            isError(emailTouched, emailValid) ? "This is not valid e-mail." : ""
                        }
                        error={isError(emailTouched, emailValid)}
                    />
                )}
                {title === "Login" && (
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        onBlur={passwordBlur}
                        helperText={
                            isError(passwordTouched, passwordValid)
                                ? "At least 8 characters long, contains uppercase letter and number."
                                : ""
                        }
                        error={isError(passwordTouched, passwordValid)}
                    />
                )}
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2}}>
                    {title}
                </Button>
            </form>
        </Box>
    );
}
