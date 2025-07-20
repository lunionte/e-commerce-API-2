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
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },

        schemas: {
            addUser: {
                $nome: "Carter",
                $email: "chthug3@gmail.com",
                $password: "123456",
            },
            addCompany: {
                $name: "Empresa Exemplo",
                $cnpj: "12345678000195",
                $email: "empresa@exemplo.com",
                $phone: "11999999999",
                $address: {
                    $street: "Rua Exemplo",
                    $number: "123",
                    $complement: "Apto 456",
                    $district: "Bairro Exemplo",
                    $city: "Cidade Exemplo",
                    $state: "SP",
                    $zipCode: "12345678",
                },
            },
            authenticate: {
                $email: "chthug3@gmail.com",
                password: "123456",
            },
            addCategory: {
                $name: "Categoria Exemplo",
                $description: "Descrição da categoria exemplo",
            },
            addProduct: {
                $name: "Produto Exemplo",
                $description: "Descrição do produto exemplo",
                $price: 99.99,
                $quantity: 10,
                $categoryId: "1234567890abcdef12345678", // ID da categoria
            },
            addPaymentMethod: {
                $name: "Cartão de Crédito",
                $description: "Pagamento via cartão de crédito",
            },
            addOrder: {
                $userId: "1234567890abcdef12345678", // ID do usuário
                $companyId: "1234567890abcdef12345678", // ID da empresa
                $products: [
                    {
                        productId: "1234567890abcdef12345678", // ID do produto
                        quantity: 2,
                    },
                ],
                $totalPrice: 199.98,
                $paymentMethodId: "1234567890abcdef12345678", // ID do método de pagamento
                $status: {
                    "@enum": ["PENDING", null],
                }, // Status do pedido
                observacoes: null,
            },
            updateOrderStatus: {
                $status: {
                    "@enum": ["APROVADO", "ENTREGA", "CONCLUIDO", "CANCELADO"],
                },
            },
        },
        parameters: {
            empresaId: {
                name: "empresaId",
                in: "query",
                description: "Id da empresa",
                schema: {
                    type: "string",
                },
            },
            dataInicio: {
                name: "dataInicio",
                in: "query",
                description: "Data de início do filtro no formato YYYY-MM-DD",
                scheme: {
                    type: "date",
                },
            },
            dataFim: {
                name: "dataFim",
                description: "Data de fim do filtro no formato YYYY-MM-DD",
                schema: {
                    type: "date",
                },
            },
            orderStatus: {
                name: "status",
                in: "query",
                description: "Status do pedido",
                type: "string",
                schema: {
                    type: "string",
                    enum: ["PENDENTE", "APROVADO", "ENTREGA", "CONCLUIDO", "CANCELADO"],
                },
            },
        },
    },
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
