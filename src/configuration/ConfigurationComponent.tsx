import React, { FunctionComponent } from 'react';
import Basic from '../form/basic';
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

const ConfigurationComponent: FunctionComponent<any> = () => {
    let getHelloWorldData = '';
    const getHelloWorld = () => {
        authFetch('http://localhost:8085/api/hello-world', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((data) => {
                getHelloWorldData = data;
                console.log(`getHelloWorldData`);
                console.log(getHelloWorldData);
            });
    };
    return (
        <div className="config-component">
            <Basic />

            <div className="cc-btn-wrap">
                <a className="cc-btn" onClick={getHelloWorld}>
                    Get hello world
                </a>
            </div>
            <p>Data: {getHelloWorldData}</p>
        </div>
    );
};

export default ConfigurationComponent;
