import BlogCard from "@/microComponents/BlogCard";
import { useState, useEffect } from "react";
import Newestblogs from "./Newestblogs";

interface Blog {
  id: string;
  title: string;
  text: string;
  img: string;
  category: string;
}

interface FilterBlogProps {
  blogs: Blog[];
}

function FilterBlog({ blogs }: FilterBlogProps) {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesFilters =
        activeFilters.length === 0 || activeFilters.includes(blog.category);
      const matchesSearch =
        blog.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        blog.text.toLowerCase().includes(searchInput.toLowerCase());
      return matchesFilters && matchesSearch;
    });
    setFilteredBlogs(filtered);
  }, [blogs, activeFilters, searchInput]);

  const handleFilterClick = (category: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <section className="filterBlogSection">
      <div className="buttonsWrapperFilter">
        <button
          onClick={() => setActiveFilters([])}
          className={activeFilters.length === 0 ? "activeFilterBtn" : ""}
        >
          Сите
        </button>
        <button
          onClick={() => handleFilterClick("Регрутирање")}
          className={
            activeFilters.includes("Регрутирање") ? "activeFilterBtn" : ""
          }
        >
          Регрутирање
        </button>
        <button
          onClick={() => handleFilterClick("Компензации")}
          className={
            activeFilters.includes("Компензации") ? "activeFilterBtn" : ""
          }
        >
          Компензации
        </button>
        <button
          onClick={() => handleFilterClick("HR согласност")}
          className={
            activeFilters.includes("HR согласност") ? "activeFilterBtn" : ""
          }
        >
          HR согласност
        </button>
        <button
          onClick={() => handleFilterClick("Организациска структура")}
          className={
            activeFilters.includes("Организациска структура")
              ? "activeFilterBtn"
              : ""
          }
        >
          Организациска структура
        </button>
        <button
          onClick={() => handleFilterClick("Обучување")}
          className={
            activeFilters.includes("Обучување") ? "activeFilterBtn" : ""
          }
        >
          Обучување
        </button>
        <button
          onClick={() => handleFilterClick("Развој")}
          className={activeFilters.includes("Развој") ? "activeFilterBtn" : ""}
        >
          Развој
        </button>
        <button
          onClick={() => handleFilterClick("Менаџмент на перформанси")}
          className={
            activeFilters.includes("Менаџмент на перформанси")
              ? "activeFilterBtn"
              : ""
          }
        >
          Менаџмент на перформанси
        </button>
      </div>

      <form className="formBlogFilter" action="submit">
        <input
          type="text"
          placeholder="Пребарај"
          value={searchInput}
          onChange={handleSearchChange}
          className="filterBlogsSearch"
        />
      </form>

      <Newestblogs />

      <h2 className="searchResultsH2">Резултати:</h2>
      <div className="blogCardsWrapper">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              id={blog.id}
              title={blog.title}
              text={blog.text}
              img={blog.img}
              category={blog.category}
              key={blog.id}
              cardType="blog"
            />
          ))
        ) : (
          <p>Нема резултати</p>
        )}
      </div>
    </section>
  );
}

export default FilterBlog;
