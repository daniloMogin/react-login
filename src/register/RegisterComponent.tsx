import React, {
    useState,
    ChangeEvent,
    FormEvent,
    FunctionComponent,
} from 'react';
import { Redirect } from 'react-router-dom';
import { createAuthProvider } from '../auth/index';

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

const RegisterComponent: FunctionComponent<any> = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    console.log(`register`);

    const onChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [name]: value });
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then((r) => r.json())
            .then(() => {
                return <Redirect to="/configuration" />;
            });
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={onSubmit}>
                <h1 className="form-title">Register</h1>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    placeholder="Enter email"
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Enter password"
                    onChange={onChange}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default RegisterComponent;
