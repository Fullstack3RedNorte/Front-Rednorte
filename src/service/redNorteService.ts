import bffClient from '../api/bffClient';
import type { 
  EspecialidadResponse, 
  SolicitudResponse, 
  SolicitudDetalleResponse, 
  PageResponse, 
  CrearSolicitudRequest, 
  CambiarEstadoRequest 
} from '../types/redNorte';

export const redNorteService = {
  
  // GET /bff/lista-espera/especialidades
  listarEspecialidadesActivas: async (): Promise<EspecialidadResponse[]> => {
    // AGREGADO EL PREFIJO CORRECTO DEL BFF
    const response = await bffClient.get<EspecialidadResponse[]>('/bff/lista-espera/especialidades');
    return response.data;
  },

  // POST /bff/lista-espera/solicitudes
  crearSolicitud: async (payload: CrearSolicitudRequest): Promise<SolicitudResponse> => {
    const response = await bffClient.post<SolicitudResponse>('/bff/lista-espera/solicitudes', payload);
    return response.data;
  },

  // GET /bff/lista-espera/solicitudes
  listarSolicitudes: async (filtros: {
    especialidadId?: number;
    estado?: string;
    rutPaciente?: string;
    page?: number;
    size?: number;
    ordenarPor?: string;
  } = {}): Promise<PageResponse<SolicitudResponse>> => {
    
    const params = {
      especialidadId: filtros.especialidadId,
      estado: filtros.estado,
      rutPaciente: filtros.rutPaciente,
      page: filtros.page ?? 0,
      size: filtros.size ?? 20,
      ordenarPor: filtros.ordenarPor ?? 'prioridad'
    };

    // AGREGADO EL PREFIJO CORRECTO DEL BFF
    const response = await bffClient.get<PageResponse<SolicitudResponse>>('/bff/lista-espera/solicitudes', { params });
    return response.data;
  },

  // GET /bff/lista-espera/solicitudes/{id}
  obtenerDetalleSolicitud: async (id: number): Promise<SolicitudDetalleResponse> => {
    const response = await bffClient.get<SolicitudDetalleResponse>(`/bff/lista-espera/solicitudes/${id}`);
    return response.data;
  },

  // PATCH /bff/lista-espera/solicitudes/{id}/estado
  cambiarEstadoSolicitud: async (id: number, payload: CambiarEstadoRequest): Promise<SolicitudDetalleResponse> => {
    const response = await bffClient.patch<SolicitudDetalleResponse>(`/bff/lista-espera/solicitudes/${id}/estado`, payload);
    return response.data;
  }
};