import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    Paper,
    MenuItem
} from '@mui/material';


import { useState } from "react"

export default function TransactionForm({ onHandleAddFinance }) {

    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((oldFormData) => ({
            ...oldFormData,
            [name]: value
            // [id]: id === 'amount' ? Number(value) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onHandleAddFinance(formData);
        setFormData({
            name: "",
            amount: 0,
            description: "",
            date: new Date().toISOString().split('T')[0]
        })
    }

    return (

        <Paper elevation={3} sx={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
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
            <Typography variant='h6' gutterBottom>Add New Transaction</Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            step: "0.01",
                            min: "0"
                        }
                    }}
                />

                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    fullWidth
                    slotProps={{
                        input: {
                            shrink: true,
                        }
                    }}
                />

                <TextField
                    id="outlined-select-currency"
                    select
                    label="Category"
                    defaultValue="EUR"
                    helperText="Please select the item's category"
                    name="category"
                    onChange={handleChange}
                    required
                >

                    <MenuItem value='Grocery'>Grocery</MenuItem>
                    <MenuItem value='Electronics'>Electronics</MenuItem>
                    <MenuItem value='Snacks'>Snacks</MenuItem>
                    <MenuItem value='Books'>Books</MenuItem>
                    <MenuItem value='Others'>Others</MenuItem>


                </TextField>

                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Add Transaction
                </Button>
            </Box>
        </Paper>
    )
}