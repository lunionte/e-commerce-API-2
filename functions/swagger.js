import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "E-commerce API",
        description: "API para gestão de dados do e-commerce",
    },
    host: "127.0.0.1:5001/api-ecommerce-351ee/us-central1",
    basePath: "/api",
    schemes: ["https"],
};

const outputFile = "./src/docs/swagger-output.json";
const routes = ["./src/routes/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
