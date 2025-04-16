import { Typography, Box, Paper } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { getPieChart } from "../api/finance";

export default function CategoryChart() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPieChart();
            setChartData(data);
        }

        fetchData();
    }, [])

    const pieData = chartData.map((data, index) => ({
        id: index, // Unique id for each segment
        value: data.totalAmount,
        label: data.category
    }));

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <Typography variant="h3" sx={{
                mb: 5,
                mt: 5,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontStyle: 'italic',
                letterSpacing: '-0.015em'
            }}>
                Category Chart
            </Typography>
            <Box sx={{
                display: 'flex'
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
                    <PieChart
                        series={[{
                            data: pieData,
                            innerRadius: 0,
                            outerRadius: 200,
                        }]}
                        width={700}
                        height={600}
                    />
                </Paper>
            </Box>
        </Box>
    )
}