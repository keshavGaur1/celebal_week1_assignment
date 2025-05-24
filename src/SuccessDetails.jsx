import { useLocation } from "react-router-dom";

const SuccessDetails = () => {
  const location = useLocation();
  const formData = location.state || {};

  // To get the country name
  const getCountryName = (code) => {
    const countries = {
      IN: "India",
      US: "United States",
      GB: "United Kingdom",
      CA: "Canada",
      AU: "Australia",
    };
    return countries[code] || code;
  };

  return (
    <div className="success-container">
      <h2>Registration Successful!</h2>
      <div className="details-container">
        <h3>Your Details:</h3>
        <p>
          <div>First Name:</div> {formData.firstName}
        </p>
        <p>
          <div>Last Name:</div> {formData.lastName}
        </p>
        <p>
          <div>Username:</div> {formData.username}
        </p>
        <p>
          <div>Email:</div> {formData.email}
        </p>
        <p>
          <div>Email:</div> {formData.password}
        </p>
        <p>
          <div>Phone Number:</div> {formData.phoneCode} {formData.phoneNumber}
        </p>
        <p>
          <div>Country:</div> {getCountryName(formData.country)}
        </p>
        <p>
          <div>City:</div> {formData.city}
        </p>
        <p>
          <div>PAN Number:</div> {formData.panNo}
        </p>
        <p>
          <div>Aadhar Number:</div> {formData.aadharNo}
        </p>
      </div>
    </div>
  );
};

export default SuccessDetails;
