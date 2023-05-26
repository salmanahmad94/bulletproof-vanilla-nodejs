export default {
    auth: {
        setPassword: (password) => require('./auth/setPassword').default(password)
    },
    general: {
        getAllFiles: (dirPath) => require('./general/getAllFiles').default.getAllFiles(dirPath)
    },
    modifiers: {
        user: (user, scope) => require('./modifiers/user').default(user, scope)
    }
};
