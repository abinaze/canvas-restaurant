import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  /** Hide the default close button (the content supplies its own). */
  bare?: boolean;
}

/** Native <dialog>: focus trap, Escape to close and inert background come from the browser. */
export function Modal({ open, onClose, label, children, className = "", bare }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && dlg.open) dlg.close();
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={() => { document.body.style.overflow = ""; if (open) onClose(); }}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className={`m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] overflow-auto rounded-[4px] bg-paper p-0 text-ink shadow-2xl ${className}`}
    >
      {open && (
        <div className="relative">
          {!bare && (
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/95 text-ink shadow hover:bg-white">
              <X size={20} aria-hidden />
            </button>
          )}
          {children}
        </div>
      )}
    </dialog>
  );
}
