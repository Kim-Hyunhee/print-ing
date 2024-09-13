import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "PRINT-ING",
      version: "1.0.0",
      description: "print-ing with typeorm",
    },
    host: "localhost:8010",
    basePath: "/",
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["src/router/*.ts", "src/swagger/*.yml"],
};
const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
