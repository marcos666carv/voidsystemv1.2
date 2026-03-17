# DATABASE — void system v1.3

Schema definido em `src/db/schema.ts` usando Drizzle ORM. Banco: PostgreSQL (Supabase).

> **Regra:** Nunca altere o schema sem atualizar este doc no mesmo commit.

## Enums

| Enum | Valores |
|---|---|
| `appointment_status` | `pending`, `confirmed`, `completed`, `cancelled`, `no_show` |
| `membership_tier` | `standard`, `void_club`, `vip` |
| `role` | `client`, `admin`, `staff` |
| `void_level` | `iniciado`, `explorador`, `habilidoso`, `especialista`, `mestre`, `voidwalker`, `transcendente` |
| `tank_status` | `livre`, `em_sessao`, `limpeza`, `modo_noturno`, `manutencao`, `standby` |
| `maintenance_severity` | `low`, `medium`, `high`, `critical` |
| `maintenance_status` | `open`, `in_progress`, `resolved` |
| `payment_method` | `credit_card`, `pix`, `coupon` |
| `order_status` | `pending`, `paid`, `failed`, `refunded` |

## Tabelas

### `clients`
Usuários do sistema (clientes e admins).

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | UUID |
| `email` | text UNIQUE | lowercase |
| `full_name` | text | |
| `password_hash` | text | bcrypt |
| `phone` | text | |
| `role` | enum | `client` \| `admin` \| `staff` |
| `membership_tier` | enum | `standard` \| `void_club` \| `vip` |
| `xp` | integer | gamificação |
| `level` | void_level | calculado a partir de XP |
| `total_spent` | integer | **centavos** |
| `total_sessions` | integer | |
| `sessions_float` | integer | contador por tipo |
| `sessions_massage` | integer | |
| `sessions_combo` | integer | |
| `life_cycle_stage` | text | `new`, `active`, `at_risk`, `churned` |
| `preferences` | jsonb | |

### `services`
Serviços oferecidos (float, massagem, combo…).

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | |
| `name` | text | |
| `duration` | integer | minutos |
| `setup_cleanup_minutes` | integer | default 15 |
| `price` | integer | **centavos** |
| `active` | boolean | |

### `service_variants`
Variantes de um serviço (ex: 60min, 90min, casal).

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | |
| `service_id` | text FK → services | |
| `name` | text | |
| `price` | integer | **centavos** |
| `duration` | integer | minutos |

### `appointments`
Agendamentos de sessões.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | |
| `client_id` | text FK → clients | |
| `service_id` | text FK → services | |
| `tank_id` | text FK → tanks | |
| `location_id` | text FK → locations | |
| `start_time` | timestamp | ISO string |
| `end_time` | timestamp | ISO string |
| `status` | appointment_status | |

### `tanks`
Tanques de flutuação.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | |
| `name` | text | |
| `location_id` | text FK → locations | |
| `status` | tank_status | |
| `temperature` | real | Celsius |
| `total_hours_used` | integer | |

### `orders`
Pedidos criados no checkout.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | UUID |
| `client_id` | text FK → clients | |
| `total_amount` | integer | **centavos** |
| `payment_method` | payment_method | |
| `status` | order_status | `pending → paid \| failed \| refunded` |
| `checkout_data` | jsonb | snapshot dos itens |

### `client_credits`
Créditos de sessão adquiridos via compra ou gift.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | |
| `client_id` | text FK → clients | |
| `service_id` | text FK → services | |
| `variant_id` | text | opcional |
| `amount` | integer | quantidade de sessões |
| `expires_at` | timestamp | opcional |

### `sales`
Registro de vendas avulsas (admin).

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | |
| `client_id` | text FK → clients | |
| `items` | jsonb | itens vendidos |
| `total_amount` | integer | **centavos** |
| `payment_method` | text | |

### `products`
Produtos físicos da loja.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | text PK | |
| `name` | text | |
| `price` | integer | **centavos** |
| `category` | text | |
| `stock` | integer | |
| `variations` | jsonb | |

### `locations`
Localizações físicas do spa.

### `maintenance_logs`
Logs de manutenção dos tanques.

## Regra de preços

> Todos os valores monetários são armazenados em **centavos** (integer). Sempre divida por 100 ao exibir.

## Última atualização
2026-03-17 — schema documentado a partir de `src/db/schema.ts`
