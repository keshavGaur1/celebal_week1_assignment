// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const FormComponent = () => {
//   const navigate = useNavigate();

//   // Form state
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     phoneCode: "+91",
//     phoneNumber: "",
//     country: "",
//     city: "",
//     panNo: "",
//     aadharNo: "",
//   });

//   // Error state
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [touched, setTouched] = useState({}); // Track which fields have been touched

//   // Country and city options
//   const countries = [
//     { code: "IN", name: "India" },
//     { code: "US", name: "United States" },
//     { code: "GB", name: "United Kingdom" },
//     { code: "CA", name: "Canada" },
//     { code: "AU", name: "Australia" },
//   ];

//   const citiesByCountry = {
//     IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
//     US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
//     GB: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
//     CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
//     AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Convert username to lowercase
//     const processedValue = name === "username" ? value.toLowerCase() : value;

//     setFormData({
//       ...formData,
//       [name]: processedValue,
//     });

//     // Mark the field as touched
//     setTouched({
//       ...touched,
//       [name]: true,
//     });
//   };

//   // Handle blur events
//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched({
//       ...touched,
//       [name]: true,
//     });
//     validateField(name, formData[name]);
//   };

//   // Validate individual field
//   const validateField = (fieldName, value) => {
//     let error = "";

//     switch (fieldName) {
//       case "firstName":
//         if (!value.trim()) error = "First name is required";
//         else if (value.length < 2) error = "First name must be at least 2 characters";
//         break;

//       case "lastName":
//         if (!value.trim()) error = "Last name is required";
//         else if (value.length < 2) error = "Last name must be at least 2 characters";
//         break;

//       case "username":
//         if (!value.trim()) error = "Username is required";
//         else if (!/^[a-z0-9_]+$/.test(value)) error = "Only lowercase letters, numbers and _ allowed";
//         else if (value.length < 4) error = "Username must be at least 4 characters";
//         break;

//       case "email":
//         if (!value.trim()) error = "Email is required";
//         else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
//           error = "Please enter a valid email (e.g., abc@gmail.com)";
//         break;

//       case "password":
//         if (!value) error = "Password is required";
//         else if (value.length < 8) error = "Password must be at least 8 characters";
//         else if (!/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(value))
//           error = "Must contain letters, numbers and special characters";
//         break;

//       case "phoneNumber":
//         if (!value.trim()) error = "Phone number is required";
//         else if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits";
//         break;

//       case "country":
//         if (!value) error = "Country is required";
//         break;

//       case "city":
//         if (!value) error = "City is required";
//         break;

//       case "panNo":
//         if (!value.trim()) error = "PAN number is required";
//         else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
//           error = "PAN number is invalid (format: ABCDE1234F)";
//         break;

//       case "aadharNo":
//         if (!value.trim()) error = "Aadhar number is required";
//         else if (!/^\d{12}$/.test(value)) error = "Aadhar number must be 12 digits";
//         break;

//       default:
//         break;
//     }

//     setErrors({
//       ...errors,
//       [fieldName]: error,
//     });
//   };

//   // Validate all fields before submission
//   const validateForm = () => {
//     const newErrors = {};

//     // Validate each field
//     Object.keys(formData).forEach((fieldName) => {
//       validateField(fieldName, formData[fieldName]);
//     });

//     // Check if any errors exist
//     return Object.values(newErrors).every((error) => !error);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Mark all fields as touched to show all errors
//     const allTouched = {};
//     Object.keys(formData).forEach((field) => {
//       allTouched[field] = true;
//     });
//     setTouched(allTouched);

//     if (validateForm()) {
//       navigate("/success", { state: formData });
//     }
//   };

//   // Check if form is valid for submission
//   const isFormValid = () => {
//     return (
//       formData.firstName.trim() &&
//       formData.firstName.length >= 2 &&
//       formData.lastName.trim() &&
//       formData.lastName.length >= 2 &&
//       formData.username.trim() &&
//       /^[a-z0-9_]+$/.test(formData.username) &&
//       formData.username.length >= 4 &&
//       formData.email.trim() &&
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) &&
//       formData.password &&
//       formData.password.length >= 8 &&
//       /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(formData.password) &&
//       formData.phoneNumber.trim() &&
//       /^\d{10}$/.test(formData.phoneNumber) &&
//       formData.country &&
//       formData.city &&
//       formData.panNo.trim() &&
//       /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo) &&
//       formData.aadharNo.trim() &&
//       /^\d{12}$/.test(formData.aadharNo)
//     );
//   };

//   // Validate fields when they change and have been touched
//   useEffect(() => {
//     Object.keys(touched).forEach((fieldName) => {
//       if (touched[fieldName]) {
//         validateField(fieldName, formData[fieldName]);
//       }
//     });
//   }, [formData, touched]);

