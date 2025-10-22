import request from 'supertest';
import server from '../server.js';

describe('First server test', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('Hello World');
  });
});

// Task tests
describe('Task Routes', () => {
    test('GET /task should return tasks list', async () => {
      const response = await request(server).get('/task');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('tasks');
      expect(Array.isArray(response.body.tasks)).toBe(true);
    });
  
    test('POST /task should create new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description'
      };
  
      const response = await request(server)
        .post('/task')
        .send(taskData)
        .expect(201);
  
      expect(response.body).toHaveProperty('message', 'Task created successfully');
      expect(response.body).toHaveProperty('task');
      expect(response.body.task.title).toBe('Test Task');
    });
  
    test('GET /task/:id should return specific task', async () => {
      const response = await request(server).get('/task/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('task');
      expect(response.body.task).toHaveProperty('id', 1);
    });
  
    test('PUT /task/:id should update task', async () => {
      const updateData = {
        title: 'Updated Task',
        completed: true
      };
  
      const response = await request(server)
        .put('/task/1')
        .send(updateData)
        .expect(200);
  
      expect(response.body).toHaveProperty('message', 'Task updated successfully');
      expect(response.body.task.title).toBe('Updated Task');
    });
  
    test('DELETE /task/:id should delete task', async () => {
      const response = await request(server)
        .delete('/task/1')
        .expect(200);
  
      expect(response.body).toHaveProperty('message', 'Task deleted successfully');
    });
  });

  describe('Authentication Routes', () => {
    test('POST /auth/register should create new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
  
      const response = await request(server)
        .post('/auth/register')
        .send(userData)
        .expect(201);
  
      expect(response.body).toHaveProperty('message', 'User created successfully');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe('testuser');
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
  
    test('POST /auth/logout should logout user', async () => {
      const response = await request(server)
        .post('/auth/logout')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);
  
      expect(response.body).toHaveProperty('message', 'Logout successful');
    });
  });