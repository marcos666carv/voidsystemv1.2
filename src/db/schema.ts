import { pgTable, text, integer, boolean, jsonb, timestamp, unique, foreignKey, pgEnum } from "drizzle-orm/pg-core"

export const appointmentStatus = pgEnum("appointment_status", ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'])
export const membershipTier = pgEnum("membership_tier", ['standard', 'void_club', 'vip'])
export const role = pgEnum("role", ['client', 'admin', 'staff'])
export const voidLevel = pgEnum("void_level", ['iniciado', 'explorador', 'habilidoso', 'especialista', 'mestre', 'voidwalker', 'transcendente'])


export const products = pgTable("products", {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text(),
    price: integer().notNull(),
    category: text().notNull(),
    stock: integer().default(0).notNull(),
    active: boolean().default(true).notNull(),
    variations: jsonb(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const services = pgTable("services", {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text(),
    duration: integer().notNull(),
    price: integer().notNull(),
    active: boolean().default(true).notNull(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const clients = pgTable("clients", {
    id: text().primaryKey().notNull(),
    email: text().notNull(),
    fullName: text("full_name").notNull(),
    phone: text(),
    cpf: text(),
    photoUrl: text("photo_url"),
    role: role().default('client').notNull(),
    membershipTier: membershipTier("membership_tier").default('standard'),
    birthDate: text("birth_date"),
    addressNeighborhood: text("address_neighborhood"),
    addressCity: text("address_city"),
    profession: text(),
    leadSource: text("lead_source"),
    notes: text(),
    npsScore: integer("nps_score"),
    lastSurveyDate: timestamp("last_survey_date", { mode: 'string' }),
    xp: integer().default(0).notNull(),
    level: voidLevel().default('iniciado').notNull(),
    totalSpent: integer("total_spent").default(0).notNull(),
    totalSessions: integer("total_sessions").default(0).notNull(),
    firstVisit: timestamp("first_visit", { mode: 'string' }),
    lastVisit: timestamp("last_visit", { mode: 'string' }),
    preferences: jsonb().default({}),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
    visitHistory: jsonb("visit_history"),
    purchaseHistory: jsonb("purchase_history"),
    interactionHistory: jsonb("interaction_history"),
    usageTags: jsonb("usage_tags"),
    preferredWeekDays: jsonb("preferred_week_days"),
    sessionsFloat: integer("sessions_float").default(0).notNull(),
    sessionsMassage: integer("sessions_massage").default(0).notNull(),
    sessionsCombo: integer("sessions_combo").default(0).notNull(),
    lifeCycleStage: text("life_cycle_stage").default('new').notNull(),
}, (table) => [
    unique("clients_email_unique").on(table.email),
]);

export const appointments = pgTable("appointments", {
    id: text().primaryKey().notNull(),
    clientId: text("client_id").notNull(),
    serviceId: text("service_id").notNull(),
    locationId: text("location_id"),
    tankId: text("tank_id"),
    startTime: timestamp("start_time", { mode: 'string' }).notNull(),
    endTime: timestamp("end_time", { mode: 'string' }).notNull(),
    status: appointmentStatus().default('pending').notNull(),
    notes: text(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
    foreignKey({
        columns: [table.clientId],
        foreignColumns: [clients.id],
        name: "appointments_client_id_clients_id_fk"
    }),
]);

export const locations = pgTable("locations", {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    address: text().notNull(),
    city: text().notNull(),
    active: boolean().default(true).notNull(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const tanks = pgTable("tanks", {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    locationId: text("location_id"),
    status: text().default('available').notNull(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
    active: boolean().default(true).notNull(),
}, (table) => [
    foreignKey({
        columns: [table.locationId],
        foreignColumns: [locations.id],
        name: "tanks_location_id_locations_id_fk"
    }),
]);
