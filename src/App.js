//rmwc styles go here
import '@rmwc/button/styles';
import '@rmwc/icon-button/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/menu/styles';
import '@rmwc/switch/styles';
import '@rmwc/select/styles';
import '@rmwc/radio/styles';
import '@rmwc/list/styles';

import { MainPage } from './pages/main'
import { TopBar } from './components/topbar/topbar'

function App() {
  return (
    <div>
      <TopBar />

      <MainPage />
    </div>
  );
}

export default App;
