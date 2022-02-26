import React, { useEffect, useMemo } from "react";
import {
    FormControl,
    Box,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
} from "@mui/material";
import { Formik } from "formik";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useRequestResource from "src/hooks/useRequestResource";
import ColorBox from "src/components/ColorBox";
import priorityOptionsData, { priorityOptionsDataList } from "src/data/priorityOptionsData"

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
const priorityOptionsDataForFilter = [
    {
        value: "all",
        label: "All"
    }
].concat(priorityOptionsDataList)

const initialValues = {
    completed: "all",
    priority: "all",
    category: "all",
    search: "",
};

export default function Filters({ onSubmit }) {
    const { getResourceList, resourceList } = useRequestResource({ endpoint: "categories" });
    const handleSubmit = (values) => {
        onSubmit(values);
    };

    useEffect(() => {
        getResourceList();
    }, [getResourceList]);

    const categoryList = useMemo(() => {
        return [{
            value: "all",
            label: "All"
        }].concat(resourceList.results.map(r => {
            return {
                value: r.id,
                label: r.name,
                color: `#${r.color}`
            }
        }))
    }, [resourceList.results])

    const theme = useTheme();
    const isBelowMedium = useMediaQuery(theme.breakpoints.down("sm"));

    return (
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
                                flexWrap: "wrap",
                            }}
                        >
                            <FormControl
                                sx={{
                                    width: isBelowMedium ? "100%" : 160,
                                    marginRight: (theme) => theme.spacing(1),
                                    marginBottom: (theme) => theme.spacing(2),
                                }}
                                variant="outlined"
                            >
                                <TextField
                                    size="small"
                                    id="title"
                                    label="Title"
                                    type="search"
                                    {...formik.getFieldProps("search")}
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    width: isBelowMedium ? "100%" : 160,
                                    marginRight: (theme) => theme.spacing(1),
                                    marginBottom: (theme) => theme.spacing(2),
                                }}
                                variant="outlined"
                            >
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    label="Category"
                                    id="filter-category"
                                    size="small"
                                    {...formik.getFieldProps("category")}
                                >
                                    {categoryList.map((c) => {
                                        return (
                                            <MenuItem value={c.value} key={c.value}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {c.color ? <ColorBox
                                                        color={c.color}
                                                    /> : null}

                                                    <Box sx={{ ml: c.color ? 1 : 0 }}>{c.label}</Box>
                                                </Box>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl
                                sx={{
                                    width: isBelowMedium ? "100%" : 160,
                                    marginRight: (theme) => theme.spacing(1),
                                    marginBottom: (theme) => theme.spacing(2),
                                }}
                                variant="outlined"
                            >
                                <InputLabel id="completion-label">Status</InputLabel>
                                <Select
                                    labelId="completion-label"
                                    label="Status"
                                    id="filter-completion"
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

                            <FormControl
                                sx={{
                                    width: isBelowMedium ? "100%" : 160,
                                    marginRight: (theme) => theme.spacing(1),
                                    marginBottom: (theme) => theme.spacing(2),
                                }}
                                variant="outlined"
                            >
                                <InputLabel id="priority-label">Priority</InputLabel>
                                <Select
                                    labelId="priority-label"
                                    label="Priority"
                                    id="filter-priority"
                                    size="small"
                                    {...formik.getFieldProps("priority")}
                                >
                                    {priorityOptionsDataForFilter.map((p) => {
                                        return (
                                            <MenuItem value={p.value} key={p.value}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {priorityOptionsData[p.value] ? (
                                                        <ColorBox
                                                            color={priorityOptionsData[p.value].color || ""}
                                                        />
                                                    ) : null}

                                                    <Box
                                                        sx={{
                                                            ml: priorityOptionsData[p.value] ? 1 : 0,
                                                        }}
                                                    >
                                                        {p.label}
                                                    </Box>
                                                </Box>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>

                            <Box sx={{ marginBottom: (theme) => theme.spacing(2) }}>
                                <Button
                                    type="submit"
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                >
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>
                );
            }}
        </Formik>
    );
}

Filters.propTypes = {
    onSubmit: PropTypes.func,
};

