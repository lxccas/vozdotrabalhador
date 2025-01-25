import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import CompaniesPage from "@/app/empresas/page"

// Mock do fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        companies: [
          { id: "1", name: "Company A", averageRating: 4.5, reviewCount: 10 },
          { id: "2", name: "Company B", averageRating: 3.8, reviewCount: 5 },
        ],
        totalPages: 1,
      }),
  }),
) as jest.Mock

describe("CompaniesPage", () => {
  it("renders companies and pagination", async () => {
    render(<CompaniesPage />)

    expect(screen.getByText("Empresas Avaliadas")).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText("Company A")).toBeInTheDocument()
      expect(screen.getByText("Company B")).toBeInTheDocument()
    })

    expect(screen.getByText("Página 1 de 1")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Próxima" })).toBeDisabled()
  })

  it("displays company ratings correctly", async () => {
    render(<CompaniesPage />)

    await waitFor(() => {
      expect(screen.getByText("4.5 (10 avaliações)")).toBeInTheDocument()
      expect(screen.getByText("3.8 (5 avaliações)")).toBeInTheDocument()
    })
  })
})

