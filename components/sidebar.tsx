import { Logo } from "./logo";
import { DocumentoItem, esCarpeta } from "@/lib/documento-types";

type SidebarProps = {
  carpetasRaiz: DocumentoItem[];
  carpetaActual: string | null;
  onSelect: (id: string) => void;
};

export function Sidebar({ carpetasRaiz, carpetaActual, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col">
      <Logo />
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {carpetasRaiz.filter(esCarpeta).map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left px-2 py-1.5 rounded text-sm hover:bg-gray-100 ${
              carpetaActual === item.id ? "bg-gray-100 font-medium" : ""
            }`}
          >
            📁 {item.nombreCasual}
          </button>
        ))}
      </nav>
    </aside>
  );
}