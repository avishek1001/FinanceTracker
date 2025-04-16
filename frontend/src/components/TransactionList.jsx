import { useEffect, useState } from "react";
import { addFinanes, deleteFinance, getFinances } from "../api/finance.js";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TransactionForm from "./TransactionForm.jsx";
import { Link } from "react-router-dom";


export default function TransactionList() {

    const [finances, setFinances] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFinances();
            setFinances(data);
        }

        fetchData();
    }, [])

    const handleAddFinance = async (newTransaction) => {
        const addedTransaction = await addFinanes(newTransaction);
        setFinances(prevFinances => [...prevFinances, addedTransaction]);
    }

    const handleDelete = async (id) => {
        await deleteFinance(id);
        setFinances(prevFinances => prevFinances.filter(v => v._id !== id));
    }

    return (

        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            height: "100%",
            mt: 15
        }}>

            <Box sx={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <Typography variant="h3" sx={{
                    mb: 5,
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    letterSpacing: '-0.015em'
                }}>
                    Transactions
                </Typography>
                {
                    finances.map((finance, index) => (
                        <Accordion sx={{
                            width: "60%",
                            mb: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Translucent white
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                            // borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)'
                            }
                        }}>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    alignItems: 'center'
                                }}>
                                    <Typography>{finance.name}</Typography>
                                    <Typography>₹{finance.amount.toFixed(2)}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {
                                        finance.description
                                    }
                                </Typography>
                                <Typography>{new Date(finance.date).toLocaleDateString()}</Typography>
                            </AccordionDetails>
                            <Button
                                type="submit"
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(finance._id)}
                            >
                                Delete
                            </Button>
                        </Accordion>
                    ))
                }
            </Box>

            <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                <TransactionForm onHandleAddFinance={handleAddFinance} />
            </Box>

        </Box>

    )
}