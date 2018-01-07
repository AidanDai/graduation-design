import React, {　Component } from 'react'
import { Carousel, Pagination, Button, Modal, Icon, Form,  Input, Radio, Select } from 'antd'
import IHeader from '../../components/header'
import IMenu from '../../components/menu'
import IPagination from '../../components/pagination'
import IBreadcrumb from '../../components/breadcrumb'
import IFooter from '../../components/footer'
import config from '../../../config'
import { getUniqueKey } from '../../common/javascripts/utils'
import axios from 'axios'

import '../../common/stylesheets/common.less'
import './stylesheets/list.less'
import './stylesheets/detials.less'

const FormItem = Form.Item
const Option = Select.Option
const apisVersion = `${config.apis.perfix}/${config.apis.version}`

export default class Detials extends 　Component {

	constructor(...args) {
		super(...args)

		this.graffitiImage = ''
		this.questionOptionKeys = Array.from({length: 5}, () => getUniqueKey())
		
		this.state = {
			graffitiVisible: false,
			questionVisible: false,
			goods: {}
		}
	}

	componentWillMount() {
		let path = window.location.pathname
		let id = path.slice(path.indexOf('goods/') + 6)
		
		axios.get(`${apisVersion}/goods/${id}`).then((res) => {
			console.log(res)
			if (res.data.code === '000') {
				this.setState({
	        goods: res.data.data
	      })
			} else {
				console.error(res.data)
			}
    }).catch((e) => {
      console.error(e)
    })
	}

	showGraffitiModal(v) {
		this.setState({graffitiVisible: true})
		
		setTimeout(function() {
			applyDataUrlToCanvas(v)
		}, 0)
	}

	handleGraffitiOk() {
		// download()
		// this.setState({graffitiVisible: false})
	}

	handleGraffitiCancel() {
		this.setState({graffitiVisible: false})
	}

	renderGraffitiModal() {		
		return (
			<Modal
					className="graffiti-modal"
					style={{padding: 0, margin: 0, position: 'fixed', left: 0, top: 0}}
					width={window.innerWidth}
					visible={this.state.graffitiVisible}
          onCancel={this.handleGraffitiCancel.bind(this)}
          footer={null}
        >
        <Button 
        	onClick={this.handleGraffitiOk.bind(this)}
        	className="graffiti-save">
        	<Icon type="check" />
        </Button>
        <canvas id="graffiti-canvas">
					<p>Sorry, you need a modern browser like IE9,IE10,FF or Chrome</p>
				</canvas>
      </Modal>
		)
	}

	showQuestionModal() {
		this.setState({questionVisible: true})
	}

	renderQuestions() {
		return (
			<div>
				<ul>
					<li className="detial-questions-item">
						<div className="detial-questions-title">
							1、饭卡上的学号是多少？
						</div>
						<div className="detial-questions-content">
							<div className="que-options">
								<div className="que-options-value">A</div>
								<div className="que-options-title">201304420220</div>
							</div>
							<div className="que-options que-answer">
								<div className="que-options-value">B</div>
								<div className="que-options-title">201304420220</div>
							</div>
							<div className="que-options">
								<div className="que-options-value">C</div>
								<div className="que-options-title">201304420220</div>
							</div>
							<div className="que-options">
								<div className="que-options-value">D</div>
								<div className="que-options-title">201304420220</div>
							</div>
						</div>
					</li>
				</ul>
				<div className="add-question-btn">
					<Button onClick={this.showQuestionModal.bind(this)}><Icon type="plus" /></Button>
				</div>
			</div>
		)
	}

