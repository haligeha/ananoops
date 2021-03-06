import React,{Component} from 'react'
import {Form,Input,Button,Radio,Select,Cascader} from 'antd'
import PropTypes from 'prop-types'
import {reqAddressList} from '../../axios/index'
const Item = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
class AddUpdateForm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    groupList:PropTypes.array.isRequired
  }

  state = {
    addressList:[]
  }

  getAddressList = async () => {
    const result = await reqAddressList()
    if(result.code===200){
      const addressList = this.mapAddressList(result.result)
      this.setState({addressList:addressList})
    }
  }

  mapAddressList = (addressList) => {
    return addressList.reduce((pre,curr)=> {
      if(curr.children){
        pre.push({
          value:curr.id,
          label:curr.nodeName,
          children:this.mapAddressList(curr.children)
        })
      }else{
        pre.push({
          value:curr.id,
          label:curr.nodeName
        })
      }
      return pre
    },[])
  }

  onChange = (value) => {
    console.log(value)
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
    this.getAddressList()
  }

  render(){
    const groupList = this.props.groupList
  
    const group = groupList.map((item,index)=>
      <Option value={item[0]} key={index}>{item[1]}</Option>
    )
  
    const {addressList} = this.state


    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>
        <Item label="上级组织：">
          {
            getFieldDecorator('pid',{
              initialValue:'',
              rules:[{
                required:true,
                message:'请选择父组织'
              }]
            })(
              <Select>
                {group}
              </Select>
            )
          }
        </Item>

        <Item label="组织编码：">
          {
            getFieldDecorator('groupCode',{
              initialValue:'',
              rules:[{
                required:true,
              }]
            })(
              <Input placeholder="请输入组织编码"></Input>
            )
          }
         
        </Item>
      
        <Item label="组织名称：">
          {
            getFieldDecorator('groupName',{
              initialValue:'',
              rules:[{
                required:true,
              }]
            })(
              <Input></Input>
            )
          }
         
        </Item>
        <Item label="组织地址：">
          {
            getFieldDecorator('addressList',{
              rules:[{
                required:true
              }]
            })(
              <Cascader 
                options={addressList}
                onChange={this.onChange}
                placeholder="请选择组织地址"
              />
            )
          }
         
        </Item>
        <Item label="联系人：">
          {
            getFieldDecorator('contact',{
              initialValue:'',
              rules:[{
                required:true,
                message:'请输入联系人'
              }]
            })(
              <Input></Input>
            )
          }
        </Item>
        <Item label="联系电话：">
          {
            getFieldDecorator('contactPhone',{
              initialValue:'',
              rules:[{
                required:true,
                message:'请输入联系电话'
              }]
            })(
              <Input></Input>
            )
          }
        </Item>

        <Item label="组织类型：">
          {
            getFieldDecorator('type',{
              initialValue:'',
              
            })(
              <Select>
                <Option value="公司" key="company">公司</Option>
                <Option value="部门" key="apartment">部门</Option>
              </Select>
            )
          }
        </Item>
        <Item label="状态：">
          {
            getFieldDecorator('status',{
              initialValue:'',
              
            })(
              <Radio.Group>
                <Radio value="0">启用</Radio>
                <Radio value="1">禁用</Radio>
              </Radio.Group>
            )
          }
        </Item>
        
      </Form>
    )
  }
}
export default Form.create()(AddUpdateForm)