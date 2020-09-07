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
import AdminComponent from './admin/AdminComponent';

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
    const history = useHistory();
    console.log(`App`);
    // console.log(`logged`);
    // console.log(logged);
    if (logged) {
        history.push('/configuration');
    }

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
                <p className="nav-link">
                    <Link to="/login">Login</Link>
                </p>
                <p>
                    <Link to="/register">Register</Link>
                </p>
                <p>
                    <Link to="/configuration">Configuration</Link>
                </p>
                <p>
                    <Link to="/admin">Admin</Link>
                </p>
                <p>
                    <a onClick={onLogout}>Logout</a>
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
                <PrivateRoute path="/admin">
                    <AdminComponent />
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
