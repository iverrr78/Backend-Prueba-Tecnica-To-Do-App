import {sequelize} from '../database.js';
import request from 'supertest';
import server from '../server.js';

let token;
let testUserId;
let createdTaskId;

beforeAll(async () => {
  // Clean up test database
  await sequelize.sync({ force: true });
  
  // Register and login to get a token
  await request(server)
    .post('/auth/register')
    .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

  const loginRes = await request(server)
    .post('/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });
  
  // Extract token from response header or body
  token = loginRes.headers['authorization']?.split(' ')[1] || loginRes.body.token;
  testUserId = loginRes.body.user?.id;
});

// Task tests
describe('Task Routes', () => {
    test('GET /task should return tasks list', async () => {
      const response = await request(server).get('/task')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('tasks');
      expect(Array.isArray(response.body.tasks)).toBe(true);
    });
  
    test('POST /task/create should create new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description'
      };
  
      const response = await request(server)
        .post('/task/create')
        .set('Authorization', `Bearer ${token}`)
        .send(taskData)
        .expect(201);
  
      expect(response.body).toHaveProperty('message', 'Task created successfully');
      expect(response.body).toHaveProperty('task');
      expect(response.body.task.title).toBe('Test Task');
      createdTaskId = response.body.task.id;
    });
  
    test('PATCH /task/update/:id should update task', async () => {
      const response = await request(server)
        .patch(`/task/update/${createdTaskId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
  
      expect(response.body).toHaveProperty('message', 'Task updated successfully');
    });
  
    test('DELETE /task/delete/:id should delete task', async () => {
      const response = await request(server)
        .delete(`/task/delete/${createdTaskId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
  
      expect(response.body).toHaveProperty('message', 'Task deleted successfully');
    });
  });

  describe('Authentication Routes', () => {
    test('POST /auth/register should create new user', async () => {
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      };
  
      const response = await request(server)
        .post('/auth/register')
        .send(userData)
        .expect(201);
  
      expect(response.body).toHaveProperty('message', 'User successfully registered.');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe('newuser');
    });
  
    test('POST /auth/login should authenticate user', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };
  
      const response = await request(server)
        .post('/auth/login')
        .send(loginData)
        .expect(200);
  
      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });
  });

  afterAll(async () => {
    // Close database connection
    await sequelize.close();
  });