

## Archivo de configuracion
Cambiar el nombre del archivo .env.example a .env

## variables de desarrollo
- NODE_PORT
- NODE_ENV
- JWT_SECONDS_EXPIRE
- JWT_SECRET
- DB_PORT
- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME

## install dependencias

```bash
$ npm install
```

## levantar base de datos postgrest
```bash
# run docker
$ docker-compose up --build

```

## run servicio en modo desarrollo

```bash
# watch mode
$ npm run start:dev

```

## run Test unitarios

```bash
# unit tests
$ npm run test

```

## Swagger Documentacion
ir al url

http://localhost:8081/docs#/

![image](https://github.com/trabol/IONIX-API/assets/14164927/16bad23f-6cf9-4267-a8a7-ef5451d9bc8a)


## POSTMAN Documentacion

# export colection desde carpeta postman

![image](https://github.com/trabol/IONIX-API/assets/14164927/37d61b73-dea7-4ebe-8d96-e4e1825080ad)

# Ejecutar servicio  http://localhost:8081/auth/signup

![image](https://github.com/trabol/IONIX-API/assets/14164927/cda684e6-0399-4fce-91d2-1e142379aa21)


