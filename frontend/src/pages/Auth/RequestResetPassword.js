import React, { useState } from "react";
import { TextField, Typography, Container, Grid, Box, Avatar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import useRequestAuth from "src/hooks/useRequestAuth";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Please provide a valid email")
        .required("Email is required"),
});

export default function RequestResetPassword() {
    const { requestResetPassword, loading } = useRequestAuth();
    const [captchaRes, setCaptchaRes] = useState(null);

    const handleSubmit = (values) => {
        requestResetPassword(values.email, captchaRes);
        setCaptchaRes(null);
    };

    const handleSetCaptcha = (value) => {
        setCaptchaRes(value);
    }

    const handleExpired = () => {
        setCaptchaRes(null);
    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: (theme) => theme.spacing(8),
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
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
                <Typography component="h1" variant="h5" gutterBottom>
                    Reset Password
                </Typography>
                <Formik
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    validateOnBlur={false}
                    initialValues={{
                        email: "",
                    }}
                >
                    {(formik) => {
                        return (
                            <form
                                style={{
                                    width: "100%", // Fix IE 11 issue.
                                }}
                                onSubmit={formik.handleSubmit}
                            >
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    Enter your email address below and we will send you a password
                                    reset link
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email"
                                    autoFocus
                                    {...formik.getFieldProps("email")}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <ReCAPTCHA
                                        onChange={handleSetCaptcha}
                                        onExpired={handleExpired}
                                        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY}
                                    />
                                </Box>

                                <LoadingButton
                                    disabled={!captchaRes}
                                    loading={loading}
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    sx={{
                                        margin: (theme) => theme.spacing(3, 0, 2),
                                    }}
                                >
                                    Send Password Reset Email
                                </LoadingButton>
                            </form>
                        );
                    }}
                </Formik>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to={"/auth/signin"} key={"signup"}>
                            {"Go back to sign in page"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}