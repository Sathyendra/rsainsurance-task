import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Addons from "./Addons";

afterEach(cleanup);

describe("Addons component", () => {
  test("renders correctly", () => {
    const { getByText, getByTestId } = render(<Addons />);
    const heading = getByText("Tailor your cover with our optional extra");
    expect(heading).toBeInTheDocument();
    const container = getByTestId("addons-container");
    expect(container).toBeInTheDocument();
  });
});
