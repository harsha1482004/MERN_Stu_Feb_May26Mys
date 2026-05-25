// Contrlled and Uncontrolled Component

import { useState, useRef } from "react";
const intialFormData = {
    username: "",
    bio: "",
    country: "",
    gender: "",
    agree: false,
};

export function ControlledForm() {
    const [formData, setFormData] = useState(intialFormData);

    // Uncontrolled File Input
    const fileRef = useRef(null);

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    }
    // Form Submit Handler
    function handleSubmit(event) {
        event.preventDefault();
    
        // Accessing Uncontrolled File Input Value
        const uploadedFile = fileRef.current?.files?.[0] || null;
        const submittedData = {
            ...formData,
            uploadedFileName : uploadedFile ? uploadedFile.name : "No file selected",
        };
        console.log("Submitted form data:", submittedData);
        alert(`Form submitted successfully!`);
    }
    // Reset form to initial state
    function handleReset() {
        setFormData(intialFormData);
        if (fileRef.current) {
            fileRef.current.value = ""; // Reset the file input
        }
    }

    return (
        <section>
            <h2>Controlled Components</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter Username"
                    /><br/>
                    <textarea name="bio" id="bio" 
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Write a short bio"
                    /><br/>
                    <select name="country" id="country" value={formData.country} onChange={handleChange}>
                        <option value="">Select Country</option>
                        <option value="ind">India</option>
                        <option value="canada">Canada</option>
                        <option value="uk">United Kingdom</option>
                    </select><br/>
                    <fieldset>
                        <legend>Gender</legend>
                        <label htmlFor="male">
                            <input type="radio" name="gender" id="male" value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange} />
                        Male</label>
                        <label htmlFor="female">
                            <input type="radio" name="gender" id="female" value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange} />
                        Female</label>
                    </fieldset>
                    <br/>
                    <label htmlFor="agree">
                        <input type="checkbox" name="agree" id="agree"
                            checked={formData.agree}
                            onChange={handleChange} />
                        Accept terms and conditions
                    </label><br/>
                    <label htmlFor="resume">Upload Resume:</label>
                    <input type="file" id="resume" ref={fileRef} />
                    <br/>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>
            <hr />
            <h3>Live form data preview</h3>
            <p>Username: {formData.username || "Not Entered"}</p>
            <p>Bio: {formData.bio || "Not Entered"}</p>
            <p>Country: {formData.country || "Not Entered"}</p>
            <p>Gender: {formData.gender || "Not Selected"}</p>
            <p>Accepted Terms?: {formData.agree ? "Yes" : "No"}</p>
            <p>Selected File: {fileRef.current?.files?.[0]?.name || "No file selected"}</p>
        </section>
    );
}