import React from "react"

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@rmwc/dialog"
import { Button } from "@rmwc/button"
import { TextField } from "@rmwc/textfield"
import { Avatar } from "@rmwc/avatar"

import "./profile.css"

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            accInfoEditState: false,
            personalInfoEditState: false,
            bioEditState: false,
            editState: false,
            userName: this.props.userInfo.userName,
            pw: this.props.userInfo.password,
            school: this.props.userInfo.school,
            major: this.props.userInfo.major,
            year: this.props.userInfo.year,
            bio: this.props.userInfo.bio,
            friendButtonClicked: false
        }
    }

    toggleEditCallBackFn = (val) => {
        switch (val) {
            case "Account Information":
                this.setState(
                    (state) => ({ accInfoEditState: !state.accInfoEditState }),
                    () => this.setEditState()
                )
                break
            case "Personal Information":
                this.setState(
                    (state) => ({
                        personalInfoEditState: !state.personalInfoEditState
                    }),
                    () => this.setEditState()
                )
                break
            case "Bio":
                this.setState(
                    (state) => ({ bioEditState: !state.bioEditState }),
                    () => this.setEditState()
                )
                break
            default:
                break
        }
    }

    setEditState = () => {
        if (
            !this.state.accInfoEditState &&
            !this.state.personalInfoEditState &&
            !this.state.bioEditState
        ) {
            this.setState({ editState: false })
        } else {
            this.setState({ editState: true })
        }
    }

    changeText = (e, text) => {
        switch (text) {
            case "userName":
                this.setState({ userName: text })
                break
            case "pw":
                this.setState({ pw: text })
                break
            case "school":
                this.setState({ school: text })
                break
            case "major":
                this.setState({ major: text })
                break
            case "year":
                this.setState({ major: text })
                break
            case "bio":
                this.setState({ bio: text })
                break
            default:
                break
        }
    }

    checkEditState = () => {
        if (
            !this.state.accInfoEditState &&
            !this.state.bioEditState &&
            !this.state.personalInfoEditState
        ) {
            return false
        } else {
            return true
        }
    }

    userNameComponentSelector = (state) => {
        if (!state) {
            return <div>{this.state.userName}</div>
        } else {
            return (
                <div>
                    <TextField
                        outlined
                        className="text-box"
                        value={this.state.userName}
                        onChange={(e) =>
                            this.setState({ userName: e.currentTarget.value })
                        }
                    ></TextField>
                </div>
            )
        }
    }

    passwordComponentSelector = (state) => {
        if (!state) {
            return <div>{this.state.pw}</div>
        } else {
            return (
                <div>
                    <TextField
                        outlined
                        className="text-box"
                        value={this.state.pw}
                        onChange={(e) =>
                            this.setState({ pw: e.currentTarget.value })
                        }
                    ></TextField>
                </div>
            )
        }
    }

    schoolComponentSelector = (state) => {
        if (!state) {
            return <div>{this.state.school}</div>
        } else {
            return (
                <div>
                    <TextField
                        outlined
                        className="text-box"
                        value={this.state.school}
                        onChange={(e) =>
                            this.setState({ school: e.currentTarget.value })
                        }
                    ></TextField>
                </div>
            )
        }
    }

    majorComponentSelector = (state) => {
        if (!state) {
            return <div>{this.state.major}</div>
        } else {
            return (
                <div>
                    <TextField
                        outlined
                        className="text-box"
                        value={this.state.major}
                        onChange={(e) =>
                            this.setState({ major: e.currentTarget.value })
                        }
                    ></TextField>
                </div>
            )
        }
    }

    yearComponentSelector = (state) => {
        if (!state) {
            return <div>{this.state.year}</div>
        } else {
            return (
                <div>
                    <TextField
                        outlined
                        className="text-box"
                        value={this.state.year}
                        onChange={(e) =>
                            this.setState({ year: e.currentTarget.value })
                        }
                    ></TextField>
                </div>
            )
        }
    }

    pickBioComponent = () => {
        if (this.state.bioEditState) {
            return (
                <div>
                    <TextField
                        outlined
                        className="bio-text-box"
                        value={this.state.bio}
                        onChange={(e) =>
                            this.setState({ bio: e.currentTarget.value })
                        }
                    ></TextField>
                </div>
            )
        } else {
            return <div>{this.state.bio}</div>
        }
    }

    close = () => {
        this.props.close()
    }

    handleFriendButtonClick = () => {
        if (this.props.user === "friend") {
            this.props.removeFriend(this.props.userInfo.id)
        }
        if (this.props.user === "other") {
            this.props.onAddFriend()
        }
        this.setState({ friendButtonClicked: true })
    }

    renderFriendButton = () => {
        switch (this.props.user) {
            case "other":
                return (
                    <div>
                        <Button
                            disabled={this.state.friendButtonClicked}
                            onClick={this.handleFriendButtonClick}
                        >
                            {this.state.friendButtonClicked
                                ? "Added"
                                : "Add friend"}
                        </Button>
                    </div>
                )
            case "friend":
                return (
                    <div>
                        <Button
                            disabled={this.state.friendButtonPressed}
                            onClick={this.handleFriendButtonClick}
                        >
                            {this.state.friendButtonPressed
                                ? "Removed"
                                : "Remove friend"}
                        </Button>
                    </div>
                )
            default:
                return <div></div>
        }
    }

    render() {
        let friendButton = this.renderFriendButton()
        return (
            <div>
                <div>
                    <Dialog open={this.props.isOpen} onClose={this.props.close}>
                        <DialogTitle style={{ textAlign: "center" }}>
                            Profile
                            <br />
                            <Avatar
                                src={this.props.userInfo["img"]}
                                size="xlarge"
                            />
                            <br />
                            {this.props.userInfo["name"]}
                            <br />
                            {friendButton}
                        </DialogTitle>
                        <DialogContent style={{ width: "500px" }}>
                            <div>
                                <Edit
                                    isFriend={this.props.isFriend}
                                    user={this.props.user}
                                    section="Account Information"
                                    toggleEditCallBackFn={this.toggleEditCallBackFn.bind(
                                        this
                                    )}
                                    editState={this.state.accInfoEditState}
                                />
                                <br />
                                Username (ID):{" "}
                                <div className="right-align">
                                    {this.userNameComponentSelector(
                                        this.state.accInfoEditState
                                    )}
                                </div>
                                <br />
                            </div>
                            <br />
                            <div>
                                <Edit
                                    isFriend={this.props.isFriend}
                                    user={this.props.user}
                                    section="Personal Information"
                                    toggleEditCallBackFn={this.toggleEditCallBackFn.bind(
                                        this
                                    )}
                                    editState={this.state.personalInfoEditState}
                                />
                                <br />
                                School:{" "}
                                <div className="right-align">
                                    {this.schoolComponentSelector(
                                        this.state.personalInfoEditState
                                    )}
                                </div>
                                <br />
                                Major:{" "}
                                <div className="right-align">
                                    {this.majorComponentSelector(
                                        this.state.personalInfoEditState
                                    )}
                                </div>
                                <br />
                                Year:{" "}
                                <div className="right-align">
                                    {this.yearComponentSelector(
                                        this.state.personalInfoEditState
                                    )}
                                </div>
                                <br />
                                <br />
                            </div>
                            <br />
                            <div>
                                <Edit
                                    isFriend={this.props.isFriend}
                                    section="Bio"
                                    user={this.props.user}
                                    toggleEditCallBackFn={this.toggleEditCallBackFn.bind(
                                        this
                                    )}
                                    editState={this.state.bioEditState}
                                />
                                <br />
                                <div>{this.pickBioComponent()}</div>
                            </div>
                        </DialogContent>
                        <DialogActions style={{ textAlign: "center" }}>
                            <Button
                                onClick={this.close}
                                disabled={this.state.editState}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

class Edit extends React.Component {
    buttonLabel = () => {
        if (this.props.editState) {
            return "Save"
        } else {
            return "Edit"
        }
    }

    renderButton = () => {
        if (this.props.user !== "self") {
            return <div>{this.props.section}</div>
        } else {
            return (
                <div>
                    {this.props.section}{" "}
                    <div className="right-align">
                        <Button onClick={this.buttonClick.bind(this)}>
                            {this.buttonLabel()}
                        </Button>
                    </div>
                </div>
            )
        }
    }
    buttonClick = () => {
        this.props.toggleEditCallBackFn(this.props.section)
    }
    render() {
        let button = this.renderButton()
        return <div>{button}</div>
    }
}

export default Profile
