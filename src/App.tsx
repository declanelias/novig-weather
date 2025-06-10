import './App.css'
import '@fontsource/ibm-plex-mono';
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/300.css";

import { WeatherPage } from "./components/Pages/WeatherPage";
import {WebsiteHeader} from "./components/Molecules/WebsiteHeader";

function App() {
    return (
        <div className={'app'}>
            <WebsiteHeader />
            <WeatherPage />
        </div>
    );
}

export default App;