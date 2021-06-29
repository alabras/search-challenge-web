# Variables de Entorno

## Estatus

Aceptado

## Contexto

Se requiere que las variables de entorno no dependan del build de la aplicación, esto para lograr que la misma imagen docker funcione en todos los ambientes.

## Decisión

Se decide generar las variables de entorno justo al momento de ejecutar la imagen docker, creando un archivo "env-config.js" y exponiendo las variables en la variable window.

Se sigue este aprouch:
https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/

## Consecuencias
