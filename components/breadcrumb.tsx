import { DocumentoItem } from "@/lib/documento-types";

type BreadcrumbProps = {
  ruta: DocumentoItem[];
  onNavigate: (id: string | null) => void;
};

export function Breadcrumb({ ruta, onNavigate }: BreadcrumbProps) {
  return (
    <div className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
      <button onClick={() => onNavigate(null)} className="hover:text-gray-900 hover:underline">
        Documentos
      </button>
      {ruta.map((item) => (
        <span key={item.id} className="flex items-center gap-1">
          <span>/</span>
          <button onClick={() => onNavigate(item.id)} className="hover:text-gray-900 hover:underline">
            {item.nombreCasual}
          </button>
        </span>
      ))}
    </div>
  );
}