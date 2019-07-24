import { app, UserPasswordCredential } from './app';

export const loginHelper = {
    authenticate: (userName, password) => {
        const credential = new UserPasswordCredential(userName, password)
        return app.auth.loginWithCredential(credential)
    }
}
