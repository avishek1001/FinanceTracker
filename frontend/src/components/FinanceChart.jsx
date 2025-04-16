import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

import { getBarChart } from "../api/finance.js";
import { Box, Typography, Paper } from "@mui/material";



export default function FinanceChart() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBarChart();
            setChartData(data);
        }
        fetchData();
    }, [])

    const getMonthName = (monthNumber) => {
        return new Date(0, monthNumber - 1).toLocaleString('default', { month: 'long' });
    };

    // const months = chartData.map(data => data.month);
    const months = chartData.map(data => `${getMonthName(data.month)} ${data.year}`);
    const amounts = chartData.map(data => data.totalAmount)

    return (
        <Box sx={{
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'center'
        }}>
            <Typography variant="h3" sx={{
                textAlign: 'center',
                mb: 5,
                mt: 5,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontStyle: 'italic',
                letterSpacing: '-0.015em'
            }}>
                Finance Chart
            </Typography>


            <Box sx={{

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <Paper sx={{
                    p: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Translucent white
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)'
                    }
                }}>
                    <BarChart
                        xAxis={[{
                            scaleType: 'band',
                            data: months,
                            label: "Months"
                        }]}
                        series={[{
                            data: amounts,
                            label: "Total Amount"
                        }]}
                        width={700}
                        height={600}
                    />
                </Paper>
            </Box>

        </Box>
    )
}