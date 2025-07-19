import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "E-commerce API",
        description: "API para gestão de dados do e-commerce",
    },

    servers: [
        {
            url: "http://127.0.0.1:5001/api-ecommerce-351ee/us-central1/api",
            description: "dev",
        },
    ],
    tags: [
        { name: "Auth", description: "Autenticação de usuários" },
        { name: "Users", description: "Gestão de usuários" },
        { name: "Companies", description: "Gestão de empresas" },
        { name: "Categories", description: "Gestão de categorias de produtos" },
        { name: "Products", description: "Gestão de produtos" },
        { name: "Payment Methods", description: "Gestão de formas de pagamento" },
        { name: "Orders", description: "Gestão de pedidos" },
    ],
};

const outputFile = "./src/docs/swagger-output.json";
const routes = ["./src/routes/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
