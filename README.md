# 🎨 Calculadora de Tinta

Este é um projeto de uma aplicação web para calcular a quantidade de tinta necessária para pintar paredes com base em suas dimensões, portas e janelas.

## 🖥️ Frontend

### Descrição

O frontend é construído com React.js e é responsável por fornecer uma interface de usuário para inserir as dimensões das paredes, portas e janelas, e visualizar a quantidade de tinta necessária.

### Tecnologias Utilizadas

- React.js
- Axios (para fazer solicitações HTTP)
- CSS (estilização)

### Estrutura do Projeto

frontend/
|-- src/
| |-- components/
| | |-- calculator/
| | | |-- PaintCalculator.js
| | |-- errorModal/
| | | |-- ErrorModal.js
| | |-- form/
| | | |-- WallForm.js
| |-- App.js
| |-- index.js
|-- public/
|-- package.json
|-- ...


### 🚀 Como Rodar o Frontend

1. Clone o repositório.
2. Navegue até o diretório `frontend`.
3. Instale as dependências usando `npm install`.
4. Inicie o servidor com `npm start`.

### 💡 Como Contribuir

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues.

## ⚙️ Backend

### Descrição

O backend é construído com Node.js e Express.js e fornece uma API para calcular a quantidade de tinta necessária com base nas dimensões das paredes, portas e janelas.

### Tecnologias Utilizadas

- Node.js
- Express.js

### Estrutura do Projeto

backend/
|-- controllers/
| |-- paintCalculatorController.js
|-- routes/
| |-- paintRoutes.js
|-- index.js
|-- package.json
|-- ...


### 🚀 Como Rodar o Backend

1. Clone o repositório.
2. Navegue até o diretório `backend`.
3. Instale as dependências usando `npm install`.
4. Inicie o servidor com `node app.js`.

### 💡 Como Contribuir

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues.

### 📝 Licença

Este projeto está licenciado sob a [ISC License](https://opensource.org/licenses/ISC).

