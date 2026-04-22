import { Table, Card, Statistic, Row, Col } from "antd";

export default function Budget(){

  const data=[
    {type:"Ăn uống",cost:300},
    {type:"Di chuyển",cost:400},
    {type:"Lưu trú",cost:500},
    {type:"Tham quan",cost:200}
  ];

  const total=data.reduce((a,b)=>a+b.cost,0);

  const columns=[
    {
      title:"Hạng mục",
      dataIndex:"type"
    },
    {
      title:"Chi phí ($)",
      dataIndex:"cost"
    }
  ];

  return(

    <div>

      <Row gutter={20}>

        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng ngân sách"
              value={total}
              suffix="$"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Số hạng mục"
              value={data.length}
            />
          </Card>
        </Col>

      </Row>

      <Table
        style={{marginTop:20}}
        columns={columns}
        dataSource={data}
        pagination={false}
      />

    </div>

  );

}