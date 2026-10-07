export type TipoDocumento = "word" | "excel" | "powerpoint" | "pdf" | "carpeta";

export type EstadoDocumento = "Terminado" | "En proceso" | "Enviar cliente" | "Revisar";

export type DocumentoItem = {
  id: string;
  nombreEstandar: string;
  nombreCasual: string;
  tipo: TipoDocumento;
  size?: number;
  estado?: EstadoDocumento;
  comentario?: string;
  parentId: string | null;
  versiones?: DocumentoItem[];
  fechaCreacion?: string;
  creadoPor?: string;
  webUrl?: string;
};

export function esCarpeta(item: DocumentoItem): boolean {
  return item.tipo === "carpeta";
}

const ICONOS: Record<TipoDocumento, string> = {
  word: "📘",
  excel: "📗",
  powerpoint: "📙",
  pdf: "📕",
  carpeta: "📁",
};

export function getIcono(tipo: TipoDocumento): string {
  return ICONOS[tipo];
}

const NOMBRES_TIPO: Record<TipoDocumento, string> = {
  word: "Word",
  excel: "Excel",
  powerpoint: "PowerPoint",
  pdf: "PDF",
  carpeta: "Carpeta",
};

export function getNombreTipo(tipo: TipoDocumento): string {
  return NOMBRES_TIPO[tipo];
}

export function formatSize(bytes?: number): string {
  if (!bytes) return "—";
  const kb = bytes / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`;
}