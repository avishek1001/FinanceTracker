import express from 'express';
import Finance from '../models/finance.js'

const router = express.Router();

router.get('/', async (req, res) => {
    const financials = await Finance.find({});
    res.json(financials);
})

router.post('/', async (req, res) => {
    const finance = new Finance(req.body);
    const savedFinance = await finance.save();
    res.status(201).json(savedFinance);
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedFinance = await Finance.findByIdAndDelete(id);
    res.json({ deletedFinance, message: "Successfully deleted" });
})

router.get('/charts/bar', async (req, res) => {
    const pipeline = [
        {
            $group: {
                _id: {
                    year: { $year: '$date' },
                    month: { $month: '$date' }
                },
                totalAmount: { $sum: '$amount' },
                transactionCount: { $sum: 1 },
                transactions: { $push: '$$ROOT' }
            }
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1
            }
        },
        {
            $project: {
                _id: 0, // Exclude the _id field
                year: "$_id.year",
                month: "$_id.month",
                totalAmount: 1,
                transactionCount: 1,
                // Optional: Include only specific fields from transactions
                sampleTransactions: {
                    $slice: ["$transactions", 3] // Show first 3 transactions
                }
            }
        }
    ];

    const results = await Finance.aggregate(pipeline);
    res.json(results);
})

router.get('/charts/pie', async (req, res) => {
    const categoryPipeline = [
        {
            $group: {
                _id: "$category",  
                totalAmount: { $sum: "$amount" },
                transactionCount: { $sum: 1 },
                averageAmount: { $avg: "$amount" },
                minAmount: { $min: "$amount" },
                maxAmount: { $max: "$amount" },
                sampleTransactions: {
                    $push: {
                        name: "$name",
                        amount: "$amount",
                        date: "$date"
                    }
                }
            }
        },
        {
            $sort: {
                totalAmount: -1  
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                totalAmount: 1,
                transactionCount: 1,
                averageAmount: { $round: ["$averageAmount", 2] },
                minAmount: 1,
                maxAmount: 1,
                sampleTransactions: {
                    $slice: ["$sampleTransactions", 3]
                }
            }
        }
    ];

    const categoryResults = await Finance.aggregate(categoryPipeline);
    res.json(categoryResults);
})

export default router;