import React from "react"

import "./friends-list.css"

import { userData } from "./user-data.js"
import { List, ListItem, ListItemText, ListItemPrimaryText, ListItemSecondaryText, ListItemGraphic, ListItemMeta, ListDivider } from "@rmwc/list"
import { TextField } from "@rmwc/textfield"
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog"
import {Avatar} from "@rmwc/avatar"
 



class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {showProfile: this.props.showProfile,
                  showChat: this.props.showChat,
                  showCalendar: this.props.showCalendar,
                  sendFriendRequest: this.props.sendFriendRequest};
  }
  
  toggleProfile() {
    this.setState({
      showProfile: !this.state.showProfile
    });
  }

  closeProfile() {
    this.setState({
      showProfile: false
    });
  }

  toggleChat() {
    this.setState({
      showChat: !this.state.showChat
    });
  }

  closeChat() {
    this.setState({
      showChat: false
    });
  }

  toggleCalendar() {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }

  closeCalendar() {
    this.setState({
      showCalendar: false
    });
  }

  sendFriendRequest() {
    this.setState({
      sendFriendRequest: !this.state.sendFriendRequest
    });
  }

  render() {

    if (this.props.isUserZero) {
      return (

        <ListItem>
          <Avatar
            src={this.props.image}
            size="xlarge"
            onClick={this.toggleProfile.bind(this)}/>
          &nbsp;
          <ListItemText onClick={this.toggleProfile.bind(this)}>
            <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
            <ListItemSecondaryText>{this.props.username}</ListItemSecondaryText>
          </ListItemText>
          <ListItemMeta icon="calender_today" />

          <Dialog open={this.state.showProfile} onClose={this.closeProfile.bind(this)}>
            <DialogTitle>{this.props.username}</DialogTitle>
            <DialogContent>This is a standard dialog.</DialogContent>
            <DialogActions>
              <DialogButton action="close">Cancel</DialogButton>
              <DialogButton action="accept" isDefaultAction>
                Sweet!
              </DialogButton>
            </DialogActions>  
         </Dialog>
        </ListItem>
      )
    }
    else if (!this.props.isUserZero && !this.props.isFriend){
      
      return (
        <ListItem>
          <Avatar
            src={this.props.image}
            size="xlarge"
            onClick={this.toggleProfile.bind(this)}/>
          &nbsp;
          <ListItemText onClick={this.toggleProfile.bind(this)}>
            <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
            <ListItemSecondaryText>{this.props.username}</ListItemSecondaryText>
          </ListItemText>
          {!this.state.sendFriendRequest ? <ListItemMeta icon="person_add" onClick={this.sendFriendRequest.bind(this)}/> : <ListItemMeta icon="email" onClick={this.sendFriendRequest.bind(this)}/>}


          <Dialog open={this.state.showProfile} onClose={this.closeProfile.bind(this)}>
            <DialogTitle>{this.props.username}</DialogTitle>
            <DialogContent>This is a standard dialog.</DialogContent>
            <DialogActions>
              <DialogButton action="close">Cancel</DialogButton>
              <DialogButton action="accept" isDefaultAction>
                Sweet!
              </DialogButton>
            </DialogActions>  
         </Dialog>  
        </ListItem>
      )
    }
    else {
      return (
        <ListItem>
          <Avatar
            src={this.props.image}
            size="xlarge"
            onClick={this.toggleProfile.bind(this)}/>
          &nbsp;
          <ListItemText onClick={this.toggleProfile.bind(this)}>
            <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
            <ListItemSecondaryText>{this.props.username}</ListItemSecondaryText>
          </ListItemText>
          <ListItemMeta icon="chat" />
          <ListItemMeta icon="calender_today" />

          <Dialog open={this.state.showProfile} onClose={this.closeProfile.bind(this)}>
            <DialogTitle>{this.props.username}</DialogTitle>
            <DialogContent>This is a standard dialog.</DialogContent>
            <DialogActions>
              <DialogButton action="close">Cancel</DialogButton>
              <DialogButton action="accept" isDefaultAction>
                Sweet!
              </DialogButton>
            </DialogActions>  
         </Dialog>
        </ListItem>
      )
    }
  }

};

class FriendsListComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {userZero: userData,
                  users: userData,
                  filteredUsers: userData};
    this.search = this.search.bind(this);
  }


  search(e) {

    let filteredUsers = this.state.filteredUsers;

    if (e.target.value != "") {

      const filterName = e.target.value.toLowerCase();
      const filterUsername = e.target.value.toLowerCase();

      filteredUsers = filteredUsers.filter(user => {
        const lowerCaseName = user.name.toLowerCase();
        const lowerCaseUsername = user.username.toLowerCase();
        return lowerCaseName.includes(filterName) || lowerCaseUsername.includes(filterUsername);
      })
    } else {
      filteredUsers = this.state.users;
    }

    this.setState({
      filteredUsers: filteredUsers
    });
  }
  
  render() {

    let userZero = this.state.userZero
    let filteredUsers = this.state.filteredUsers
    return(
      <div class="sidebar">
        <List twoLine>
          {userZero.map(user => !user.isFriend && user.isUserZero  &&
            <User key={user.id} image={user.image} name={user.name} username={user.username} password={user.password} school={user.school} major={user.major} year={user.year} bio={user.bio} isUserZero={user.isUserZero} isFriend={user.isFriend} showProfile={user.showProfile} showChat={user.showChat} showCalendar={user.showCalendar} sendFriendRequest={user.sendFriendRequest}/>)}
        </List>
        <div>
          <TextField class="textfield"
          icon="search" 
          onChange={this.search}/>
        </div>
        <List twoLine>
        <h4>Users</h4>
          {filteredUsers.map(user => !user.isFriend && !user.isUserZero &&
            <User key={user.id} image={user.image} name={user.name} username={user.username} password={user.password} school={user.school} major={user.major} year={user.year} bio={user.bio} isUserZero={user.isUserZero} isFriend={user.isFriend} showProfile={user.showProfile} showChat={user.showChat} showCalendar={user.showCalendar} sendFriendRequest={user.sendFriendRequest}/>)}
        </List>
        <ListDivider/>
        <List twoLine>
        <h4>Friends</h4>
          {filteredUsers.map(user => user.isFriend &&
            <User key={user.id} image={user.image} name={user.name} username={user.username} password={user.password} school={user.school} major={user.major} year={user.year} bio={user.bio} isUserZero={user.isUserZero} isFriend={user.isFriend} showProfile={user.showProfile} showChat={user.showChat} showCalendar={user.showCalendar} sendFriendRequest={user.sendFriendRequest}/>)}
        </List>
      </div>
      
    )
  }
}

export { FriendsListComponent, FriendsListComponent as default }
