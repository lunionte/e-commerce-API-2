# 🚀 e-commerce-API-2: Sua API REST de E-commerce com Node.js e TypeScript 🛍️

Este projeto é uma API RESTful completa para um sistema de e-commerce, desenvolvida em TypeScript utilizando Node.js e o framework Express.  
A API foi projetada com uma arquitetura em camadas para garantir modularidade, escalabilidade e fácil manutenção, seguindo as melhores práticas de desenvolvimento. 🛠️

---

## 🌟 Tecnologias Utilizadas

O projeto faz uso de um conjunto robusto de tecnologias e bibliotecas para oferecer uma solução eficiente e segura:

- **Node.js** — Plataforma de execução JavaScript para back-end. 💻  
- **TypeScript** — Superset do JavaScript que adiciona tipagem estática. 💪  
- **Express** — Framework web minimalista para Node.js. ⚡  

- **Firebase** 🔥  
  - Authentication (autenticação segura) 🔐  
  - Firestore (banco NoSQL) 📊  
  - Cloud Storage (armazenamento de arquivos) ☁️🖼️  
  - Cloud Functions (backend serverless) ⚙️  

- **Joi + Celebrate** — Validação de esquemas para requisições HTTP. ✅  
- **Swagger** — Documentação interativa da API. 📄  
- **Day.js** — Manipulação e formatação de datas. 🗓️  
- **cpf-cnpj-validator** — Validação de CPF e CNPJ. 🇧🇷  
- **file-type** — Detecção e validação do tipo de arquivo. 📂  
- **ESLint** — Linter para padronização e qualidade do código. 🧹  

---

## 📂 Estrutura de Pastas

O projeto segue uma arquitetura em camadas para facilitar modularização e manutenção:

```txt
src/
├── controllers/     - (🎯 Manipula requisições HTTP e orquestra respostas)
├── services/        - (💼 Contém regras de negócio da aplicação)
├── repositories/    - (💾 Abstração para acesso e manipulação do Firestore)
├── models/          - (🧩 Define entidades, interfaces e schemas de validação)
├── routes/          - (🗺️ Define rotas da API e associa aos controllers)
├── middlewares/     - (🔗 Middleware de autenticação, validação, etc.)
├── utils/           - (🔧 Funções utilitárias para formatação, validação, etc.)
├── error/           - (⚠️ Tratamento e gerenciamento centralizado de erros)
└── index.ts         - (🚀 Ponto de entrada da aplicação)

🛠️ Como Rodar o Projeto Localmente
Para configurar e executar o projeto em seu ambiente local, siga os passos abaixo:

Pré-requisitos
Node.js (versão 14 ou superior) ✅

npm ou Yarn ✅

Conta Firebase com um projeto configurado 🔥

Instalação
Clone o repositório:

Bash

git clone https://github.com/lunionte/e-commerce-API-2.git
cd e-commerce-API-2
Instale as dependências:

Bash

npm install
# ou
yarn install
Configuração do Firebase
Crie um novo projeto no Firebase Console.

Gere um arquivo de chave de conta de serviço (.json) para seu projeto Firebase. Vá em "Configurações do Projeto" > "Contas de Serviço" > "Gerar nova chave privada". 🔑

Renomeie o arquivo example.env (se existir) para .env na raiz do projeto e preencha as variáveis de ambiente necessárias, incluindo o caminho para o seu arquivo de chave de serviço do Firebase.

Snippet de código

# Exemplo de .env
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=/caminho/para/seu/firebase-adminsdk.json
# Outras variáveis de ambiente, como porta da API, etc.
PORT=3000
Certifique-se de que os serviços do Firebase (Firestore, Authentication, Cloud Storage) estejam habilitados para o seu projeto. ✅

Scripts do package.json
Os scripts principais para rodar o projeto são (assumindo nomes comuns, verifique seu package.json para os nomes exatos):

npm start: Inicia o servidor da API em modo de produção. 🚀

npm run dev: Inicia o servidor em modo de desenvolvimento (geralmente com nodemon ou ts-node-dev para recarga automática). 🔄

npm run build: Compila o código TypeScript para JavaScript. 🏗️

npm test: Executa os testes automatizados (se configurado). 🧪

npm run lint: Executa o ESLint para verificar a qualidade do código. 🔎

Para iniciar o servidor em modo de desenvolvimento, execute:

Bash

npm run dev
# ou
yarn dev
A API estará disponível em http://localhost:5001/<seu-project-id>/us-central1/api (onde PORT é a porta configurada no seu .env, padrão 3000). 🌐

📄 Documentação da API
A documentação interativa da API é gerada automaticamente com o Swagger e pode ser acessada após o projeto estar rodando localmente. 📚

Como acessar: Abra seu navegador e navegue até http://localhost:5001/<seu-project-id>/us-central1/api/docs/ 🔗

Endpoints: A documentação do Swagger listará todos os endpoints disponíveis, seus métodos HTTP (GET, POST, PUT, DELETE), parâmetros de requisição, modelos de dados esperados e respostas. 📋

☁️ Deploy
Este projeto está preparado para ser implantado como Cloud Functions do Firebase, aproveitando a infraestrutura serverless do Google para escalabilidade e gerenciamento simplificado. 🚀 As configurações específicas para deploy em Cloud Functions podem ser encontradas na documentação do Firebase (normalmente configuradas via firebase.json e o Firebase CLI). ⬆️

⚖️ Licença
Este projeto está licenciado sob a Licença MIT. 📜

🎯 To-do / Melhorias Futuras
Implementar testes automatizados (unitários, de integração e end-to-end). 🧪

Adicionar novos endpoints para funcionalidades de e-commerce (ex: reviews de produtos, sistema de cupons). ➕

Integrar com um gateway de pagamento (ex: Stripe, PagSeguro). 💳

Melhorar o tratamento de erros e log. 🐞

