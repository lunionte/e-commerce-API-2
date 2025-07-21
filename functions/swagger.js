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
                $logomarca: "base64string",
                $cnpj: "12345678000195",
                $razaoSocial: "Empresa Exemplo LTDA",
                $nomeFantasia: "Empresa Exemplo",
                telefone: "11999999999",
                horarioFuncionamento: "08:00 - 18:00",
                endereco: "rua exemplo, 123",
                localizacao: "77.123456, -46.123456",
                taxaEntrega: 5.0,
                ativa: true,
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
                $nome: "Produto Exemplo",
                $descricao: "Descrição do produto exemplo",
                $preco: 99.99,
                imagem: null,
                $categoria: {
                    id: "1234567890abcdef12345678", // ID da categoria
                },
                ativa: true,
            },
            addPaymentMethod: {
                $nome: "Cartão de Crédito",
                $descricao: "Pagamento via cartão de crédito",
            },
            addOrder: {
                $empresa: {
                    id: "1234567890abcdef12345678", // ID da empresa
                },
                $cliente: {
                    nome: "Carter",
                    telefone: "11999999999",
                },
                endereco: {
                    cep: "12345-678",
                    logradouro: "Rua Exemplo",
                    numero: "123",
                    complemento: "Apto 456",
                    cidade: "São Paulo",
                    uf: "SP",
                },
                status: "PENDENTE",
            },
            updateOrderStatus: {
                $status: {
                    "@enum": ["APROVADO", "ENTREGA", "CONCLUIDO", "CANCELADO"],
                },
            },

            updateCategory: {
                $descricao: "Nova descrição da categoria",
                $ativa: true,
            },

            updateProduct: {
                $nome: "Novo Nome do Produto",
                $descricao: "Nova descrição do produto",
                $preco: 89.99,
                imagem: null,
                $categoria: {
                    id: "1234567890abcdef12345678", // ID da nova categoria
                },
                ativa: false,
            },
            updatePaymentMethod: {
                $nome: "Novo Nome do Método de Pagamento",
                $descricao: "Nova descrição do método de pagamento",
            },
            updateUser: {
                $nome: "Charter Carter",
                $email: "charter.carter@example.com",
                $password: "novaSenha123",
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
