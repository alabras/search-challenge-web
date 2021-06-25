# Docker

## Estatus

Aceptado

## Contexto

Se requiere que la solución sea ejecutada con docker para poder ser ejecutada en cualquier ambiente.

## Decisión

Aquí se ha decido usar docker, pero el build del proyecto se deberá realizar en la misma máquina que esté compilando docker.

Esto con el objetivo de que en el pipeline (encargado de realizar el deploy hacia ambientes de producción/staging/etc), no realice doble build (uno para ejecutar la piramide de pruebas y otro en docker) y así evitar conflictos con cambios de versiones de frameworks, etc.

## Consecuencias

Cuando se requiera realizar build de la imagen docker, se deberá previamente hacer build de la solución, para lo cual es requisito tener instalado Node (version LTS).
