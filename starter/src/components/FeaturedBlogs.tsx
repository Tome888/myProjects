import React from "react";
import { BlogsCardProps } from "../pages";
import { useRouter } from "next/router";
import { threadId } from "worker_threads";

interface arrBlogsProps {
  arrBlog: BlogsCardProps[];
}
const FeaturedBlogs: React.FC<arrBlogsProps> = ({ arrBlog }) => {
  const router = useRouter();

  const navigateToBlog = (theId: string) => {
    router.push(`/blog/${theId}`);
  };
  return (
    <section className="sec-blog bg0 p-t-60 p-b-90">
      <div className="container">
        <div className="p-b-66">
          <h3 className="ltext-105 cl5 txt-center respon1">Our Blogs</h3>
        </div>

        <div className="row">
          {/* blog skeleton */}

          {arrBlog.map((blog) => {
            return (
              <div
                key={blog.id}
                className="col-sm-6 col-md-4 p-b-40"
                onClick={() => navigateToBlog(blog.id)}
              >
                <a className="blog-item">
                  <div className="hov-img0">
                    <img src={blog.img} alt="IMG-BLOG" className="img-fluid" />
                  </div>

                  <div className="p-t-15">
                    <div className="stext-107 flex-w p-b-14">
                      <span className="m-r-3">
                        <span className="cl4">By</span>

                        <span className="cl5">{blog.author}</span>
                      </span>

                      <span>
                        <span className="cl4">on</span>

                        <span className="cl5 ml-1">{blog.date}</span>
                      </span>
                    </div>

                    <h4 className="p-b-12">
                      <div className="mtext-101 cl2 hov-cl1 trans-04">
                        {blog.title}
                      </div>
                    </h4>

                    <p className="stext-108 cl6">{blog.excerpt}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
