import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography, Pagination } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Masonry from "react-masonry-css";

import TaskListItem from './TaskListItem';
import useRequestResource from 'src/hooks/useRequestResource';
import Filters from "./Filters";

// const results = [
//     {
//         id: 1,
//         title: "Task 1",
//         category_name: "Cat 1",
//         category_color: "697689",
//         priority: 1
//     },
//     {
//         id: 2,
//         title: "Task 2",
//         category_name: "Cat 2",
//         category_color: "ff8a65",
//         priority: 2
//     }
// ]

const pageSize = 6;

const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
}

export default function Tasks() {
    const { resourceList, getResourceList, deleteResource, updateResource } = useRequestResource({ endpoint: "tasks", resourceLabel: "Task" });
    const [open, setOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const handleUpdateCompleted = (task) => {
        updateResource(task.id, {
            completed: !task.completed
        })
    }

    const handleConfirmDelete = (id) => {
        setIdToDelete(id);
        setOpen(true);
    }

    const handleDeleteClose = () => {
        setOpen(false);
    }

    const handleDelete = () => {
        setOpen(false);
        deleteResource(idToDelete);
    }

    const navigate = useNavigate();
    const location = useLocation();
    const query = queryString.parse(location.search);

    const handleChangePagination = (event, value) => {
        const newQuery = {
            ...query,
            page: value
        }
        const newSearch = queryString.stringify(newQuery);
        navigate(`${location.pathname}?${newSearch}`)
    }

    const onSubmitSearch = (values) => {
        const { completed, priority, search, category } = values;
        const newQuery = {
            completed: completed === "True" || completed === "False" ? completed : undefined,
            priority: priority === "all" ? undefined : priority,
            category: category === "all" ? undefined : category,
            search: search
        }
        const newSearch = queryString.stringify(newQuery);
        navigate(`${location.pathname}?${newSearch}`)
    }

    useEffect(() => {
        getResourceList({ query: location.search });
    }, [getResourceList, location.search])

    return (
        <div>
            <Dialog open={open} onClose={handleDeleteClose}>
                <DialogTitle>
                    Are you sure you want to delete this task?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button onClick={handleDeleteClose}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Filters onSubmit={onSubmitSearch} />
            <Typography
                variant="subtitle1"
                sx={{
                    marginLeft: (theme) => theme.spacing(1),
                    marginBottom: (theme) => theme.spacing(2)
                }}
                color="text.primary"
            >
                {`Total tasks: ${resourceList.count || 0}`}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3, mt: 3 }}>
                <Button component={Link}
                    variant="contained"
                    color="primary"
                    to="/tasks/create"
                >
                    Create Task
                </Button>
            </Box>

            <Masonry breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName='my-masonry-grid_column'>
                {resourceList.results.map((task) => {
                    return (
                        <div key={task.id}>
                            <TaskListItem task={task} handleConfirmDelete={handleConfirmDelete}
                                handleUpdateCompleted={handleUpdateCompleted}
                            />
                        </div>
                    )
                })}
            </Masonry>


            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Pagination
                    color="primary"
                    count={Math.ceil(resourceList.count / pageSize)}
                    page={query.page ? parseInt(query.page) : 1}
                    onChange={handleChangePagination}
                />
            </Box>
        </div>
    )
}
