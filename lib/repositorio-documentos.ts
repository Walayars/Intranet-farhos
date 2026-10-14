import { DocumentoItem, TipoDocumento } from "./documento-types";
import { documentosIniciales } from "./documentos-mock";

// Simula una "base de datos en memoria" por ahora.
// TODO: cuando conectemos PostgreSQL, este archivo completo se reemplaza
// por llamadas a Prisma + Microsoft Graph API — pero la FORMA de cada función
// (nombre, qué recibe, qué devuelve) se mantiene igual.

let datosEnMemoria: DocumentoItem[] = [...documentosIniciales];

export async function listarHijos(parentId: string | null): Promise<DocumentoItem[]> {
  // TODO real: SELECT * FROM documentos WHERE parent_id = ? (PostgreSQL)
  //            + llamada a Graph API para datos del archivo en SharePoint
  return datosEnMemoria.filter((d) => d.parentId === parentId);
}

export async function obtenerPorId(id: string): Promise<DocumentoItem | undefined> {
  // TODO real: SELECT * FROM documentos WHERE id = ?
  return datosEnMemoria.find((d) => d.id === id);
}

export async function obtenerRuta(id: string | null): Promise<DocumentoItem[]> {
  if (id === null) return [];
  const ruta: DocumentoItem[] = [];
  let actual = await obtenerPorId(id);
  while (actual) {
    ruta.unshift(actual);
    actual = actual.parentId ? await obtenerPorId(actual.parentId) : undefined;
  }
  return ruta;
}

export async function crearCarpeta(nombre: string, parentId: string | null): Promise<DocumentoItem> {
  // TODO real: llamar a Microsoft Graph API para crear la carpeta en SharePoint,
  //            luego INSERT en PostgreSQL con el id que devuelva Graph API
  const nueva: DocumentoItem = {
    id: `carpeta-${Date.now()}`,
    nombreEstandar: "",
    nombreCasual: nombre,
    tipo: "carpeta",
    parentId,
  };
  datosEnMemoria = [...datosEnMemoria, nueva];
  return nueva;
}

export async function crearArchivo(nombre: string, tipo: TipoDocumento, parentId: string | null): Promise<DocumentoItem> {
  // TODO real: llamar a Microsoft Graph API para crear el archivo vacío en SharePoint,
  //            luego INSERT en PostgreSQL con los campos propios del negocio (estado, comentario, etc.)
  const nuevo: DocumentoItem = {
    id: `doc-${Date.now()}`,
    nombreEstandar: "",
    nombreCasual: nombre,
    tipo,
    size: 0,
    estado: "En proceso",
    parentId,
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: new Date().toISOString(),
    creadoPor: "Tú",
    versiones: [],
  };
  datosEnMemoria = [...datosEnMemoria, nuevo];
  return nuevo;
}

export async function renombrar(id: string, nuevoNombre: string): Promise<void> {
  // TODO real: Graph API para renombrar en SharePoint + UPDATE en PostgreSQL
  // (SharePoint actualiza lastModifiedDateTime solo)
  datosEnMemoria = datosEnMemoria.map((i) =>
    i.id === id
      ? { ...i, nombreCasual: nuevoNombre, fechaModificacion: new Date().toISOString() }
      : i
  );
}

export async function eliminar(id: string): Promise<void> {
  // TODO real: Graph API para eliminar/mover a papelera en SharePoint + DELETE en PostgreSQL
  datosEnMemoria = datosEnMemoria.filter((i) => i.id !== id && i.parentId !== id);
}