import React, { useState } from "react"
import Navbar from "../components/Navbar"
import {
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Ticket submitted:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ title: "", description: "", priority: "medium", status: "open" })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create Ticket</h1>
            <p className="text-muted-foreground">Fill out the form below to create a new support ticket</p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <Box className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              <Typography className="text-green-500 font-medium">Ticket created successfully!</Typography>
            </Box>
          )}

          {/* Ticket Form */}
          <Card className="p-8 rounded-lg bg-card border border-border space-y-6">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <TextField
                  fullWidth
                  label="Ticket Title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief description of the issue"
                  className="rounded-lg"
                />

                {/* Description */}
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  required
                  multiline
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide detailed information about the ticket..."
                  className="rounded-lg"
                />

                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Priority */}
                  <FormControl fullWidth required className="rounded-lg">
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="rounded-lg"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Status */}
                  <FormControl fullWidth required className="rounded-lg">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="rounded-lg"
                    >
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Info Box */}
                <Box className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <Typography className="text-sm text-blue-500">
                    Make sure to provide as much detail as possible to help us resolve your issue quickly.
                  </Typography>
                </Box>

                {/* Buttons */}
                <Box className="flex items-center gap-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="px-6 py-3 rounded-lg font-medium bg-primary hover:bg-primary/90"
                  >
                    Create Ticket
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    className="px-6 py-3 rounded-lg font-medium"
                    onClick={() => setFormData({ title: "", description: "", priority: "medium", status: "open" })}
                  >
                    Reset Form
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
