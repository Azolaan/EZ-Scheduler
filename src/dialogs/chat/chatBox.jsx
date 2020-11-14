import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@rmwc/dialog'
import { Button } from '@rmwc/button'
import { IconButton } from '@rmwc/icon-button'
import { TextField } from '@rmwc/textfield'
import { Drawer, DrawerContent } from '@rmwc/drawer'
import { Badge } from '@rmwc/badge'

import "./chatBox.css"

class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false,
            messages : [],
            text : ""
        }
    }

    sendMessage = (text) => {
        var curMessages = this.state.messages
        curMessages.push(text)
        this.setState({
            messages : curMessages,
            text : ""
        })
    }

    render () {
        let displayMessages = this.state.messages
        return(
            <div>
                <Dialog 
                open={this.state.isOpen} 
                onClose={() => this.setState({isOpen : false})}
                >
                    <DialogTitle>{this.props.userInfo.name}</DialogTitle>
                    <DialogContent>
                        <Drawer 
                        style={{
                            height: "20vh",
                            }}>
                            <DrawerContent>
                                {displayMessages.map((message) => 
                                <div className="align-right">
                                    {message}
                                </div>
                                )}
                            </DrawerContent>
                        </Drawer>
                    </DialogContent>
                    <DialogActions>
                    <IconButton 
                    icon="emoji_emotions"
                    style={{width: "30px", height: "30px", padding: 0}}
                    />{" "}
                    <TextField
                    onChange={(e) => this.setState({text : e.currentTarget.value})}
                    value={this.state.text}
                    trailingIcon={{
                        icon: 'send',
                        onClick: () => this.sendMessage(this.state.text)
                    }}
                    style={{height: "30px"}}
                    />
                    </DialogActions>
                </Dialog>
                <div style={{textAlign : "right"}}>
                <Button raised onClick={() => this.setState({isOpen : true})}>
                    {/* {this.props.name} */}
                    Chat Button
                </Button>
                </div>
            </div>
        )
    }
}

export default ChatBox

// chat bubble, takes personal/friend as prop to determine which side bubble pops up as 
// text box
// buttons (close, attach, emoji, send)
// background color white

// chat box, takes friend name, path to profile pic as prop