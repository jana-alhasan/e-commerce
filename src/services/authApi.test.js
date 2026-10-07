import axios from "axios";
import { fetchLogin } from "./authApi";

jest.mock("axios");

describe("fetchLogin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("normalizes DummyJSON accessToken for the existing auth state", async () => {
    axios.post.mockResolvedValue({
      data: {
        accessToken: "demo-access-token",
        username: "emilys",
        firstName: "Emily",
        lastName: "Johnson",
      },
    });

    await expect(
      fetchLogin({ username: "emilys", password: "emilyspass" })
    ).resolves.toEqual({
      token: "demo-access-token",
      username: "emilys",
      firstName: "Emily",
      lastName: "Johnson",
    });
  });

  test("returns a clear message for rejected demo credentials", async () => {
    axios.post.mockRejectedValue({ response: { status: 400 } });

    await expect(
      fetchLogin({ username: "wrong", password: "wrong" })
    ).rejects.toThrow("Invalid username or password");
  });

  test("rejects invalid credential payloads before making a request", async () => {
    await expect(fetchLogin(null)).rejects.toThrow("Invalid credentials format");
    expect(axios.post).not.toHaveBeenCalled();
  });
});
