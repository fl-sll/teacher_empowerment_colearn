import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "../components/Header"; // Correct path to your component
import axios from "axios";
import "@testing-library/jest-dom"; // For the toBeInTheDocument matcher

// Mock axios requests
jest.mock("axios");

describe("Header Component", () => {
  test("renders the course and slot dropdowns", () => {
    render(<Header onCourseChange={jest.fn()} onSlotChange={jest.fn()} />);

    // Check if the course dropdown is rendered
    expect(screen.getByLabelText(/Course:/i)).toBeInTheDocument();
    // Check if the slot dropdown is rendered but disabled initially
    expect(screen.getByLabelText(/Slot:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Slot:/i)).toBeDisabled();
  });

  test("fetches and displays courses", async () => {
    // Mock the response for the courses API
    axios.get.mockResolvedValueOnce({
      data: [
        { courseName: "Math 101", courseId: "1" },
        { courseName: "Physics 101", courseId: "2" },
      ],
    });

    render(<Header onCourseChange={jest.fn()} onSlotChange={jest.fn()} />);

    // Wait for the course options to be rendered
    await waitFor(() => screen.getByText("Math 101"));

    // Check if courses are displayed in the dropdown
    expect(screen.getByText("Math 101")).toBeInTheDocument();
    expect(screen.getByText("Physics 101")).toBeInTheDocument();
  });

  test("fetches and displays slots when a course is selected", async () => {
    // Mock the response for courses and slots API
    axios.get.mockResolvedValueOnce({
      data: [
        { courseName: "Math 101", courseId: "1" },
        { courseName: "Physics 101", courseId: "2" },
      ], // Courses response
    });

    axios.get.mockResolvedValueOnce({
      data: [
        { className: "Slot A", classId: "A1" },
        { className: "Slot B", classId: "B1" },
      ], // Slots response
    });

    render(<Header onCourseChange={jest.fn()} onSlotChange={jest.fn()} />);

    // Wait for the course options to be rendered
    await waitFor(() => screen.getByText("Math 101"));

    // Select a course
    fireEvent.change(screen.getByLabelText(/Course:/i), {
      target: { value: "1" },
    });

    // Wait for slot options to be rendered
    await waitFor(() => screen.getByText("Slot A"));

    // Check if slots are displayed in the dropdown
    expect(screen.getByText("Slot A")).toBeInTheDocument();
    expect(screen.getByText("Slot B")).toBeInTheDocument();
  });

  test("calls onCourseChange when a course is selected", async () => {
    // Mock the response for the courses API
    axios.get.mockResolvedValueOnce({
      data: [
        { courseName: "Math 101", courseId: "1" },
        { courseName: "Physics 101", courseId: "2" },
      ],
    });

    const onCourseChange = jest.fn();

    render(<Header onCourseChange={onCourseChange} onSlotChange={jest.fn()} />);

    // Wait for the course options to be rendered
    await waitFor(() => screen.getByText("Math 101"));

    // Select a course
    fireEvent.change(screen.getByLabelText(/Course:/i), {
      target: { value: "1" },
    });

    // Check if onCourseChange was called with the correct value
    expect(onCourseChange).toHaveBeenCalledWith("1");
  });

  test("calls onSlotChange when a slot is selected", async () => {
    // Mock the response for the courses and slots API
    axios.get.mockResolvedValueOnce({
      data: [
        { courseName: "Math 101", courseId: "1" },
        { courseName: "Physics 101", courseId: "2" },
      ],
    });

    axios.get.mockResolvedValueOnce({
      data: [
        { className: "Slot A", classId: "A1" },
        { className: "Slot B", classId: "B1" },
      ],
    });

    const onSlotChange = jest.fn();

    render(<Header onCourseChange={jest.fn()} onSlotChange={onSlotChange} />);

    // Wait for the course options to be rendered
    await waitFor(() => screen.getByText("Math 101"));

    // Select a course
    fireEvent.change(screen.getByLabelText(/Course:/i), {
      target: { value: "1" },
    });

    // Wait for the slot options to be rendered
    await waitFor(() => screen.getByText("Slot A"));

    // Select a slot
    fireEvent.change(screen.getByLabelText(/Slot:/i), {
      target: { value: "A1" },
    });

    // Check if onSlotChange was called with the correct value
    expect(onSlotChange).toHaveBeenCalledWith("A1");
  });
  
  test("displays error when course fetch fails", async () => {
    // Mock the courses API to throw an error
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch"));
  
    render(<Header onCourseChange={jest.fn()} onSlotChange={jest.fn()} />);
  
    // Wait for the error state to be reflected in the course dropdown
    await waitFor(() => screen.getAllByText("Error fetching courses"));
  
    // Check if the error message is displayed in the course dropdown
    const errorMessages = screen.getAllByText("Error fetching courses");
    expect(errorMessages[0]).toBeInTheDocument(); // Checking the first occurrence in the course dropdown
  });
  
  
  test("displays error when slot fetch fails after selecting a course", async () => {
    // Mock the courses API to return successful data
    axios.get.mockResolvedValueOnce({
      data: [
        { courseName: "Math 101", courseId: "1" },
        { courseName: "Physics 101", courseId: "2" },
      ],
    });
  
    // Mock the slot API to throw an error
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch"));
  
    render(<Header onCourseChange={jest.fn()} onSlotChange={jest.fn()} />);
  
    // Wait for course options to be rendered
    await waitFor(() => screen.getByText("Math 101"));
  
    // Select a course
    fireEvent.change(screen.getByLabelText(/Course:/i), {
      target: { value: "1" },
    });
  
    // Wait for the slot dropdown to become enabled
    await waitFor(() => screen.getByLabelText("Slot:"));
  
    // Wait for the error message in the slot dropdown
    await waitFor(() => screen.getByText("Error fetching slots"));
  
    // Check if the error message is displayed in the slot dropdown
    expect(screen.getByText("Error fetching slots")).toBeInTheDocument();
  });
  
});
