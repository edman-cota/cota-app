import React from "react";
import "./sidebar.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import DonutLargeOutlinedIcon from "@material-ui/icons/DonutLargeOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo-container">
        <img src={LogoImg} alt="Logo" width="35" height="35" />
      </div>
      <div className="sidebar__menu-container">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          <ListItem button>
            <ListItemIcon>
              <DonutLargeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={<FormattedMessage id="projects" />} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
}
