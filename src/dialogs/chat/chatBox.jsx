import React from "react"

import { DialogTitle } from "@rmwc/dialog"
import { IconButton } from "@rmwc/icon-button"
import { TextField } from "@rmwc/textfield"
import { Drawer, DrawerContent } from "@rmwc/drawer"
import { MenuSurfaceAnchor, MenuSurface } from "@rmwc/menu"
import { Chip } from "@rmwc/chip"

import "./chatBox.css"

class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            messages: [],
            text: ""
        }
    }

    sendMessage = (text) => {
        if(this.state.text !== "") {
            var curMessages = this.state.messages
            curMessages.push(text)
            this.setState({
                messages: curMessages,
                text: ""
            })
        }
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter" && this.state.text !== "") {
            this.sendMessage(this.state.text)
        }
    }

    render() {
        let displayMessages = this.state.messages
        return (
            <div>
                <MenuSurfaceAnchor
                    style={{
                        float: "right"
                    }}
                >
                    <MenuSurface
                        renderToPortal
                        style={{ width: "300px" }}
                        open={this.state.isOpen}
                        onClose={() => this.setState({ isOpen: false })}
                    >
                        <div className="message-top-bar">
                            <DialogTitle>{this.props.userInfo}</DialogTitle>
                            <IconButton
                                icon="close"
                                style={{
                                    float: "right",
                                    display: "inline",
                                    top: "-50px"
                                }}
                                onClick={() => this.setState({ isOpen: false })}
                            />
                        </div>
                        <Drawer
                            style={{
                                height: "20vh",
                                width: "95%",
                                border: "none"
                            }}
                        >
                            <DrawerContent>
                                {displayMessages.map((message) => (
                                    <div className="message">
                                        <Chip label={message} />
                                        <br />
                                    </div>
                                ))}
                            </DrawerContent>
                        </Drawer>
                        <div style={{ display: "inline" }}>
                            <IconButton
                                icon="emoji_emotions"
                                className="action-icon-button"
                            />{" "}
                            <IconButton
                                icon="attach_file"
                                className="action-icon-button"
                            />{" "}
                            <TextField
                                onChange={(e) =>
                                    this.setState({
                                        text: e.currentTarget.value
                                    })
                                }
                                onKeyDown={(e) => this.handleKeyDown(e)}
                                value={this.state.text}
                                trailingIcon={{
                                    icon: "send",
                                    onClick: () =>
                                        this.sendMessage(this.state.text)
                                }}
                                style={{
                                    height: "30px",
                                    right: "-5px",
                                    width: "240px",
                                    top: "-7px"
                                }}
                            />
                        </div>
                    </MenuSurface>
                    <div style={{ textAlign: "right" }}>
                        <IconButton
                            className="friend-action-button"
                            icon="chat"
                            raised
                            onClick={() => this.setState({ isOpen: true })}
                        >
                            {this.props.userInfo}
                        </IconButton>
                    </div>
                </MenuSurfaceAnchor>
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
