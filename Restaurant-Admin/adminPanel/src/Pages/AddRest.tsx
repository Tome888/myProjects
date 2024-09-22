import { useEffect, useState } from "react";
import { useUserLoginContext } from "../context/UserLoginContext";
import { useRestArrContext } from "../context/RestArrContext";

function AddRest() {
  const [noty, setNoty] = useState("");

  const [formData, setFormData] = useState({
    parkinglot: true,
    phone: "",
    image: "",
    restauranttype: "",
    businessname: "",
    address: "",
    slug: "",
    email: "",
    reviewsList: [],
  });

  const { tokenData } = useUserLoginContext();
  const { toggle, setToggle } = useRestArrContext();

  useEffect(() => {
    if (noty === "Restaurant added successfully") {
      setTimeout(() => {
        setNoty("");
      }, 5000);
    }
  }, [noty]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleParkingToggle = () => {
    setFormData((prev) => ({
      ...prev,
      parkinglot: !prev.parkinglot,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`http://localhost:5000/addRest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData}`,

        "api-key": "86dg6qwd6g7878g0D68G97y9SF8Y9-sfgy8AD",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNoty(data.message);
        setToggle(!toggle);
      })
      .catch((error) => {
        console.error("Error adding restaurant:", error);
      });
  };

  return (
    <section>
      <h2>Add New Restaurant</h2>
      <p
        style={{
          color: "greenyellow",
        }}
      >
        {noty}
      </p>
      <form onSubmit={handleSubmit} className="addRestFormO">
        <input
          type="text"
          name="businessname"
          placeholder="Business Name"
          value={formData.businessname}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <select
          name="restauranttype"
          value={formData.restauranttype}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="canteen">Canteen</option>
          <option value="bukka">Bukka</option>
          <option value="seafood">Seafood</option>
          <option value="pizza">Pizza</option>
          <option value="vegan">Vegan</option>
          <option value="pasta">Pasta</option>
          <option value="eatery">Eatery</option>
          <option value="american">American</option>
          <option value="japanese">Japanese</option>
        </select>

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />

        <button type="button" onClick={handleParkingToggle}>
          {formData.parkinglot ? "Disable Parking Lot" : "Enable Parking Lot"}
        </button>

        <button type="submit">Add Restaurant</button>
      </form>
    </section>
  );
}

export default AddRest;
