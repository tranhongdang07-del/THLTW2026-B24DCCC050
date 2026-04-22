import { Tag } from "antd";

export default function TagFilter({ tags, onSelect }) {
  return tags.map(tag => (
    <Tag key={tag} onClick={() => onSelect(tag)}>
      {tag}
    </Tag>
  ));
}