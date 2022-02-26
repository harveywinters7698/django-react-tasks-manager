import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

const ColorLabel = ({ color, children }) => {
    return (
        <Box
            sx={{
                border: `1px solid ${color || "unset"}`,
                color: `${color || "unset"}`,
                borderRadius: (theme) => theme.spacing(0.5),
                padding: (theme) => theme.spacing(0.25),
            }}
        >
            <Typography variant="caption" component="div">
                {children}
            </Typography>
        </Box>
    );
};

ColorLabel.propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
};

export default ColorLabel;
