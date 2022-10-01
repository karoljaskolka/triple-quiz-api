module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Triple Quiz API",
      version: "1.1.1",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};
