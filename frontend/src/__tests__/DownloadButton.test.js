import { render, screen, fireEvent } from "@testing-library/react";
import DownloadButton from "../components/DownloadButton";
import * as XLSX from "xlsx";

// Mock the XLSX writeFile function and Blob creation
jest.mock("xlsx", () => ({
  utils: {
    json_to_sheet: jest.fn(),
    book_new: jest.fn(),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));

global.URL.createObjectURL = jest.fn(() => "fake-url");
global.URL.revokeObjectURL = jest.fn();
global.Blob = jest.fn(() => ({
  type: "text/csv",
}));

describe("DownloadButton", () => {
  const mockData = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "London" },
  ];
  const mockName = "test-file";

  beforeEach(() => {
    render(<DownloadButton data={mockData} name={mockName} />);
  });

  test("should render the file type dropdown", () => {
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveValue("csv");
  });

  test("should download CSV when selected from the dropdown", async () => {
    const downloadButtons = screen.getAllByText("Download");
    const downloadButton = downloadButtons[0];

    const csvOption = screen.getByRole("option", { name: "CSV" });

    // Click the CSV option to ensure it's selected
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "csv" },
    });
    expect(csvOption.selected).toBe(true);

    // Mock the downloadCSV function call
    const downloadCSV = jest.fn();
    downloadButton.onclick = downloadCSV;

    fireEvent.click(downloadButton);
    expect(downloadCSV).toHaveBeenCalledTimes(1);
    expect(global.Blob).toHaveBeenCalledTimes(1);
    expect(XLSX.writeFile).not.toHaveBeenCalled();
  });

  test("should download XLSX when selected from the dropdown", async () => {
    const downloadButton = screen.getByText("Download");
    const xlsxOption = screen.getByRole("option", { name: "XLSX" });

    // Click the XLSX option to ensure it's selected
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "xlsx" },
    });
    expect(xlsxOption.selected).toBe(true);

    // Mock the downloadXLSX function call
    const downloadXLSX = jest.fn();
    downloadButton.onclick = downloadXLSX;

    fireEvent.click(downloadButton);
    expect(downloadXLSX).toHaveBeenCalledTimes(1);
    expect(XLSX.writeFile).toHaveBeenCalledTimes(1);
  });
});
