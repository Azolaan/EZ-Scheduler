import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@rmwc/dialog'
import { Button } from '@rmwc/button'

import "./profile.css"

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false,
            accInfoEditState : false,
            personalInfoEditState : false,
            bioEditState : false,
            editState : false
        }
    }

    callBackFn = (val) => {
        var curState
        switch(val) {
            case "Account Information":
                curState = this.state.accInfoEditState
                this.setState({accInfoEditState : !curState})
                break
            case "Personal Information":
                curState = this.state.personalInfoEditState
                this.setState({personalInfoEditState : !curState})
                break
            case "Bio":
                curState = this.state.bioEditState
                this.setState({bioEditState : !curState})
                break
        }
        if(this.state.accInfoEditState || this.state.personalInfoEditState || this.bioEditState) {
            this.setState({editState : true})
        } else {
            this.setState({editState : false})
        }
    }

    closeButtonSelector = () => {
        if(this.state.editState) {
            return ("Save")
        } else {
            return ("Close")
        }
    }

    closeDialog = () => {
        this.setState({
            isOpen : false,
            accInfoEditState : false,
            personalInfoEditState : false,
            bioEditState : false,
            editState : false
        })
    }

    render() {
        let buttonText = this.closeButtonSelector()
        return (
            <div>
                <div>
                    <Dialog 
                    open={this.state.isOpen} 
                    onClose={() => this.setState({isOpen : false})}>
                        <DialogTitle style={{textAlign: "center"}}>Profile<br />Picture here<br />{this.props.userInfo["name"]}</DialogTitle>
                        <DialogContent>
                            <Edit section="Account Information" callBackFn={this.callBackFn.bind(this)}/><br />
                            Username (ID): <div class="right-align">{this.props.userInfo.userName}</div><br />
                            Password: <div class="right-align">{this.props.userInfo.password}</div><br /><br />
                            <Edit section="Personal Information" callBackFn={this.callBackFn.bind(this)}/><br />
                            School: <div class="right-align">{this.props.userInfo.school}</div><br />
                            Major: <div class="right-align">{this.props.userInfo.major}</div><br />
                            Year: <div class="right-align">{this.props.userInfo.year}</div><br /><br />
                            <Edit section="Bio" callBackFn={this.callBackFn.bind(this)}/><br />
                            {this.props.userInfo.bio}
                        </DialogContent>
                        <DialogActions style={{textAlign: "center"}}>
                            <Button onClick={() => this.setState({isOpen: false})}>{buttonText}</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div style={{textAlign : "right"}}><br />
                    <Button raised onClick={() => this.setState({isOpen : true})}>Profile</Button>
                </div>
            </div>
        )
    }
}

function TextBoxToggle(props) {
    return(
        <div></div>
    )
}

function Edit(props) {
    const [editState, setEditState] = React.useState(false)

    return(
        <div>
            {props.section}{" "}
            <div className="right-align"><Button onClick={() => props.callBackFn(props.section)}>Edit</Button></div>
        </div>
    )
}

export default Profile