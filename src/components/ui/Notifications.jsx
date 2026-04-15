import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  info: Info,
  error: AlertCircle,
};
const colors = {
  success: 'border-green-500/30 bg-green-500/10 text-green-300',
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  error: 'border-red-500/30 bg-red-500/10 text-red-300',
};

export default function Notifications() {
  const { notifications } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = icons[n.type] || Info;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 60, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.8 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border glass pointer-events-auto ${colors[n.type] || colors.info}`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="text-sm font-medium flex-1">{n.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
