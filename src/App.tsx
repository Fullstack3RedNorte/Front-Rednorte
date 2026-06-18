import React, { useState, useEffect } from 'react';
import { redNorteService } from './service/redNorteService';
import bffClient from './api/bffClient';
import type { 
  SolicitudResponse, 
  EspecialidadResponse, 
  PageResponse,
  NivelUrgencia,
  EstadoSolicitud
} from './types/redNorte';

export default function App() {
  // --- Catálogos Iniciales ---
  const [especialidades, setEspecialidades] = useState<EspecialidadResponse[]>([]);

  // --- Estados del Formulario de Creación (Pruebas 2, 3, 4) ---
  const [rutPaciente, setRutPaciente] = useState('12345678-9');
  const [especialidadId, setEspecialidadId] = useState<number>(1);
  const [diagnostico, setDiagnostico] = useState('Paciente requiere evaluación quirúrgica urgente.');
  const [esGES, setEsGES] = useState(false);
  const [patologiaGES, setPatologiaGES] = useState('');
  const [nivelUrgencia, setNivelUrgencia] = useState<NivelUrgencia>('ELECTIVA');
  const [esVulnerable, setEsVulnerable] = useState(false);

  // --- Estados de Gestión de Estados (Pruebas 8, 9, 10) ---
  const [solicitudSeleccionadaId, setSolicitudSeleccionadaId] = useState<string>('');
  const [nuevoEstado, setNuevoEstado] = useState<EstadoSolicitud>('CITADO');
  const [motivoCambio, setMotivoCambio] = useState('');
  const [fechaCita, setFechaCita] = useState('');

  // --- Estado de Consulta Portal Paciente (Prueba 11) ---
  const [rutPortal, setRutPortal] = useState('12345678-9');

  // --- Consolas de salida e indicadores ---
  const [cargando, setCargando] = useState(false);
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [errorMsj, setErrorMsj] = useState<string | null>(null);

  // Cargar especialidades al montar
  useEffect(() => {
    redNorteService.listarEspecialidadesActivas()
      .then(res => {
        setEspecialidades(res);
        if(res.length > 0) setEspecialidadId(res[0].id);
      })
      .catch(() => setErrorMsj("Error conectando con el BFF (8090). ¿Están los servicios arriba?"));
  }, []);

  // Limpiar consola
  const limpiarConsola = () => {
    setJsonResponse(null);
    setHttpStatus(null);
    setErrorMsj(null);
  };

  // --- ACCIÓN 1: Crear Solicitud (Pruebas 2, 3, 4) ---
  const ejecutarCreacion = async () => {
    setCargando(true);
    limpiarConsola();
    try {
      const payload = {
        rutPaciente,
        especialidadId,
        diagnostico,
        esGES,
        patologiaGES: esGES ? patologiaGES || "Patología GES por defecto" : null,
        nivelUrgencia,
        esVulnerable,
        tipoVulnerabilidadId: esVulnerable ? 1 : null // ID simulado
      };
      const data = await redNorteService.crearSolicitud(payload);
      setJsonResponse(data);
      setHttpStatus(201);
      if(data.id) setSolicitudSeleccionadaId(data.id.toString());
    } catch (err: any) {
      setHttpStatus(err.response?.status || 500);
      setErrorMsj(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  // --- ACCIÓN 2: Listar con Paginación (Prueba 5) ---
  const ejecutarListado = async () => {
    setCargando(true);
    limpiarConsola();
    try {
      const data = await redNorteService.listarSolicitudes({ page: 0, size: 5 });
      setJsonResponse(data);
      setHttpStatus(200);
    } catch (err: any) {
      setHttpStatus(err.response?.status || 500);
      setErrorMsj(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  // --- ACCIÓN 3: Cambiar de Estado (Pruebas 8, 9, 10) ---
  const ejecutarCambioEstado = async () => {
    if(!solicitudSeleccionadaId) return alert("Ingresa un ID de solicitud válido");
    setCargando(true);
    limpiarConsola();
    try {
      const payload: any = {
        nuevoEstado,
        motivo: motivoCambio || null
      };
      if(nuevoEstado === 'CITADO' && fechaCita) {
        payload.fechaCita = new Date(fechaCita).toISOString();
      }
      const data = await redNorteService.cambiarEstadoSolicitud(Number(solicitudSeleccionadaId), payload);
      setJsonResponse(data);
      setHttpStatus(200);
    } catch (err: any) {
      setHttpStatus(err.response?.status || 500);
      setErrorMsj(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };
// --- ACCIÓN 4: Consultar Portal Paciente (Prueba 11) — RECORREGIDA ---
  const ejecutarPortalPaciente = async () => {
    setCargando(true);
    limpiarConsola();
    
    // RUTA EXACTA: Apunta al prefijo público definido en el BFF Gateway
    const endpointPublico = `/bff/portal-pacientes/solicitudes`;

    try {
      // Hacemos la llamada usando bffClient que ya tiene el prefijo de proxy '/api'
      const response = await bffClient.get(endpointPublico, {
        params: { rutPaciente: rutPortal }
      });
      setJsonResponse(response.data);
      setHttpStatus(response.status || 200);
    } catch (err: any) {
      setHttpStatus(err.response?.status || 500);
      setErrorMsj(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans antialiased">
      <header className="max-w-7xl mx-auto border-b border-slate-800 pb-4 mb-6">
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-500 animate-ping"></span>
          RedNorte — Consola de Pruebas de Presentación 🚀
        </h1>
        <p className="text-xs text-slate-400 mt-1">Usa este panel para simular y validar las respuestas HTTP del profesor frente al examen.</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA FORMULARIOS (SECCIÓN IZQUIERDA - 7 COLUMNAS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* BLOQUE A: REGISTRO Y PRIORIDADES (Pruebas 2, 3, 4) */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Escenario 1: Creación de Solicitud e Inteligencia de Criterios (P1 a P4)</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">RUT Paciente</label>
                <input type="text" value={rutPaciente} onChange={e => setRutPaciente(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Especialidad</label>
                <select value={especialidadId} onChange={e => setEspecialidadId(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white">
                  {especialidades.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 bg-slate-950 p-3 rounded border border-slate-850 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={esGES} onChange={e => setEsGES(e.target.checked)} className="rounded text-indigo-600 focus:ring-0" />
                <div>
                  <span className="font-bold block">Es caso GES</span>
                  <span className="text-[10px] text-slate-500">(Fuerza Prioridad 1)</span>
                </div>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={esVulnerable} onChange={e => setEsVulnerable(e.target.checked)} className="rounded text-indigo-600 focus:ring-0" />
                <div>
                  <span className="font-bold block">Vulnerable</span>
                  <span className="text-[10px] text-slate-500">(Suma ponderación)</span>
                </div>
              </label>

              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Nivel Urgencia</label>
                <select value={nivelUrgencia} onChange={e => setNivelUrgencia(e.target.value as NivelUrgencia)} className="w-full bg-slate-900 border border-slate-800 p-1 rounded text-white text-xs">
                  <option value="GES">GES (Prioridad 1)</option>
                  <option value="URGENTE">URGENTE (Prioridad 2)</option>
                  <option value="VULNERABLE">VULNERABLE (Prioridad 3)</option>
                  <option value="ELECTIVA">ELECTIVA (Prioridad 4)</option>
                </select>
              </div>
            </div>

            {esGES && (
              <input type="text" placeholder="Ingresa patología GES..." value={patologiaGES} onChange={e => setPatologiaGES(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-xs text-amber-400 font-mono" />
            )}

            <div className="flex gap-2 pt-1">
              <button onClick={ejecutarCreacion} disabled={cargando} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded text-xs uppercase tracking-wide">
                Registrar Solicitud
              </button>
              <button onClick={ejecutarListado} disabled={cargando} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 font-bold rounded text-xs uppercase">
                Prueba 5: Listar Paginado
              </button>
            </div>
          </div>

          {/* BLOQUE B: MÁQUINA DE ESTADOS (Pruebas 8, 9, 10) */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Escenario 2: Validar Transiciones Clínicas & State Pattern</h2>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ID Solicitud</label>
                <input type="number" placeholder="Ej: 1" value={solicitudSeleccionadaId} onChange={e => setSolicitudSeleccionadaId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-2 rounded font-mono text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Nuevo Estado Objetivo</label>
                <select value={nuevoEstado} onChange={e => setNuevoEstado(e.target.value as EstadoSolicitud)} className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white font-bold">
                  <option value="CITADO">CITADO</option>
                  <option value="ATENDIDO">ATENDIDO</option>
                  <option value="AUSENTE">AUSENTE</option>
                  <option value="ANULADO">ANULADO (Fuerza motivo)</option>
                  <option value="DERIVADO">DERIVADO (Fuerza motivo)</option>
                  <option value="CERRADO">CERRADO</option>
                </select>
              </div>
              {nuevoEstado === 'CITADO' && (
                <div>
                  <label className="text-slate-400 block mb-1">Fecha Cita (Futura)</label>
                  <input type="datetime-local" value={fechaCita} onChange={e => setFechaCita(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-1.5 rounded text-white text-xs" />
                </div>
              )}
            </div>

            <input type="text" placeholder="Motivo del cambio (Obligatorio para ANULADO/DERIVADO)..." value={motivoCambio} onChange={e => setMotivoCambio(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-xs text-slate-300" />

            <button onClick={ejecutarCambioEstado} disabled={cargando} className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded text-xs uppercase tracking-wide">
              Aplicar Transición de Estado
            </button>
          </div>

          {/* BLOQUE C: PORTAL PACIENTES SIN TOKEN (Prueba 11) */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Escenario 3: Portal Público Pacientes (Prueba 11)</h2>
            <p className="text-[11px] text-slate-400">Esta llamada se ejecuta contra la ruta desprotegida del BFF para confirmar que no requiere cabecera de seguridad.</p>
            <div className="flex gap-3 text-xs">
              <input type="text" value={rutPortal} onChange={e => setRutPortal(e.target.value)} className="bg-slate-950 border border-slate-800 p-2 rounded font-mono text-white w-48" placeholder="RUT Paciente" />
              <button onClick={ejecutarPortalPaciente} disabled={cargando} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded uppercase tracking-wide">
                Consultar como Paciente (Sin JWT)
              </button>
            </div>
          </div>

        </div>

        {/* CONSOLA DE PAYLOADS REALES (SECCIÓN DERECHA - 5 COLUMNAS) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900 rounded-xl border border-slate-800 p-5 min-h-[450px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Consola del Evaluador</h3>
            {httpStatus && (
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${httpStatus >= 200 && httpStatus < 300 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                HTTP {httpStatus}
              </span>
            )}
          </div>

          {/* CUERPO DEL LOG */}
          <div className="flex-1 bg-slate-950 rounded-lg p-4 font-mono text-xs overflow-auto max-h-[550px] border border-slate-850 text-slate-300">
            {cargando && <div className="text-amber-400 animate-pulse">// Extrayendo respuesta desde el clúster...</div>}
            
            {errorMsj && (
              <div className="text-red-400 bg-red-950/20 p-2.5 rounded border border-red-950 mb-2">
                <span className="font-bold">❌ Error Capturado:</span> {errorMsj}
              </div>
            )}

            {jsonResponse ? (
              <pre className="whitespace-pre-wrap">{JSON.stringify(jsonResponse, null, 2)}</pre>
            ) : (
              !cargando && <span className="text-slate-600 italic">// Modifica los controles de la izquierda y haz clic en una acción para capturar el JSON.</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}