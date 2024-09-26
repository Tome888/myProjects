import { useRouter } from "next/router";
import React from "react";

interface CardProps {
  imgSrc: string;
  titleCard: string;
  priceCard: string;
  itemId: string;
}

const ProductItem: React.FC<CardProps> = ({
  imgSrc,
  titleCard,
  priceCard,
  itemId,
}) => {
  const router = useRouter();

  const goToItem = (itemId: string) => {
    router.push(`/shop/${itemId}`);
  };

  return (
    <a
      className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
      onClick={() => goToItem(itemId)}
    >
      <div className="block2">
        <div className="block2-pic hov-img0">
          <img src={imgSrc} alt="IMG-PRODUCT" />
          <div className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
            View Details
          </div>
        </div>
        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l">
            <div className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
              {titleCard}
            </div>
            <span className="stext-105 cl3">{priceCard}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductItem;
