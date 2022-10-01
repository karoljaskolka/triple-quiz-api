module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Triple Quiz API",
      version: "1.2.0",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};
