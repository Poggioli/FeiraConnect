import { afterAll, beforeAll, beforeEach, vitest } from "vitest";
import { server } from "./server.mock";

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  vitest.clearAllMocks();
  vitest.resetAllMocks();
  server.resetHandlers();
});
