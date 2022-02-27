import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import axios from "axios";

import getCommonOptions from 'src/helpers/axios/getCommonOptions';
import formatHttpApiError from 'src/helpers/formatHttpApiError';
import StatChart from "./StatChart";
import Filters from "./Filters";

// const tableData = [
//     {
//         label: "Feature",
//         color: "#ff0000",
//         count: 5
//     },
//     {
//         label: "Bug",
//         color: "#cccccc",
//         count: 2
//     }
// ];
// const chartData = {
//     datasets: [
//         {
//             backgroundColor: ["#ff0000", "#cccccc"],
//             borderColor: ["#ff0000", "#cccccc"],
//             borderWidth: 1,
//             data: [2, 5]
//         }
//     ],
//     labels: ["Feature", "Bug"]
// }

const generateChartData = (data = []) => {
    let chartData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }
        ]
    }
    data.forEach((d => {
        chartData.labels.push(d.name);
        chartData.datasets[0].data.push(d.count);
        chartData.datasets[0].backgroundColor.push(`#${d.color}`);
        chartData.datasets[0].borderColor.push(`#${d.color}`)
    }))
    return chartData;
}

const generateTableData = (data = []) => {
    const dataForTable = data.map((d) => {
        return {
            label: d.name,
            color: `#${d.color}`,
            count: d.count
        }
    })
    return dataForTable;
}

const baseApiUrl = "/api/dashboard/tasks-category-distribution/"

export default function TasksByCategory() {
    const { enqueueSnackbar } = useSnackbar();
    const [queries, setQueries] = useState({
        completed: "False"
    });
    const [apiUrl, setApiUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (queries.completed === "True" || queries.completed === "False") {
            setApiUrl(`${baseApiUrl}?completed=${queries.completed}`)
            return;
        }
        setApiUrl(baseApiUrl);
    }, [queries]);

    useEffect(() => {
        if (!apiUrl) {
            return;
        }
        setIsLoading(true);
        axios.get(apiUrl, getCommonOptions())
            .then((res) => {
                const { data } = res;
                if (data) {
                    setTableData(generateTableData(data));
                    setChartData(generateChartData(data));
                }
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
                const formattedError = formatHttpApiError(err);
                enqueueSnackbar(formattedError);
            })
    }, [enqueueSnackbar, setIsLoading, setTableData, setChartData, apiUrl])

    return (
        <StatChart tableData={tableData} chartData={chartData} isLoading={isLoading} filters={<Filters setQueries={setQueries} />} />
    )
}
