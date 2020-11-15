import React from "react"
import _ from "lodash"

import { Button } from "@rmwc/button"
import { MenuSurface, MenuSurfaceAnchor } from "@rmwc/menu"
import { Switch } from "@rmwc/switch"
import { Radio } from "@rmwc/radio"
import { List, ListItem, ListItemMeta, ListItemText } from "@rmwc/list"
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    TopAppBarActionItem,
    TopAppBarFixedAdjust
} from "@rmwc/top-app-bar"
import { Avatar } from "@rmwc/avatar"
import { notifData } from "./topbar-data.js"
import Profile from "../../dialogs/profile/profile"

import johnSmith from "../../data/images/john-smith.png"

import "./topbar.css"

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profileOpen: false,
            showNotif: false,
            showSettings: false,
            notifMute: false,
            notifMessage: false,
            notifSound: "Jingle",
            friendNotif: false,
            friendMessage: false,
            friendSound: "Jingle",
            theme: "Red",
            notifData: notifData
        }
    }

    toggleNotif() {
        this.setState({
            showNotif: true
        })
    }

    toggleSettings() {
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    offNotif() {
        this.setState({
            showNotif: false
        })
    }

    offSettings() {
        this.setState({
            showSettings: false
        })
    }

    closeProfile = () => {
        this.setState({ profileOpen: false })
    }

    removeNotif(ID, e) {
        e.stopPropagation()
        this.setState({
            notifData: this.state.notifData.filter(({ notif, id }) => id !== ID)
        })
    }

    removeAllNotif() {
        this.setState({
            notifData: []
        })
    }

    render() {
        let notifData = this.state.notifData
        let info = {
            name: "John Smith",
            userName: "smiJ32@mcmaster.ca",
            password: "I am John",
            school: "McMaster University",
            major: "Computer Science",
            year: "8",
            bio: "boring bio",
            img: johnSmith
        }
        let name = info.name
        if (this.props.calendarView === "friendOne") {
            name = "Alex Lo"
        }
        if (this.props.calendarView === "friendTwo") {
            name = "Gabriel Yu"
        }
        return (
            <div>
                <TopAppBar>
                    <TopAppBarRow>
                        <TopAppBarSection alignStart>
                            <TopAppBarTitle>{`EZ Scheduler: ${name}`}</TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection alignEnd>
                            <MenuSurfaceAnchor>
                                <TopAppBarActionItem
                                    icon={
                                        _.isEmpty(notifData)
                                            ? "notifications"
                                            : "notification_important"
                                    }
                                    onClick={this.toggleNotif.bind(this)}
                                />
                                <MenuSurface
                                    className="notifsSurface"
                                    anchorCorner={"bottomStart"}
                                    open={this.state.showNotif}
                                    onClose={this.offNotif.bind(this)}
                                >
                                    <Notif
                                        removeNotif={this.removeNotif.bind(
                                            this
                                        )}
                                        removeAllNotif={this.removeAllNotif.bind(
                                            this
                                        )}
                                        notifData={notifData}
                                    />
                                </MenuSurface>
                            </MenuSurfaceAnchor>
                            <MenuSurfaceAnchor>
                                <TopAppBarActionItem
                                    className="settingsIcon"
                                    icon="settings"
                                    onClick={this.toggleSettings.bind(this)}
                                />
                                <MenuSurface
                                    className="settingsSurface"
                                    anchorCorner={"bottomStart"}
                                    open={this.state.showSettings}
                                    onClose={this.offSettings.bind(this)}
                                >
                                    <Settings
                                        onChangeTheme={this.props.onChangeTheme}
                                        theme={this.props.theme}
                                    />
                                </MenuSurface>
                            </MenuSurfaceAnchor>
                            <ListItem
                                onClick={() =>
                                    this.setState({ profileOpen: true })
                                }
                            >
                                <Avatar
                                    className="avatar"
                                    src={johnSmith}
                                    size="xlarge"
                                />
                                <ListItemText style={{ fontFamily: "Roboto" }}>
                                    John Smith
                                </ListItemText>
                            </ListItem>
                            <MenuSurfaceAnchor>
                                <TopAppBarActionItem
                                    icon="calendar_today"
                                    onClick={() =>
                                        this.props.onChangeCalendarView("self")
                                    }
                                />
                            </MenuSurfaceAnchor>
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust />
                <Profile
                    isFriend={false}
                    isOpen={this.state.profileOpen}
                    userInfo={info}
                    user={"self"}
                    close={this.closeProfile.bind(this)}
                />
            </div>
        )
    }
}

