import assert from "node:assert/strict";
import { test } from "node:test";

import { isBlogAdministrationEnabled } from "./blog-admin-access";

test("blog administration is closed by default", () => {
  assert.equal(isBlogAdministrationEnabled({ NODE_ENV: "development" }), false);
});

test("local development can opt in explicitly", () => {
  assert.equal(
    isBlogAdministrationEnabled({
      NODE_ENV: "development",
      BLOG_ADMIN_LOCAL_ENABLED: "true",
    }),
    true,
  );
});

test("production stays closed even when the local flag is set", () => {
  assert.equal(
    isBlogAdministrationEnabled({
      NODE_ENV: "production",
      BLOG_ADMIN_LOCAL_ENABLED: "true",
    }),
    false,
  );
});

test("an unspecified environment also stays closed", () => {
  assert.equal(
    isBlogAdministrationEnabled({ BLOG_ADMIN_LOCAL_ENABLED: "true" }),
    false,
  );
});
