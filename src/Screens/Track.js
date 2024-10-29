import React, { useState } from 'react';
import map from '../Images/map.webp'
import logo from '../Images/logoo.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import { Supabase } from "../config/supabase-config";


const Track = () => {

  const navigate = useNavigate();

  const initialValues = {
    trackNumber: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.trackNumber) {
      errors.trackNumber = "Consignment number is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Stop submission if there are validation errors
    }

    try {
      const { data, error } = await Supabase
        .from("cargo")
        .select("*")
        .eq("trackNumber", formData.trackNumber)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        alert("Error fetching user or incorrect consignment number");
        return;
      }

      if (!data) {
        console.error("consignment number not found");
        alert("consignment number not found");
        return;
      }

      // Save user ID to local storage
      localStorage.setItem("userId", data.id);

      navigate("/trackInfo");

    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login");
    }
  };

  return (
    <div className='trk'>
      <div className='tracking'>
        <div className="logo">
          <a href="https://cargo-merit.netlify.app/home.html"><img src={logo} alt="" /></a>
        </div>
        <h4>Home | Tracking</h4>
      </div>
      <div className="forms">
        <div className="left">
          <h2>Track your Shipment</h2>
          <form className="form-c" onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter your consignment number'
            value={formData.trackNumber}
            onChange={(e) => setFormData({ ...formData, trackNumber: e.target.value })}
          />
          {formErrors.email && <p className='error-text' style={{ color: "red", fontSize: "14px", margin:0, padding:0, textAlign:'start', marginTop:'2px', marginBottom:'8px' }}>{formErrors.email}</p>}

            <button>TRACK YOUR SHIPMENT</button>
            <i>* These fields are required</i>
          </form>
        </div>
        <div className="right">
          <img src={map} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Track