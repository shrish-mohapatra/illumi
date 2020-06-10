import React from 'react';
import NavMenu from './NavMenu'

class Profile extends React.Component {  
    
    renderMenu = () => {
        return(
            <NavMenu
                user = {this.props.user} //need to sync this  
                logout = {this.props.signout}  
                fetchData = {this.props.fetchData}
                editProfile={this.props.editProfile}                    
            />
        )
    }

    render() {
        return(
            <div className="profile-section">
                <ul className="profile-items">
                    <li className="avatar" ><a href="#" className="avatar-btn"
                        style={{background: `url('${this.props.user.thumbnail}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'}}></a></li>
                    
                    <li className="profile-info">
                        <ul>
                            <li className="info-name">{this.props.user.name}</li>
                            <li className="info-email">{this.props.user.email}</li>
                        </ul>
                    </li>
                    
                    {this.renderMenu()}
                
                </ul>
            </div>
        )
    }
}

export default Profile;