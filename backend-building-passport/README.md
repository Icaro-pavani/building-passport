# <p align = "center"> Building Passport </p>

<div align = "center">
<img src="./../frontend-building-passport/src/assets/Logo.png" alt="logo" style="height: 200px"/>
</div>
<br>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Icaro Pavani-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Icaro-pavani/building-passport?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

Building Passport is an APP that makes easier to invite people and guarantee their access in the condominium. Its only need to ask the condominium manager to register your data to the system and you'll be able to invite your guests and, after their confirmation, their entry will be guaranteed by a QRCode generated in the confirmation.

---

## :computer: Technologies and concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- PostgreSQL
- Prisma
- Express
- Jest

---

## :rocket: Routes

```yml
POST /sign-up
    - Route to registry e-mail and password to a resident
    - headers: {}
    - body: {
        "id": 1,
        "cpf": "444.555.333-99",
        "email": "test@tt.cc",
        "password": "1234",
        "confirmPassword": "1234"
    }
```

```yml
POST /login
    - Route to login a resident to a condominium
    - headers: {}
    - body: {
        "buildingId": 1,
        "email": "test@tt.cc",
        "password": "1234"
    }
```

```yml
GET /buildings
    - Route to list all condominuims or buildings
    - headers: {}
    - body: {}
```

```yml
GET /residents/:id
    - Route to list all residents living in a condominuim or building (id)
    - headers: {}
    - body: {}
```

```yml
GET /news (authenticated)
    - Route to list all news on the resident condominuim or building
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /lists (authenticated)
    - Route to add a list/event with guests
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "test party",
        "numberGuests": 2,
        "date": "03/12",
        "hour": "21:00",
        "guests": [{
            "name": "test 1",
            "email": "tt1@tt.com"
        },{
            "name": "ful2",
            "email": "tt2@tt.com"
        }]
    }
```

```yml
GET /lists (authenticated)
    - Route to list all lists/events of the resident
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /lists/:id (authenticated)
    - Route to get a specific list/event (id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /guest (authenticated by guest token)
    - Route to list the information of a specific guest
    - headers: { "Authorization": "Bearer ${guest-token}" }
    - body: {}
```

```yml
POST /guest (authenticated by guet token)
    - Route to confirm the presence of a guest
    - headers: { "Authorization": "Bearer ${guest-token}" }
    - body: {
        "name": "Guest name",
        "email": "guest@email.com",
        "cpf": "333.545.676-99"
    }
```

```yml
POST /buildings
    - Route to login as the condominium or building manager
    - headers: {}
    - body: {
        "key": "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5"
    }
```

```yml
GET /buildings/news (authenticated by building token)
    - Route to list all news of a specific condominium or building
    - headers: { "Authorization": "Bearer ${building-token}" }
    - body: {}
```

```yml
POST /buildings/news (authenticated by building token)
    - Route to add one news to a specific condominium or building
    - headers: { "Authorization": "Bearer ${building-token}" }
    - body: {
        "title": "news title",
        "description" : "news body"
    }
```

```yml
DELETE /news/:id (authenticated by building token)
    - Route to delete one news to a specific condominium or building
    - headers: { "Authorization": "Bearer ${building-token}" }
    - body: {}
```

```yml
GET /residents (authenticated by building token)
    - Route to list all residents registered in a specific condominium or building
    - headers: { "Authorization": "Bearer ${building-token}" }
    - body: {}
```

```yml
POST /residents (authenticated by building token)
    - Route to add one resident in a specific condominium or building
    - headers: { "Authorization": "Bearer ${building-token}" }
    - body: {
        "name": "Acacia Leal",
        "cpf": "444.512.398-44",
        "apartment": "21A"
    }
```

```yml
POST /status/residents/:id (authenticated by building token)
    - Route to define the status if the resident is living or not in a specific condominium or building
    - headers: { "Authorization": "Bearer ${building-token}" }
    - body: {
        "isLiving": false/true
    }
```

```yml
DELETE /residents/:id (authenticated by building token)
    - Route to delete one resident (id) and his events in a specific condominium or building
    - headers: { "Authorization": "Bearer ${building-token}" }
    - body: {}
```

---

## 🏁 Running the application

This project was created using TypeScript, [Node.js](https://nodejs.org/en/download/) and [PostgresSQL](https://www.postgresql.org/) as database. So, make sure do you have the last version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running localy.

Run the command below to install the project dependencies.

```
npm install
```

At last, just need to start the server with the command:

```
npm start
```

:stop_sign: Don't forget to follow the same steps showed above in the [front-end](https://github.com/Icaro-pavani/building-passport/tree/main/frontend-building-passport), which contains the webpage application for this API. Thus, you can test the role project.

## Deploy

The link of the deployed API is [https://building-passport.herokuapp.com/](https://building-passport.herokuapp.com/)
