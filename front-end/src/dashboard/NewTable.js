// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import ErrorAlert from "../layout/ErrorAlert";

// function NewTable() {
//   const history = useHistory();
//   const [errors, setErrors] = useState([]);
//   const [formData, setFormData] = useState({
//     table_name: "",
//     capacity: 1,
//   });

//   function handleChange({ target }) {
//     setFormData({ ...formData, [target.name]: target.value });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     const foundErrors = [];
//     if (validateFields(foundErrors)) {
//       history.push(`/tables/new`);
//     }
//     setErrors(foundErrors);
//   }

//   function validateFields(foundErrors) {
//     if (formData.table_name === "" || formData.capacity === "") {
//       foundErrors = { message: "Please fill out all fields." };
//     } else if (formData.table_name.length < 2) {
//       foundErrors = { message: "Table name must be at least 2 characters." };
//     }
//     if(foundErrors.length > 0) {
//         return false;
//     }
//     return true;
//   }

//   const errorsDisplay = () => {
//     return errors.map((error, index) => (
//       <ErrorAlert key={index} error={error} />
//     ));
//   };

//   return (
//     <form>
//         {errorsDisplay()}

//       <label htmlFor="table_name">Table Name:&nbsp;</label>
//       <input
//         name="table_name"
//         id="table_name"
//         type="text"
//         minLength="2"
//         onChange={handleChange}
//         value={formData.table_name}
//         required
//       />

//       <label htmlFor="capacity">Capacity:&nbsp;</label>
//       <input
//         name="capacity"
//         id="capacity"
//         type="number"
//         min="1"
//         onChange={handleChange}
//         value={formData.capacity}
//         required
//       />

//       <button type="submit" onClick={handleSubmit}>
//         Submit
//       </button>
//       <button type="button" onClick={history.goBack}>
//         Cancel
//       </button>
//     </form>
//   );
// }

// export default NewTable;
