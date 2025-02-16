/**
 * @file reportWebVitals.js
 * @description Utility file for measuring web vitals in the Teacher Empowerment frontend application.
 * @version 1.0.0
 * @date 2024-10-24
 * authors 
 *   - Edward Alvin
 *   - Stephanie Staniswinata
 * 
 * @details
 * This file defines a function to measure web vitals using the web-vitals library.
 * It includes metrics such as CLS, FID, FCP, LCP, and TTFB.
 */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
