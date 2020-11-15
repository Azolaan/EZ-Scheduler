import React from "react"

import "./friends-list.css"

import { userData } from "./user-data.js"
import { List, ListItem, ListItemText, ListItemPrimaryText, ListItemSecondaryText, ListItemMeta, ListDivider, ListGroup, ListGroupSubheader } from "@rmwc/list"
import { TextField } from "@rmwc/textfield"
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog"
import {Avatar} from "@rmwc/avatar"

import ChatBox from '../../dialogs/chat/chatBox'
import Profile from '../../dialogs/profile/profile'
 



class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {showProfile: this.props.showProfile,
                  showChat: this.props.showChat,
                  showCalendar: this.props.showCalendar,
                  sendFriendRequest: this.props.sendFriendRequest};
  }
  
  toggleProfile() {
    // console.log("here")
    this.setState({
      showProfile: !this.state.showProfile
    });
  }

  closeProfile() {
    // console.log("clicked bitch")
    // this.setState({
    //   showProfile: false
    // });
    this.setState(() => ({ showProfile: false }), () => console.log(this.state.showProfile))
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
    let info = {
      name : this.props.name,
      userName : this.props.username,
      password : this.props.password,
      school : this.props.school,
      major : this.props.major,
      year : this.props.year,
      bio : this.props.bio,
      img : this.props.image
    }
    if (!this.props.isFriend){
      
      return (
        <ListItem>
          <Avatar className="avatar"
            src={this.props.image}
            size="xlarge"
            onClick={this.toggleProfile.bind(this)}
            />
          <ListItemText onClick={this.toggleProfile.bind(this)}>
            <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
            <ListItemSecondaryText>{this.props.username}</ListItemSecondaryText>
          </ListItemText>
          {!this.state.sendFriendRequest ? <ListItemMeta icon="person_add" onClick={this.sendFriendRequest.bind(this)}/> : <ListItemMeta icon="email" onClick={this.sendFriendRequest.bind(this)}/>}


         <Profile isFriend={this.props.isFriend} isOpen={this.state.showProfile} userInfo={info} user={"other"} close={this.closeProfile.bind(this)}/>
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
            <ChatBox userInfo={this.props.name} />
            
            <Avatar
            src={this.props.image}
            size="xlarge"/>
            
          </ListItemMeta>

         <Profile isFriend={this.props.isFriend} isOpen={this.state.showProfile} userInfo={info} user={"friend"} close={this.closeProfile.bind(this)}/>

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
        // </ChatBox>
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
              <User key={user.id} image={user.image} name={user.name} username={user.username} password={user.Password} school={user.School} major={user.Major} year={user.Year} bio={user.Bio} isFriend={user.isFriend} showProfile={user.showProfile} showChat={user.showChat} showCalendar={user.showCalendar} sendFriendRequest={user.sendFriendRequest}/>)}
          </ListGroup>}
        {this.state.showUsers && <ListDivider/>}
          <ListGroup>
            <ListGroupSubheader>Friends</ListGroupSubheader>
            {filteredUsers.map(user => user.isFriend &&
              <User key={user.id} image={user.image} name={user.name} username={user.username} password={user.Password} school={user.School} major={user.Major} year={user.Year} bio={user.Bio} isFriend={user.isFriend} showProfile={user.showProfile} showChat={user.showChat} showCalendar={user.showCalendar} sendFriendRequest={user.sendFriendRequest}/>)}
          </ListGroup>
        </List>
      </div>
      
    )
  }
}

export { FriendsListComponent, FriendsListComponent as default }