//   return (
//     <div className="form-container">
//       <h2>Registration Form</h2>
//       <form onSubmit={handleSubmit}>
//         {/* First Name */}
//         <div className="form-group">
//           <label>First Name*</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={errors.firstName ? "error" : ""}
//           />
//           {touched.firstName && errors.firstName && (
//             <span className="error-message">{errors.firstName}</span>
//           )}
//         </div>

//         {/* Last Name */}
//         <div className="form-group">
//           <label>Last Name*</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={errors.lastName ? "error" : ""}
//           />
//           {touched.lastName && errors.lastName && (
//             <span className="error-message">{errors.lastName}</span>
//           )}
//         </div>

//         {/* Username */}
//         <div className="form-group">
//           <label>Username*</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={errors.username ? "error" : ""}
//           />
//           {touched.username && errors.username && (
//             <span className="error-message">{errors.username}</span>
//           )}
//         </div>

//         {/* Email */}
//         <div className="form-group">
//           <label>Email*</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={errors.email ? "error" : ""}
//             placeholder="abc@gmail.com"
//           />
//           {touched.email && errors.email && (
//             <span className="error-message">{errors.email}</span>
//           )}
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label>Password*</label>
//           <div className="password-input">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={errors.password ? "error" : ""}
//               placeholder="At least 8 characters with letters, numbers, and special characters"
//             />
//             <button
//               type="button"
//               className="show-password"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           {touched.password && errors.password && (
//             <span className="error-message">{errors.password}</span>
//           )}
//         </div>

//         {/* Phone Number */}
//         <div className="form-group">
//           <label>Phone Number*</label>
//           <div className="phone-input">
//             <select
//               name="phoneCode"
//               value={formData.phoneCode}
//               onChange={handleChange}
//             >
//               <option value="+91">+91 (India)</option>
//               <option value="+1">+1 (USA)</option>
//               <option value="+44">+44 (UK)</option>
//             </select>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="Enter 10-digit number"
//               className={errors.phoneNumber ? "error" : ""}
//             />
//           </div>
//           {touched.phoneNumber && errors.phoneNumber && (
//             <span className="error-message">{errors.phoneNumber}</span>
//           )}
//         </div>

