# Este é um projeto backend desenvolvido com Node.js, Express, Prisma e Nodemon, destinado ao setor de vendas de uma clínica. Ele inclui funcionalidades para gerenciar dados de clientes, profissionais, procedimentos, agendas e vendas.


# Projeto Backend para Setor de Vendas de uma Clínica
```markdown


## Requisitos

- Node.js (v14 ou superior)
- PostgreSQL
```
### Clonar o Repositório
```bash

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
npm run build
```

### Instalar Dependências

```bash
npm install
```

### Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure a URL de conexão do banco de dados PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### Configurar Prisma

Gere o cliente Prisma executando:

```bash
npm run build
```

Isso executará `prisma generate` para gerar o cliente Prisma e `tsc` para compilar o TypeScript.

### Executar o Projeto

Para iniciar o servidor em modo de desenvolvimento com Nodemon, execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```plaintext
.
├── prisma
│   ├── schema.prisma
│   └── migrations
├── src
│   ├── controllers
│   │   ├── Client.ts
│   │   ├── Profissional.ts
│   │   ├── Procedimento.ts
│   │   └── Agenda.ts
│   ├── routes
│   │   └── router.ts
│   ├── index.ts
│   └── utils
├── .env
├── package.json
└── tsconfig.json
```

### Scripts Principais

- **Iniciar o Servidor em Modo de Desenvolvimento**: `npm run dev`
- **Construir o Projeto**: `npm run build`

## Exemplos de Rotas

### Cliente

- **Criar Cliente**

```http
POST /createUser
```

```json
{
  "cpf_cliente": "12345678900",
  "nome_cliente": "João da Silva",
  "telefone": "123456789",
  "logradouro": "Rua A",
  "numero": 123,
  "bairro": "Centro",
  "cidade": "Cidade",
  "uf": "UF",
  "complemento": "Apartamento 101",
  "cep": "12345-678"
}
```

- **Buscar Cliente**

```http
GET /user
```

```json
{
  "cpf_cliente": "12345678900"
}
```

### Agenda

- **Buscar Agenda por Cliente**

```http
GET /AgendaClient
```

```json
{
  "cpf_cliente": "12345678900",
  "data_abertura": "2024-05-29T01:15:43.507Z"
}
```

## Contribuição

1. Fork o projeto.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Faça suas alterações e confirme-as: `git commit -m 'Minha nova feature'`.
4. Envie para o branch original: `git push origin minha-feature`.
5. Crie uma pull request.

## Licença

Este projeto está licenciado sob a MIT License.


Você pode copiar e colar este conteúdo no arquivo `README.md` do seu repositório no GitHub. Certifique-se de ajustar os detalhes específicos do seu projeto, como o URL do repositório e quaisquer informações adicionais que possam ser relevantes.
