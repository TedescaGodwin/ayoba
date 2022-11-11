export default {
    port: 1337,
    dbUri: "mongodb://0.0.0.0:27017/ayoba-music", 
    saltWorkFactor: 10,
    accessTokenTtl:"15m",
    refreshTokenTtl:"1y",
    accessTokenPrivateKey: "ACCESS_TOKEN_PRIVATE_KEY",
    accessTokenPublicKey: "ACCESS_TOKEN_PUBLIC_KEY",
    refreshTokenPrivateKey: "REFRESH_PRIVATE_KEY",
    refreshTokenPublicKey: "REFRESH_PUBLIC_KEY",
  }