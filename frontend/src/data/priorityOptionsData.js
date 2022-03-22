
import { lightGreen, cyan, amber, red } from "@mui/material/colors";

const priorityOptionsData = {
    1: {
        label: "Low",
        color: lightGreen[500],
    },
    2: {
        label: "Medium",
        color: cyan[500],
    },
    3: {
        label: "High",
        color: amber[500],
    },
    4: {
        label: "Critical",
        color: red[500],
    },
};
export const priorityOptionsDataList = Object
    .keys(priorityOptionsData)
    .map(key => ({ key, ...priorityOptionsData[key], value: key }));

export default priorityOptionsData;