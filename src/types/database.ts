export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

// Enums
export type UserRole = 'client' | 'reception' | 'admin';
export type GenderIdentity = 'masculino' | 'feminino' | 'nao_binario' | 'outro' | 'prefiro_nao_dizer';
export type AcquisitionChannel = 'google' | 'instagram' | 'facebook' | 'indicacao' | 'evento' | 'passante' | 'outro';
export type TankStatus = 'livre' | 'em_sessao' | 'limpeza' | 'modo_noturno' | 'manutencao' | 'standby';
export type AppointmentStatus = 'pendente' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado' | 'no_show';
export type ServiceCategory = 'flutuacao' | 'massoterapia' | 'combo' | 'outros';

// Tables

export interface Profile {
    id: string; // uuid
    email: string | null;
    full_name: string | null;
    preferred_name: string | null;
    cpf: string | null;
    phone: string | null;
    address: string | null;
    birth_date: string | null; // date
    gender: GenderIdentity;
    civil_status: string | null;
    instagram_handle: string | null;

    // Flywheel & BI
    role: UserRole;
    acquisition_source: AcquisitionChannel | null;
    nps_score: number | null; // check >= 0 and <= 10
    total_spend: number; // numeric(10,2)
    total_sessions_count: number;
    last_visit: string | null; // timestamp with time zone
    churn_risk: boolean;

    // Sensorial Preferences
    pref_temperature: string | null;
    pref_lighting: string | null;
    pref_music: string | null;
    medical_notes: string | null;

    created_at: string; // timestamp with time zone
    updated_at: string; // timestamp with time zone
}

export interface Tank {
    id: string; // uuid
    name: string;
    location_room: string | null;
    current_status: TankStatus;
    is_led_on: boolean;
    is_heater_on: boolean;
    pump_speed: number;
    total_usage_hours: number;
    last_maintenance_date: string | null; // date
    next_filter_change: string | null; // date
    serial_number_parts: Json | null; // jsonb
    created_at: string;
}

export interface Service {
    id: string; // uuid
    name: string;
    category: ServiceCategory;
    description: string | null;
    duration: number;
    // Wait, Drizzle infers camelCase if defined that way?
    // In schema.ts: setupCleanupMinutes: integer("setup_cleanup_minutes")
    // So the property on the object is setupCleanupMinutes.
    // In types/database.ts it was setup_cleanup_minutes.
    // I should probably fix that too to be safe/consistent with Drizzle inference if we use it, 
    // but here we are defining an interface manually. 
    // mockData uses setupCleanupMinutes now.
    setupCleanupMinutes: number;
    price: number; // numeric(10,2)
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface Package {
    id: string; // uuid
    service_id: string | null; // references services
    name: string;
    session_count: number;
    total_price: number; // numeric(10,2)
    price_per_session: number | null; // generated
    active: boolean;
}

export interface Product {
    id: string; // uuid
    name: string;
    description: string | null;
    price: number; // numeric(10,2)
    current_stock: number;
    image_url: string | null;
    sku: string | null;
    active: boolean;
}

export interface Appointment {
    id: string; // uuid
    customer_id: string; // references profiles
    service_id: string; // references services
    tank_id: string | null; // references tanks
    start_time: string; // timestamp with time zone
    end_time: string; // timestamp with time zone
    status: AppointmentStatus;
    notes: string | null;
    created_by: string | null; // references auth.users
    created_at: string;
}

export interface VoidClubWaitlist {
    id: string; // uuid
    full_name: string;
    email: string;
    phone: string | null;
    status: string | null; // default 'waiting'
    created_at: string;
}

export interface GiftCard {
    id: string; // uuid
    code: string;
    purchaser_id: string | null; // references profiles
    recipient_email: string | null;
    value_balance: number; // numeric(10,2)
    is_active: boolean;
    expires_at: string | null; // date
}

// Helper types for common operations
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
export type AppointmentCreate = Omit<Appointment, 'id' | 'created_at' | 'status'> & { status?: AppointmentStatus };
