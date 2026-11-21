import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(panel) {
  return Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => element.getClientRects().length > 0,
  );
}

export function Modal({
  titleId,
  descriptionId,
  onClose,
  initialFocusRef,
  returnFocusTo,
  children,
}) {
  const panelRef = useRef(null);
  const backdropPressed = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    const focusTarget =
      initialFocusRef?.current ??
      (panel ? getFocusableElements(panel)[0] : null) ??
      panel;

    focusTarget?.focus?.();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !panel) {
        return;
      }

      const focusable = getFocusableElements(panel);

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const activeInsidePanel = panel.contains(active);

      if (event.shiftKey && (active === first || !activeInsidePanel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !activeInsidePanel)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;

      const focusTarget = returnFocusTo ?? previouslyFocused;

      if (focusTarget instanceof HTMLElement && document.contains(focusTarget)) {
        focusTarget.focus();
      }
    };
  }, [initialFocusRef, returnFocusTo]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-20 flex items-center justify-center overflow-y-auto bg-[rgba(23,23,23,0.55)] px-4 py-6 max-[680px]:p-4"
      onMouseDown={(event) => {
        backdropPressed.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (backdropPressed.current && event.target === event.currentTarget) {
          onClose();
        }
        backdropPressed.current = false;
      }}
    >
      <div
        className="modal relative max-h-[calc(100vh-48px)] w-full max-w-[460px] overflow-y-auto rounded-none border-[3px] border-ink bg-surface p-6 shadow-modal max-[680px]:max-h-[calc(100vh-32px)] max-[680px]:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        ref={panelRef}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal__close absolute right-3 top-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-none border-[3px] border-ink bg-muted p-0 text-ink shadow-[3px_3px_0_#171717] transition-[transform,box-shadow] duration-[90ms] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#171717] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-blue-strong"
          onClick={onClose}
          aria-label="Tutup dialog"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
