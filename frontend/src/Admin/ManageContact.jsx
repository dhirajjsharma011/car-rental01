import React, { useEffect, useState } from "react";
import "./admin-stylings/ManageContact.css";

export default function ManageContact() {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("https://car-rental-01-9nu4.onrender.com/api/getcontact")
      .then((res) => {

        console.log("Contact API Status:", res.status);

        if (!res.ok) {
          throw new Error("Failed to fetch contacts");
        }

        return res.json();
      })
      .then((data) => {

        console.log("Contact API Response:", data);

        // Your backend returns direct array
        setContacts(Array.isArray(data) ? data : []);

        setLoading(false);
      })
      .catch((error) => {

        console.log("Contact Fetch Error:", error);

        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="mc-container">
        <h2>Manage Contacts</h2>
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="mc-container">

      <h2>Manage Contacts</h2>

      <table className="mc-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>

          {contacts.length > 0 ? (

            contacts.map((item) => (

              <tr key={item._id}>

                <td>{item.name}</td>

                <td>{item.email}</td>

                <td>{item.phone}</td>

                <td className="mc-message">
                  {item.message}
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="4">
                No contacts found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}