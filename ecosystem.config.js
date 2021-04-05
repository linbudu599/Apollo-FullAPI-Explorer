module.exports = {
  apps: [
    {
      name: 'GraphQL-Explorer-Server',
      script: 'dist/apps/server/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4399,
      },
    },
  ],
};