//         {/* Country */}
//         <div className="form-group">
//           <label>Country*</label>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={(e) => {
//               handleChange(e);
//               setFormData({ ...formData, country: e.target.value, city: "" });
//             }}
//             onBlur={handleBlur}
//             className={errors.country ? "error" : ""}
//           >
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country.code} value={country.code}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           {touched.country && errors.country && (
//             <span className="error-message">{errors.country}</span>
//           )}
//         </div>

//         {/* City */}
//         <div className="form-group">
//           <label>City*</label>
//           <select
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             disabled={!formData.country}
//             className={errors.city ? "error" : ""}
//           >
//             <option value="">Select City</option>
//             {formData.country &&
//               citiesByCountry[formData.country]?.map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//           </select>
//           {touched.city && errors.city && (
//             <span className="error-message">{errors.city}</span>
//           )}
//         </div>

//         {/* PAN Number */}
//         <div className="form-group">
//           <label>PAN Number*</label>
//           <input
//             type="text"
//             name="panNo"
//             value={formData.panNo}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="Format: ABCDE1234F"
//             className={errors.panNo ? "error" : ""}
//           />
//           {touched.panNo && errors.panNo && (
//             <span className="error-message">{errors.panNo}</span>
//           )}
//         </div>

//         {/* Aadhar Number */}
//         <div className="form-group">
//           <label>Aadhar Number*</label>
//           <input
//             type="text"
//             name="aadharNo"
//             value={formData.aadharNo}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="12-digit number"
//             className={errors.aadharNo ? "error" : ""}
//           />
//           {touched.aadharNo && errors.aadharNo && (
//             <span className="error-message">{errors.aadharNo}</span>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-btn" disabled={!isFormValid()}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FormComponent;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const navigate = useNavigate();

  // sare form ka datat
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({}); // Track fields or not

  // Country and citiess
  const countries = [
    { code: "IN", name: "India" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
  ];

  const citiesByCountry = {
    IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    GB: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
    CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  };

  // input changes ke liye  ( data show + mark as touched)
  const handleChange = (e) => {
    const { name, value } = e.target;

    //  username convert to lowercase
    const newVal = name === "username" ? value.toLowerCase() : value;

    setFormData({
      ...formData,
      [name]: newVal,
    });

    // Mark the field as touched
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Handle blur events
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    validateField(name, formData[name]); // Validating the field ( blur hone par) )
  };

  // logic of validation of form

  // Validating fieldes of form
  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          error = "First name is required";
        } else if (value.length < 2)
          error = "First name must be at least 2 characters";
        break;

      case "lastName":
        if (!value.trim()) {
          error = "Last name is required";
        } else if (value.length < 2)
          error = "Last name must be at least 2 characters";
        break;

      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (!/^[a-z0-9_]+$/.test(value))
          error = "Only lowercase letters, numbers and _ allowed";
        else if (value.length < 4)
          error = "Username must be at least 4 characters";
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        )
          error = "Please enter a valid email (e.g., abc@gmail.com)";
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8)
          error = "Password must be at least 8 characters";
        else if (!/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(value))
          error =
            " Password Must contain letters, numbers and special characters ";
        break;

      case "phoneNumber":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value))
          error = "Phone number must be 10 digits";
        break;

      case "country":
        if (!value) {
          error = "Country is required";
        }
        break;

      case "city":
        if (!value) {
          error = "City is required";
        }
        break;

      case "panNo":
        if (!value.trim()) {
          error = "PAN number is required";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
          error = "PAN number is invalid (format: ABCDE1234F)";
        break;

      case "aadharNo":
        if (!value.trim()) {
          error = "Aadhar number is required";
        } else if (!/^\d{12}$/.test(value))
          error = "Aadhar number must be 12 digits";
        break;

      default:
        break;
    }

    setErrors({
      ...errors,
      [fieldName]: error, // Set error of field
    });
  };

  // Validate form (includes all fields) before submission
  const validateForm = () => {
    const newErrors = {};

    // Validate each field
    Object.keys(formData).forEach((fieldName) => {
      validateField(fieldName, formData[fieldName]);
    });

    // Check if any errors exist
    return Object.values(newErrors).every((error) => !error);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    const allTouched = {};
    Object.keys(formData).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      navigate("/success", { state: formData });
    }
  };

  // Check if form is valid for submission
  //   all fileds are error free -> than only submisiion is enabled
  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.firstName.length >= 2 &&
      formData.lastName.trim() &&
      formData.lastName.length >= 2 &&
      formData.username.trim() &&
      /^[a-z0-9_]+$/.test(formData.username) &&
      formData.username.length >= 4 &&
      formData.email.trim() &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) &&
      formData.password &&
      formData.password.length >= 8 &&
      /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(formData.password) &&
      formData.phoneNumber.trim() &&
      /^\d{10}$/.test(formData.phoneNumber) &&
      formData.country &&
      formData.city &&
      formData.panNo.trim() &&
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo) &&
      formData.aadharNo.trim() &&
      /^\d{12}$/.test(formData.aadharNo)
    );
  };

  // Validate fields when they change and have been touched
  useEffect(() => {
    Object.keys(touched).forEach((fieldName) => {
      if (touched[fieldName]) {
        validateField(fieldName, formData[fieldName]);
      }
    });
  }, [formData, touched]);

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName ? "error" : ""}
          />
          {/*  if element is focused/touched and have error than only error is shown */}
          {touched.firstName && errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastName ? "error" : ""}
          />
          {touched.lastName && errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username*</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username ? "error" : ""}
          />
          {touched.username && errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? "error" : ""}
            placeholder="abc@gmail.com"
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password*</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? "error" : ""}
              placeholder="At least 8 characters with letters, numbers, and special characters"
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number*</label>
          <div className="phone-input">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+1 (CA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+44">+61 (AUS)</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter 10-digit number"
              className={errors.phoneNumber ? "error" : ""}
            />
          </div>
          {touched.phoneNumber && errors.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={(e) => {
              handleChange(e);
              setFormData({ ...formData, country: e.target.value, city: "" });
            }}
            onBlur={handleBlur}
            className={errors.country ? "error" : ""}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <span className="error-message">{errors.country}</span>
          )}
        </div>

        {/* City */}
        <div className="form-group">
          <label>City*</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!formData.country}
            className={errors.city ? "error" : ""}
          >
            <option value="">Select City</option>
            {formData.country &&
              citiesByCountry[formData.country]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {touched.city && errors.city && (
            <span className="error-message">{errors.city}</span>
          )}
        </div>

        {/* PAN Number */}
        <div className="form-group">
          <label>PAN Number*</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Format: ABCDE1234F"
            className={errors.panNo ? "error" : ""}
          />
          {touched.panNo && errors.panNo && (
            <span className="error-message">{errors.panNo}</span>
          )}
        </div>

        {/* Aadhar Number */}
        <div className="form-group">
          <label>Aadhar Number*</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="12-digit number"
            className={errors.aadharNo ? "error" : ""}
          />
          {touched.aadharNo && errors.aadharNo && (
            <span className="error-message">{errors.aadharNo}</span>
          )}
        </div>

        {/* Submit Button */}
        {/* <button type="submit" className="submit-btn" disabled={!isFormValid()}>
          Submit
        </button> */}

        <div className="button-container">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid()}
          >
            Submit
          </button>
          {!isFormValid() && (
            <span className="button-error">
              Please fill all the details correctly{" "}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
