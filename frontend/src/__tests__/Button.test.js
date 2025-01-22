import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button"; // Correct path to your Button component
import "@testing-library/jest-dom"; // For the toBeInTheDocument matcher

describe("Button Component", () => {
  const mockAction = jest.fn();
  const mockLabel = "Click Me";
  const mockLogo = "logo.png";

  test("renders with the correct label", () => {
    render(<Button label={mockLabel} action={mockAction} />);

    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  test("renders with the logo if logo prop is provided", () => {
    render(<Button label={mockLabel} action={mockAction} logo={mockLogo} />);

    const logo = screen.getByAltText("Button Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", mockLogo);
  });

  test("does not render logo if logo prop is not provided", () => {
    render(<Button label={mockLabel} action={mockAction} />);

    const logo = screen.queryByAltText("Button Logo");
    expect(logo).toBeNull();
  });

  test("applies 'custom_button custom' class when border prop is 'customize'", () => {
    render(<Button label={mockLabel} action={mockAction} border="customize" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom_button custom");
  });

  test("applies 'custom_button' class when border prop is not 'customize'", () => {
    render(<Button label={mockLabel} action={mockAction} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom_button");
  });

  test("calls the action function when clicked", () => {
    render(<Button label={mockLabel} action={mockAction} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
