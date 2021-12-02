jest.setTimeout(30000);
let app = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)

describe("Cadastro de usuário", () =>{

    test("Um usuário deve ser cadastrado com sucesso", () =>{
        let time = Date.now()
        let email = `${time}@gmail.com`
        let user = {
            name: "Marlon",
            email: email,
            password: "1234"
        }
        return request.post('/user').send(user).then(res =>{

        expect(res.statusCode).toEqual(200)
        expect(res.body.email).toEqual(email)
        }).catch(err =>{
            fail(err)
        })
    })

    test("Deve impedir que um usuário cadastre dados vazios", () =>{
        let user = {name: "", email: "", password: ""}

        return request.post('/user').send(user).then(res =>{

            expect(res.statusCode).toEqual(400)
            expect(res.body.email).toEqual(email)
            }).catch(err =>{
                fail(err)
            })
    })

})