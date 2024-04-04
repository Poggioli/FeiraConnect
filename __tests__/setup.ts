import * as matchers from '@testing-library/jest-dom/matchers';
import { afterAll, beforeAll, beforeEach, expect, vitest } from "vitest";
import { server } from "./server.mock";

expect.extend(matchers);

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
