export interface ResultadoEjercicio {
    diasTotales: number;
    diasEntrenados: number;
    promedio: string;
    exito: string;
    calificacion: number;
    mensaje: string;
  }
  
  export function calcularEjercicio(horas: number[], meta: number): ResultadoEjercicio {
    let diasEntrenados = 0;
    let totalHoras = 0;
  
    for (let i = 0; i < horas.length; i++) {
      if (horas[i] > 0) diasEntrenados++;
      totalHoras += horas[i];
    }
  
    const promedio = totalHoras / horas.length;
    const exito = promedio >= meta;
  
    let calificacion = 1;
    let mensaje = 'Debes mejorar tus horas de ejercicio.';
  
    if (promedio >= meta) {
      calificacion = 3;
      mensaje = '¡Excelente! Has superado tu objetivo.';
    } else if (promedio >= meta * 0.75) {
      calificacion = 2;
      mensaje = 'No está tan mal, pero podría ser mejor.';
    }
  
    return {
      diasTotales: horas.length,
      diasEntrenados: diasEntrenados,
      promedio: promedio.toFixed(2),
      exito: exito ? 'Sí' : 'No',
      calificacion,
      mensaje,
    };
  }
  