import { Route, Routes } from 'react-router-dom'
import ConditionalWrapper from './components/ConditionalWrapper';
import { pages } from './pages/pages';
import SideBarSite from './components/layout/SideBarSite';
import Site from './components/layout/Site';
import SiteBaseline from './components/layout/SiteBaseline';



function App() {
    return (
        <SiteBaseline>
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
        </SiteBaseline>
    )
}

export default App;