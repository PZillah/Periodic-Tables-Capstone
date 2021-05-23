import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function NewReservation() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        first_name: "",
	    last_name: "",
	    mobile_number: "",
	    reservation_date: "",
	    reservation_time: "",
	    people: 0,
    });

function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
}

function handleSubmit(event) {
    event.preventDefault();
    history.push(`/dashboard?date=${formData.reservation_date}`)
}

// Validation function - check if reservation date is Tuesday or in the past

function validateDate() {
    const reserveDate = new Date(formData.reservation_date);
    const foundErrors = [];
    if (reserveDate.getDay() === 2) { // 2 is Tuesday
        foundErrors.push({ message: "Restaurant is closed on Tuesday. Reservations cannot be made."})
    }
}

    return (
        <form>
            <label htmlFor="first_name">First Name:&nbsp;</label>
            <input 
            name="first_name"
			id="first_name"
			type="text"
			onChange={handleChange}
			value={formData.first_name}
			required
            />

            <label htmlFor="last_name">Last Name:&nbsp;</label>
			<input 
				name="last_name"
				id="last_name"
				type="text"
				onChange={handleChange}
				value={formData.last_name}
				required
			/>

			<label htmlFor="mobile_number">Mobile Number:&nbsp;</label>
			<input 
				name="mobile_number"
				id="mobile_number"
				type="tel"
				onChange={handleChange}
				value={formData.mobile_number}
				required
			/>

			<label htmlFor="reservation_date">Reservation Date:&nbsp;</label>
			<input 
				name="reservation_date" 
				id="reservation_date"
				type="date"
				onChange={handleChange}
				value={formData.reservation_date}
				required
			/>

			<label htmlFor="reservation_time">Reservation Time:&nbsp;</label>
			<input 
				name="reservation_time" 
				id="reservation_time"
				type="time"
				onChange={handleChange}
				value={formData.reservation_time}
				required
			/>

			<label htmlFor="people">Party Size:&nbsp;</label>
			<input 
				name="people"
				id="people"
				type="number"
				min="1"
				onChange={handleChange}
				value={formData.people}
				required
			/>

            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={history.goBack}>Cancel</button>
        </form>
    )
}

export default NewReservation;
