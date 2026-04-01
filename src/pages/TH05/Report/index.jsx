import { Card, Statistic, Row, Col, Table } from "antd";
import { clubs, applications } from "../data";

export default () => {

  const totalClubs = clubs.length;

  const pending = applications.filter(i => i.status === "Pending").length;
  const approved = applications.filter(i => i.status === "Approved").length;
  const rejected = applications.filter(i => i.status === "Rejected").length;

  const data = clubs.map((c, index) => {

    const p = applications.filter(a => a.club === c.name && a.status === "Pending").length;
    const a = applications.filter(a => a.club === c.name && a.status === "Approved").length;
    const r = applications.filter(a => a.club === c.name && a.status === "Rejected").length;

    return {
      key: index,
      club: c.name,
      pending: p,
      approved: a,
      rejected: r
    };
  });

  const columns = [
    {
      title: "Câu lạc bộ",
      dataIndex: "club"
    },
    {
      title: "Pending",
      dataIndex: "pending"
    },
    {
      title: "Approved",
      dataIndex: "approved"
    },
    {
      title: "Rejected",
      dataIndex: "rejected"
    }
  ];

  return (
    <div>

      <Row gutter={16} style={{marginBottom:20}}>

        <Col span={6}>
          <Card>
            <Statistic title="Tổng CLB" value={totalClubs} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Pending" value={pending} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Approved" value={approved} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Rejected" value={rejected} />
          </Card>
        </Col>

      </Row>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />

    </div>
  );
};