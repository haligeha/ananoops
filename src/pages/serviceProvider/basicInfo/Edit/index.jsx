import React , { Component } from 'react';
import { Form,Input,message,Col,Button,Icon,Row,Upload,Select,Checkbox } from 'antd';
import {Title} from '../../../../components/PageTitle/title/title';
import './index.styl'

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
const provinceData = ['北京','浙江'];
const cityData = {
    北京: ['北京'],
    浙江: ['南京', '苏州', '镇江'],
};

export default class EditBasicInfo extends Component{
    constructor(props){
        super(props);
    }

    state = {
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],
    };
    
    handleProvinceChange = value => {
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],
        });
    };
    
    onSecondCityChange = value => {
        this.setState({
            secondCity: value,
        });
    };

    onPhoneRq(rule, value, callback){
        if(/^\d*$/g.test(value)){
            if(value.length != 11){
                callback('请输入11位电话号码!');
            }
        }else{
            callback('请输入正确的电话号码!');
        }
    };

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    };

    render(){

        const { cities } = this.state;
        const { secondArea } = this.state;

        const formItemLayout  = {
            labelCol : { span: 7 },
            wrapperCol : { span: 12 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 10
            }
        };
        const { getFieldDecorator } = this.props.form;

        const props = {
            name: 'file',
            action: 'https://www.ananops.com/v1/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <div className="store-box">
                <Title title="基础信息：" />
                <Button
                    icon="rollback"
                    className="rollback-Button"
                    size='large'
                    href='/serviceProvider/basicInfo'
                    >
                    返回
                </Button>
                <Form onSubmit = {this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="主体名称"
                                hasFeedback>
                                {getFieldDecorator('company', {
                                    rules: [{ required: true, message: '请输入公司名称!' }]
                                })(
                                    <Input placeholder="请输入公司名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>

                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="主体机构类别"
                                hasFeedback>
                                {getFieldDecorator('companyType', {
                                    rules: [{ required: true, message: '请选择主体机构类别!' }]
                                })(
                                    <Select initialValue="0" style={{ width: 200 }}>
                                        <Option value="0">企业</Option>
                                        <Option value="1">机关法人</Option>
                                        <Option value="2">事业单位</Option>
                                        <Option value="3">社会组织</Option>
                                        <Option value="4">其他</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="主体行业"
                                hasFeedback>
                                {getFieldDecorator('companyIndus')(
                                    <Select initialValue="0" style={{ width: 200 }}>
                                        <Option value="0">通信</Option>
                                        <Option value="1">互联网</Option>
                                        <Option value="2">安防</Option>
                                        <Option value="3">其他</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="法定代表人姓名"
                                hasFeedback>
                                {getFieldDecorator('legalName', {
                                    rules: [{ required: true, message: '请输入法定代表人姓名!' }]
                                })(
                                    <Input placeholder="请输入法定代表人姓名" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="法定代表人联系电话"
                                hasFeedback>
                                {getFieldDecorator('legelPhone',{initialValue:''})(
                                    <Input placeholder="法定代表人联系电话" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="法人代表证件号"
                                hasFeedback>
                                {getFieldDecorator('legalCertiType')(
                                    <div>
                                        <Select initialValue="0" style={{ width: 60 }}>
                                            <Option value="0">身份证</Option>
                                            <Option value="1">护照号</Option>
                                        </Select>
                                        <Input placeholder="输入证件号" style={{ width: 156 }}/>
                                    </div>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="附件上传"
                                hasFeedback>
                                {getFieldDecorator('legalCertification')(
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload"/> 附件上传
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="注册地"
                                hasFeedback>
                                {getFieldDecorator('companyRegistryLoc')(
                                    <div>
                                        <Select
                                            defaultValue={provinceData[0]}
                                            style={{ width: 120 }}
                                            onChange={this.handleProvinceChange}
                                        >
                                        {provinceData.map(province => (
                                            <Option key={province}>{province}</Option>
                                        ))}
                                        </Select>
                                        <Select
                                            style={{ width: 120 }}
                                            value={this.state.secondCity}
                                            onChange={this.onSecondCityChange}
                                        >
                                        {cities.map(city => (
                                            <Option key={city}>{city}</Option>
                                        ))}
                                        </Select>
                                    </div>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="邮政编码"
                                hasFeedback>
                                {getFieldDecorator('postalCode',{initialValue:''})(
                                    <Input placeholder="请填入邮政编码" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="详细地址"
                                hasFeedback>
                                {getFieldDecorator('detailLocation',{initialValue:''})(
                                    <Input placeholder="请填入主体详细地址" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="联系人"
                                hasFeedback>
                                {getFieldDecorator('contactName', {
                                    rules: [{ required: true, message: '请输入联系人!' }]
                                })(
                                    <Input placeholder="请输入联系人姓名" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="联系人手机"
                                hasFeedback>
                                {getFieldDecorator('contactPhone',{
                                    rules:[
                                        {required: true,message:'请填入联系人手机号'},
                                        {validator: this.onPhoneRq}
                                    ]
                                })(
                                    <Input placeholder="请输入手机号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Title title="基本账户开户许可证" />
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="开户行帐号"
                                hasFeedback>
                                {getFieldDecorator('bankCode',{
                                    rules:[
                                        {required:true,message:'必填项不能为空'}
                                    ]
                                })(
                                    <Input placeholder="开户行帐号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="附件上传"
                                hasFeedback>
                                {getFieldDecorator('bankCertification', {
                                    rules: [
                                        {required: true, message: '请上传基本户开户行许可证影印件!' }
                                    ]
                                })(
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload"/> 附件上传
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Title title="营业执照" />
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="类型"
                                hasFeedback>
                                {getFieldDecorator('buLicenseType',{
                                    rules:[
                                        {required:true,message:'根据类型填写，如-有限责任公司'}
                                    ]
                                })(
                                    <Input placeholder="根据类型填写，如-有限责任公司" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="注册资本"
                                hasFeedback>
                                {getFieldDecorator('registCapital')(
                                    <div>
                                        <Select initialValue="0" style={{ width: 80 }}>
                                            <Option value="0">人民币</Option>
                                            <Option value="1">美元</Option>
                                            <Option value="2">欧元</Option>
                                        </Select>
                                        <Input placeholder="输入注册资本" style={{ width: 156 }}/>
                                    </div>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="统一社会信用代码">
                                {getFieldDecorator('companyUscc',{
                                rules: [
                                    {required: true, message: '请输入主体统一社会信用代码!' },
                                    {validator: this.onUsccRq}
                                ]
                                })(
                                    <Input placeholder="若没有统一社会信用代码，请填写（QT+16位数字）" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="有效期"
                                hasFeedback>
                                {getFieldDecorator('expirationDate',{
                                    rules:[
                                        {required:true,message:'填写营业执照有效期'}
                                    ]
                                })(
                                    <Input placeholder="填写营业执照有效期" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="附件上传"
                                hasFeedback>
                                {getFieldDecorator('buLicensePhoto',{
                                    rules: [
                                        {required: true, message: '请上传营业执照影印件!' }
                                    ]
                                })(
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload"/> 附件上传
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="经营范围"
                                hasFeedback>
                                {getFieldDecorator('businessArea',{initialValue:''})(
                                    <TextArea placeholder="请填入公司经营范围" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">保存</Button>
                            <Button size="large" href='/serviceProvider/basicInfo'>取消</Button>
                        </FormItem>
                    </Row>
                </Form>
            </div>
        )
    }
}

EditBasicInfo = Form.create({})(EditBasicInfo);