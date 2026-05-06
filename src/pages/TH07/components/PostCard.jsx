import { Card, Tag } from "antd";
import { history } from "umi";

export default function PostCard({ post }) {
  return (
    <Card
      hoverable
      cover={<img src={post.thumbnail} />}
      onClick={() => history.push(`/th07/post/${post.slug}`)}
    >
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>

      <div>
        {post.tags?.map(tag => (
          <Tag
            key={tag}
            onClick={(e) => {
              e.stopPropagation(); // 🔥 tránh click card
              history.push(`/th07?tag=${tag}`);
            }}
            style={{ cursor: "pointer" }}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
}