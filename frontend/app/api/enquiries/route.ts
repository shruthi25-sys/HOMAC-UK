import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production use a real database
const enquiries: Array<{
  id: string
  name: string
  email: string
  phone?: string
  type: string
  message: string
  date: string
  status: string
}> = []

export async function GET(request: NextRequest) {
  // Check authentication
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ enquiries }, { status: 200 })
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const newEnquiry = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      date: new Date().toISOString(),
      status: "New",
    }

    enquiries.push(newEnquiry)

    return NextResponse.json({ message: "Enquiry saved", enquiry: newEnquiry }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to save enquiry" }, { status: 500 })
  }
}
