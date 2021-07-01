[![Pipeline](https://github.com/alabras/search-challenge-web/actions/workflows/pipeline.yml/badge.svg)](https://github.com/alabras/search-challenge-web/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/alabras/search-challenge-web/badge.svg)](https://snyk.io/test/github/alabras/search-challenge-web)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Falabras%2Fsearch-challenge-web%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/alabras/search-challenge-web/main)
[![dependencies Status](https://david-dm.org/alabras/search-challenge-web/status.svg)](https://david-dm.org/alabras/search-challenge-web)
[![devDependencies Status](https://david-dm.org/alabras/search-challenge-web/dev-status.svg)](https://david-dm.org/alabras/search-challenge-web?type=dev)

# Desafío de busqueda :D

Esta es la componente web del desafío, realizada con React y su responsabilidad mostrar busqueda que realice el cliente.

## Comandos rápidos

- npm run awesome: Ejecuta pruebas
- npm start: Inicia en modo desarrollo.

## Descripción de carpetas

La estructura de carpetas es la siguiente:

- .github/workflows: Donde se encuentra definido los pipelines.
- docs/adr: Listado de deficiones
- coverage: Resultado de coverage de pruebas unitarias.
- reports
  - junit: Reporte de las pruebas unitarias y de integración en formato xml.
  - mutation: Resultado de las pruebas de mutación en formato html.
- src
  - api: Comunicación con la api
  - assets: carpeta de assets globales.
  - components: Diferentes componentes para satisfacer la solución.
  - utils:
  - ** test **/integración: Pruebas de integración
- test
  - mocks: Listado de archivos usado para pruebas.

## Pirámide de pruebas

Se definió la siguiente pirámide de pruebas:

- Unitarias
- Mutación: utilizando `stryker`
- Integración
- Seguridad
  - Paquetes: usando herramienta `snyk` (ver nota de snyk más abajo)
  - Docker: usando herramienta `snyk`, se verifican issues de seguiridad dentro de la imagen docker.
  - Código: utilizando linter `eslint-plugin-security` se validan ciertas reglas de seguridad en el código.

## Seguridad

Se ha implementado lo siguiente:

- Headers de seguridad: Se aplicaron un conjunto de headers de seguridad en configuración de `nginx`.

- Imagen Docker Non ROOT: Se está ejecutando con usuario diferente a ROOT.

- Imagen Docker Multistage: Usando `docker multistage build` se minimiza la cantidad de código publicado, dejando solamente lo necesario para su ejecución.

## Variables de Entorno

Las variables de entorno se leen del archivo .env y esta es:

- API_URL: Url base de la api.

Al momento de construcción de imagen docker, no se incluyen estas variables, con el objetivo de que sean configuradas al momento de ejecución. Con esto se logra que la misma imagen docker sirva para cualquier ambiente.
([ver adr](/docs/adr/004_Variables-entorno.md))

## Pipelines

Existen dos pipelines:

- Pipeline: El cual se ejecuta en cada push, corre las pruebas unitarias, integración, realiza build de la imagen docker y publica en infraestructura.

- Testing: El cual se ejecuta con un cron (una vez al día), y corre todas las pruebas de la piramide de pruebas.

## Consideraciones

1. Se asumio localización es-CL por defecto.

### Ejecución de Snyk

Para ejecutar pruebas con Snyk debe definir `SNYK_TOKEN` como variable de entorno.

El token, lo puede obtener en https://app.snyk.io/account en apartado Auth Token. (Es grátis :D)

## TODO

- Falta implementar manejo de logs y analítica ya que al estar en un ambiente de prueba no se buscó una solución para esto.

- Falta mostrar el resultado de la ejecución de las pruebas (unitarias, integracion, mutación, etc) en algún dashboard al finalizar el pipeline

- Solucionar vulnerabilidades de seguridad con algunos packages (create-react-app) y de imagen base de docker.
