import { useState } from "react";
import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormSelect
} from "@ant-design/pro-components";
import { Button } from "antd";
import { applications, clubs } from "../data";

export default () => {

  const [data,setData] = useState([...applications]);
  const [selected,setSelected] = useState([]);

  const approve = () => {
    const newData=data.map(i=>{
      if(selected.includes(i.id)) i.status="Approved";
      return i;
    });
    setData([...newData]);
  };

  const reject = () => {
    const newData=data.map(i=>{
      if(selected.includes(i.id)) i.status="Rejected";
      return i;
    });
    setData([...newData]);
  };

  const columns=[
    {title:"Họ tên",dataIndex:"name"},
    {title:"Email",dataIndex:"email"},
    {title:"SĐT",dataIndex:"phone"},
    {title:"CLB",dataIndex:"club"},
    {title:"Trạng thái",dataIndex:"status"}
  ];

  return (
    <ProTable
      rowKey="id"
      columns={columns}
      dataSource={data}
      rowSelection={{
        onChange:(keys)=>setSelected(keys)
      }}
      toolBarRender={()=>[
        <Button onClick={approve}>
          Duyệt {selected.length}
        </Button>,
        <Button danger onClick={reject}>
          Từ chối {selected.length}
        </Button>,
        <ModalForm
          title="Đăng ký CLB"
          trigger={<Button type="primary">Thêm đơn</Button>}
          onFinish={async(values)=>{
            const newItem={
              id:Date.now(),
              status:"Pending",
              ...values
            };
            applications.push(newItem);
            setData([...applications]);
            return true;
          }}
        >
          <ProFormText name="name" label="Họ tên"/>
          <ProFormText name="email" label="Email"/>
          <ProFormText name="phone" label="SĐT"/>
          <ProFormSelect
            name="club"
            label="CLB"
            options={clubs.map(c=>({
              label:c.name,
              value:c.name
            }))}
          />
        </ModalForm>
      ]}
    />
  );
};