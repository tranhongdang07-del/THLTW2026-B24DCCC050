import { useParams } from "umi";
import { getPosts, updatePost } from "./services/postService";
import { useEffect, useState } from "react";

function parse(text) {
  return text
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
    .replace(/\*(.*?)\*/gim, "<i>$1</i>")
    .replace(/\n/g, "<br/>");
}

export default function Detail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const p = getPosts().find(x => x.slug === slug);
    if (p) {
      p.views += 1;
      updatePost(p);
      setPost(p);
    }
  }, []);

  if (!post) return <div>Không tìm thấy bài viết</div>;

  return (
    <>
      <h1>{post.title}</h1>
      <p>Lượt xem: {post.views}</p>

      <div
        dangerouslySetInnerHTML={{
          __html: parse(post.content),
        }}
      />
    </>
  );
}