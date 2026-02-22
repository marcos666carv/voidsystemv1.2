import xlsx from 'xlsx';
import { writeFileSync } from 'fs';
import crypto from 'crypto';

const workbook = xlsx.readFile('/Users/marcoscarvalho/Library/CloudStorage/Dropbox/_antigravity/void system v1.0/loveable/novo_relatrio_04-02-2026.xlsx', { cellDates: true });
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

// Helper function to safely map acquisition channels to the Typescript literal types
function mapAcquisition(raw) {
    if (!raw) return null;
    const s = raw.toLowerCase().trim();
    if (s.includes('instagram')) return 'instagram';
    if (s.includes('google')) return 'google';
    if (s.includes('indic') || s.includes('indica')) return 'indicacao';
    if (s.includes('face')) return 'facebook';
    if (s.includes('evento')) return 'evento';
    if (s.includes('passante')) return 'passante';
    return 'outro';
}

const profiles = data.map((row, index) => {
    let zip = row['CEP'] ? String(row['CEP']) : '';
    let neighborhood = row['Bairro'] || '';
    let city = row['Cidade'] || '';
    let fullAddress = [zip, neighborhood, city].filter(Boolean).join(', ');

    return {
        id: crypto.randomUUID(),
        email: row['Email'] || `no-email-${crypto.randomUUID().slice(0, 8)}@example.com`,
        full_name: row['Nome'] || 'Cliente Sem Nome',
        preferred_name: (row['Nome'] || '').split(' ')[0] || null,
        cpf: row['CPF'] || row['CPF_key'] || null,
        phone: row['Telefone'] || null,
        address: fullAddress || null,
        birth_date: row['Nascimento'] instanceof Date ? row['Nascimento'].toISOString().split('T')[0] : (row['Nascimento'] || null),
        gender: 'prefiro_nao_dizer',
        civil_status: null,
        instagram_handle: null,
        role: 'client',
        acquisition_source: mapAcquisition(row['OrigemLead']),
        nps_score: Math.floor(Math.random() * 3) + 8,
        total_spend: Math.floor(Math.random() * 2000),
        total_sessions_count: Math.floor(Math.random() * 10),
        last_visit: row['Criado em'] instanceof Date ? row['Criado em'].toISOString() : new Date().toISOString(),
        churn_risk: Math.random() > 0.8,
        pref_temperature: '35.0',
        pref_lighting: '#ccb0f0',
        pref_music: 'Ambient',
        medical_notes: null,
        created_at: row['Criado em'] instanceof Date ? row['Criado em'].toISOString() : new Date().toISOString(),
        updated_at: row['Atualizado em'] instanceof Date ? row['Atualizado em'].toISOString() : new Date().toISOString()
    };
});

const tsContent = `import type { Profile } from "@/types/database";

export const MOCK_CLIENTS: Profile[] = ${JSON.stringify(profiles, null, 4)} as unknown as Profile[];`;

writeFileSync('src/lib/realClientsData.ts', tsContent, 'utf-8');
console.log('Real clients file generated correctly at src/lib/realClientsData.ts');
