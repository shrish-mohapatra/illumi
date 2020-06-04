import React from 'react';
import { Menu, Dropdown } from 'antd';
import { SettingFilled } from '@ant-design/icons';

const { SubMenu } = Menu;





class NavMenu extends React.Component {
    
    render() {
        const menu = (
            <Menu>
                <Menu.ItemGroup title="Settings">
                    <Menu.Item className="logout-tag" key="1" onClick={this.props.logout}>Logout</Menu.Item>
                    <Menu.Item className="tag" key="2">Edit Profile</Menu.Item>
                    
                    <SubMenu title="Themes">
                        <Menu.ItemGroup title="Themes">
                            <Menu.Item className="tag" key='light' onClick={this.props.toggleTheme}>Light Theme</Menu.Item>
                            <Menu.Item className="tag" key='dark' onClick={this.props.toggleTheme}>Dark Theme</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    {/* <SubMenu title="disabled sub menu" disabled>
                    <Menu.Item key="3">Close</Menu.Item>
                    </SubMenu> */}
                    <Menu.Item className="close-tag" key="3">Close</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
            );

        return (
            <Dropdown className = "dropdown-menu ant-dropdown-open" trigger={['click']} overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <SettingFilled />
            </a>
        </Dropdown>
        )
    } 
}

export default NavMenu;