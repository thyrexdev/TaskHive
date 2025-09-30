import request from "supertest";
import app from "../../src/server";
import User from "../../src/models/user.model";
import Task from "../../src/models/task.model";

describe("Tasks integration", () => {
  let token: string;

  const userPayload = {
    username: "taskuser",
    email: "taskuser@example.com",
    password: "P@ssw0rd!",
  };

  const taskPayload = {
    title: "First Task",
    description: "This is a test task",
    priority: "MEDIUM",
    deadline: "2025-09-20T18:00:00.000Z"
  };

  beforeAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});

    // Register user and login to get token
    await request(app).post("/api/auth/register").send(userPayload);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: userPayload.email, password: userPayload.password });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
  });

  it("creates a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(taskPayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe(taskPayload.title);
  });

  it("fetches all tasks for the user", async () => {

  await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send(taskPayload);

    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("updates a task", async () => {

  await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send(taskPayload);

    const task = await Task.findOne({ title: taskPayload.title });

    const res = await request(app)
      .put(`/api/tasks/${task!._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Task" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Task");
  });

  it("deletes a task", async () => {

  // create
  const created = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send(taskPayload);

  // update
  const updated = await request(app)
    .put(`/api/tasks/${created.body._id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Updated Task" });
    const task = await Task.findOne({ title: "Updated Task" });

    const res = await request(app)
      .delete(`/api/tasks/${task!._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
