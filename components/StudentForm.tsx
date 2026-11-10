"use client";
import { useState } from "react";

export default function StudentForm() {
  //Memory for form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    skills: [] as string[],
    address: "",
  });

  // To show error and to store all students
  const [error, setError] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  function handleChange(e: any) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSkills(e: any) {
    let { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, skills: [...formData.skills, value] });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((s) => s !== value),
      });
    }
  }

  
  function handleSubmit(e: any) {
    e.preventDefault(); //  Stop page reload

    // Prevent empty fields
    if (formData.name === "" || formData.email === "" || formData.phone === "") {
      setError("Please fill Name, Email, Phone - required");
      return;
    }

    //  show error if email invalid
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Invalid email - must contain @ and .");
      return;
    }

    //  prevent invalid phone
    if (formData.phone.length !== 10) {
      setError("Phone must be 10 digits");
      return;
    }

    // If no error
    setError("");
    //  To display all students
    setStudents([...students, formData]);

    //  Task says reset after success (we will improve in Step 4)
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      course: "",
      skills: [] as string[],
      address: "",
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Student Registration Form</h2>

        {/* To show validation message */}
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Student Name</label>
            <input name="name" value={formData.name} type="text" placeholder="Enter Name" onChange={handleChange} className="w-full border px-3 py-2 rounded-lg mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={formData.email} type="email" placeholder="Enter Email" onChange={handleChange} className="w-full border px-3 py-2 rounded-lg mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" value={formData.phone} type="tel" placeholder="10 digits" onChange={handleChange} className="w-full border px-3 py-2 rounded-lg mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Age</label>
            <input name="age" value={formData.age} type="number" placeholder="Enter age" onChange={handleChange} className="w-full border px-3 py-2 rounded-lg mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex gap-4 mt-2">
              <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
              <label><input type="radio" name="gender" value="others" onChange={handleChange} /> Others</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Course</label>
            <select name="course" value={formData.course} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg mt-1">
              <option value="">Select Course</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="MongoDB">MongoDB</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Skills</label>
            <div className="flex gap-4 mt-2">
              <label><input type="checkbox" value="React" onChange={handleSkills} /> React</label>
              <label><input type="checkbox" value="NextJS" onChange={handleSkills} /> NextJS</label>
              <label><input type="checkbox" value="MongoDB" onChange={handleSkills} /> MongoDB</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea name="address" value={formData.address} placeholder="Address" onChange={handleChange} className="w-full border px-3 py-2 rounded-lg mt-1 h-20"></textarea>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">Register</button>
        </form>
      </div>

     { /* Display entered student information */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-3">Registered Students: {students.length}</h3>
        <div className="space-y-3">
          {students.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow border">
              <p className="font-bold">{s.name} - {s.email}</p>
              <p className="text-sm text-gray-600">Phone: {s.phone} | Age: {s.age} | Gender: {s.gender}</p>
              <p className="text-sm text-gray-600">Course: {s.course} | Skills: {s.skills.join(", ")}</p>
              <p className="text-sm text-gray-600">Address: {s.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}