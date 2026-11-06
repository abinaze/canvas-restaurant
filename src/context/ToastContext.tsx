import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface ToastAction { label: string; to: string }
interface ToastItem { id: number; message: string; action?: ToastAction }
interface ToastApi { toast: (message: string, action?: ToastAction) => void }

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setItems((s) => s.filter((t) => t.id !== id)), []);
  const toast = useCallback((message: string, action?: ToastAction) => {
    const id = nextId.current++;
    setItems((s) => [...s.slice(-2), { id, message, action }]);
    window.setTimeout(() => dismiss(id), 4500);
  }, [dismiss]);

  const api = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex flex-col items-center gap-2 px-4 md:bottom-8">
        {items.map((t) => (
          <div key={t.id} className="pointer-events-auto flex max-w-md items-center gap-4 rounded-[3px] bg-ink px-4 py-3 text-sm text-paper shadow-lg">
            <span>{t.message}</span>
            {t.action && (
              <Link to={t.action.to} onClick={() => dismiss(t.id)} className="font-semibold text-ochre underline underline-offset-4">
                {t.action.label}
              </Link>
            )}
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss message" className="-mr-1 grid h-8 w-8 place-items-center rounded hover:bg-white/10">
              <X size={16} aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
