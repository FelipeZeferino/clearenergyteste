Beleza, vou mandar direto o README para rodar local e no deploy com banco via Docker Compose.

---

# CleanEnergy - Projeto Next.js


Deploy do projeto: https://cleanenergy-navy.vercel.app/

Usuário admin em produção

usuário: felipe12345@email.com
senha: Admin@123

## Pré-requisitos

* Node.js (v22+)
* Docker e Docker Compose instalados
* (Opcional) PostgreSQL rodando localmente ou acesso ao banco remoto

---

## Rodando localmente

1. Clone o repositório:

```bash
git clone https://github.com/FelipeZeferino/clearenergyteste.git
cd clearenergyteste
```

2. Crie um arquivo `.env` baseado no `.env.example` e configure sua variável de ambiente do banco:

```
DATABASE_URL="postgresql://postgres:root@localhost:5432/clearenergyteste"
```

3. Inicie o banco com Docker Compose:

```bash
docker compose up -d
```

Isso vai rodar um container Postgres com:

* usuário: `postgres`
* senha: `root`
* database: `clearenergyteste`

4. Instale as dependências:

```bash
npm install
```

5. Rode as migrations para criar o schema no banco:

```bash
npx prisma migrate deploy
```

6. Inicie a aplicação em modo desenvolvimento:

```bash
npm run dev
```

A aplicação vai estar disponível em `http://localhost:3000`.

Crie um usuário admin com o comando 
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@email.com", "password": "Admin@123"}'
```

Acesse o painel administrativo com o login e senha criados:
admin@email.com
senha: Admin@123


