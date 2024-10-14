import axios from 'axios';
import { expect } from 'chai';

const baseURL = 'https://reqres.in/api'; 
let newUserId;

describe('REST API Task', () => {
    it('should list available users', async () => {
        const response = await axios.get(`${baseURL}/users?page=1`);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('data');
        const users = response.data.data;

        const firstUser = users[0];
        const userDetails = {
            id: firstUser.id,
            email: firstUser.email,
        };
        console.log('Extracted User Details:', userDetails);

        const sortedUsers = users.sort((a, b) => a.first_name.localeCompare(b.first_name));
        console.log('Sorted Users:', sortedUsers);
    });

    it('should get details of a user by ID', async () => {
        const userId = 4;
        const response = await axios.get(`${baseURL}/users/${userId}`);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('data');
        console.log(response.data.data)
    });

    it('should return 404 for non-existing user', async () => {
        const userId = "invalidID"
        try {
            await axios.get(`${baseURL}/users/${userId}`);
        } catch (error) {
            console.log(`User with ID "${userId}" not found!`)
            expect(error.response.status).to.equal(404);
        }
    });

    it('should create a new user', async () => {
        const newUser = {
            // id: '99',
            email: 'johndoe@example.com',
            first_name: 'John',
            last_name: 'Doe',
            avatar: 'https://reqres.in/img/faces/2-image.jpg'
        };
        const response = await axios.post(`${baseURL}/users`, newUser);
        expect(response.status).to.equal(201);
        console.log(`User created with ID ${response.data.id}`)
        newUserId = response.data.id;
    });

    it('should delete the newly created user', async () => {
        const response = await axios.delete(`${baseURL}/users/${newUserId}`);
        expect(response.status).to.equal(204);
        console.log(`User with ID ${newUserId} deleted`)
    });
});