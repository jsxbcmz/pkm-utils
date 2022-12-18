import {useState,useEffect} from 'react';
import {Select,Form,Checkbox,Input,Button,Popconfirm} from 'antd';
import {TYPE,RESTRAINT} from '../common/data';
import fsUtils from '../utils/fs';

function Raid() {
  const [form] = Form.useForm();
  const [a,setA] = useState('');
  const [b,setB] = useState([]);

  const [c,setC] = useState('');
  const [d,setD] = useState([]);
  const [e,setE] = useState([]);

  const [history,setHistory] = useState([]);
  const [pokemonList,setPokemonList] = useState([]);

  useEffect(()=>{
    setB(matchA(a))
  },[a])

  useEffect(()=>{
    setD(matchC(c,true,pokemonList))
    setE(matchC(c,false,pokemonList))
  },[c])

  useEffect(()=>{
    fsUtils.readJson('history.json',setHistory);
    fsUtils.readJson('raidPokemon.json',setPokemonList);
   },[])

  const onFinish = (values) => {
    values.id = new Date().valueOf();
    history.push(values);
    form.resetFields();
    fsUtils.writeJson('history.json',history,()=>{
      fsUtils.readJson('history.json',setHistory)
    })
  };

  const onChangeA = (v='') =>{
    const type = v === a ? '' : v;
    form.setFieldsValue({type:type})
    setA(type);
  }

  const onChangeC = (v='') =>{
    form.setFieldsValue({name:v})
    setC(v);
  }

  const onDelConfirm = id =>{
    let h = history.filter((i)=>i.id!==id);
    fsUtils.writeJson('history.json',h,()=>{
      fsUtils.readJson('history.json',setHistory)
    })
  }

  return (
    <div className='home'>
     <div className='type'>
      <div>
        坑属性：
      </div>
      <div className='type-conatiner'>
        <div  style={{width:'460px',marginRight:'15px'}}>
          <div>
            选择属性：{a}
          </div>
          {TYPE.map(i=><span 
            className={`type-item ${a === i.name ?'activeType':''}`} 
            style={{background:i.color,borderColor:i.color}}
            onClick={()=>{onChangeA(i.name)}}
            >{i.name}</span>)}
        </div>
        <div style={{width:'290px'}}>
          <div>
            最佳属性：
          </div>
          <div>
          {b?.length ? b.map(i=><span 
            className={`type-item`} 
            style={{
                background:TYPE.find(t=>t.name===i).color,
                borderColor:TYPE.find(t=>t.name===i).color
            }}
            >{i}</span>):'无'}
          </div>
        </div>
      </div>

     </div>
     <div>
        <div  className='type-conatiner'>
          <div style={{width:'150px',marginRight:'15px'}}>
            <div>
              坑宝可梦:
            </div>
            <Select style={{width:'150px'}} showSearch onChange={onChangeC} allowClear>
              {pokemonList.map(i=><Select.Option value={i.name}>{i.name}</Select.Option>)}
            </Select>
          </div>
          <div style={{width:'290px',marginRight:'15px'}}>
              <div>
              避免属性:
              </div>
              {d?.length ? d.sort((d1,d2)=>d2.num-d1.num).map(i=><span 
                className={`type-item ${b.includes(i.name) ? 'badType':''}`} 
                style={{
                    background:TYPE.find(t=>t.name===i.name).color,
                    borderColor:TYPE.find(t=>t.name===i.name).color
                }}
                >{i.name}-{i.num}</span>):'无'}
          </div>
          <div style={{width:'290px'}}>
              <div>
              推荐属性:
              </div>
              {e?.length ? e.sort((d1,d2)=>d2.num-d1.num).map(i=><span 
                className={`type-item ${b.includes(i.name) ? 'goodType':''}`}  
                style={{
                    background:TYPE.find(t=>t.name===i.name).color,
                    borderColor:TYPE.find(t=>t.name===i.name).color
                }}
                >{i.name}-{i.num}</span>):'无'}
          </div>
        </div>
          </div>
      
     {
      c?(
        <div>
          注意：{pokemonList.find(i=>i.name === c).special}
        </div>
      ) : null
     }

    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      style={{margin:'10px 0'}}
    >
       <Form.Item
        label="坑属性"
        name="type"
        noStyle
      >
        <Select style={{width:'100px'}} showSearch placeholder={'属性'} allowClear>
          {TYPE.map(i=><Select.Option value={i.name}>
            {i.name}
          </Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="怪"
        name="name"
        noStyle
      >
        <Select style={{width:'150px'}} showSearch placeholder='怪' allowClear>
          {pokemonList.map(i=><Select.Option value={i.name}>{i.name}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="成了吗"
        name="success"
        noStyle
        valuePropName="checked"
      >
        <Checkbox >是否成功</Checkbox>
      </Form.Item>
      <Form.Item
        name="notice"
        noStyle
      >
        <Input style={{width:'200px'}} placeholder='备注'/>
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {({getFieldValue})=>{
          const type = getFieldValue('type')
          const name = getFieldValue('name')
          if(!(type&&name)) return;
          return(
            <Form.Item
              noStyle
            >
              <Button type="primary" htmlType="submit">
                添加
              </Button>
            </Form.Item>
          )
        }}
      </Form.Item>
    </Form>

    <div>
      历史记录：
    </div>
     {history.filter((i)=>{
      if(a && c){
        return i.type===a && i.name ===c
      }
      return i.type===a || i.name ===c
     }).map((i,index)=><div>
      <span>{index+1}:{i.type} -- {i.name} -- {i?.success ? '成了':'失败'} -- {i?.notice}</span>
      <span>
      <Popconfirm title="删除?" okText="是" cancelText="否" onConfirm={()=>{onDelConfirm(i.id)}}>
        <Button type='link'>删除</Button>
      </Popconfirm>
      </span>
     </div>)}
     
    </div>
  );
}

function matchA(a){
  const list = [];

  if(a){
    Object.keys(RESTRAINT).forEach(i=>{
      Object.keys(RESTRAINT[i]).forEach(j=>{
        if(RESTRAINT[i][j]>1 && j ===a){
          list.push(i);
        }
      })
    })
  }
  
  return list;
}

function matchC(c,bool,pokemonList){
  const list = [];
  if(!c) return [];
  const g = pokemonList.find(i=>i.name === c).moves;

  g.forEach(i=>{
    Object.keys(RESTRAINT[i]).forEach(j=>{
      if(bool ? RESTRAINT[i][j]>1 :RESTRAINT[i][j]<1){
        list.push(j);
      }
    })
  });

  const l = list.reduce((t,c)=>{

      const v = t.find(tItem=>tItem.name === c);
      if(v){
        v.num +=v.num;
      }else{
        t.push({
          name:c,
          num:1
        })
      }
    
    return t;
  },[]);
  return l;
} 

export default Raid;
