# booking-flow — Fluxo de agendamento

## Canais

- **Web (cliente logado):** `/app/book` → `BookingPage` → `ClientCalendar` + `BookingModal`
- **Dashboard (atalho):** `ClientDashboard` → modal inline `BookingModal`
- **Admin:** `/admin/schedule` → `SchedulePage` — visão de grade e confirmação manual

## Fluxo do cliente

```
1. Cliente acessa /app/book ou abre modal no dashboard
2. Seleciona serviço (float, massagem, combo)
3. Seleciona variante (duração, tipo)
4. Escolhe data disponível no calendário
5. Escolhe horário disponível
6. Confirma agendamento
7. Sistema cria appointment com status "pending"
8. Admin confirma → status "confirmed"
9. Sessão realizada → status "completed"
```

## Componentes envolvidos

- `src/pages/app/BookingPage.tsx` — página principal de agendamento
- `src/components/booking/ClientCalendar.tsx` — calendário de datas disponíveis
- `src/components/booking/BookingModal.tsx` — modal de seleção de horário
- `src/components/dashboard/BookingModal.tsx` — modal inline no dashboard

## Endpoints usados

- `GET /api/appointments?date=YYYY-MM-DD` — slots ocupados em uma data
- `POST /api/appointments` — cria o agendamento

## Regras

- Agendamento cria appointment com `status=pending`
- Admin confirma manualmente (`status=confirmed`)
- Cancelamento: sem restrição de antecedência definida no frontend por ora
- Tanque é atribuído pelo admin (ou automaticamente se um estiver livre)

## Última atualização
2026-03-17 — fluxo documentado
