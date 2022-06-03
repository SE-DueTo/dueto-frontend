import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { de } from 'date-fns/locale';
import { Route, Routes } from 'react-router-dom'
import ConditionalWrapper from './components/ConditionalWrapper';
import DataInterfaceProvider from './context/DataInterfaceProvider';
import LoginProvider from './context/LoginProvider';
import { pages } from './pages/pages';
import SideBarSite from './SideBarSite';
import Site from './Site';
import { theme } from './theme';



function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
                <CssBaseline/>
                <LoginProvider>
                    <DataInterfaceProvider>
                        <Routes>
                            {
                                pages.map((page, i) => (
                                    <Route key={`site.${i}`} path={page.url} element={
                                        <Site showLogin={!page.loginRequired} showAppBar={page.decorate}>
                                            <ConditionalWrapper 
                                                condition={page.loginRequired && page.decorate} 
                                                wrapper={(c) => <SideBarSite>{c}</SideBarSite>}
                                            >
                                                {page.component}
                                            </ConditionalWrapper>
                                        </Site>
                                    }/>
                                ))
                            }
                        </Routes>
                    </DataInterfaceProvider>
                </LoginProvider>
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default App;