import React from "react"

import "./friends-list.css"

import { userData } from "./user-data.js"
import { List, ListItem, ListItemText, ListItemPrimaryText, ListItemSecondaryText, ListItemMeta, ListDivider, ListGroup, ListGroupSubheader } from "@rmwc/list"
import { TextField } from "@rmwc/textfield"
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog"
import {Avatar} from "@rmwc/avatar"
 



class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {showProfile: this.props.showProfile,
                  showChat: this.props.showChat,
                  showCalendar: this.props.showCalendar,
                  sendFriendRequest: this.props.sendFriendRequest,
                  isFriend: this.props.isFriend};
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

    if (this.isFriend == false){
      
      return (
        <ListItem>
          <Avatar className="avatar"
            src={this.props.image}
            size="xlarge"
            onClick={this.toggleProfile.bind(this)}/>
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
          <Avatar className="avatar"
            src={this.props.image}
            size="xlarge"
            onClick={this.toggleProfile.bind(this)}/>
          <ListItemText onClick={this.toggleProfile.bind(this)}>
            <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
            <ListItemSecondaryText>{this.props.username}</ListItemSecondaryText>
          </ListItemText>
          <ListItemMeta>
            <Avatar
            src={this.props.image}
            size="xlarge"/>
          </ListItemMeta>

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

         <Dialog open={this.state.showChat} onClose={this.closeChat.bind(this)}>
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
    this.state = {users: userData,
                  filteredUsers: userData,
                  showUsers: false};
    this.search = this.search.bind(this);
  }

  search(e) {

    let filteredUsers = this.state.filteredUsers;

    if (e.target.value != "") {

      this.setState({
        showUsers: this.state.showUsers = true
      });

      const filterName = e.target.value.toLowerCase();
      const filterUsername = e.target.value.toLowerCase();

      filteredUsers = filteredUsers.filter(user => {
        const lowerCaseName = user.name.toLowerCase();
        const lowerCaseUsername = user.username.toLowerCase();
        return lowerCaseName.includes(filterName) || lowerCaseUsername.includes(filterUsername);
      })
    } else {
     
      this.setState({
        showUsers: this.state.showUsers = false
      });

      filteredUsers = this.state.users;

    }

    this.setState({
      filteredUsers: filteredUsers
    });
  }

  removeFriend(ID){
    this.setState({
        users: this.state.users.map(user => {if(user.id === ID) 
          {return {...user, isFriend:false} }
        return user})
    })
  }
  
  render() {

    let filteredUsers = this.state.filteredUsers
    return(
      <div class="sidebar">
        <div>
          <TextField class="textfield"
          icon="search" 
          onChange={this.search}
          />
        </div>
        <List twoLine>
          {this.state.showUsers && <ListGroup>
            <ListGroupSubheader>Users</ListGroupSubheader>
            {filteredUsers.map(user => !user.isFriend &&
              <User key={user.id} image={user.image} name={user.name} username={user.username} password={user.password} school={user.school} major={user.major} year={user.year} bio={user.bio} isFriend={user.isFriend} showProfile={user.showProfile} showChat={user.showChat} showCalendar={user.showCalendar} sendFriendRequest={user.sendFriendRequest}/>)}
          </ListGroup>}
        {this.state.showUsers && <ListDivider/>}
          <ListGroup>
            <ListGroupSubheader>Friends</ListGroupSubheader>
            {filteredUsers.map(user => user.isFriend &&
              <User key={user.id} image={user.image} name={user.name} username={user.username} password={user.password} school={user.school} major={user.major} year={user.year} bio={user.bio} isFriend={user.isFriend} showProfile={user.showProfile} showChat={user.showChat} showCalendar={user.showCalendar} sendFriendRequest={user.sendFriendRequest} removeFriend={this.removeFriend.bind(this, user.id)}/>)}
          </ListGroup>
        </List>
      </div>
      
    )
  }
}

export { FriendsListComponent, FriendsListComponent as default }
