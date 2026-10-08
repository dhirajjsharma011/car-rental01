import { Routes, Route } from "react-router-dom";

import About from "./components/About";
import Car from "./components/Car";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Home from "./components/Home";
import UserLayout from "./components/UserLayout";

import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import ChangePass from "./pages/ChangePass";
import PostTestimonial from "./pages/PostTestimonial";
import MyTestimonials from "./pages/MyTestimonials";
import MyBooking from "./pages/MyBooking";
import CarDetails from "./pages/CarDetails";

import AdminLayout from "./Admin/AdminLayout";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import RegUsers from "./Admin/RegUsers";
import UpdateProfile from "./Admin/UpdateProfile";
import AdminBooking from "./Admin/AdminBooking";
import ManageTestimonial from "./Admin/ManageTestimonial";
import ManageSubscribers from "./Admin/ManageSubscribers";
import ContactusQuery from "./Admin/ContactusQuery";
import ManageContact from "./Admin/ManageContact";

import PostVehicles from "./components/PostVehicles";
import Brand from "./pages/Brand";
import EditVehicles from "./Admin/EditVehicles";
import VehicleData from "./Admin/VehicleData";


function App() {
  return (
    <Routes>

      {/* =====================================
          USER WEBSITE
      ===================================== */}

      <Route element={<UserLayout />}>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ABOUT */}
        <Route path="/about" element={<About />} />

        {/* CARS */}
        <Route path="/cars" element={<Car />} />

        {/* CAR DETAILS */}
        <Route path="/carview/:id" element={<CarDetails />} />

        {/* FAQ */}
        <Route path="/faqs" element={<Faq />} />

        {/* CONTACT */}
        <Route path="/contact" element={<Contact />} />


        {/* =====================================
            PROFILE SECTION
        ===================================== */}

        <Route path="/profile" element={<Profile />}>

          {/* PROFILE SETTINGS */}
          <Route
            path="profilesettings"
            element={<ProfileSettings />}
          />

          {/* CHANGE PASSWORD */}
          <Route
            path="updatepassword"
            element={<ChangePass />}
          />

          {/* MY BOOKING */}
          <Route
            path="mybooking"
            element={<MyBooking />}
          />

          {/* POST TESTIMONIAL */}
          <Route
            path="posttestimonial"
            element={<PostTestimonial />}
          />

          {/* MY TESTIMONIAL */}
          <Route
            path="mytestimonial"
            element={<MyTestimonials />}
          />

        </Route>

      </Route>


      {/* =====================================
          ADMIN LOGIN
      ===================================== */}

      <Route
        path="/admin"
        element={<AdminLogin />}
      />


      {/* =====================================
          ADMIN SECTION
      ===================================== */}

      <Route element={<AdminLayout />}>

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admindash"
          element={<Dashboard />}
        />

        {/* REGISTERED USERS */}
        <Route
          path="/regusers"
          element={<RegUsers />}
        />

        {/* UPDATE USER PROFILE */}
        <Route
          path="/update-Profile/:id"
          element={<UpdateProfile />}
        />

        <Route path="/edit-vehicle/:id"  element={<EditVehicles/>}/>

        {/* VEHICLES */}
        <Route
          path="/vehicles"
          element={<PostVehicles />}
        />

        <Route path="/manage-vehicles" element={<VehicleData/>}/>
        
       

        {/* BRANDS */}
        <Route
          path="/brand"
          element={<Brand />}
        />

        {/* MANAGE TESTIMONIALS */}
        <Route
          path="/managetestimonials"
          element={<ManageTestimonial />}
        />

        {/* BOOKINGS */}
        <Route
          path="/booking"
          element={<AdminBooking />}
        />

        {/* SUBSCRIBERS */}
        <Route
          path="/managesubscribers"
          element={<ManageSubscribers />}
        />

        {/* CONTACT INFORMATION */}
        <Route
          path="/updatecontact"
          element={<ManageContact />}
        />

        {/* CONTACT QUERIES */}
        <Route
          path="/managecquery"
          element={<ContactusQuery />}
        />

      </Route>

    </Routes>
  );
}

export default App;