import bffClient from '../api/bffClient';
import type { PageResponse, SolicitudDetalleResponse, CrearSolicitudPayload } from '../types/redNorte';

export const redNorteService = {
  
  // PORTAL PACIENTES: Obtener solicitudes resumidas usando solo el RUT (Sin autenticación)
  obtenerSolicitudesPaciente: async (rutPaciente: string, page = 0, size = 20): Promise<PageResponse<SolicitudDetalleResponse>> => {
    try {
      // Ajusta este prefijo según la ruta exacta que exponga tu BFF Gateway
      const response = await bffClient.get<PageResponse<SolicitudDetalleResponse>>(
        `/portal/solicitudes`, {
          params: { rutPaciente, page, size }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error consultando solicitudes del paciente:", error);
      throw error;
    }
  },

  // PORTAL PACIENTES: Obtener el detalle específico con historial clínico
  obtenerDetalleSolicitudPaciente: async (id: number, rutPaciente: string): Promise<SolicitudDetalleResponse> => {
    const response = await bffClient.get<SolicitudDetalleResponse>(`/portal/solicitudes/${id}`, {
      params: { rutPaciente }
    });
    return response.data;
  },

  // GESTIÓN INTERNA (Opcional): Si este front también lo usarán funcionarios autenticados para ingresar solicitudes
  crearSolicitudListaEspera: async (payload: CrearSolicitudPayload): Promise<SolicitudDetalleResponse> => {
    const response = await bffClient.post<SolicitudDetalleResponse>('/solicitudes', payload);
    return response.data;
  }
};