import React from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard"
import ListAltIcon from "@mui/icons-material/ListAlt";

import { NavLink } from "react-router-dom";

import { Box } from "@mui/system";
import { GlobalStyles, useTheme } from "@mui/material";

const drawerWidth = 240;

const listItems = [
    {
        key: "dashboard",
        to: "/",
        name: "Dashboard",
        icon: <DashboardIcon />
    },
    {
        key: "tasks",
        to: "/tasks",
        name: "Tasks",
        icon: <ListAltIcon />
    },
    {
        key: "categories",
        to: "/categories",
        name: "Categories",
        icon: <CategoryIcon />,
    },
];

const SidebarGlobalStyles = () => {
    const theme = useTheme();
    return (
        <GlobalStyles
            styles={{
                ".sidebar-nav-item": {
                    color: "unset",
                    textDecoration: "none",
                },
                ".sidebar-nav-item-active": {
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    "& .MuiSvgIcon-root": {
                        color: theme.palette.primary.main,
                    },
                    "& .MuiTypography-root": {
                        fontWeight: 500,
                        color: theme.palette.primary.main,
                    },
                },
            }}
        />
    );
};
const SidebarGlobalStylesMemo = React.memo(SidebarGlobalStyles);

export function SideMenu(props) {
    const { mobileOpen, setMobileOpen } = props;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box>
            <Toolbar />
            <Divider />
            <List>
                {listItems.map((li) => {
                    return (
                        <NavLink
                            end={li.to === "/" ? true : false}
                            className={(props) => {
                                return `${props.isActive ? 'sidebar-nav-item-active' : 'sidebar-nav-item'}`;
                            }}
                            to={li.to}
                            key={li.key}
                        >
                            <ListItem button>
                                <ListItemIcon>{li.icon}</ListItemIcon>
                                <ListItemText primary={li.name} />
                            </ListItem>
                        </NavLink>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <SidebarGlobalStylesMemo />

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

SideMenu.propTypes = {
    mobileOpen: PropTypes.bool,
    setMobileOpen: PropTypes.func.isRequired,
};

export default SideMenu;
