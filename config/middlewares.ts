const s3Config = (env) => ({
  name: "strapi::security",
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "connect-src": ["'self'", "https:"],
        "img-src": [
          "'self'",
          "data:",
          "blob:",
          "dl.airtable.com",
          `${env("AWS_BUCKET")}` +
            ".s3." +
            `${env("AWS_REGION")}` +
            ".amazonaws.com",
        ],
        "media-src": [
          "'self'",
          "data:",
          "blob:",
          "dl.airtable.com",
          `${env("AWS_BUCKET")}` +
            ".s3." +
            `${env("AWS_REGION")}` +
            ".amazonaws.com",
        ],
        upgradeInsecureRequests: null,
      },
    },
  },
});

export default ({ env }) => {
  const allS3Variables =
    env("AWS_REGION") &&
    env("AWS_ACCESS_KEY_ID") &&
    env("AWS_ACCESS_SECRET") &&
    env("AWS_BUCKET");

  return [
    "strapi::logger",
    "strapi::errors",
    allS3Variables ? s3Config(env) : "strapi::security",
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
