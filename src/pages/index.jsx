import { Row, Col, Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import TagFilter from "./components/TagFilter";
import useDebounce from "./hooks/useDebounce";
import data from "./data";
import { getPosts, initPosts } from "./services/postService";

export default function TH07() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState(null);
  const [page, setPage] = useState(1);

  const debounced = useDebounce(keyword);

  useEffect(() => {
    initPosts(data);
    setPosts(getPosts());
  }, []);

  const tags = [...new Set(posts.flatMap(p => p.tags))];

  const filtered = posts
    .filter(p => p.title.toLowerCase().includes(debounced.toLowerCase()))
    .filter(p => tag ? p.tags.includes(tag) : true);

  const paginated = filtered.slice((page - 1) * 9, page * 9);

  return (
    <>
      <h1>Trang Blog</h1>

      <Input.Search
        placeholder="Tìm kiếm bài viết..."
        onChange={e => setKeyword(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <div style={{ marginBottom: 16 }}>
        <b>Lọc theo thẻ: </b>
        <TagFilter tags={tags} onSelect={setTag} />
      </div>

      <Row gutter={[16, 16]}>
        {paginated.map(p => (
          <Col span={8} key={p.id}>
            <PostCard post={p} />
          </Col>
        ))}
      </Row>

      <Pagination
        total={filtered.length}
        pageSize={9}
        onChange={setPage}
        style={{ marginTop: 20 }}
      />
    </>
  );
}