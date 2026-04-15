import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { adminLogin } from '../../utils/adminAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const ok = adminLogin(username, password);
    setLoading(false);
    if (ok) {
      navigate('/painel', { replace: true });
    } else {
      setError('Usuário ou senha incorretos.');
      setPassword('');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#010912] via-[#0F52BA]/20 to-[#010912] flex items-center justify-center p-4">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(15,82,186,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,82,186,1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 border border-[#E2EBF6] p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#0F52BA] flex items-center justify-center shadow-lg shadow-[#0F52BA]/40 mb-4">
              <Cpu size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-[#0D1B2E]">MicroShop</h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
              <Lock size={12} />
              Acesso Administrativo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                Usuário
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="seu usuário"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2EBF6] rounded-xl text-[#0D1B2E] text-sm placeholder-gray-400 outline-none focus:border-[#0F52BA] focus:ring-2 focus:ring-[#0F52BA]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 bg-[#F8FAFC] border border-[#E2EBF6] rounded-xl text-[#0D1B2E] text-sm placeholder-gray-400 outline-none focus:border-[#0F52BA] focus:ring-2 focus:ring-[#0F52BA]/10 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
              >
                <AlertCircle size={15} />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0F52BA] hover:bg-[#1565C0] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0F52BA]/30 hover:shadow-[#0F52BA]/45 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Entrar no Painel
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400 mt-6">
            Acesso restrito. Atividade monitorada.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
