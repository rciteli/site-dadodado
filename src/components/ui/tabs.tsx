import * as React from 'react';
import clsx from 'clsx';

export function Tabs({
  value,
  onValueChange,
  className,
  children,
}: {
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx('w-full', className)}>
      {/* Contexto simples: usamos data attributes para comunicação com os filhos via props */}
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { __tabsValue: value, __onChange: onValueChange })
      )}
    </div>
  );
}

export function TabsList({
  className,
  children,
  __tabsValue,
  __onChange,
}: any) {
  return (
    <div className={clsx('rounded-xl border border-white/10 bg-white/5 p-1', className)} role="tablist">
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { __tabsValue, __onChange })
      )}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  __tabsValue,
  __onChange,
}: any) {
  const active = __tabsValue === value;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => __onChange(value)}
      className={clsx(
        'w-full rounded-lg px-3 py-2 text-sm transition',
        active ? 'bg-[#3b25a1] text-white' : 'text-white/80 hover:bg-white/10'
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  __tabsValue,
}: any) {
  if (__tabsValue !== value) return null;
  return <div>{children}</div>;
}
