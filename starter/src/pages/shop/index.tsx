import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ProductItem from "../../components/ProductItem";

interface ProductProps {
  id: string;
  img: string;
  title: string;
  price: string;
}

interface ShopProps {
  products: ProductProps[];
}

const Shop: NextPage<ShopProps> = ({ products }) => {
  const router = useRouter();
  const searchFormRef = useRef<HTMLFormElement>(null);
  const [searchTerm, setSearchTerm] = useState(
    router.query.q ? (router.query.q as string) : ""
  );
  const [activeFilter, setActiveFilter] = useState(
    router.query.filter ? (router.query.filter as string) : "*"
  );

  const handleFilterChange = (filter: string) => {
    const query = filter === "*" ? {} : { ...router.query, filter };
    router.push({
      pathname: "/shop",
      query: query,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: "/shop",
      query: { ...router.query, q: searchTerm },
    });
  };

  const handleSearchButtonClick = () => {
    if (searchFormRef.current) {
      searchFormRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    if (router.query.filter) {
      const filter = router.query.filter.toString();
      setActiveFilter(filter);
    } else {
      setActiveFilter("*");
    }
  }, [router.query.filter]);

  return (
    <>
      <Head>
        <title>Store - Shop</title>
        <meta
          name="description"
          content="Shop products with filters and search"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg0 m-t-23 p-b-140">
        <div className="container">
          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  activeFilter === "*" ? "how-active1" : ""
                }`}
                onClick={() => handleFilterChange("*")}
              >
                All Products
              </button>

              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  activeFilter === "women" ? "how-active1" : ""
                }`}
                onClick={() => handleFilterChange("women")}
              >
                Women
              </button>

              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  activeFilter === "man" ? "how-active1" : ""
                }`}
                onClick={() => handleFilterChange("man")}
              >
                Men
              </button>
            </div>

            <div className="flex-w flex-c-m m-tb-10">
              <div
                className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search show-search"
                onClick={handleSearchButtonClick}
              >
                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                Search
              </div>
            </div>

            {/* search */}
            <div className="panel-search w-full p-t-10 p-b-15">
              <form
                ref={searchFormRef}
                onSubmit={handleSearchSubmit}
                className="bor8 dis-flex p-l-15"
              >
                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                  <i className="zmdi zmdi-search"></i>
                </button>

                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15"
                  type="text"
                  name="search-product"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center p-t-100">
              <h3>No results found</h3>
            </div>
          ) : (
            <div className="row isotope-grid">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
                >
                  <ProductItem
                    imgSrc={product.img}
                    titleCard={product.title}
                    priceCard={product.price}
                    itemId={product.id}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex-l-m flex-w w-full p-t-10 m-lr--7">
            <a
              href="#"
              className="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1"
            >
              1
            </a>

            <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7">
              2
            </a>

            <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7">
              3
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q = "", filter = "*" } = context.query;

  let url = "http://localhost:5001/products";

  if (filter !== "*") {
    url += `?gender_like=${filter}`;
  }

  if (q) {
    url += filter !== "*" ? `&q=${q}` : `?q=${q}`;
  }

  const response = await fetch(url);
  const products: ProductProps[] = await response.json();

  return {
    props: {
      products,
    },
  };
};

export default Shop;
