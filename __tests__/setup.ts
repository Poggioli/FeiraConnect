import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  vitest,
} from "vitest";
import { server } from "./server.mock";
import { queryClient } from "./QueryClientProviderWrapper";

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  queryClient.clear();
  vitest.clearAllMocks();
  vitest.resetAllMocks();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}

window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;
