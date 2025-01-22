import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing
import "@testing-library/jest-dom";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs"; // Correct import path

// Mock axios
jest.mock("axios");

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));
  


describe("Breadcrumbs Component", () => {
  const mockCourseId = "1";
  const mockSlotId = "1";
  const mockName = "John Doe";

  const renderWithRouter = (ui) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>); // Use MemoryRouter in tests
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the correct title based on the type prop", () => {
    renderWithRouter(
      <Breadcrumbs
        type="session"
        name={mockName}
        courseId={mockCourseId}
        slotId={mockSlotId}
      />
    );
    expect(screen.getByText("Session Engagement")).toBeInTheDocument();

    renderWithRouter(
      <Breadcrumbs
        type="student"
        name={mockName}
        courseId={mockCourseId}
        slotId={mockSlotId}
      />
    );
    expect(screen.getByText("Student Engagement")).toBeInTheDocument();
  });

  test("navigates to the home page when back arrow is clicked", () => {
    const mockNavigate = jest.fn();
    // Directly mock the useNavigate function
    require("react-router-dom").useNavigate.mockImplementation(mockNavigate);

    renderWithRouter(
      <Breadcrumbs
        type="session"
        name={mockName}
        courseId={mockCourseId}
        slotId={mockSlotId}
      />
    );

    const backArrow = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backArrow);
  
    // Check if mockNavigate was called with "/"
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
