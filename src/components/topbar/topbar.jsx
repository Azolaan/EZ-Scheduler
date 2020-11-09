import React from "react"

//import '@rmwc/button/styles';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import './topbar.css';

class TopBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showNotif: false, showSettings: false};
    }

    toggleNotif() { 
        console.log("notif");
        console.log(this.state.showNotif);
        this.setState({
            showNotif: !this.state.showNotif
        });
        console.log(this.state.showNotif);
    }

    toggleSettings() {
        console.log("settings");
        console.log(this.state.showSettings);
        this.setState({
            showSettings: !this.state.showSettings
        });
        console.log(this.state.showSettings);
    }

    render() {
        return (
            <div>
               <article>
                   EZ Scheduler 4:00
                   <IconButton id = "settings" icon="settings" style={{color: 'grey', float: 'right', margin: 0}} onClick={this.toggleSettings.bind(this)}/>
                   <IconButton id = "notif" icon="notifications" style={{color: 'grey', float: 'right', margin: 0}} onClick={this.toggleNotif.bind(this)}/>
               </article>
               {this.state.showNotif ? 
                 <Notif
                    text='Click "Close Button" to hide popup'
                    closePopup={this.toggleNotif.bind(this)}
                 /> : null
            }
            </div>
        )
    }
}

class Notif extends React.Component {
  render() {  
    return (  
        <div className='popup'>  
            <div className='popup\_inner'>  
                <h1>{this.props.text}</h1>  
                <button onClick={this.props.closePopup}>close me</button>  
            </div>  
        </div>  
        );  
    }  
}  

export { TopBar, TopBar as default }


