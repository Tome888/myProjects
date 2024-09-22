import { useContext, useRef } from "react";
import { Data } from "../context/ApiContext";
import { useReviewStore } from "../useReviewStore";

interface FormProps {
  randomNumb: number;
  apiData: any[];
}

export function ReviewForm({ randomNumb, apiData }: FormProps) {
  const fetchContext = useContext(Data);
  const theForm = useRef<any>();
  const { review, setAuthor, setComment, setStars, resetReview } =
    useReviewStore();

  if (!fetchContext) {
    return <p>Loading...</p>;
  }
  const { switchFetch, setSwitch } = fetchContext;

  const setReviewFunc = async (
    idRestaurant: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (
      !review.author ||
      !review.comment ||
      review.stars === 0 ||
      review.stars === undefined
    ) {
      return;
    }

    const url = `http://localhost:5000/restaurantsPut/${idRestaurant}`;
    const restaurantToUpdate = apiData!.find(
      (restaurant) => restaurant.id === idRestaurant
    );
    restaurantToUpdate?.reviewsList.push(review);
    if (restaurantToUpdate) {
      restaurantToUpdate.reviews += 1;
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error("Failed to update restaurant");
      }

      const updatedData = await response.json();
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
    resetReview();
    theForm.current.reset();
    setSwitch(!switchFetch);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    setValue(event.target.value);
  };

  const handleChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStars(+event.target.value);
  };

  return (
    <form ref={theForm} action="submit" className="revForm">
      <label>Name:</label>
      <input type="text" onChange={(event) => handleChange(event, setAuthor)} />
      <label>Comment:</label>
      <textarea
        name="Comment Area"
        id="2"
        onChange={(event) => handleChange(event, setComment)}
        placeholder="Your Comment goes here..."
      ></textarea>
      <label>Stars: {review.stars}</label>
      <input
        onChange={handleChangeSlider}
        type="range"
        id="star-slider"
        name="star-slider"
        min="1"
        max="5"
        step="1"
        defaultValue={1}
      />
      <button
        onClick={(event) => {
          if (apiData && apiData[randomNumb].id) {
            setReviewFunc(apiData[randomNumb].id, event);
          }
        }}
      >
        Leave a review
      </button>
    </form>
  );
}
