import { type NextRequest, NextResponse } from "next/server"

interface FranchiseApplicationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  background: string
}

function validateFranchiseForm(data: Partial<FranchiseApplicationData>): {
  valid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  if (!data.firstName?.trim()) errors.firstName = "First name is required"
  if (!data.lastName?.trim()) errors.lastName = "Last name is required"
  if (!data.email?.trim()) errors.email = "Email is required"
  if (!data.email?.includes("@")) errors.email = "Please enter a valid email"
  if (!data.phone?.trim()) errors.phone = "Phone number is required"
  if (!data.location?.trim()) errors.location = "Location is required"
  if (!data.background?.trim()) errors.background = "Background information is required"

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateFranchiseForm(body)

    if (!validation.valid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 })
    }

    const { firstName, lastName, email, phone, location, background } = body as FranchiseApplicationData

    // In production, save to database
    console.log("Franchise application submitted:", {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      location,
      background,
      timestamp: new Date().toISOString(),
    })

    // In production, send email notification
    // await sendEmail({
    //   to: 'franchises@homacuk.com',
    //   subject: `New Franchise Application from ${firstName} ${lastName}`,
    //   html: `...`
    // })

    return NextResponse.json(
      {
        message: "Application submitted successfully. We'll review it and contact you soon!",
        id: Math.random().toString(36).substr(2, 9),
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: "Failed to submit application" }, { status: 500 })
  }
}