	handleQuestionOk() {
		const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
			this.setState({questionVisible: false})
    })
	}

	handleQuestionCancel() {
		this.setState({questionVisible: false})
	}

	formItemOnChange() {

	}

	renderQuestionModal() {
		const CollectionCreateForm = Form.create()(
			(props) => {
				const { visible, onCancel, onCreate, form } = props
    		const { getFieldDecorator, getFieldValue } = form

		    getFieldDecorator('keys', { initialValue: [] })

    		const formItemLayout = {
		      labelCol: {
		        xs: { span: 23 },
		        sm: { span: 5 },
		      },
		      wrapperCol: {
		        xs: { span: 23 },
		        sm: { span: 19 },
		      },
		    }
		    const formItemLayoutWithOutLabel = {
		      wrapperCol: {
		        xs: { span: 23, offset: 0 },
		        sm: { span: 19, offset: 5 },
		      },
		    }
		    const remove = (k) => {
			    // can use data-binding to get
			    const keys = this.questionOptionKeys

			    // We need at least 4 option
			    if (keys.length <= 5) {
			      return
			    }
			    // can use data-binding to set
			    this.questionOptionKeys = this.questionOptionKeys.filter(key => key !== k)
			    form.setFieldsValue({
			      keys:  this.questionOptionKeys
			    })
			  }
			  const add = () => {
			    // can use data-binding to get
			    const uniqueKey = getUniqueKey()
			    const nextKeys = this.questionOptionKeys.concat(uniqueKey)

			    this.questionOptionKeys.push(uniqueKey)

			    // can use data-binding to set
			    // important! notify form to detect changes
			    form.setFieldsValue({
			      keys: nextKeys,
			    })
			  }

		    const keys = getFieldValue('keys').length < 4 ? this.questionOptionKeys : getFieldValue('keys')
		    const formItems = keys.map((k, index) => {
		    	switch (index) {
		    		case 0:
		    			return (
		    				<FormItem
				          {...formItemLayout}
				          label="问题"
				          required={true}
				          key={this.questionOptionKeys[index]}
				          onChange={this.formItemOnChange.bind(this)}
				        >
				          {getFieldDecorator(`names-${k}`, {
				            validateTrigger: ['onBlur'],
				            rules: [{
				              required: true,
				              whitespace: true,
				              message: "请输入问题内容！",
				            }],
				          })(
				            <Input placeholder="请输入问题内容！" style={{ width: '80%', marginRight: 8 }}/>
				          )}
				        </FormItem>
		    			)
		    		case 1:
		    		case 2:
		    		case 3:
		    		case 4:
		    			return (
		    				<FormItem
				          {...(index === 1 ? formItemLayout : formItemLayoutWithOutLabel)}
				          label={index === 1 ? '选项' : ''}
				          required={true}
				          key={this.questionOptionKeys[index]}
				          onChange={this.formItemOnChange.bind(this)}
				        >
				          {getFieldDecorator(`names-${k}`, {
				            validateTrigger: ['onBlur'],
				            rules: [{
				              required: true,
				              whitespace: true,
				              message: "请输入选项内容！",
				            }],
				          })(
				            <Input placeholder="请输入选项内容" style={{ width: '80%', marginRight: 8 }}/>
				          )}
				        </FormItem>
		        	)
		    		default:
		    			return (
			        <FormItem
			          {...formItemLayoutWithOutLabel}
			          required={false}
			          key={this.questionOptionKeys[index]}
			          onChange={this.formItemOnChange.bind(this)}
			        >
			          {getFieldDecorator(`names-${k}`, {
			            validateTrigger: ['onBlur'],
			            rules: [{
			              required: true,
			              whitespace: true,
			              message: "请输入选项内容或者删除这个输入选项！",
			            }],
			          })(
			            <Input placeholder="请输入选项内容或者删除这个输入选项！" style={{ width: '80%', marginRight: 8 }}/>
			          )}
			          <Icon
			            className="dynamic-delete-button"
			            type="minus-circle-o"
			            onClick={() => remove(this.questionOptionKeys[index])}
			          />
			        </FormItem>
			      )
		    	}
		    })		    

				return (
					<Modal title="新增失物验证问题"
						closable={false}
						visible={visible}
	          onOk={onCreate} 
	          onCancel={onCancel}
	        >
		        <Form>
			        {formItems}
			        <FormItem {...formItemLayoutWithOutLabel}>
			          <Button type="dashed" onClick={add} style={{ width: '80%' }}>
			            <Icon type="plus" /> 增加选项
			          </Button>
			        </FormItem>
			        <FormItem 
			        	{...formItemLayout}
			        	label="设置正确答案"
			          required={true}
			          onChange={this.formItemOnChange.bind(this)}
			        >
			          <Select placeholder="请为验证问题设置正确答案!" style={{ width: '80%' }} onChange={this.formItemOnChange.bind(this)}>
						      <Option value="jack">Jack</Option>
						      <Option value="lucy">Lucy</Option>
						      <Option value="disabled">Disabled</Option>
						      <Option value="Yiminghe">yiminghe</Option>
						    </Select>
			        </FormItem>
			      </Form>
		      </Modal>
		    )
			}
		)

		return (
      <CollectionCreateForm
        visible={this.state.questionVisible}
        onCancel={this.handleQuestionCancel.bind(this)}
        onCreate={this.handleQuestionOk.bind(this)}
      />
    );
	}

	render() {
		const breadcrumb = [
			{label: '失物'},
			{label: '失物管理', url: '/goods'},
			{label: '失物详情'}
		]
		const images = (this.state.goods 
			&& this.state.goods.images
			&& this.state.goods.images.graffitied) || []

		return (
			<div className="page">
				<IMenu></IMenu>
				<section className="page-main">
					<IHeader></IHeader>
					<div className="page-content">
						<IBreadcrumb
							breadcrumb={breadcrumb}
						></IBreadcrumb>
						<div className="det-content">
							<div className="det-imgs">
								{
									images.map((v) => {
										return (
											<div 
												onClick={this.showGraffitiModal.bind(this, v)}
												key={getUniqueKey()} 
												className="det-img">
												<img src={v}/>
											</div>
										)
									})
								}
							</div>
							{this.renderGraffitiModal()}
							{this.renderQuestions()}
							{this.renderQuestionModal()}
						</div>
						<IFooter></IFooter>
					</div>
				</section>
			</div>
		)
	}
}