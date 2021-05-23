import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  });

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const foundErrors = [];
    if (validateDate(foundErrors) && validateFields(foundErrors)) {
      history.push(`/dashboard?date=${formData.reservation_date}`);
    }
    setErrors(foundErrors);
  }

  // Validation function - check if reservation date is Tuesday or in the past

  function validateDate(foundErrors) {
    const reserveDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    const todaysDate = new Date();

    if (reserveDate.getDay() === 2) {
      // 2 is Tuesday
      foundErrors.push({
        message:
          "Restaurant is closed on Tuesdays. Reservations cannot be made.",
      });
    }

    if (reserveDate < todaysDate) {
      foundErrors.push({ message: "Reservation cannot be made in the past." });
    }

    if (
      reserveDate.getHours() < 10 ||
      (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is not open until 10:30AM.",
      });
    } else if (
      reserveDate.getHours() > 22 ||
      (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed after 10:30PM.",
      });
    } else if (
      reserveDate.getHours() > 21 ||
      (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM).",
      });
    }

    if (foundErrors.length > 0) {
      // if there are any error messages
      return false; // reservation date is not valid
    }
    return true; // else, reservation date is valid
  }

function validateFields(foundErrors) {
	for(const field in formData) {
		if(formData[field] === "") {
			foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
		}
	}
	if(foundErrors.length > 0) {
		return false;
	}
	return true;
}

  const errorsDisplay = () => {
    return errors.map((error, index) => (
      <ErrorAlert key={index} error={error} />
    ));
  };

  return (
    <form>
      {errorsDisplay()}

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

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={history.goBack}>
        Cancel
      </button>
    </form>
  );
}

export default NewReservation;
