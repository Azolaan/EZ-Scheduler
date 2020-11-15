//rmwc styles go here
import "@rmwc/icon-button/styles"
import "@rmwc/top-app-bar/styles"
import "@rmwc/menu/styles"
import "@rmwc/switch/styles"
import "@rmwc/select/styles"
import "@rmwc/radio/styles"
import "@rmwc/list/styles"
import "@rmwc/icon/styles"
import "@rmwc/textfield/styles"
import "@rmwc/button/styles"
import "@rmwc/dialog/styles"
import "@rmwc/fab/styles"
import "@rmwc/drawer/styles"
import "@rmwc/theme/styles"
import "@rmwc/chip/styles"
import "@rmwc/avatar/styles"
import "@rmwc/theme/styles"

import { useState } from "react"
import { ThemeProvider } from "@rmwc/theme"

import { MainPage } from "./pages/main"
import { TopBar } from "./components/topbar/topbar"
import { Portal } from "@rmwc/base"

const darkTheme = {
    primary: "#303030",
    secondary: "#661fff",
    error: "#b00020",
    background: "#fff",
    surface: "#fff",
    onPrimary: "rgba(255, 255, 255, 1)",
    onSecondary: "rgba(255, 255, 255, 1)",
    onSurface: "rgba(0, 0, 0, 0.87)",
    onError: "#fff",
    textPrimaryOnBackground: "rgba(0, 0, 0, 0.87)",
    textSecondaryOnBackground: "rgba(0, 0, 0, 0.54)",
    textHintOnBackground: "rgba(0, 0, 0, 0.38)",
    textDisabledOnBackground: "rgba(0, 0, 0, 0.38)",
    textIconOnBackground: "rgba(0, 0, 0, 0.38)",
    textPrimaryOnLight: "rgba(0, 0, 0, 0.87)",
    textSecondaryOnLight: "rgba(0, 0, 0, 0.54)",
    textHintOnLight: "rgba(0, 0, 0, 0.38)",
    textDisabledOnLight: "rgba(0, 0, 0, 0.38)",
    textIconOnLight: "rgba(0, 0, 0, 0.38)",
    textPrimaryOnDark: "white",
    textSecondaryOnDark: "rgba(255, 255, 255, 0.7)",
    textHintOnDark: "rgba(255, 255, 255, 0.5)",
    textDisabledOnDark: "rgba(255, 255, 255, 0.5)",
    textIconOnDark: "rgba(255, 255, 255, 0.5)"
}

const lightTheme = {
    primary: '#ffdbcf',
    secondary: '#feeae6',
    error: '#b00020',
    background: '#fff',
    surface: '#fff',
    onPrimary: 'rgba(0, 0, 0, 0.87)',
    onSecondary: 'rgba(0, 0, 0, 0.87)',
    onSurface: 'rgba(0, 0, 0, 0.87)',
    onError: '#fff',
    textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',
    textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',
    textHintOnBackground: 'rgba(0, 0, 0, 0.38)',
    textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',
    textIconOnBackground: 'rgba(0, 0, 0, 0.38)',
    textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
    textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
    textHintOnLight: 'rgba(0, 0, 0, 0.38)',
    textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
    textIconOnLight: 'rgba(0, 0, 0, 0.38)',
    textPrimaryOnDark: 'white',
    textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
    textHintOnDark: 'rgba(255, 255, 255, 0.5)',
    textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
    textIconOnDark: 'rgba(255, 255, 255, 0.5)'
}

function App() {
    const [calendarView, setCalendarView] = useState("self")
    const [theme, setTheme] = useState("Dark")

    const handlChangeCalendarView = (view) => {
        setCalendarView(view)
    }

    const handleChangeTheme = (theme) => {
        setTheme(theme)
    }

    return (
        <ThemeProvider style={{ height: "100%" }} options={theme === "Dark" ? darkTheme : lightTheme}>
            <TopBar
                calendarView={calendarView}
                onChangeCalendarView={handlChangeCalendarView}
                onChangeTheme={handleChangeTheme}
                theme={theme}
            />
            <MainPage
                calendarView={calendarView}
                onChangeCalendarView={handlChangeCalendarView}
                theme={theme}
            />
            <Portal />
        </ThemeProvider>
    )
}

export default App
