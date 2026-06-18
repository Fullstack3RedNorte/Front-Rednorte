export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface EspecialidadResponse {
  id: number;
  nombre: string;
  descripcion: string;
}

export type EstadoSolicitud = 'EN_ESPERA' | 'CITADO' | 'ATENDIDO' | 'AUSENTE' | 'CERRADO' | 'ANULADO' | 'DERIVADO' | 'VENCIDO';
export type NivelUrgencia = 'GES' | 'URGENTE' | 'VULNERABLE' | 'ELECTIVA';

// DTO Corto: Mapeado exacto de mapToResponse
export interface SolicitudResponse {
  id: number;
  rutPaciente: string;
  especialidad: string; // Nombre de la especialidad (string)
  prioridad: number;
  estado: EstadoSolicitud;
  fechaRegistro: string;
  fechaCita: string | null;
}

// Historial: Mapeado exacto de mapToHistorialResponse
export interface HistorialEstadoResponse {
  estadoAnterior: EstadoSolicitud | null;
  estadoNuevo: EstadoSolicitud;
  motivo: string | null;
  fechaCambio: string;
  rutUsuarioResponsable: string;
}

// DTO Largo: Mapeado exacto de mapToDetalleResponse
export interface SolicitudDetalleResponse {
  id: number;
  rutPaciente: string;
  rutFuncionario: string;
  especialidad: string; // El backend envía solo el nombre (string)
  diagnostico: string;
  esGES: boolean;
  patologiaGES: string | null;
  nivelUrgencia: NivelUrgencia;
  esVulnerable: boolean;
  tipoVulnerabilidad: string | null; // El backend envía solo el nombre (string) o null
  prioridad: number;
  estado: EstadoSolicitud;
  fechaRegistro: string;
  fechaActualizacion: string;
  fechaCita: string | null;
  historial: HistorialEstadoResponse[];
}

// Estructuras de envío (Requests)
export interface CrearSolicitudRequest {
  rutPaciente: string;
  especialidadId: number;
  diagnostico: string;
  esGES: boolean;
  patologiaGES: string | null;
  nivelUrgencia: NivelUrgencia;
  esVulnerable: boolean;
  tipoVulnerabilidadId: number | null;
}

export interface CambiarEstadoRequest {
  nuevoEstado: EstadoSolicitud;
  motivo: string | null;
  fechaCita?: string | null; // Requerido en formato ISO string únicamente si el estado cambia a 'CITADO'
}