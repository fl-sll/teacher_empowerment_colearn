/**
 * @file setupTests.js
 * @description Setup file for configuring Jest in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2025-01-22
 * authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file sets up Jest for testing, including importing jest-dom for extended assertions and mocking console warnings and errors.
 */

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
  