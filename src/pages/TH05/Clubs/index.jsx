import { useState } from "react";
import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSwitch
} from "@ant-design/pro-components";
import { Button, message } from "antd";
import { clubs } from "../data";

export default () => {

  const [data,setData] = useState([...clubs]);

  const columns = [
    { title:"Tên CLB", dataIndex:"name" },
    { title:"Ngày thành lập", dataIndex:"date" },
    { title:"Chủ nhiệm", dataIndex:"leader" },
    {
      title:"Hoạt động",
      dataIndex:"active",
      render:v=>v?"Có":"Không"
    },
    {
      title:"Action",
      valueType:"option",
      render:(t,r)=>[
        <a
          onClick={()=>{
            const newData=data.filter(i=>i.id!==r.id);
            setData(newData);
          }}
        >
          Xóa
        </a>
      ]
    }
  ];

  return (
    <ProTable
      rowKey="id"
      columns={columns}
      dataSource={data}
      toolBarRender={()=>[
        <ModalForm
          title="Thêm CLB"
          trigger={<Button type="primary">Thêm CLB</Button>}
          onFinish={async(values)=>{
            const newClub={
              id:Date.now(),
              ...values
            };
            clubs.push(newClub);
            setData([...clubs]);
            message.success("Thêm thành công");
            return true;
          }}
        >
          <ProFormText name="name" label="Tên CLB" required/>
          <ProFormDatePicker name="date" label="Ngày thành lập"/>
          <ProFormText name="leader" label="Chủ nhiệm"/>
          <ProFormSwitch name="active" label="Hoạt động"/>
        </ModalForm>
      ]}
    />
  );
};