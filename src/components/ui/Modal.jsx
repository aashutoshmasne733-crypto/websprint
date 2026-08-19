import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  primaryAction,
  primaryActionText = 'Confirm',
  secondaryActionText = 'Cancel',
  maxWidth = 'max-w-lg'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none font-mono">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs animate-fadeIn"
      />

      {/* Neubrutalist Dialog Container */}
      <div className={`relative w-full ${maxWidth} bg-cardWhite border-3 md:border-4 border-ink rounded-2xl shadow-hard-xl z-10 overflow-hidden space-y-4 animate-scaleUp`}>
        {/* Header */}
        <div className="p-4 md:p-5 bg-yellow border-b-3 border-ink flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg md:text-xl font-black text-ink uppercase tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs font-mono text-ink/80 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white border-2 border-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer Actions */}
        {(primaryAction || secondaryActionText) && (
          <div className="p-4 bg-background border-t-3 border-ink flex items-center justify-end gap-3">
            <Button variant="secondary" size="md" onClick={onClose}>
              {secondaryActionText}
            </Button>
            {primaryAction && (
              <Button variant="primary" size="md" onClick={primaryAction}>
                {primaryActionText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
