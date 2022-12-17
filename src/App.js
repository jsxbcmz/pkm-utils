import { useState } from 'react';
import Raid from '../src/pages/raid-6x';
import Menu from '../src/pages/menu';
import EditPokemonInfo from '../src/pages/editPokemonInfo';

import {Tabs} from 'antd';

function App() {
  const [activeTab,setActiveTab] = useState('1');

  const renderContemt= ()=>{
    switch(activeTab){
      case '2' :
        return <Menu/>
        case '3' :
        return <EditPokemonInfo />
      default:
        return <Raid />
    }
  }
  return (

      <div style={{margin:'10px'}}>
        <Tabs
          defaultActiveKey="1"
          onChange={setActiveTab}
          items={[
            {
              label: `6星团战`,
              key: '1',
            },
            {
              label: `闪耀力对应材料`,
              key: '2',
            },
            {
              label: `宝可梦信息更新`,
              key: '3',
            },
          ]}
        />

      
      {renderContemt()}
    </div>
  );
}


export default App;
