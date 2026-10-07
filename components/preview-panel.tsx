import { DocumentoItem, getIcono } from "@/lib/documento-types";

type PreviewPanelProps = {
  item: DocumentoItem | null;
};

export function PreviewPanel({ item }: PreviewPanelProps) {
  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm p-4">
        La vista previa aparecerá aquí
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="text-xs text-gray-400 mb-2">Vista previa (solo lectura)</div>
      <div className="border border-gray-200 rounded bg-gray-50 h-full flex flex-col items-center justify-center text-gray-400 gap-2">
        <span className="text-4xl">{getIcono(item.tipo)}</span>
        <span className="text-sm">{item.nombreCasual}</span>
        <span className="text-xs">(vista previa real pendiente de integración)</span>
      </div>
    </div>
  );
}