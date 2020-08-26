import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { createAuthProvider } from '../auth/index';
import Basic from '../form/basic';

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

const ConfigurationComponent: FunctionComponent<any> = () => {
    const [logged] = useAuth();
    console.log(`ConfigurationComponent`);
    if (!logged) {
        return <Redirect to="/login" />;
    }
    return (
        <div className="config-component">
            <Basic />
        </div>
    );
};

export default ConfigurationComponent;
