import { ProTable } from "@ant-design/pro-components";
import { applications } from "../data";

export default () => {

  const members = applications.filter(i=>i.status==="Approved");

  const columns=[
    {title:"Họ tên",dataIndex:"name"},
    {title:"Email",dataIndex:"email"},
    {title:"SĐT",dataIndex:"phone"},
    {title:"CLB",dataIndex:"club"}
  ];

  return (
    <ProTable
      rowKey="id"
      columns={columns}
      dataSource={members}
    />
  );
};