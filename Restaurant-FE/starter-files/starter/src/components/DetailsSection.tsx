interface DetailProps {
  image: string;
  phone: string;
  email: string;
  address: string;

  api?: any[];
  numberRandom?: number;
  idNumber?: string;
}

export function DetailsSection({ image, phone, email, address }: DetailProps) {
  return (
    <div className="imageAndInfoDiv">
      <img className="imgIndividualPage" src={image} alt="Details" />
      <p>
        <b>Phone: </b>
        {phone}
      </p>
      <p>
        <b>Email: </b>
        {email}
      </p>
      <p>
        <b>Address: </b>
        {address}
      </p>
    </div>
  );
}
