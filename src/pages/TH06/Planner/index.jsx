import { List, Button, Card } from "antd";
import { useState } from "react";
import { useApp, AppProvider } from "../context";

function Page(){

  const { destinations } = useApp();
  const [plan,setPlan]=useState([]);

  const add=(item)=>{
    setPlan([...plan,item]);
  };

  const remove=(index)=>{
    const newPlan=[...plan];
    newPlan.splice(index,1);
    setPlan(newPlan);
  };

  return(

    <div>

      <Card title="Danh sách điểm đến">

        <List
          dataSource={destinations}
          renderItem={(item)=>(
            <List.Item
              actions={[
                <Button type="primary" onClick={()=>add(item)}>
                  Thêm
                </Button>
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />

      </Card>

      <Card title="Lịch trình" style={{marginTop:20}}>

        <List
          dataSource={plan}
          renderItem={(item,index)=>(
            <List.Item
              actions={[
                <Button danger onClick={()=>remove(index)}>
                  Xóa
                </Button>
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />

      </Card>

    </div>

  )

}

export default ()=>(
  <AppProvider>
    <Page/>
  </AppProvider>
)