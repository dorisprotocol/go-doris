import { test, expect } from "@playwright/test";

test("logs in and logs out", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("menuitem", { name: "Connect" }).click();

  await expect(page).toHaveURL("/login");
  await page.locator("form input[type='password']").fill("dummypass");
  await page.getByRole("button", { name: "Authenticate" }).click();

  await expect(page).toHaveURL("/");

  await page.getByRole("menuitem", { name: "System" }).hover();
  await page.getByRole("menuitem", { name: "Log Out" }).click();

  await expect(page.getByRole("menuitem", { name: "Connect" })).toBeVisible();
});
