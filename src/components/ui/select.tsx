'use client';

import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { ChevronDown } from 'lucide-react';

type SelectCtx<T extends string> = {
  value?: T;
  setValue: (v: T) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  labelByValue?: Record<string, string>;
  triggerId: string;
  listboxId: string;
};

const Ctx = createContext<SelectCtx<any> | null>(null);

type SelectRootProps<T extends string> = PropsWithChildren<
  {
    value?: T;
    onValueChange?: (v: T) => void;
    labelByValue?: Record<string, string>;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>;

export function Select<T extends string>({
  value,
  onValueChange,
  labelByValue,
  className,
  children,
  ...rest
}: SelectRootProps<T>) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState<T | undefined>(value);
  const triggerId = useId();
  const listboxId = useId();

  useEffect(() => {
    setVal(value);
  }, [value]);

  const ctx = useMemo<SelectCtx<T>>(
    () => ({
      value: val,
      setValue: (v: T) => {
        setVal(v);
        onValueChange?.(v);
        setOpen(false);
      },
      open,
      setOpen,
      labelByValue,
      triggerId,
      listboxId,
    }),
    [val, open, onValueChange, labelByValue, triggerId, listboxId]
  );

  return (
    <Ctx.Provider value={ctx}>
      <div {...rest} className={`relative inline-block ${className ?? ''}`} />
      {/* children fora do div quebra Portal simples; então retornamos fragment */}
      <>{children}</>
    </Ctx.Provider>
  );
}

function useSelectCtx<T extends string>() {
  const c = useContext(Ctx) as SelectCtx<T> | null;
  if (!c) throw new Error('Select.* deve ser usado dentro de <Select>');
  return c;
}

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };
export function SelectTrigger({ className, ...props }: TriggerProps) {
  const { open, setOpen, triggerId, listboxId } = useSelectCtx<string>();
  return (
    <button
      id={triggerId}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listboxId}
      onClick={() => setOpen(!open)}
      className={`flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#38d4b0]/50 ${className ?? ''}`}
      {...props}
    >
      {props.children}
      <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, labelByValue } = useSelectCtx<string>();
  const label = value ? labelByValue?.[value] ?? value : undefined;
  return <span className="truncate">{label ?? placeholder ?? 'Selecionar'}</span>;
}

type ContentProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
export function SelectContent({ className, ...props }: ContentProps) {
  const { open, listboxId, setOpen, triggerId } = useSelectCtx<string>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      id={listboxId}
      role="listbox"
      aria-labelledby={triggerId}
      className={`absolute z-[100] mt-2 w-56 rounded-xl border border-white/10 bg-[#0b0b0d] p-1 shadow-xl ${className ?? ''}`}
      {...props}
    />
  );
}

type ItemProps<T extends string> = React.HTMLAttributes<HTMLDivElement> & {
  value: T;
  disabled?: boolean;
  className?: string;
};

export function SelectItem<T extends string>({ value, disabled, className, children, ...rest }: ItemProps<T>) {
  const { setValue, value: curr } = useSelectCtx<T>();
  const selected = curr === value;

  return (
    <div
      role="option"
      aria-selected={selected}
      data-selected={selected ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) setValue(value);
      }}
      className={`cursor-pointer select-none rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10 data-[selected]:bg-white/10 data-[disabled]:opacity-50 ${className ?? ''}`}
      {...rest}
    >
      {children}
    </div>
  );
}
