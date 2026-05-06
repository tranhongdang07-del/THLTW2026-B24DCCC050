import { Row, Col, Input, Pagination, Tag } from "antd";
import { useEffect, useState } from "react";
import { useLocation, history } from "umi";
import PostCard from "./components/PostCard";
import useDebounce from "./hooks/useDebounce";
import data from "./data";
import { getPosts, initPosts } from "./services/postService";

export default function TH07() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tag = query.get("tag");

  const debounced = useDebounce(keyword);

  useEffect(() => {
    initPosts(data);
    setPosts(getPosts());
  }, []);

  const allTags = [...new Set(posts.flatMap(p => p.tags || []))];

  // 🔥 FILTER CHUẨN
  const filtered = posts
    .filter(p => p.status === "published")
    .filter(p =>
      p.title.toLowerCase().includes(debounced.toLowerCase())
    )
    .filter(p => (tag ? p.tags.includes(tag) : true));

  const paginated = filtered.slice((page - 1) * 9, page * 9);

  return (
    <>
      <h1>Trang Blog</h1>

      <Input.Search
        placeholder="Tìm kiếm..."
        onChange={e => setKeyword(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* TAG LIST */}
      <div style={{ marginBottom: 16 }}>
        <b>Lọc theo thẻ: </b>

        {allTags.map(t => (
          <Tag
            key={t}
            color={t === tag ? "blue" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/th07?tag=${t}`)}
          >
            {t}
          </Tag>
        ))}

        {/* clear */}
        {tag && (
          <Tag
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/th07`)}
          >
            Xóa lọc
          </Tag>
        )}
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