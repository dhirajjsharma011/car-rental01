import React, { useState,useEffect } from "react";
import "../Admin/admin-stylings/Brand.css"

const Brand = () => {


   const [form, setForm] = useState({
      brand: ""
    });


  const [brandName, setBrandName] = useState("");
//brand api lane k liye
  const [brands, setBrands] = useState([]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
      fetch("https://car-rental-01-9nu4.onrender.com/api/brands")
        .then((res) => res.json())
        .then((data) => {
          setBrands(data.data || []);
        })
        .catch((err) => console.log(err));
    }, [])
    //khtm

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName.trim()) {
      alert("Enter brand name");
      return;
    }

    try {
      const res = await fetch("https://car-rental-01-9nu4.onrender.com/api/createbrand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ brand: brandName })
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("ERROR:", data);
        alert(data.message);
      } else {
        console.log("SUCCESS:", data);
        alert("Brand Created Successfully");
        setBrandName("");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };


  //get krane k liye
    const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://car-rental-01-9nu4.onrender.com/api/vehicles") 
      .then(res => res.json())
      .then(data => {
        console.log("API:", data); 
        setVehicles(data.data || []); 
      })
      .catch(err => console.log(err));
  }, []);


  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this brand?")) return;

  try {
    const res = await fetch(`https://car-rental-01-9nu4.onrender.com/api/brands/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      alert("Brand Deleted Successfully");

    
      setBrands((prev) => prev.filter((item) => item._id !== id));

    } else {
      alert(data.message || "Delete failed");
    }

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="container-brand">
      <h2 className="title-br">Create Brand</h2>

      <div className="card-br">
        <div className="card-header">FORM FIELDS</div>

        <form onSubmit={handleSubmit} className="formmm">
          <div className="form-group">
            <label>Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-br">
            Submit
          </button>
        </form>
      </div>

      <div>
  <h2>Manage Brands..</h2>

  <table border="1">
    <thead>
      <tr>
        <th>S.NO</th>
        <th>Brand</th>
        <th>Action</th> 
      </tr>
    </thead>

    <tbody>
  {brands.length > 0 ? (
    brands.map((b, i) => (
      <tr key={b._id}>
        <td>{i + 1}</td>
        <td>{b.brand}</td>
        <td>
          <button
            onClick={() => handleDelete(b._id)}
            className="v-butt"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No Brands Found</td>
    </tr>
  )}
</tbody>
  </table>

  
</div>


    </div>
  );
};

export default Brand;