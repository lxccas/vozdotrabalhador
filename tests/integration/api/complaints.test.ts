import { createMocks } from "node-mocks-http"
import { GET, POST } from "@/app/api/complaints/route"
import prisma from "@/lib/prisma"

// Mock do Prisma
jest.mock("@/lib/prisma", () => ({
  complaint: {
    findMany: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
  },
}))

describe("/api/complaints", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("GET", () => {
    it("returns complaints with pagination", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: { page: "1", limit: "10" },
      })

      const mockComplaints = [{ id: "1", title: "Test Complaint" }]
      const mockCount = 1
      ;(prisma.complaint.findMany as jest.Mock).mockResolvedValue(mockComplaints)
      ;(prisma.complaint.count as jest.Mock).mockResolvedValue(mockCount)

      await GET(req)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual({
        complaints: mockComplaints,
        totalPages: 1,
        currentPage: 1,
      })
    })
  })

  describe("POST", () => {
    it("creates a new complaint", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "New Complaint",
          description: "This is a test complaint",
          category: "test",
        },
      })

      const mockCreatedComplaint = {
        id: "1",
        title: "New Complaint",
        description: "This is a test complaint",
        category: "test",
      }
      ;(prisma.complaint.create as jest.Mock).mockResolvedValue(mockCreatedComplaint)

      await POST(req)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual(mockCreatedComplaint)
    })

    it("returns 400 for invalid input", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          title: "Short",
          description: "Too short",
        },
      })

      await POST(req)

      expect(res._getStatusCode()).toBe(400)
      expect(JSON.parse(res._getData())).toHaveProperty("error")
    })
  })
})

