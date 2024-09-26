import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PageTitle from "../../components/PageTitle";
import RelatedBlogs from "../../components/RelatedBlogs";

export interface BlogPageProps {
  blog: {
    id: string;
    author: string;
    date: string;
    category: string;
    excerpt: string;
    img: string;
    title: string;
    first_content: string;
    second_content: string;
  };
}

const BlogDetail: NextPage<BlogPageProps> = ({ blog }) => {
  const { title, author, date, category, img, first_content, second_content } =
    blog;

  return (
    <>
      <Head>
        <title>Store - {title}</title>
        <meta name="description" content={`Read about ${title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={title} />

      <section className="bg0 p-t-52 p-b-20">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                <div className="wrap-pic-w how-pos5-parent">
                  <img src={img} alt={title} />
                </div>

                <div className="p-t-32">
                  <span className="flex-w align-items-center flex-m stext-111 cl2 p-b-19">
                    <span className="flex-c-m mr-3 bor7 p-lr-15 trans-04">
                      {category}
                    </span>

                    <span>
                      <span className="cl4">By</span> {author}
                      <span className="cl12 m-l-4 m-r-6">|</span>
                    </span>

                    <span>{date}</span>
                  </span>

                  <h4 className="ltext-109 cl2 p-b-28">{title}</h4>

                  <p className="stext-117 cl6 p-b-26">{first_content}</p>

                  <p className="stext-117 cl6 p-b-26">{second_content}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <RelatedBlogs />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:5001/blogs/${id}`);
  const blog = await res.json();

  return {
    props: {
      blog,
    },
  };
};

export default BlogDetail;
