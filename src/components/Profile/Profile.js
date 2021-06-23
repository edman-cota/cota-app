import React from "react";
import "./profile.scss";
import { FormattedMessage } from "react-intl";
// COMPONENTS
import { useAuth } from "../../contexts/AuthContext";
import ProfileImg from "../../assets/profile.png";
// MATERIAL DESIGN UI
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// ICONS
import EditIcon from "@material-ui/icons/Edit";
import { LOCALES } from "../../i18n/locales";

const Profile = (props) => {
  const { currentUser } = useAuth();

  function handleImageChange(event) {
    const image = event.target.files[0];
    // Send to server
  }

  function handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  const languages = [
    { name: "English", code: LOCALES.ENGLISH },
    { name: "Español", code: LOCALES.SPANISH },
  ];

  return (
    <div className="profile-container">
      <div className="profile__picture-container">
        <div className="profile__picture__title">
          <p className="profile-user-label">
            <FormattedMessage id="picture"></FormattedMessage>
          </p>
        </div>
        <div className="profile__picture__image">
          <img src={ProfileImg} alt="User profile" />
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={handleImageChange}
          />
          <Tooltip title="Edit profile picture" placement="top">
            <IconButton onClick={handleEditPicture} className="button">
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="profile__username-container">
        <div className="profile__username__title">
          <br />
          <br />
          <p className="profile-user-label">
            <FormattedMessage id="name"></FormattedMessage>
          </p>
        </div>
        <div className="profile__username_input">
          <p>Edman Cota</p>
        </div>
      </div>

      <div className="profile__email-container">
        <div className="profile__email__title">
          <br />
          <br />
          <p className="profile-user-label">
            <FormattedMessage id="email"></FormattedMessage>
          </p>
        </div>
        <div className="profile__email_input">
          <p>{currentUser.email}</p>
        </div>
      </div>

      <div className="profile__language-container">
        <select onChange={props.handleChange} value={props.currentLocale}>
          {languages.map(({ name, code }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="profile__delete-container">
        <div className="profile__delete__title">
          <br />
          <br />
          <p className="profile-delete-label">
            <FormattedMessage id="delete_account"></FormattedMessage>
          </p>
        </div>
        <div className="profile__delete_input">
          <button>
            <FormattedMessage id="delete_my_account"></FormattedMessage>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
