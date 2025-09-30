import request from "supertest";
import app from "../../src/server";
import User from "../../src/models/user.model";

describe("Auth integration", () => {
    const userPayload = {
        username: "testuser",
        email: "test@example.com",
        password: "P@ssw0rd!",
    };

    it("registers a user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(userPayload)
            .set("Accept", "application/json");

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("_id");

        const user = await User.findOne({email: userPayload.email});
        expect(user).not.toBeNull();
        expect(user!.username).toBe(userPayload.username);
    });

    it("logs in the user", async () => {
        await request(app).post("/api/auth/register").send(userPayload);

        const res = await request(app)
            .post("/api/auth/login")
            .send({email: userPayload.email, password: userPayload.password});

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        // Cookie refresh token should be set
        const cookies = Array.isArray(res.headers["set-cookie"])
            ? res.headers["set-cookie"]
            : [res.headers["set-cookie"]].filter(Boolean);
        expect(cookies.join()).toContain("refreshToken");
    });
});
