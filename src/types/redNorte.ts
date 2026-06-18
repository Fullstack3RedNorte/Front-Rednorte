// Representa la estructura genérica de paginación que usan ambos microservicios de RedNorte
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// Historial de cambios de estado clínico
export interface HistorialEstadoResponse {
  estadoAnterior: string | null;
  estadoNuevo: string;
  motivo: string | null;
  fechaCambio: string;
  rutUsuarioResponsable?: string; // Opcional porque el Portal Paciente lo oculta por privacidad
}

// Detalle completo de una solicitud en lista de espera
export interface SolicitudDetalleResponse {
  id: number;
  rutPaciente: string;
  rutFuncionario?: string;
  especialidad: string;
  diagnostico: string;
  esGES: boolean;
  patologiaGES: string | null;
  nivelUrgencia: 'GES' | 'URGENTE' | 'VULNERABLE' | 'ELECTIVA'; 
  esVulnerable: boolean;
  tipoVulnerabilidad: string | null;
  prioridad: number;
  estado: 'EN_ESPERA' | 'CITADO' | 'ATENDIDO' | 'AUSENTE' | 'CERRADO' | 'ANULADO' | 'DERIVADO' | 'VENCIDO';
  fechaRegistro: string;
  fechaActualizacion: string;
  historial: HistorialEstadoResponse[];
}

// Payload necesario para registrar un paciente (POST /solicitudes)
export interface CrearSolicitudPayload {
  rutPaciente: string;
  especialidadId: number;
  diagnostico: string;
  esGES: boolean;
  patologiaGES: string | null;
  nivelUrgencia: string;
  esVulnerable: boolean;
  tipoVulnerabilidadId: number | null;
}