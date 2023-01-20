import { faker } from '@faker-js/faker';
import User from "../src/models/user.model.js";

const Userseed = {
    model: User,
    // data: Array.from({length : 10}, () => { return {
    //     userId: faker.datatype.uuid(),
    //     username: faker.internet.userName(),
    //     password: faker.internet.password(),
    //     name: faker.name.fullName(),
    //     email: faker.internet.email(),
    //     isAdmin: 0,
    //     contests: [0]
    // };})
    data: [
        {
            userId: '44d13794-e3ed-4ccd-8a59-32f5c84787c0',
            username: 'admin',
            password: '12345678',
            name: 'Rufus Bechtelar',
            email: 'Jerome_Howe@gmail.com',
            isAdmin: 1,
            contests: [ 0 ]
        },
        {
            userId: '6126bec5-c470-4189-a088-d7951998d98e',
            username: 'Virgil_Swift41',
            password: 'KEIIkQn4czI8gud',
            name: 'Miss Paula Rau',
            email: 'Favian83@yahoo.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: '9d9856cd-3715-4c19-88a5-fbb448e1b7ed',
            username: 'Kayla51',
            password: 'kkKQyURc7yvzMqc',
            name: 'Andre Koelpin',
            email: 'Cole55@hotmail.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: 'f8844c59-b446-4cf6-97c6-bcec6084ff2d',
            username: 'John43',
            password: 'g_rI_NtZVvLsr6c',
            name: 'Katrina Swift',
            email: 'Sven_Kuhlman@hotmail.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: 'c1419bf1-1cd7-4274-861d-4f045d27500d',
            username: 'Landen96',
            password: 'TdiGfKlb8tekkRS',
            name: 'Faye Bartoletti',
            email: 'Katrine97@gmail.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: 'e238200d-2f03-4c13-8d58-c91f289655a4',
            username: 'Alessia51',
            password: 'ArAC9odKg7Fw6En',
            name: 'Theresa Mayert',
            email: 'Lea31@gmail.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: '7b93cdd9-5d21-43a9-8df1-5b20447273e9',
            username: 'Israel.Conn',
            password: 'TrY0kTyP0KmT4dQ',
            name: 'Gretchen Bartell',
            email: 'Glenna.Howell@yahoo.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: '47ea2e07-2c1d-4b48-8e15-447c16fd62a4',
            username: 'Corene.Koepp',
            password: 's239ofEZ3TuvX9m',
            name: 'Lela Rohan',
            email: 'Felton.Kuvalis@hotmail.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: '8ef85df3-f0be-424b-96d0-a4a9a55d2653',
            username: 'Lulu_Blanda86',
            password: 'WJq6oX2THNbpAXs',
            name: 'Jan Lebsack',
            email: 'Damion_Aufderhar71@yahoo.com',
            isAdmin: 0,
            contests: [ 0 ]
        },
        {
            userId: 'e074fb51-bf70-48cc-8507-b3b9ebfef724',
            username: 'Flavie.McCullough',
            password: 'cDyGHoct0CNwIcW',
            name: 'Louis Rowe',
            email: 'Quinton44@hotmail.com',
            isAdmin: 0,
            contests: [ 0 ]
        }
    ]
}

export default Userseed;