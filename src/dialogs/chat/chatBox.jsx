import React from 'react'
// import '@rmwc/button/styles' // remove on merge, acts as placeholder because no direct relationship with App.js

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@rmwc/dialog'
import { Button } from '@rmwc/button'
import { Textfield } from '@rmwc/textfield'

class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false
        }
    }

    render () {
        return(
            <div>
                <Dialog open={this.state.isOpen} onClose={() => this.setState({isOpen : false})}>
                    <DialogTitle>{this.props.name}</DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
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