import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BlogItem from "../components/BlogItem";
import PageTitle from "../components/PageTitle";
import ProductItem from "../components/ProductItem";
import { useRouter } from "next/router";

interface BlogCardSkeletonProps {
  id: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  img: string;
  title: string;
  first_content: string;
  second_content: string;
}

interface ProductCardSkeletonProps {
  id: string;
  img: string;
  title: string;
  price: string;
  gender: string;
}

interface SearchProps {
  blogsFilter: BlogCardSkeletonProps[];
  productsFilter: ProductCardSkeletonProps[];
}

const Search: NextPage<SearchProps> = ({ blogsFilter, productsFilter }) => {
  const router = useRouter();
  const searchTerm = (router.query.product as string) || "";

  console.log("Search term:", searchTerm);

  return (
    <>
      <Head>
        <title>Store - Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={searchTerm} />

      <div className="bg0 m-t-23 p-b-140 mt-5">
        <div className="container">
          <>
            <h2 className="mb-5">Blogs</h2>
            <div className="row isotope-grid">
              {blogsFilter.length ? (
                blogsFilter.map((blogCard) => (
                  <div className="col-4" key={blogCard.id}>
                    <BlogItem
                      img={blogCard.img}
                      title={blogCard.title}
                      author={blogCard.author}
                      excerpt={blogCard.excerpt}
                      category={blogCard.category}
                      id={blogCard.id}
                    />
                  </div>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          </>

          <>
            <h2 className="mb-5">Products</h2>
            <div className="row isotope-grid">
              {productsFilter.length ? (
                productsFilter.map((productCard) => (
                  <div className="col-4" key={productCard.id}>
                    <ProductItem
                      imgSrc={productCard.img}
                      titleCard={productCard.title}
                      priceCard={productCard.price}
                      itemId={productCard.id}
                    />
                  </div>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchTerm = (context.query.product as string) || "";

  const baseBlogURL = "http://localhost:5001/blogs";
  const baseProductURL = "http://localhost:5001/products";

  const [categoryRes, authorRes, excerptRes, titleRes] = await Promise.all([
    fetch(`${baseBlogURL}?category_like=${searchTerm}`),
    fetch(`${baseBlogURL}?author_like=${searchTerm}`),
    fetch(`${baseBlogURL}?excerpt_like=${searchTerm}`),
    fetch(`${baseBlogURL}?title_like=${searchTerm}`),
  ]);

  const [genderManRes, genderWomanRes] = await Promise.all([
    fetch(`${baseProductURL}?gender_like=man`),
    fetch(`${baseProductURL}?gender_like=women`),
  ]);

  const categoryBlogs = await categoryRes.json();
  const authorBlogs = await authorRes.json();
  const excerptBlogs = await excerptRes.json();
  const titleBlogs = await titleRes.json();

  const genderManProducts = await genderManRes.json();
  const genderWomanProducts = await genderWomanRes.json();

  const filteredManProducts = genderManProducts.filter(
    (product: ProductCardSkeletonProps) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWomanProducts = genderWomanProducts.filter(
    (product: ProductCardSkeletonProps) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allBlogs = [
    ...categoryBlogs,
    ...authorBlogs,
    ...excerptBlogs,
    ...titleBlogs,
  ];

  const allProducts = [...filteredManProducts, ...filteredWomanProducts];

  const uniqueBlogs = Array.from(
    new Map(allBlogs.map((blog) => [blog.id, blog])).values()
  );

  const uniqueProducts = Array.from(
    new Map(allProducts.map((product) => [product.id, product])).values()
  );

  return {
    props: {
      blogsFilter: uniqueBlogs,
      productsFilter: uniqueProducts,
    },
  };
};
export default Search;
