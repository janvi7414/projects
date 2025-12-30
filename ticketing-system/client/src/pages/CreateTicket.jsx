import axios from "axios";
import React, { useState } from 'react';

const CreateTicket = () => {
const [ form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low"
});

  return (
    <form>
        <input 
            placeholder='Title'
            onChange={(e) => {
                setForm({...form, title: e.target.value})
            }}
        />
        <textarea
            placeholder='Description'
            onChange={(e) => {
                setForm({...form, description: e.target.value})
            }}
        />
        <select>
            onChange={(e) => {
                setForm({...form, priority: e.target.value})
            }}
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
        </select>
        <button type='submit'>Create Ticket</button>

    </form>
    )
}

export default CreateTicket