class Notif extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let notifData = this.props.notifData

        return (
            <div
                style={{
                    padding: "1px",
                    width: "350px",
                    height: "280px",
                    font: "Roboto"
                }}
            >
                <a class="title">
                    <b>Notifications</b>
                </a>
                <hr />
                <List className="notif-list">
                    {notifData.map((notif) => (
                        <ListItem key={notif.id}>
                            {" "}
                            {notif.text}
                            <ListItemMeta
                                icon="close"
                                onClick={this.props.removeNotif.bind(
                                    this,
                                    notif.id
                                )}
                            />
                        </ListItem>
                    ))}
                </List>
                <hr />
                <a class="buttonLine">
                    <Button
                        label="Clear All"
                        onClick={this.props.removeAllNotif.bind(this)}
                    />
                </a>
            </div>
        )
    }
}

class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifMute: false,
            notifMessage: false,
            friendNotif: false,
            friendMessage: false
        }
    }

    setTheme(t) {
        this.props.onChangeTheme(t)
    }

    toggleMute() {
        this.setState({
            notifMute: !this.state.notifMute
        })
    }

    togglenotifMessage() {
        this.setState({
            notifMessage: !this.state.notifMessage
        })
    }

    togglefriendMessage() {
        this.setState({
            friendMessage: !this.state.friendMessage
        })
    }

    togglefriendNotif() {
        this.setState({
            friendNotif: !this.state.friendNotif
        })
    }

    render() {
        return (
            <div
                style={{
                    padding: "1px",
                    width: "340px",
                    height: "380px",
                    font: "Roboto"
                }}
            >
                <a class="title">
                    <b>Settings</b>
                </a>
                <hr />
                <a class="subtitle">Notifications</a>
                <a class="switchLine">
                    <a class="switchText">Mute All Notifications </a>
                    <Switch
                        class="switchButton"
                        defaultNotChecked
                        onChange={this.toggleMute.bind(this)}
                    />
                </a>
                <a class="switchLine">
                    <a class="switchText">Message Notifications </a>
                    <Switch
                        class="switchButton"
                        defaultNotChecked
                        onChange={this.togglenotifMessage.bind(this)}
                        disabled={this.state.notifMute}
                    />
                </a>
                <a class="switchLine">
                    <a class="switchText">Friend Request Notifications </a>
                    <Switch
                        class="switchButton"
                        defaultNotChecked
                        onChange={this.togglefriendMessage.bind(this)}
                        disabled={this.state.notifMute}
                    />
                </a>
                <hr />
                <a class="subtitle">Theme</a>
                <a class="radioLine">
                    <Radio
                        checked={this.props.theme === "Light"}
                        label="Light"
                        value="Light"
                        name="myRadioGroup"
                        onChange={(e) => this.setTheme(e.target.value)}
                    />
                    <Radio
                        checked={this.props.theme === "Dark"}
                        label="Dark"
                        value="Dark"
                        name="myRadioGroup"
                        onChange={(e) => this.setTheme(e.target.value)}
                    />
                </a>
                <hr />
                <a class="buttonLine">
                    <Button label="sign out" />
                </a>
            </div>
        )
    }
}

export { TopBar, TopBar as default }
