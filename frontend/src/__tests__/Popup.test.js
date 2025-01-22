import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Popup from "../components/Popup";

describe("Popup", () => {
  const mockOnClose = jest.fn();
  const mockOnSelectCategories = jest.fn();

  const categories = [1, 2, 3];

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSelectCategories.mockClear();
  });

  test("renders when isOpen is true", () => {
    render(
      <Popup
        isOpen={true}
        onClose={mockOnClose}
        categories={categories}
        onSelectCategories={mockOnSelectCategories}
      />
    );

    // Check if the popup is rendered
    expect(
      screen.getByText("Select 3 Categories to Display")
    ).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    render(
      <Popup
        isOpen={false}
        onClose={mockOnClose}
        categories={categories}
        onSelectCategories={mockOnSelectCategories}
      />
    );

    // The popup should not be rendered
    expect(
      screen.queryByText("Select 3 Categories to Display")
    ).not.toBeInTheDocument();
  });

  test("submit button is enabled when exactly 3 categories are selected", async () => {
    render(
      <Popup
        isOpen={true}
        onClose={mockOnClose}
        categories={categories}
        onSelectCategories={mockOnSelectCategories}
      />
    );

    // Check that the submit button is enabled with exactly 3 categories
    expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
  });

  test("displays error message when fewer than 3 categories are selected", () => {
    render(
      <Popup
        isOpen={true}
        onClose={mockOnClose}
        categories={categories}
        onSelectCategories={mockOnSelectCategories}
      />
    );

    // Initially there are 3 categories selected, so no error message
    expect(
      screen.queryByText("You must select exactly 3 categories.")
    ).not.toBeInTheDocument();

    // De-select a checkbox
    fireEvent.click(screen.getByLabelText("Stickiness"));

    // Check that the error message is displayed
    expect(
      screen.getByText("You must select exactly 3 categories.")
    ).toBeInTheDocument();
  });

  test("calls onSelectCategories and onClose when submit button is clicked", async () => {
    render(
      <Popup
        isOpen={true}
        onClose={mockOnClose}
        categories={categories}
        onSelectCategories={mockOnSelectCategories}
      />
    );

    // Simulate clicking the submit button
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Check that onSelectCategories and onClose were called
    await waitFor(() =>
      expect(mockOnSelectCategories).toHaveBeenCalledWith(categories)
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when close button is clicked", () => {
    render(
      <Popup
        isOpen={true}
        onClose={mockOnClose}
        categories={categories}
        onSelectCategories={mockOnSelectCategories}
      />
    );

    // Simulate clicking the close button
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    // Check that onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});
