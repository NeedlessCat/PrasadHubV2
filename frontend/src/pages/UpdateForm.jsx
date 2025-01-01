import React, { useContext, useState } from "react";
import axios from "axios"; // Import Axios for API calls
import { AppContext } from "../context/AppContext";

const UpdateForm = () => {
  const { backendUrl } = useContext(AppContext);
  const [searchData, setSearchData] = useState({
    category: "",
    email: "",
  });
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Update search form state
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  // Update candidate details form state
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCandidateDetails({ ...candidateDetails, [name]: value });
  };

  // Handle search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Make an API call to fetch candidate details
      const response = await axios.get(backendUrl + "/api/user/get-entry", {
        params: searchData,
      });

      if (response.data.success) {
        setCandidateDetails(response.data.entryData);
      } else {
        setCandidateDetails(null);
        setErrorMessage(response.data.message || "No candidate found.");
      }
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      setErrorMessage("Failed to fetch candidate details. Please try again.");
    }
  };

  // Handle update submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to update candidate details
      const response = await axios.post(
        backendUrl + "/api/user/update-entry",
        candidateDetails
      );

      if (response.data.success) {
        setSuccessMessage(
          response.data.message || "Details updated successfully!"
        );
        setCandidateDetails(null); // Clear the form after successful update
      } else {
        setErrorMessage(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating candidate details:", error);
      setErrorMessage("Failed to update candidate details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="m-5 w-full max-w-2xl bg-white p-5 rounded shadow-md"
      >
        <h2 className="text-center text-2xl font-semibold mb-5 text-gray-700">
          Update Candidate Details
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>Category</p>
            <select
              name="category"
              onChange={handleSearchChange}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <p>Email Address</p>
            <input
              type="email"
              name="email"
              onChange={handleSearchChange}
              className="border rounded px-3 py-2"
              placeholder="Enter Candidate Email"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-primary px-10 py-3 text-white rounded-full"
          >
            Search
          </button>
        </div>
      </form>

      {/* Error and Success Messages */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}

      {/* Update Form */}
      {candidateDetails && (
        <form
          onSubmit={handleUpdateSubmit}
          className="m-5 w-full max-w-4xl bg-white p-5 rounded shadow-md"
        >
          <h2 className="text-center text-2xl font-semibold mb-5 text-gray-700">
            Update Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(candidateDetails).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <input
                  type={typeof value === "number" ? "number" : "text"}
                  name={key}
                  value={value}
                  onChange={handleUpdateChange}
                  className="border rounded px-3 py-2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 px-10 py-3 text-white rounded-full"
            >
              Update Details
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateForm;
