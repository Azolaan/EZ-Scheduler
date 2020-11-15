import React from "react"

//import '@rmwc/button/styles';
import { Button } from '@rmwc/button';
import { MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { Switch } from '@rmwc/switch';
import { Radio } from '@rmwc/radio';
import { List, ListItem, ListItemMeta, ListItemText} from '@rmwc/list';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarActionItem, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Avatar } from "@rmwc/avatar";
import { notifData } from "./topbar-data.js";
import Profile from '../../dialogs/profile/profile'

import johnSmith from '../../components/friends-list/images/john-smith.png'

import './topbar.css';

// import johnSmith from '../friends-list/images/john-smith.png'

class TopBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {profileOpen : false, showNotif: false, showSettings: false, notifMute: false, notifMessage: false, notifSound: "Jingle", friendNotif: false, friendMessage: false, friendSound: "Jingle", theme:"Red"};
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

    closeProfile = () => {
        this.setState({profileOpen : false})
    }

    render() {
        let info = {
            name : "John Smith",
            userName : "SmiJ32",
            password : "I am John",
            school : "McMaster University",
            major : "Computer Science",
            year : "8",
            bio : "bruh",
            img : johnSmith
          }
        return (
            <div>
                <TopAppBar>
                    <TopAppBarRow>
                        <TopAppBarSection alignStart>
                            <TopAppBarTitle>EZ Scheduler</TopAppBarTitle>
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
                            <ListItem onClick={() => this.setState({profileOpen : true})}>
                                <Avatar className="avatar"
                                    src={johnSmith}
                                    size="xlarge"/>
                                <ListItemText style = {{fontFamily:'Roboto'}}>John Smith</ListItemText>
                            </ListItem>
                            <MenuSurfaceAnchor>
                            <TopAppBarActionItem icon="calendar_today" />
                            </MenuSurfaceAnchor>              
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar> 
            <TopAppBarFixedAdjust />
            <Profile isFriend={false} isOpen={this.state.profileOpen} userInfo={info} user={"self"} close={this.closeProfile.bind(this)}/>
            </div>
        )
    }
}

class Notif extends React.Component {

    constructor(props){
        super(props);
        this.state = {notifData: notifData};
    }

    removeNotif(ID){
        this.setState({
            notifData: this.state.notifData.filter( ({notif, id}) => id != ID)
        })
    }

    removeAllNotif(){
        this.setState({
            notifData: []
        })
    }

    render() {  

        let notifData = this.state.notifData

        return (  
            <div style={{ padding : '1px', width: '350px', height: '280px', font: "Roboto" }}>
                <a class = "title"><b>Notifications</b></a>
                <hr/>
                <List>
                    {notifData.map(notif =>
                        <ListItem key = {notif.id}> {notif.text}
                            <ListItemMeta icon="close" onClick={this.removeNotif.bind(this,notif.id)}/>
                        </ListItem>)}            
                </List>
                <hr/>
                <a class = "buttonLine">
                    <Button label = "Clear All" onClick={this.removeAllNotif.bind(this)}/>
                </a>
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
            <div style={{ padding : '1px', width: '340px', height: '380px', font: "Roboto" }}>
                <a class = "title"><b>Settings</b></a>
                <hr/>
                <a class = "subtitle">Notifications</a>
                <a class = "switchLine">
                    <a class = "switchText">Mute All Notifications </a>
                    <Switch class = "switchButton" defaultNotChecked onChange={this.toggleMute.bind(this)}/>
                </a>
                <a class = "switchLine">
                    <a class = "switchText">Message Notifications </a>
                    <Switch class = "switchButton" defaultNotChecked  onChange={this.togglenotifMessage.bind(this)} disabled = {this.state.notifMute}/>
                </a>
                <a class = "switchLine">
                    <a class = "switchText">Friend Request Notifcations </a>
                    <Switch class = "switchButton" defaultNotChecked onChange={this.togglefriendMessage.bind(this)} disabled = {this.state.notifMute}/>
                </a>
                <a class = "switchLine">
                    <a class = "switchText">Message Notifications </a>
                    <Switch class = "switchButton" defaultNotChecked onChange={this.togglefriendNotif.bind(this)} disabled = {this.state.notifMute}/>
                </a>
                <hr />
                <a class = "subtitle">Theme</a>
                <a class = "radioLine">
                <Radio
                    label="Light"
                    value="Light"
                    name="myRadioGroup"
                    onChange={e => this.setTheme(e.target.value)}
                />
                <Radio
                    label="Dark"
                    value="Dark"
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

