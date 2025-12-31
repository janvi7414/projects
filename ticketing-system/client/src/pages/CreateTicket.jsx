import React from 'react'
import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material"

export default function CreateTicket() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Ticket submitted:", formData)
        // sumittion logic
    }

    const handleSelectChange = (e) => {
        setFormData({...formData, priority: e.target.value})
    }

    return(
        <Card className='max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300'>
            <CardContent>
                <Typography 
                    variant='h5'
                    component="h2"
                    className='text-2xl font-bold mb-6 text-gray-900'
                    >
                    Create New Ticket
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box className='flex flex-col gap-4'>
                        <TextField 
                            fullWidth
                            label="Title"
                            variant='outlined'
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value
                            })}
                            placeholder='Enter ticket title'
                            className='rounded-lg'
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            variant='outlined'
                            required
                            multiline
                            rows={5}
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder='Describe the issue in detail'
                            className='rounded-lg'
                        />
                        <FormControl fullWidth required className='rounded-lg'>
                            <InputLabel id="priority-lable">Priority</InputLabel>
                            <Select
                                labelId='priority-lable'
                                value={formData.priority}
                                label="Priority"
                                onChange={handleSelectChange}
                                className='rounded-lg'
                            >
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            className='mt-4 py-3 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200'
                        >
                            Submit Ticket
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>

    )
}

