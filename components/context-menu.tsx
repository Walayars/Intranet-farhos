"use client";

export type MenuItem = {
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean;
};

type ContextMenuProps = {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
};

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      <div
        className="fixed z-50 bg-white border border-gray-200 rounded shadow-lg py-1 w-56"
        style={{ top: y, left: x }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-2 ${
              item.danger ? "text-red-600" : ""
            }`}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}