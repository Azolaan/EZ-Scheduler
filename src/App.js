//rmwc styles go here
import '@rmwc/icon-button/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/menu/styles';
import '@rmwc/switch/styles';
import '@rmwc/select/styles';
import '@rmwc/radio/styles';
import '@rmwc/list/styles';
import '@rmwc/icon/styles';
import '@rmwc/textfield/styles';
import '@rmwc/avatar/styles';
import '@rmwc/button/styles'
import '@rmwc/dialog/styles'
import '@rmwc/textfield/styles'
import '@rmwc/fab/styles'
import '@rmwc/drawer/styles'
import '@rmwc/menu/styles'

import { MainPage } from './pages/main'
import { TopBar } from './components/topbar/topbar'


function App() {
  return (
    <> 
      <TopBar />

      <MainPage />
    </>

  )
  }


export default App;
