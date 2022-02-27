import React from "react";
import {
    FormControl,
    Box,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { Formik } from "formik";
import PropTypes from "prop-types";

const completionFilters = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Pending",
        value: "False",
    },
    {
        label: "Completed",
        value: "True",
    },
];

const initialValues = {
    completed: "False",
};

export default function Filters({ setQueries }) {
    const handleSubmit = (values) => {
        setQueries(values);
    };

    return (
        <Box sx={{ ml: (theme) => theme.spacing(2) }}>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize
            >
                {(formik) => {
                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: (theme) => theme.spacing(4),
                                }}
                            >
                                <FormControl
                                    sx={{
                                        minWidth: 200,
                                        marginRight: (theme) => theme.spacing(1),
                                    }}
                                    variant="outlined"
                                >
                                    <InputLabel id="category-label">Status</InputLabel>
                                    <Select
                                        labelId="completed-label"
                                        label="Status"
                                        id="filter-completed"
                                        size="small"
                                        {...formik.getFieldProps("completed")}
                                    >
                                        {completionFilters.map((c) => {
                                            return (
                                                <MenuItem value={c.value} key={c.value}>
                                                    <div style={{ display: "flex" }}>{c.label}</div>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>

                                <Box>
                                    <Button
                                        type="submit"
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Filter
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    );
                }}
            </Formik>
        </Box>
    );
}

Filters.propTypes = {
    setQueries: PropTypes.func,
};
