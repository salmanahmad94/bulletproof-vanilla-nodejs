module.exports = {
    apps: [
        {
            name: 'bulletproof-vanilla-nodejs',
            script: './build/app.js',
            instances: 1,
            exec_mode: 'cluster',
            watch: './build',
            increment_var: 'PORT',
            node_args: '-r dotenv/config',
            shutdown_with_message: true,
            env: {
                PORT: 5600
            }
        }
    ]
};
