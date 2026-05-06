import { Table, Button, Modal, Form, Input, Select } from "antd";
import { useState } from "react";
import { useApp, AppProvider } from "../context";

function Page(){

  const { destinations, addDestination, deleteDestination } = useApp();
  const [open,setOpen]=useState(false);

  const columns=[
    {title:"Tên",dataIndex:"name"},
    {title:"Loại",dataIndex:"type"},
    {title:"Chi phí",dataIndex:"price"},
    {
      title:"Action",
      render:(_,record)=>(
        <Button danger onClick={()=>deleteDestination(record.id)}>
          Xóa
        </Button>
      )
    }
  ];

  const onFinish=(values)=>{
    addDestination(values);
    setOpen(false);
  };

  return(

    <div>

      <Button type="primary" onClick={()=>setOpen(true)}>
        Thêm điểm đến
      </Button>

      <Table
        style={{marginTop:20}}
        columns={columns}
        dataSource={destinations}
      />

      <Modal open={open} footer={null} onCancel={()=>setOpen(false)}>

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item name="name" label="Tên địa điểm" rules={[{required:true}]}>
            <Input/>
          </Form.Item>

          <Form.Item name="type" label="Loại hình">
            <Select>
              <Select.Option value="Biển">Biển</Select.Option>
              <Select.Option value="Núi">Núi</Select.Option>
              <Select.Option value="Thành phố">Thành phố</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="price" label="Chi phí">
            <Input/>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Lưu
          </Button>

        </Form>

      </Modal>

    </div>

  )

}

export default ()=>(
  <AppProvider>
    <Page/>
  </AppProvider>
)