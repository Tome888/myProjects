import { useRouter } from "next/router";

export interface BlogCardProps {
  id: any;
  title: string;
  text: string;
  img: string;
  category: string;

  cardType: "blog" | "event";
}

function BlogCard({ id, title, text, img, cardType }: BlogCardProps) {
  const router = useRouter();

  const cardTypeFunc = () => {
    const folderType = cardType === "blog" ? "BlogCard" : "eventsImg";
    return folderType;
  };

  const navigateToBlog = (idBlog: string) => {
    const blogPath =
      cardType === "blog" ? "/blog" + `/${idBlog}` : "/events" + `/${idBlog}`;

    router.push(blogPath);
  };

  return (
    <div className="cardWrapperBlog" onClick={() => navigateToBlog(id)}>
      <img src={`/${cardTypeFunc()}/${img}`} alt="" />
      <div className="blogCardtextWrapper">
        <h3>{title}</h3>
        <p className="blogCardText">{text}</p>
        <p className="morePelementCardBlog">Прочитај повеќе</p>
      </div>
    </div>
  );
}
export default BlogCard;
