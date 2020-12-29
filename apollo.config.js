module.exports = {
    client: {
        service: {
            name: "my-app",
            // URL to the GraphQL API
            // ${process.env.VUE_APP_API_LINK}
            url: `http://192.168.0.10:8299/graphql`,
        },
        // Files processed by the extension
        includes: ["src/**/*.vue", "src/**/*.js"],
    },
};
