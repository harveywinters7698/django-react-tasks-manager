import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Grid,
    Paper,
    Typography,
    Button
} from "@mui/material";
import { lightGreen, cyan, amber, red } from "@mui/material/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import useRequestResource from "src/hooks/useRequestResource";

import ColorBox from "src/components/ColorBox";
import priorityOptionsData, { priorityOptionsDataList } from "src/data/priorityOptionsData";


const validationSchema = yup.object({
    title: yup.string().required("Title is required").max(100, "Max length is 100"),
    category: yup.number().required("Category is required"),
    priority: yup.string().required("Priority is required"),
});



export default function TaskDetails() {
    const { getResourceList, resourceList: categoryList } = useRequestResource({ endpoint: "categories" });
    const { addResource, updateResource, getResource, resource } = useRequestResource({ endpoint: "tasks", resourceLabel: "Task" })
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        category: "",
        priority: 2,
    });

    useEffect(() => {
        getResourceList();
    }, [getResourceList])

    useEffect(() => {
        if (id) {
            getResource(id);
        }
    }, [id, getResource])

    useEffect(() => {
        if (resource) {
            setInitialValues({
                title: resource.title,
                description: resource.description || "",
                category: resource.category,
                priority: resource.priority
            })
        }
    }, [resource])

    const handleSubmit = (values) => {
        if (id) {
            updateResource(id, values, () => {
                navigate("/tasks")
            })
            return;
        }
        addResource(values, () => {
            navigate("/tasks")
        })
    };

    return (
        <Paper sx={{
            borderRadius: (theme) => theme.spacing(0.5),
            boxShadow: (theme) => theme.shadows[5],
            padding: (theme) => theme.spacing(3)
        }}>
            <Typography variant="h6" mb={4}>
                {id ? "Edit Task" : "Create Task"}
            </Typography>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {(formik) => {
                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        {...formik.getFieldProps("title")}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        id="description"
                                        label="Description"
                                        {...formik.getFieldProps("description")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{

                                            width: "100%",
                                        }}
                                        error={
                                            formik.touched.priority && Boolean(formik.errors.priority)
                                        }
                                    >
                                        <InputLabel id="priority-label">Priority</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="priority-label"
                                            label="Priority"
                                            id="priority"
                                            {...formik.getFieldProps("priority")}
                                        >
                                            {Array.isArray(priorityOptionsDataList)
                                                ? priorityOptionsDataList.map((p) => {
                                                    return (
                                                        <MenuItem value={p.value} key={p.value}>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <ColorBox
                                                                    color={
                                                                        priorityOptionsData[p.value].color ||
                                                                        "#fff"
                                                                    }
                                                                />
                                                                <Box sx={{ ml: 1 }}>{p.label}</Box>
                                                            </Box>
                                                        </MenuItem>
                                                    );
                                                })
                                                : null}
                                        </Select>
                                        <FormHelperText>
                                            {formik.touched.priority && formik.errors.priority}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{

                                            width: "100%",
                                        }}
                                        error={
                                            formik.touched.category && Boolean(formik.errors.category)
                                        }
                                    >
                                        <InputLabel id="category-label">Category</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="category-label"
                                            label="Category"
                                            id="category"
                                            {...formik.getFieldProps("category")}
                                        >
                                            {Array.isArray(categoryList.results)
                                                ? categoryList.results.map((c) => {
                                                    return (
                                                        <MenuItem value={c.id} key={c.id}>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <ColorBox color={`#${c.color}`} />
                                                                <Box sx={{ ml: 1 }}>{c.name}</Box>
                                                            </Box>
                                                        </MenuItem>
                                                    );
                                                })
                                                : null}
                                        </Select>
                                        <FormHelperText>
                                            {formik.touched.category && formik.errors.category}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: "flex", margin: (theme) => theme.spacing(1), marginTop: (theme) => theme.spacing(3) }}>
                                        <Button
                                            component={Link}
                                            to='/tasks'
                                            size="medium"
                                            variant="outlined"
                                            sx={{ mr: 2 }}>
                                            Back
                                        </Button>

                                        <Button type="submit"
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    );
                }}
            </Formik>
        </Paper>
    );
}
