import { Switch, Route, Redirect } from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsConditionsPage } from './pages/TermsConditionsPage'
import { UserAccountPage } from './pages/UserAccountPage'
import { AuthPage } from './pages/AuthPage'
import { ContactsPage } from './pages/ContactsPage'
import { RegisterPage } from './pages/RegisterPage'



export const useRoutes = (isAuthenticated) => {


    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact>
                    <MainPage />
                </Route>
                <Route path='/privacy' exact>
                    <PrivacyPolicyPage />
                </Route>
                <Route path='/terms' exact>
                    <TermsConditionsPage />
                </Route>
                <Route path='/contact' exact>
                    <ContactsPage />
                </Route>
                <Route path='/account' exact>
                    <UserAccountPage />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }
    
    return (
        <Switch>
            <Route path='/' exact>
                <MainPage />
            </Route>
            <Route path='/privacy' exact>
                <PrivacyPolicyPage />
            </Route>
            <Route path='/terms' exact>
                <TermsConditionsPage />
            </Route>
            <Route path='/contact' exact>
                <ContactsPage />
            </Route>
            <Route path='/auth' exact>
                <AuthPage />
            </Route>
            <Route path='/register' exact>
                <RegisterPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}