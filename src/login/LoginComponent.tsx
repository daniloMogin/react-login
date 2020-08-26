import React, {
    useState,
    ChangeEvent,
    FormEvent,
    FunctionComponent,
} from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { createAuthProvider } from './../auth/index';

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

const LoginComponent: FunctionComponent<any> = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const history = useHistory();
    console.log(`login`);

    const onChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [name]: value });
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then((r) => r.json())
            .then((token) => {
                if (token.status) {
                    return;
                }
                login(token);
                return history.push('/configuration');
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <input name="email" value={credentials.email} onChange={onChange} />
            <input
                name="password"
                value={credentials.password}
                onChange={onChange}
            />
            <button>Submit</button>
        </form>
    );
};

export default LoginComponent;
