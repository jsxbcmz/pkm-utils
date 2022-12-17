import {useState,useEffect} from 'react';
import {Table,Input,Modal,Form,Select} from 'antd';
import fsUtils from '../utils/fs';
import {TYPE} from '../common/data';

export default () => {

    const [infoList,setInfoList] = useState([]);
    const [name,setName] = useState('');
    const [visible,setVisible] = useState(false);
    const [editItem,setEditItem] = useState({});

    useEffect(()=>{
        fsUtils.readJson('raidPokemon.json',setInfoList)
    },[])

    const onChangeName = e=>{
        setName(e.target.value)
    }

    const onEdit = record =>{
        setEditItem(record);
        setVisible(true);
    }

    const onSubmit = (values={}) =>{
        const { moves = [],special = ''} = values;
        const infoItem = infoList.find(i=>i.id ===editItem.id);
        infoItem.moves = moves;
        infoItem.special = special;
        fsUtils.writeJson('raidPokemon.json',infoList,()=>{
            fsUtils.readJson('raidPokemon.json',setInfoList)
          })
    }

    const columns =[
        {
            title:'名字',
            dataIndex:'name',
            width:'150px'
        },
        {
            title:'技能类型',
            dataIndex:'moves',
            render:v=>v.join(','),
            width:'200px'
        },
        {
            title:'注意备注',
            dataIndex:'special'
        },
        {
            title:'操作',
            dataIndex:'id',
            width:'100px',
            render:(_v,record)=><a onClick={()=>{onEdit(record)}}>编辑</a>
        },
    ]

    return(
        <div>
            <Input onChange={onChangeName} value={name} style={{width:'200px'}} placeholder='宝可梦名字'></Input>
            <Table 
            columns={columns}
            dataSource={infoList.filter(i=>name? i.name.includes(name):true)}
            />
            {
                visible ? <InfoModal editItem={editItem} setVisible={setVisible} onSubmit={onSubmit}/> : null
            }
        </div>
    )
}

function InfoModal({editItem,setVisible,onSubmit}){
  const [form] = Form.useForm();

    const onCancel = ()=>{
        setVisible(false);
    }

    const onFinish = () => {
        onSubmit(form.getFieldsValue());
        onCancel();
      };

    return(
        <Modal 
            title='修改'
            destroyOnClose
            onOk={onFinish}
            cancelText='取消'
            okText='确认'
            onCancel={onCancel}
            visible
        >
  <Form
      name="basic"
      initialValues={editItem}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      autoComplete="off"
      style={{margin:'10px 0'}}
    >
       <Form.Item
        label="技能类型"
        name="moves"
      >
        <Select  showSearch mode='multiple' allowClear >
          {TYPE.map(i=><Select.Option value={i.name}>
            {i.name}
          </Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="special"
        label="注意备注"
      >
        <Input placeholder='注意备注'/>
      </Form.Item>
        </Form>
        </Modal>
    )
}