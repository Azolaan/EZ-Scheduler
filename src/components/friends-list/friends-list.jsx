import React from "react"
import _ from "lodash"

import "./friends-list.css"

import { userData } from "../../data/user-data.js"
import {
    List,
    ListItem,
    ListItemText,
    ListItemPrimaryText,
    ListItemSecondaryText,
    ListItemMeta,
    ListDivider,
    ListGroup,
    ListGroupSubheader
} from "@rmwc/list"
import { TextField } from "@rmwc/textfield"
import { Avatar } from "@rmwc/avatar"
import { IconButton } from "@rmwc/icon-button"

import ChatBox from "../../dialogs/chat/chatBox"
import Profile from "../../dialogs/profile/profile"

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showProfile: this.props.showProfile,
            showChat: this.props.showChat,
            showCalendar: this.props.showCalendar,
            sendFriendRequest: this.props.sendFriendRequest
        }
    }

    toggleProfile() {
        this.setState({
            showProfile: !this.state.showProfile
        })
    }

    closeProfile() {
        this.setState({ showProfile: false })
    }

    toggleChat() {
        this.setState({
            showChat: !this.state.showChat
        })
    }

    closeChat() {
        this.setState({
            showChat: false
        })
    }

    toggleCalendar() {
        this.setState({
            showCalendar: !this.state.showCalendar
        })
    }

    closeCalendar() {
        this.setState({
            showCalendar: false
        })
    }

    sendFriendRequest() {
        this.setState({
            sendFriendRequest: !this.state.sendFriendRequest
        })
    }

    handleChangeCalendarView = () => {
        if (this.props.id === 1) {
            this.props.onChangeCalendarView("friendOne")
        } else if (this.props.id === 2) {
            this.props.onChangeCalendarView("friendTwo")
        }
    }

    render() {
        let info = {
            id: this.props.id,
            name: this.props.name,
            userName: this.props.username,
            password: this.props.password,
            school: this.props.school,
            major: this.props.major,
            year: this.props.year,
            bio: this.props.bio,
            img: this.props.image
        }
        if (!this.props.isFriend) {
            return (
                <ListItem>
                    <Avatar
                        className="avatar"
                        src={this.props.image}
                        size="xlarge"
                        onClick={this.toggleProfile.bind(this)}
                    />
                    <ListItemText onClick={this.toggleProfile.bind(this)}>
                        <ListItemPrimaryText>
                            {this.props.name}
                        </ListItemPrimaryText>
                        <ListItemSecondaryText>
                            {this.props.username}
                        </ListItemSecondaryText>
                    </ListItemText>
                    {!this.state.sendFriendRequest ? (
                        <ListItemMeta
                            icon="person_add"
                            onClick={this.sendFriendRequest.bind(this)}
                        />
                    ) : (
                        <ListItemMeta
                            icon="email"
                            onClick={this.sendFriendRequest.bind(this)}
                        />
                    )}

                    <Profile
                        isFriend={this.props.isFriend}
                        isOpen={this.state.showProfile}
                        userInfo={info}
                        user={"other"}
                        close={this.closeProfile.bind(this)}
                        onAddFriend={this.sendFriendRequest.bind(this)}
                    />
                </ListItem>
            )
        } else {
            return (
                <ListItem>
                    <Avatar
                        className="avatar"
                        src={this.props.image}
                        size="xlarge"
                        onClick={this.toggleProfile.bind(this)}
                    />
                    <ListItemText onClick={this.toggleProfile.bind(this)}>
                        <ListItemPrimaryText>
                            {this.props.name}
                        </ListItemPrimaryText>
                        <ListItemSecondaryText>
                            {this.props.username}
                        </ListItemSecondaryText>
                    </ListItemText>
                    <ListItemMeta>
                        <ChatBox
                            userInfo={this.props.name}
                            theme={this.props.theme}
                        />
                    </ListItemMeta>
                    <IconButton
                        className="friend-action-button"
                        icon="calendar_today"
                        onClick={this.handleChangeCalendarView}
                    />

                    <Profile
                        isFriend={this.props.isFriend}
                        isOpen={this.state.showProfile}
                        userInfo={info}
                        user={"friend"}
                        close={this.closeProfile.bind(this)}
                        removeFriend={this.props.removeFriend}
                    />
                </ListItem>
            )
        }
    }
}

class FriendsListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: userData,
            searchInput: "",
            showUsers: false
        }
        this.search = this.search.bind(this)
    }

    search(e) {
        this.setState({
            searchInput: e.target.value,
            showUsers: e.target.value !== ""
        })
    }

    removeFriend(id) {
        this.setState((state) => ({
            users: state.users.map((user) => {
                console.log(user.id === id)
                if (user.id === id) {
                    return { ...user, isFriend: false }
                }
                return user
            })
        }))
    }

    render() {
        let filteredUsers = this.state.searchInput
            ? _.filter(this.state.users, (user) => {
                  const name = _.toLower(user.name)
                  const username = _.toLower(user.username)
                  const search = _.toLower(this.state.searchInput)
                  return (
                      _.includes(name, search) || _.includes(username, search)
                  )
              })
            : this.state.users
        return (
            <div class="sidebar">
                <div>
                    <TextField
                        class="textfield"
                        icon="search"
                        onChange={this.search}
                    />
                </div>
                <List twoLine>
                    {this.state.showUsers && (
                        <ListGroup>
                            <ListGroupSubheader>Users</ListGroupSubheader>
                            {filteredUsers.map(
                                (user) =>
                                    !user.isFriend && (
                                        <User
                                            id={user.id}
                                            key={user.id}
                                            image={user.image}
                                            name={user.name}
                                            username={user.username}
                                            password={user.Password}
                                            school={user.School}
                                            major={user.Major}
                                            year={user.Year}
                                            bio={user.Bio}
                                            isFriend={user.isFriend}
                                            showProfile={user.showProfile}
                                            showChat={user.showChat}
                                            showCalendar={user.showCalendar}
                                            sendFriendRequest={
                                                user.sendFriendRequest
                                            }
                                        />
                                    )
                            )}
                        </ListGroup>
                    )}
                    {this.state.showUsers && <ListDivider />}
                    <ListGroup>
                        <ListGroupSubheader>Friends</ListGroupSubheader>
                        {filteredUsers.map(
                            (user) =>
                                user.isFriend && (
                                    <User
                                        id={user.id}
                                        key={user.id}
                                        image={user.image}
                                        name={user.name}
                                        username={user.username}
                                        password={user.Password}
                                        school={user.School}
                                        major={user.Major}
                                        year={user.Year}
                                        bio={user.Bio}
                                        isFriend={user.isFriend}
                                        showProfile={user.showProfile}
                                        showChat={user.showChat}
                                        showCalendar={user.showCalendar}
                                        sendFriendRequest={
                                            user.sendFriendRequest
                                        }
                                        removeFriend={this.removeFriend.bind(
                                            this
                                        )}
                                        onChangeCalendarView={
                                            this.props.onChangeCalendarView
                                        }
                                        theme={this.props.theme}
                                    />
                                )
                        )}
                    </ListGroup>
                </List>
            </div>
        )
    }
}

export { FriendsListComponent, FriendsListComponent as default }
