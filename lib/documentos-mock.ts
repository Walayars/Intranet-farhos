import { DocumentoItem } from "./documento-types";

export const documentosIniciales: DocumentoItem[] = [
  { id: "root-clientes", nombreEstandar: "", nombreCasual: "Clientes", tipo: "carpeta", parentId: null },
  { id: "root-templates", nombreEstandar: "", nombreCasual: "Templates", tipo: "carpeta", parentId: null },
  { id: "root-pipeline", nombreEstandar: "", nombreCasual: "Pipeline", tipo: "carpeta", parentId: null },
  { id: "cliente-abc", nombreEstandar: "", nombreCasual: "Comercial ABC", tipo: "carpeta", parentId: "root-clientes" },
  { id: "cliente-xyz", nombreEstandar: "", nombreCasual: "Distribuidora XYZ", tipo: "carpeta", parentId: "root-clientes" },
  {
    id: "doc-1", nombreEstandar: "", nombreCasual: "Propuesta financiamiento", tipo: "word",
    size: 245678, estado: "En proceso", comentario: "", parentId: "cliente-abc",
    fechaCreacion: "2026-03-15T11:00:00Z", creadoPor: "Camila Ríos",
    webUrl: "https://farhos.sharepoint.com/Clientes/ComercialABC/propuesta.docx",
    versiones: [
      { id: "doc-1-v1", nombreEstandar: "", nombreCasual: "version final", tipo: "word", size: 198000, parentId: "doc-1" },
      { id: "doc-1-v2", nombreEstandar: "", nombreCasual: "version final 2", tipo: "word", size: 212000, parentId: "doc-1" },
    ],
  },
  {
    id: "doc-2", nombreEstandar: "", nombreCasual: "Modelo valorización", tipo: "excel",
    size: 890000, estado: "Revisar", comentario: "Falta actualizar el tipo de cambio", parentId: "cliente-abc",
    fechaCreacion: "2026-04-02T09:30:00Z", creadoPor: "Marcelo González",
    webUrl: "https://farhos.sharepoint.com/Clientes/ComercialABC/modelo.xlsx", versiones: [],
  },
  {
    id: "doc-3", nombreEstandar: "", nombreCasual: "Presentación cliente", tipo: "powerpoint",
    size: 3400000, estado: "Enviar cliente", parentId: "cliente-abc",
    fechaCreacion: "2026-05-10T14:00:00Z", creadoPor: "Camila Ríos",
    webUrl: "https://farhos.sharepoint.com/Clientes/ComercialABC/presentacion.pptx", versiones: [],
  },
  {
    id: "doc-4", nombreEstandar: "", nombreCasual: "Contrato firmado", tipo: "pdf",
    size: 512000, estado: "Terminado", parentId: "cliente-abc",
    fechaCreacion: "2026-02-20T16:00:00Z", creadoPor: "Fernanda Soto",
    webUrl: "https://farhos.sharepoint.com/Clientes/ComercialABC/contrato.pdf", versiones: [],
  },
];