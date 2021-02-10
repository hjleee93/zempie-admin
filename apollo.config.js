module.exports = {
    client: {
        service: {
            name: "my-app",
            // URL to the GraphQL API
            // ${process.env.VUE_APP_GRAPHQL_LINK}
            url: process.env.VUE_APP_GRAPHQL_LINK,
            // url: `http://15.165.238.216:8299/graphql`,
        },
        // Files processed by the extension
        includes: ["src/**/*.vue", "src/**/*.js"],
    },
};

