import '@testing-library/jest-dom'; // Import jest-dom for extended assertions
// jest.setup.js
beforeAll(() => {
    // Mock console.warn and console.error globally
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    // Restore console.warn and console.error after the tests
    console.warn.mockRestore();
    console.error.mockRestore();
  });
  