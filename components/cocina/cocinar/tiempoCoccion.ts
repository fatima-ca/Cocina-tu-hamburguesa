export function calcularTiempoTranscurrido(
  duracion: number,
  tiempoRestante: number,
  fechaFinalizacion: number | null,
): number {
  const segundosRestantes = fechaFinalizacion === null
    ? tiempoRestante
    : Math.max(0, Math.ceil((fechaFinalizacion - Date.now()) / 1000));

  return Math.min(duracion, Math.max(0, duracion - segundosRestantes));
}
