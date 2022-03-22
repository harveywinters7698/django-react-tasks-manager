import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Grid, Box, Container, Typography, TextField, Avatar } from "@mui/material";

import useRequestAuth from "src/hooks/useRequestAuth";

const validationSchema = yup.object({
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords didn't match, please try again")
});

export default function SignUp() {
    const navigate = useNavigate();
    const { loading, resetPassword } = useRequestAuth();
    const { uid, token } = useParams();

    const successCallback = () => {
        navigate("/auth/signin");
    }

    const handleSubmit = (values) => {
        resetPassword({
            uid,
            token,
            new_password: values.password,
            re_new_password: values.confirmPassword
        }, successCallback)
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: (theme) => theme.spacing(8),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        margin: (theme) => theme.spacing(1),
                        backgroundColor: (theme) => theme.palette.secondary.main,
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Formik
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    validateOnBlur={false}
                    initialValues={{
                        confirmPassword: "",
                        password: "",
                    }}
                    validateOnChange={false}
                >
                    {(formik) => {
                        return (
                            <form
                                style={{
                                    width: "100%", // Fix IE 11 issue.
                                }}
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    {...formik.getFieldProps("password")}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    {...formik.getFieldProps("confirmPassword")}
                                    error={
                                        formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                                    }
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
                                >
                                    Reset Password
                                </LoadingButton>
                            </form>
                        );
                    }}
                </Formik>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to={"/auth/signin"} key={"signup"}>
                            Go back to Sign In Page
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
