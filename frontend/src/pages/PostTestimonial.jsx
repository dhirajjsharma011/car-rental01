import axios from "axios";
import { useState } from "react";
import "../styling/PostTestimonial.css"

const PostTestimonial = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://car-rental-01-9nu4.onrender.com/api/addtestimonial", data);;

      alert("Testimonial Submitted!");

      // clear form
      setData({
        name: "",
        email: "",
        message: "",
        rating: 5
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} />
      <br />
      <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <br />
      <textarea placeholder="Message" onChange={e => setData({...data, message: e.target.value})} />
      <button>Submit</button>
    </form>
  );
};

export default PostTestimonial;