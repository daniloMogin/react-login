import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';
import LoginComponent from './login/LoginComponent';
import { createAuthProvider } from './auth/index';
import ConfigurationComponent from './configuration/ConfigurationComponent';
import RegisterComponent from './register/RegisterComponent';

export const [useAuth, authFetch, login, logout] = createAuthProvider<{
    accessToken: string;
    refreshToken: string;
}>({
    accessTokenKey: 'accessToken',
    onUpdateToken: (token) =>
        fetch('/update-token', {
            method: 'POST',
            body: token.refreshToken,
        }).then((r) => r.json()),
});

interface IProps {
    children: ReactNode;
    path: any;
}

const App = () => {
    const [logged] = useAuth();
    console.log(`App`);

    function PrivateRoute({ children, ...rest }: IProps) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    logged ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        );
    }

    const onLogout = (e: any) => {
        e.preventDefault();
        logout();
    };

    return (
        <div className="main-app">
            <nav className="main-nav">
                <p>
                    <Link to="/login">Login</Link>
                </p>
                <p>
                    <Link to="/register">Register</Link>
                </p>
                <p>
                    <Link to="/configuration">Configuration</Link>
                </p>
                <p>
                    <a href="" onClick={onLogout}>
                        Logout
                    </a>
                </p>
            </nav>
            <Switch>
                <Route path="/register">
                    <RegisterComponent />
                </Route>
                <Route path="/login">
                    <LoginComponent />
                </Route>
                <PrivateRoute path="/configuration">
                    <ConfigurationComponent />
                </PrivateRoute>
            </Switch>
        </div>
    );
};

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
