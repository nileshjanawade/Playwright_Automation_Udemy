# Playwright Automation

A hands-on learning project exploring end-to-end test automation with [Playwright](https://playwright.dev/).

---

## Tech Stack

| Tool | Version |
|---|---|
| [Playwright](https://playwright.dev/) | ^1.61.0 |
| [@playwright/test](https://www.npmjs.com/package/@playwright/test) | ^1.61.0 |
| Language | JavaScript (CommonJS) |
| Test Runner | Playwright Test |
| CI | GitHub Actions |
| Reporting | Playwright HTML Reporter |

---

## Folder Structure

```text
Playwright-Automation/
|-- .github/workflows/    # GitHub Actions CI pipeline
|   `-- playwright.yml
|-- tests/                # All test specs
|   |-- UIBasicstest.spec.js
|   |-- rahulsheetyAcademy.spec.js
|   |-- OtherRahulsheetyAcademy.spec.js
|   |-- llc.spec.js
|   |-- moreValidations.spec.js
|   |-- calender.spec.js
|   |-- webApiPart1.spec.js
|   |-- WebApiPart2.spec.js
|   |-- RefactorWebAPI.spec.js
|   |-- NetworkTest.spec.js
|   |-- NetworkTest2.spec.js
|   |-- upoad-download.spec.js
|   `-- utils/            # Reusable utility/helper classes
|       `-- APIUtils.js
|-- playwright-report/    # Generated HTML reports (gitignored)
|-- test-results/         # Test artifacts / screenshots (gitignored)
|-- playwright.config.js  # Playwright configuration
|-- package.json
`-- .gitignore
```

---

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/nileshjanawade/Playwright_Automation_Udemy.git
cd Playwright_Automation_Udemy

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## How to Run Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/UIBasicstest.spec.js

# Run API tests
npx playwright test tests/webApiPart1.spec.js
npx playwright test tests/RefactorWebAPI.spec.js

# Run tests in headed mode
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --browser=firefox
npx playwright test --browser=webkit

# Run tests with UI mode
npx playwright test --ui

# Show the last HTML report
npx playwright show-report
```

> Note: The config currently defaults to Chromium with `headless: false`. Screenshots are captured with `screenshot: 'on'`, and traces are captured with `trace: 'on'`.

---

## Learning Progress

### Covered Concepts

| Concept | Files |
|---|---|
| **Locators** - CSS, XPath, Playwright getBy\* locators | `UIBasicstest.spec.js`, `llc.spec.js`, `OtherRahulsheetyAcademy.spec.js` |
| **Browser Context & Pages** - `browser.newContext()`, `context.newPage()` | `UIBasicstest.spec.js` |
| **Form Interactions** - `fill()` vs `type()`, dropdowns, radio buttons, checkboxes | `UIBasicstest.spec.js` |
| **Assertions** - visibility, text, attributes, checkbox state | `UIBasicstest.spec.js`, `moreValidations.spec.js`, `rahulsheetyAcademy.spec.js` |
| **Child Window Handling** - `context.waitForEvent('page')` | `UIBasicstest.spec.js` |
| **Dialog Handling** - `page.on('dialog', ...)` | `moreValidations.spec.js` |
| **Mouse Hover** - `page.locator().hover()` | `moreValidations.spec.js` |
| **iFrames** - `page.frameLocator()` | `moreValidations.spec.js` |
| **Calendar / Date Picker** - month, year, date navigation | `calender.spec.js` |
| **End-to-End E-Commerce Flow** - login, product selection, cart, checkout, order verification | `rahulsheetyAcademy.spec.js`, `OtherRahulsheetyAcademy.spec.js` |
| **API Testing** - `request.newContext()`, `apiContext.post()`, token auth, order creation | `webApiPart1.spec.js` |
| **Hooks & Token Injection** - `test.beforeAll`, `page.addInitScript()` for localStorage auth bypass | `webApiPart1.spec.js` |
| **Storage State** - `browser.newContext()`, `context.storageState()` for auth state persistence | `WebApiPart2.spec.js` |
| **Page Object Model (POM)** - reusable utility classes for API workflows | `RefactorWebAPI.spec.js`, `utils/APIUtils.js` |
| **API Error Handling** - response status checks and descriptive error handling | `utils/APIUtils.js` |
| **Network Route Interception** - `page.route()` to intercept and modify API responses | `NetworkTest.spec.js`, `NetworkTest2.spec.js` |
| **Request Mocking** - `route.fulfill()` with fake response payloads | `NetworkTest.spec.js` |
| **Security Testing** - URL manipulation in intercepted routes to test authorization | `NetworkTest2.spec.js` |
| **Route Blocking** - `route.abort()` to block CSS, images, etc. | `rahulsheetyAcademy.spec.js`, `UIBasicstest.spec.js` |
| **Network Event Logging** - `page.on('request')` and `page.on('response')` to monitor traffic | `rahulsheetyAcademy.spec.js` |
| **Element Screenshots** - `locator.screenshot()` for partial captures | `moreValidations.spec.js` |
| **Full Page Screenshots** - `page.screenshot()` for full-page captures | `moreValidations.spec.js` |
| **Visual Regression Testing** - `toMatchSnapshot()` for pixel comparison | `moreValidations.spec.js` |
| **Screenshots & Traces** - automatic capture for debugging | `playwright.config.js` |
| **File Upload/Download with Excel** - `page.waitForEvent('download')`, `setInputFiles()`, Excel read/write with `exceljs` | `upoad-download.spec.js` |
| **CI Integration** - GitHub Actions workflow | `.github/workflows/playwright.yml` |

### Planned Next Steps

- Fixtures and data-driven tests
- Parallel execution and sharding

---

## Troubleshooting

### No tests found

If Playwright shows `Error: No tests found`, check that:

- The file path in the command matches an existing spec file.
- The spec file contains at least one Playwright `test(...)` block.
- The file name matches Playwright's default patterns, such as `*.spec.js` or `*.test.js`.

Example:

```bash
npx playwright test tests/webApiPart1.spec.js
```

An empty file like `tests/calender.spec.js` will be discovered by name, but Playwright will still report no tests because there is no test case inside it.

---

## Automation Flow

```mermaid
flowchart TD
    A[Test Trigger] --> B[Playwright Test Runner]
    B --> C[Launch Browser Chromium]
    C --> D[Navigate to URL]
    D --> E[Interact with Elements]
    E --> F{Assertion}
    F -->|Pass| G[Continue / Next Test]
    F -->|Fail| H[Capture Screenshot & Trace]
    H --> I[Mark Test Failed]
    G --> J[All Tests Complete]
    I --> J
    J --> K[Generate HTML Report]
    K --> L[Upload to CI Artifacts]
```

---

## Reports & CI

- HTML reports are generated automatically in `playwright-report/`.
- View the latest report with `npx playwright show-report`.
- GitHub Actions runs tests on push and pull request.
- Screenshots and traces are available for debugging failed tests.

---

## Learning Notes

- This repo is intentionally simple, so it is easy to follow the Playwright APIs step by step.
- All tests target public demo sites, including Rahul Shetty Academy, Path2USA, and My Campus Forum.
- If you are new to Playwright, start with `UIBasicstest.spec.js`.
- Compare `rahulsheetyAcademy.spec.js` with `OtherRahulsheetyAcademy.spec.js` to see different locator strategies for the same flow.

---

## License

ISC
