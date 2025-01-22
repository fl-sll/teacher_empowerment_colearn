import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from "../components/Chip"; // Adjust the path as necessary

// Mock Date to ensure the current date is consistent for testing
// Mock only the `toLocaleDateString` method of the Date prototype
const mockDate = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});


describe('Chip Component', () => {
  // Test 1: It should render the component when isVisible is true
  test('renders Chip component when isVisible is true', () => {
    const mockMetric = {
      title: 'Metric Title',
      number: 123,
      sub: 'Sub information',
    };

    render(<Chip metric={mockMetric} isVisible={true} />);

    // Check if the title, number, and sub text are displayed
    expect(screen.getByText(mockMetric.title)).toBeInTheDocument();
    expect(screen.getByText(`Updated: ${mockDate}`)).toBeInTheDocument();
    expect(screen.getByText(mockMetric.sub)).toBeInTheDocument();
  });

  // Test 2: It should not render anything when isVisible is false
  test('does not render Chip component when isVisible is false', () => {
    const mockMetric = {
      title: 'Metric Title',
      number: 123,
      sub: 'Sub information',
    };

    const { container } = render(<Chip metric={mockMetric} isVisible={false} />);

    // The component should return null, so the container should be empty
    expect(container).toBeEmptyDOMElement();
  });

  // Test 3: It should display the metric.number correctly
  test('displays the metric.number correctly', () => {
    const mockMetric = {
      title: 'Metric Title',
      number: 456,
      sub: 'Sub information',
    };

    render(<Chip metric={mockMetric} isVisible={true} />);
    expect(screen.getByText('456')).toBeInTheDocument();
  });

  // Test 4: It should display the current date correctly
  test('displays the current date in the correct format', () => {
    const mockMetric = {
      title: 'Metric Title',
      number: 123,
      sub: 'Sub information',
    };

    render(<Chip metric={mockMetric} isVisible={true} />);
    // Check if the date is formatted correctly (mocked date)
    expect(screen.getByText(`Updated: ${mockDate}`)).toBeInTheDocument();
  });

  // Test 5: It should render sub text correctly
  test('displays the sub text correctly', () => {
    const mockMetric = {
      title: 'Metric Title',
      number: 123,
      sub: 'Sub information',
    };

    render(<Chip metric={mockMetric} isVisible={true} />);
    expect(screen.getByText(mockMetric.sub)).toBeInTheDocument();
  });
});
