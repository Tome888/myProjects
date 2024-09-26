import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  img: string;
}

const RelatedBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const randomStart = Math.floor(Math.random() * 8);
        const response = await fetch(
          `http://localhost:5001/blogs?_start=${randomStart}&_limit=3`
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h4 className="mtext-112 cl2 mb-3">Related Blogs</h4>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-4">
            <Link href={`/blog/${blog.id}`} passHref>
              <a className="wrap-pic-w">
                <img src={blog.img} alt={blog.title} className="img-fluid" />
                <div className="p-t-8 mt-1">
                  <div className="stext-116 cl8 hov-cl1 trans-04 mb-3">
                    {blog.title}
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedBlogs;
