import React from "react"

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 250,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 250,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}))
export default function AppSideBar(props) {
    const classes = useStyles()

    return (<Drawer
            className={classes.drawer}
            variant="persistent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            open={props.isOpened}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>


    )
}