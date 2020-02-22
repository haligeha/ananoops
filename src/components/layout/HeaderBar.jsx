import React from 'react';
import { Layout, Menu, Dropdown, Icon, Breadcrumb,Modal,Form,Input,message} from 'antd';
// import customUrl from '../../images/custom.jpeg';
import { connect } from 'react-redux';
import ChangePwd from './changePws'
import {reqChangePwd} from '../../axios/index'
const { Header } = Layout;
const {Item} = Form
class UserInfo extends React.Component {
  state = {
    visible: false,   // 菜单是否显示
    isShowChangePwd:false
  };

  handleLogout = e => {
    if (e.key === 'outLogin') {
      this.setState({
        visible: false
      });
      //window.localStorage.removeItem('loggedIn');
      window.localStorage.clear();
      this.props.history.push('/login');
    }
  };

  handleUserInfo = () => {

  }

  handleChangePwd = async () => {
    
    const pwd = this.form.getFieldsValue()
    this.form.resetFields()
    console.log('修改,模态框采集的pwd：',pwd)
    if(pwd.newPassword==pwd.confirmPwd){
      this.setState({isShowChangePwd:false})
      const logName = JSON.parse(window.localStorage.getItem('loginAfter')).loginAuthDto.loginName
      console.log(logName)
      const dataPost = {}
      Object.assign(dataPost,pwd,{loginName:logName})
      console.log(dataPost)
      const result = await reqChangePwd(dataPost)
      if(result.status==200){
        message.success(result.message)
      }else{
        message.error(result.message)
      }
    }else{
      message.error("两次新密码输入不一致，请重新输入")

    }
  }

  isShowChangePwd = (e) => {
    console.log(123)
    this.setState({isShowChangePwd:true})
    
    
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const {isShowChangePwd} = this.state
    const menu = (
      <Menu>
        {/* <Menu.Item key="userInfo" onClick={this.handleUserInfo}>个人信息</Menu.Item> */}
        <Menu.Item key="outLogin" onClick={this.handleLogout}>退出登录</Menu.Item>
        <Menu.Item key="changePwd" onClick={this.isShowChangePwd}>修改密码</Menu.Item>
      </Menu>
    );
   
    
    return (
      <div>
        <Dropdown overlay={menu} onVisibleChange={this.handleVisibleChange} visible={this.state.visible}>
          <div className="ant-dropdown-link">
          用户
            <Icon type="caret-down" />
          </div>
        </Dropdown>
        <Modal
          title="修改密码"
          visible={isShowChangePwd}
          onOk={this.handleChangePwd}
          onCancel={() => {this.setState({isShowChangePwd:false});this.form.resetFields();}}
          okText="确认"
          cancelText="取消"
        >
          <ChangePwd setForm={(form)=>{this.form = form}}/>
        </Modal>
      </div>
    );
  }
}

const HeaderBar = (props) => {
  
  console.log(props.menuName)
  return (
    <Header>
      <Breadcrumb>
        {
          props.menuName.map((item) => {
            return (
              <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            );
          })
        }
      </Breadcrumb>
      <UserInfo history={props.history}/>
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    menuName: state.menuName
  }
};

export default connect(mapStateToProps)(HeaderBar);