#  Sintaxis Lab :: Simulador de Degradación de Memoria Caché

** [Ver Simulador en Vivo](https://ciclo-de-vida-y-degradacion-de-memo.vercel.app/)**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Math.js](https://img.shields.io/badge/Math.js-Simbólico-blue?style=for-the-badge)

Plataforma de auditoría analítica desarrollada para evaluar el ciclo de vida y la degradación de bloques de memoria en motores de bases de datos de alta disponibilidad (Escenario 4).

## Modelo Matemático (EDO Homogénea)

El sistema resuelve dinámicamente la siguiente ecuación diferencial de primer orden:
`(x² - 3y²)dx + 2xydy = 0`

Mediante el uso del **Método de Runge-Kutta de 4to Orden (RK4)**, el motor renderiza el espacio de estados ocupado por la memoria caché, calculando en tiempo real la constante de integración `C` a partir de la auditoría inicial del Garbage Collector (PVI).

##  Despliegue Local (DevOps)

1. Clonar el repositorio:
```bash
   git clone [https://github.com/elecruz/Ciclo_de_vida_y_Degradacion_de_Memoria_Cache.git](https://github.com/elecruz/Ciclo_de_vida_y_Degradacion_de_Memoria_Cache.git)