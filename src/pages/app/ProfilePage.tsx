import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Briefcase, Crown, Edit3, Save, LogOut } from 'lucide-react';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        fullName: user?.fullName || '',
        phone: '',
        profession: '',
        neighborhood: '',
        city: '',
    });

    const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSave = () => {
        // TODO: call API to update profile
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-900" />
                <div className="p-6 -mt-10">
                    <div className="flex items-end gap-4">
                        <div className="h-20 w-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600">
                            <span className="text-2xl font-bold text-white">
                                {user?.fullName?.charAt(0)?.toUpperCase() || 'V'}
                            </span>
                        </div>
                        <div className="pb-1">
                            <h1 className="text-xl font-bold text-slate-900">{user?.fullName || 'Void User'}</h1>
                            <p className="text-sm text-slate-500">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Level card */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-cyan-700" />
                        <span className="text-sm font-semibold text-cyan-900">void club — {user?.level || 'iniciado'}</span>
                    </div>
                    <span className="text-xs font-medium text-cyan-600 bg-cyan-100 px-2 py-0.5 rounded-full">
                        {user?.xp || 0} xp
                    </span>
                </div>
                <div className="h-2 bg-cyan-200 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(((user?.xp || 0) / 500) * 100, 100)}%` }} />
                </div>
                <p className="text-xs text-cyan-600 mt-2">próximo nível: explorador (500 xp)</p>
            </div>

            {/* Profile form */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">informações pessoais</h2>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        {isEditing ? <><Save className="h-3.5 w-3.5" /> salvar</> : <><Edit3 className="h-3.5 w-3.5" /> editar</>}
                    </button>
                </div>

                <div className="space-y-4">
                    <ProfileField icon={User} label="nome" value={form.fullName} onChange={(v) => update('fullName', v)} editing={isEditing} />
                    <ProfileField icon={Mail} label="email" value={user?.email || ''} editing={false} />
                    <ProfileField icon={Phone} label="telefone" value={form.phone} onChange={(v) => update('phone', v)} editing={isEditing} placeholder="(41) 99999-9999" />
                    <ProfileField icon={Briefcase} label="profissão" value={form.profession} onChange={(v) => update('profession', v)} editing={isEditing} placeholder="sua profissão" />
                    <ProfileField icon={MapPin} label="bairro" value={form.neighborhood} onChange={(v) => update('neighborhood', v)} editing={isEditing} placeholder="seu bairro" />
                    <ProfileField icon={MapPin} label="cidade" value={form.city} onChange={(v) => update('city', v)} editing={isEditing} placeholder="Curitiba" />
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    sair da conta
                </button>
            </div>
        </div>
    );
}

function ProfileField({ icon: Icon, label, value, onChange, editing, placeholder }: {
    icon: any; label: string; value: string; onChange?: (v: string) => void; editing: boolean; placeholder?: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <Icon className="h-4 w-4 text-slate-400 shrink-0" />
            <div className="flex-1">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</label>
                {editing && onChange ? (
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full text-sm text-slate-900 border-b border-slate-200 py-0.5 focus:outline-none focus:border-slate-900 transition-colors"
                        placeholder={placeholder}
                    />
                ) : (
                    <p className="text-sm text-slate-900">{value || <span className="text-slate-300">—</span>}</p>
                )}
            </div>
        </div>
    );
}
