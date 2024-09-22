import { useParams } from "react-router-dom";
import { useRestArrContext } from "../context/RestArrContext";
import { useEffect, useState } from "react";
import { useUserLoginContext } from "../context/UserLoginContext";

interface Review {
  id: string;
  author: string;
  comment: string;
  stars: number;
}

interface RestaurantProps {
  reviews: number;
  parkinglot: boolean;
  phone: string;
  image: string;
  restauranttype: string;
  businessname: string;
  address: string;
  slug: string;
  email: string;
  id: string;
  reviewsList: Review[];
}

function EditIndividual() {
  const { arrRest, toggle, setToggle } = useRestArrContext();
  const { id } = useParams();
  const [foundObj, setFoundObj] = useState<RestaurantProps | null>(null);
  const { tokenData } = useUserLoginContext();

  const [showAlertOne, setShowAlertOne] = useState(false);
  const [bussName, setBussName] = useState<string>("");
  const [parking, setParking] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [revNum, setRevNum] = useState<number>(0);
  const [image, setImage] = useState<string>("");

  const resCat = [
    "canteen",
    "bukka",
    "seafood",
    "pizza",
    "vegan",
    "pasta",
    "eatery",
    "american",
    "japanese",
  ];

  useEffect(() => {
    if (id) {
      const restaurant = arrRest.find(
        (card: RestaurantProps) => card.id === id
      );
      setFoundObj(restaurant || null);
      if (restaurant) {
        setBussName(restaurant.businessname);
        setParking(restaurant.parkinglot);
        setPhone(restaurant.phone);
        setEmail(restaurant.email);
        setAddress(restaurant.address);
        setType(restaurant.restauranttype);
        setRevNum(restaurant.reviews);
        setImage(restaurant.image);
      }
    }
  }, [id, arrRest]);

  const handleSave = () => {
    const finalObj = {
      id: foundObj?.id,
      businessname: bussName,
      parkinglot: parking,
      phone,
      email,
      address,
      restauranttype: type,
      reviews: revNum,
      reviewsList: foundObj?.reviewsList,
      image,
    };

    console.log(finalObj);
    fetch(`http://localhost:5000/updateRes/${foundObj!.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
        "api-key": "86dg6qwd6g7878g0D68G97y9SF8Y9-sfgy8AD",
      },
      body: JSON.stringify(finalObj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "FROM UPDATE COMMENTS"))
      .finally(() => {
        setToggle(!toggle);
      });
  };

  const handleDeleteReview = (reviewId: string) => {
    if (foundObj) {
      const updatedReviewsList = foundObj.reviewsList.filter(
        (review) => review.id !== reviewId
      );

      setFoundObj((prev) =>
        prev
          ? {
              ...prev,
              reviewsList: updatedReviewsList,
              reviews: updatedReviewsList.length,
            }
          : null
      );

      const finalObj = {
        id: foundObj.id,
        businessname: bussName,
        parkinglot: parking,
        phone,
        email,
        address,
        restauranttype: type,
        reviews: updatedReviewsList.length,
        reviewsList: updatedReviewsList,
        image,
      };

      fetch(`http://localhost:5000/updateRes/${foundObj!.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData}`,
          "api-key": "86dg6qwd6g7878g0D68G97y9SF8Y9-sfgy8AD",
        },
        body: JSON.stringify(finalObj),
      })
        .then((res) => res.json())
        .then((data) => console.log(data, "FROM UPDATE COMMENTS"))
        .finally(() => {
          setToggle(!toggle);
        });
    }
  };

  if (!foundObj) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <img src={foundObj.image} alt={foundObj.businessname} />
      <div className="inputsWrapperParent">
        <div className="inputsWrapper">
          <h2>{foundObj.businessname}</h2>
          <input
            type="text"
            value={bussName}
            onChange={(e) => {
              setBussName(e.target.value.trim());
            }}
          />
        </div>
        <div className="inputsWrapper">
          <p>Image URL:</p>
          <input
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value.trim());
            }}
          />
        </div>
        <div className="inputsWrapper">
          <p>Parking:</p>
          <label>
            <input
              type="radio"
              value="true"
              checked={parking === true}
              onChange={() => {
                setParking(true);
              }}
            />
            Available
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={parking === false}
              onChange={() => {
                setParking(false);
              }}
            />
            Not Available
          </label>
        </div>
        <div className="inputsWrapper">
          <p>Phone:</p>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.trim());
            }}
          />
        </div>
        <div className="inputsWrapper">
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
          />
        </div>
        <div className="inputsWrapper">
          <p>Address:</p>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value.trim());
            }}
          />
        </div>
        <div className="inputsWrapper">
          <p>Type:</p>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value.trim());
            }}
          >
            {resCat.map((cat) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {showAlertOne ? (
        ""
      ) : (
        <button
          onClick={() => {
            setShowAlertOne(!showAlertOne);
          }}
        >
          Save
        </button>
      )}
      {showAlertOne ? (
        <div className="confirmDiv">
          <p>Save Changes:</p>
          <button
            onClick={() => {
              handleSave();
              setShowAlertOne(!showAlertOne);
            }}
          >
            Yes
          </button>

          <button
            onClick={() => {
              setShowAlertOne(!showAlertOne);
            }}
          >
            No
          </button>
        </div>
      ) : (
        ""
      )}

      {foundObj.reviewsList.length > 0 ? (
        <div className="containerEdit revCont">
          <h3>Reviews</h3>
          {foundObj.reviewsList.map((rev, idx) => {
            return (
              <div key={rev.id} className="revCard">
                <p>
                  <b>Name:</b> {rev.author}
                </p>
                <p>
                  <b>Comment:</b> {rev.comment}
                </p>
                <p>
                  <b>Stars: </b>
                  {rev.stars}
                </p>
                <div>
                  <button onClick={() => handleDeleteReview(rev.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>No Reviews Found</h3>
      )}
    </section>
  );
}

export default EditIndividual;
