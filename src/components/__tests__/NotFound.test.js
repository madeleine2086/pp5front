import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from "../NotFound";

test("renders notfound message", async () => {
  render(
    <Router>
      <NotFound />
    </Router>
  );

  const notFoundMessage = screen.getByText("Sorry, the page", { exact: false });
  await waitFor(() => {
    expect(notFoundMessage).toBeInTheDocument();
  });
});