import { Card, Row, Col, Rate, Input, Select } from "antd";
import { useState } from "react";
import { useApp, AppProvider } from "../context";

const { Meta } = Card;

function Page() {

  const { destinations } = useApp();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const filtered = destinations
    .filter((d) => (type ? d.type === type : true))
    .filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );

  return (

    <div>

      <h2>Khám phá điểm đến</h2>

      <Row gutter={16} style={{ marginBottom: 20 }}>

        <Col>
          <Input.Search
            placeholder="Tìm địa điểm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col>
          <Select
            placeholder="Loại hình"
            style={{ width: 150 }}
            allowClear
            onChange={(v) => setType(v)}
          >
            <Select.Option value="Biển">Biển</Select.Option>
            <Select.Option value="Núi">Núi</Select.Option>
            <Select.Option value="Thành phố">Thành phố</Select.Option>
          </Select>
        </Col>

      </Row>

      <Row gutter={[20,20]}>

        {filtered.map((item) => (

          <Col xs={24} md={12} lg={8} key={item.id}>

            <Card hoverable cover={<img src={item.image} />}>

              <Meta title={item.name} description={item.desc} />

              <Rate disabled defaultValue={item.rating} />

              <p>Chi phí: ${item.price}</p>

            </Card>

          </Col>

        ))}

      </Row>

    </div>

  );
}

export default () => (
  <AppProvider>
    <Page />
  </AppProvider>
);