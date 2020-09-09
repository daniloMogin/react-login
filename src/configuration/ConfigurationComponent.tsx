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
    const [value, setValue] = React.useState({ message: 'Init' });

    const getHelloWorld = () => {
        authFetch('http://eskobe.esko:8085/api/hello-world', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((data: any) => {
                console.log(`data`);
                console.log(data);

                setValue(data);
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
            <p>Data: {value.message}</p>
        </div>
    );
};

export default ConfigurationComponent;
