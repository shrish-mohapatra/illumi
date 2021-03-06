import React from 'react';
import { Layout, Breadcrumb, Tooltip, message } from 'antd';
import {
    PlusOutlined,
    SettingOutlined,
    CloseOutlined,
    WechatOutlined
} from '@ant-design/icons';

import PageForm from '../forms/PageForm'

const { Header } = Layout;

class InnerHeader extends React.Component {
    formRef = React.createRef();
    pageRef = React.createRef();

    state = {
        showModal: false,
        formType: '',

        // modal fields
        title: '',
        image: '',
        video: '',
        tag: '',
        content: '',
    }

    deletePage = async(e) => {
        await this.props.deletePage(this.props.page.id)
        message.success("Deleted Page!")
    }

    // modal controller
    showModal = (e) => {
        e.preventDefault()
        this.setState({
            showModal: true,
        });
    };

    onModalChange = values => {
        this.setState({[values.target.id]: values.target.value})
    }

    onSelectChange = values => {
        this.setState({tag: values})
    }

    handleOk = async (e) => {
        this.setState({
            showModal: false,
        });

        const formData = this.formRef.current.getFieldsValue()
        let initialFields;
        
        if (this.pageRef.current) {
            initialFields = this.pageRef.current.state.initFields
        }

        if (this.state.formType === 'create') {
            await this.props.addPage(this.state, this.props.server.id)
            message.success("Created Page!")

        } else if(JSON.stringify(formData) !== JSON.stringify(initialFields)) {
            await this.props.editPage(formData, this.props.page.id)
            message.success("Edited Page!")
        }

        this.setState({
            title: '',
            image: '',
            video: '',
            tag: '',
            content: '',
        });
    };

    handleCancel = e => {
        this.setState({
            showModal: false,
        });
    };

    createForm = async () => {
        this.setState({
            showModal: true,
            formType: 'create',
        });        
    }

    editForm = async () => {
        this.setState({
            showModal: true,
            formType: 'edit',
        });
    }

    addRoom = async () => {
        await this.props.addRoom(this.props.page.id)
        message.success("Added Room!")
    }

    addRoomBtn = () => {
        if (this.props.page.rooms.length < 1) return    <Tooltip placement="bottom" title='Add room'>
                                                            <span onClick={this.addRoom}><WechatOutlined className="page-settings-icon" /></span>                                            
                                                        </Tooltip>
    }

    render() {
        return (
            <Header className="main-header">
                <Breadcrumb style={{ margin: '0 0' }}>
                    <Breadcrumb.Item className="header-bold">{ this.props.server.name }</Breadcrumb.Item>
                    <Breadcrumb.Item className="header-light">{ this.props.page.title }</Breadcrumb.Item>
                    <div className="menu-icon-tray" style={{display: "inline-block"}}>
                        <Tooltip placement="bottom" title='Edit Page'>
                            <span onClick={this.editForm}><SettingOutlined className="page-settings-icon"/></span>
                        </Tooltip>
                        <Tooltip placement="bottom" title='Delete Page'>
                            <span onClick={this.deletePage}><CloseOutlined className="page-settings-icon"/></span>
                        </Tooltip>
                        <Tooltip placement="bottom" title='Create New Page'>
                            <span onClick={this.createForm}><PlusOutlined className="page-settings-icon" /></span>    
                        </Tooltip>
                        
                        {
                            this.addRoomBtn()
                        }
                        
                    </div>      
                </Breadcrumb>

                <PageForm
                    ref={this.pageRef}
                    visible={this.state.showModal}
                    formRef={this.formRef}
                    formType={this.state.formType}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onModalChange={this.onModalChange}
                    onSelectChange={this.onSelectChange}
                    page={this.props.page}
                    />
            </Header>
        )
    }
}

export default InnerHeader;