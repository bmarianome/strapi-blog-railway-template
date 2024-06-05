const s3Config = (env) => ({
  name: "upload",
  config: {
    provider: "aws-s3",
    providerOptions: {
      s3Options: {
        credentials: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
        },
        region: env("AWS_REGION"),
        params: {
          ACL: "public-read",
          signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 60 * 60 * 24 * 7),
          Bucket: env("AWS_BUCKET"),
        },
      },
    },
    actionOptions: {
      upload: {},
      uploadStream: {},
      delete: {},
    },
  },
});

module.exports = ({ env }) => {
  const allS3Variables =
    env("AWS_REGION") &&
    env("AWS_ACCESS_KEY_ID") &&
    env("AWS_ACCESS_SECRET") &&
    env("AWS_BUCKET");

  return {
    upload: allS3Variables ? s3Config(env) : {},
  };
};
