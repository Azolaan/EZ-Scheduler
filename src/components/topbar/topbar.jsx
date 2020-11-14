import React from "react"

//import '@rmwc/button/styles';
import { Button } from '@rmwc/button';
import { SimpleMenuSurface, Menu, MenuItem, SimpleMenu, MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { IconButton } from '@rmwc/icon-button';
import { Select } from '@rmwc/select';
import { Switch } from '@rmwc/switch';
import { Radio } from '@rmwc/radio';
import { List, ListItem, ListItemMeta } from '@rmwc/list';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarActionItem } from '@rmwc/top-app-bar';

import './topbar.css';

class TopBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showNotif: false, showSettings: false, notifMute: false, notifMessage: false, notifSound: "Jingle", friendNotif: false, friendMessage: false, friendSound: "Jingle", theme:"Red"};
    }

    toggleNotif() { 
        console.log("notif");
        console.log(this.state.showNotif);
        this.setState({
            showNotif: !this.state.showNotif
        });
        console.log(this.state.showNotif);
    }

    toggleSettings() {
        console.log("settings");
        console.log(this.state.showSettings);
        this.setState({
            showSettings: !this.state.showSettings
        });
        console.log(this.state.showSettings);
    }

    offNotif(){
        this.setState({
            showNotif: false
        });
    }

    offSettings(){
        this.setState({
            showSettings: false
        });
    }

    render() {
        return (
            <div>
                <TopAppBar>
                    <TopAppBarRow>
                        <TopAppBarSection alignStart>
                            <TopAppBarTitle>EZ Scheduler 12:06</TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection alignEnd>
                            <MenuSurfaceAnchor>
                            <TopAppBarActionItem  icon="notifications" onClick={this.toggleNotif.bind(this)}/>
                                <MenuSurface className="notifsSurface" anchorCorner={'bottomStart'} open={this.state.showNotif} onClose={this.offNotif.bind(this)}>
                                    <Notif/>
                                </MenuSurface>
                            </MenuSurfaceAnchor>
                            <MenuSurfaceAnchor>
                            <TopAppBarActionItem  className="settingsIcon" icon="settings" onClick={this.toggleSettings.bind(this)}/>
                                <MenuSurface className="settingsSurface" anchorCorner={'bottomStart'} open={this.state.showSettings} onClose={this.offSettings.bind(this)}>
                                    <Settings/>
                                </MenuSurface>
                            </MenuSurfaceAnchor>
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
            </div>
        )
    }
}

class Notif extends React.Component {
    render() {  
        return (  
            <div style={{ padding : '1px', width: '350px', height: '600px', font: "Roboto" }}>
            <a class = "title"><b>Notifications</b></a>
            <hr/>
                <List class = "list">
                    <ListItem>
                        George wants to be your friend!                        
                        <ListItemMeta icon="close" />
                    </ListItem>
                    <ListItem>
                        ENG 1D04 Midterm soon!
                        <ListItemMeta icon="close" />
                    </ListItem>
                    <ListItem>Cookes
                        
                        <ListItemMeta icon="close" />
                    </ListItem>
                </List>
            </div>  
        );  
    }  
}  

class Settings extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {notifMute: false, notifMessage: false, friendNotif: false, friendMessage: false, theme:"Red"};
    }

    setTheme(t){
        console.log("theme");
        console.log(this.state.theme);
        this.setState({
            theme: t
        });
    }

    toggleMute(){
        console.log("Mute");
        this.setState({
            notifMute: !this.state.notifMute
        });
        console.log(this.state.notifMute);
    }

    togglenotifMessage(){
        console.log("notif Message");
        this.setState({
            notifMessage: !this.state.notifMessage
        });
        console.log(this.state.notifMessage);
    }

    togglefriendMessage(){
        console.log("Friend Message");
        this.setState({
            friendMessage: !this.state.friendMessage
        });
        console.log(this.state.friendMessage);
    }

    togglefriendNotif(){
        console.log("friend Notif");
        this.setState({
            friendNotif: !this.state.friendNotif
        });
        console.log(this.state.friendNotif);
    }


    render() {  
        return (  
            <div style={{ padding : '1px', width: '340px', height: '500px', font: "Roboto" }}>
                <a class = "title"><b>Settings</b></a>
                <hr/>
                <a class = "subtitle">Notifications</a>
                {/* Mute all button*/}
                <a class = "switchLine">
                    <a class = "switchText">Mute All Notifications </a>
                    <Switch class = "switchButton" defaultNotChecked onChange={this.toggleMute.bind(this)}/>
                </a>
                {/* Message Notifications*/}
                <a class = "switchLine">
                    <a class = "switchText">Message Notifications </a>
                    <Switch class = "switchButton" defaultNotChecked  onChange={this.togglenotifMessage.bind(this)} disabled = {this.state.notifMute}/>
                </a>
                {/* Friend Request Notifications*/}
                <a class = "switchLine">
                    <a class = "switchText">Friend Request Notifcations </a>
                    <Switch class = "switchButton" defaultNotChecked onChange={this.togglefriendMessage.bind(this)} disabled = {this.state.notifMute}/>
                </a>
                {/* Friend Request Notifications*/}
                <a class = "switchLine">
                    <a class = "switchText">Message Notifications </a>
                    <Switch class = "switchButton" defaultNotChecked onChange={this.togglefriendNotif.bind(this)} disabled = {this.state.notifMute}/>
                </a>
                <hr/>
                {/*Theme Radio Buttons*/}
                <a class = "subtitle">Theme</a>
                <a class = "radioLine">
                <Radio
                    label="Red"
                    value="Red"
                    name="myRadioGroup"
                    onChange={e => this.setTheme(e.target.value)}
                />
                <Radio
                    label="Blue"
                    value="Blue"
                    name="myRadioGroup"
                    onChange={e => this.setTheme(e.target.value)}
                />
                <Radio
                    label="Yellow"
                    value="Yellow"
                    name="myRadioGroup"
                    onChange={e => this.setTheme(e.target.value)}
                />
                </a>
                <a class = "radioLine">
                <Radio
                    label="Green"
                    value="Green"
                    name="myRadioGroup"
                    onChange={e => this.setTheme(e.target.value)}
                />
                <Radio
                    label="Orange"
                    value="Orange"
                    name="myRadioGroup"
                    onChange={e => this.setTheme(e.target.value)}
                />
                <Radio
                    label="Purple"
                    value="Purple"
                    name="myRadioGroup"
                    onChange={e => this.setTheme(e.target.value)}
                />
                </a>
                <hr/>
                <a class = "buttonLine">
                    <Button label = "sign out"/>
                </a>
            </div>
        );  
    }  
}  

export { TopBar, TopBar as default }

