import React from 'react';
import './profile.scss';

// COMPONENTS
import { useAuth } from '../../contexts/AuthContext';
import ProfileImg from '../../assets/profile.png';

// MATERIAL DESIGN UI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// ICONS
import EditIcon from '@material-ui/icons/Edit';

export default function Profile() {

  const { currentUser } = useAuth();

  function handleImageChange (event) {
    const image = event.target.files[0];
    // Send to server
  }

  function handleEditPicture() {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  return (
    <div className="profile-container">
      <div className="profile__picture-container">
        <div className="profile__picture__title">
          <p className="profile-user-label">Picture</p>
        </div>
        <div className="profile__picture__image">
          <img src={ProfileImg} alt="User profile" />
          <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
          <Tooltip title="Edit profile picture" placement="top">
            <IconButton onClick={handleEditPicture} className="button">
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div> 
      </div>

      <div className="profile__username-container">
        <div className="profile__username__title">
          <br/>
          <br/>
          <p className="profile-user-label">Name</p>
        </div>
        <div className="profile__username_input">
          <p>Edman Cota</p>
        </div>
      </div>

      <div className="profile__email-container">
        <div className="profile__email__title">
          <br/>
          <br/>
          <p className="profile-user-label">Email</p>
        </div>
        <div className="profile__email_input">
          <p>{currentUser.email}</p>
        </div>
      </div>

      <div className="profile__delete-container">
        <div className="profile__delete__title">
          <br/>
          <br/>
          <p className="profile-delete-label">Delete Account</p>
        </div>
        <div className="profile__delete_input">
          <button>Delete my account</button>
        </div>
      </div>
      
    </div>
  )
}
