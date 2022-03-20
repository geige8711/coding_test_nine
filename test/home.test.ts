import request from "supertest";
import app from "../src/app";
import { mockData1, expectedResult, mockData2 } from "../src/mockdata";

describe("API test", () => {
    it("for GET request, should return 404", async () => {
        const response = await request(app).get("/");
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("Invalid request, only POST request is allowed");
    });
    it("for DELETE request, should return 404", async () => {
        const response = await request(app).delete("/");
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("Invalid request, only POST request is allowed");
    });
    it("for PUT request, should return 404", async () => {
        const response = await request(app).put("/");
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("Invalid request, only POST request is allowed");
    });
    it("for PATCH request, should return 404", async () => {
        const response = await request(app).patch("/");
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("Invalid request, only POST request is allowed");
    });
    it("for POST request with wrong route, should return 404", async () => {
        const response = await request(app).post("/unknown");
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("Invalid request, only POST request with root route '/' is allowed");
    });
    it("for POST request with wrong json body, should return 200", async () => {
        const response = await request(app).post("/").send(mockData1);
        expect(response.status).toEqual(200);
        expect(response.body.response).toEqual(expectedResult);
    });
    it("for POST request with correct json body, should return 400", async () => {
        const response = await request(app).post("/").send(mockData2);
        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual("Could not decode request: JSON parsing failed");
    });
});
