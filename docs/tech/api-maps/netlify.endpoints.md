# netlify.endpoints.md — Contratos das Netlify Functions

Base URL em produção: `/.netlify/functions` (ou `/api` via redirect no `netlify.toml`)

> **Regra:** Toda mudança em um endpoint deve ser refletida aqui no mesmo commit.

---

## Auth

### `POST /api/auth-login`
Autentica um usuário e retorna JWT.

**Request:**
```json
{ "email": "string", "password": "string" }
```

**Response 200:**
```json
{ "token": "string", "user": { "id": "string", "email": "string", "role": "client|admin|staff", "fullName": "string" } }
```

**Erros:** `400` campos faltando · `401` credenciais inválidas

---

### `POST /api/auth-register`
Cria um novo cliente.

**Request:**
```json
{ "email": "string", "password": "string", "fullName": "string", "phone": "string?" }
```

**Response 201:**
```json
{ "token": "string", "user": { "id": "string", "email": "string", "role": "client" } }
```

**Erros:** `400` campos faltando · `409` email já existe

---

## Appointments

### `GET /api/appointments`
Lista agendamentos. Requer auth.

**Query params:**
- `date` — filtrar por data (`YYYY-MM-DD`)
- `clientId` — filtrar por cliente
- `status` — filtrar por status

**Response 200:**
```json
{ "appointments": [ { "id": "string", "clientId": "string", "serviceId": "string", "tankId": "string", "startTime": "string", "endTime": "string", "status": "string" } ] }
```

### `POST /api/appointments`
Cria um novo agendamento. Requer auth.

**Request:**
```json
{ "clientId": "string", "serviceId": "string", "tankId": "string?", "startTime": "string", "endTime": "string", "notes": "string?" }
```

**Response 201:**
```json
{ "appointment": { "id": "string", ... } }
```

### `PATCH /api/appointments/:id`
Atualiza status ou campos de um agendamento. Requer auth.

**Request:**
```json
{ "status": "confirmed|completed|cancelled|no_show" }
```

---

## Clients

### `GET /api/clients`
Lista clientes. Requer auth (admin).

**Query params:** `search`, `limit`, `offset`

### `GET /api/clients/:id`
Busca cliente por ID. Requer auth.

### `PATCH /api/clients/:id`
Atualiza dados de um cliente. Requer auth.

---

## Checkout

### `POST /api/checkout/session`
Cria uma order em `pending`.

**Request:**
```json
{ "clientId": "string", "totalAmount": "number (centavos)", "paymentMethod": "credit_card|pix|coupon", "checkoutData": "object" }
```

**Response 201:**
```json
{ "id": "string", "message": "Order session created" }
```

### `POST /api/checkout/confirm`
Confirma pagamento de uma order.

**Request:**
```json
{ "orderId": "string" }
```

**Response 200:**
```json
{ "success": true }
```

---

## Dashboard

### `GET /api/dashboard`
Métricas do admin. Requer auth (admin).

**Response 200:**
```json
{ "totalClients": "number", "totalAppointments": "number", "revenue": "number", ... }
```

---

## Sales

### `GET /api/sales`
Lista vendas. Requer auth (admin).

### `POST /api/sales`
Registra uma venda avulsa. Requer auth (admin).

**Request:**
```json
{ "clientId": "string", "items": "array", "totalAmount": "number (centavos)", "paymentMethod": "string", "notes": "string?" }
```

---

## Autenticação nas requests

Enviar header: `Authorization: Bearer <token>`

O helper `requireAuth()` em `netlify/functions/lib/auth.mts` valida o token e retorna o payload do usuário.

---

## Última atualização
2026-03-17 — endpoints documentados a partir do código em `netlify/functions/`
