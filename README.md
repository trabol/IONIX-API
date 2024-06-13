

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

## Swagger
ir al url

http://localhost:8081/docs#/