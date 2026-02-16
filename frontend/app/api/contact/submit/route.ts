import { type NextRequest, NextResponse } from "next/server"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  enquiryType: string
  message: string
}

// Validation schema
function validateContactForm(data: Partial<ContactFormData>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  if (!data.firstName?.trim()) errors.firstName = "First name is required"
  if (!data.lastName?.trim()) errors.lastName = "Last name is required"
  if (!data.email?.trim()) errors.email = "Email is required"
  if (!data.email?.includes("@")) errors.email = "Please enter a valid email"
  if (!data.enquiryType?.trim()) errors.enquiryType = "Enquiry type is required"
  if (!data.message?.trim()) errors.message = "Message is required"
  if (data.message && data.message.length < 10) errors.message = "Message must be at least 10 characters"

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateContactForm(body)

    if (!validation.valid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 })
    }

    // In production, save to database
    const { firstName, lastName, email, phone, enquiryType, message } = body as ContactFormData

    console.log("Contact form submitted:", {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      type: enquiryType,
      message,
      timestamp: new Date().toISOString(),
    })

    // In production, send email notification
    // await sendEmail({
    //   to: 'info@homacuk.com',
    //   subject: `New ${enquiryType} enquiry from ${firstName} ${lastName}`,
    //   html: `...`
    // })

    return NextResponse.json(
      {
        message: "Form submitted successfully. We'll be in touch soon!",
        id: Math.random().toString(36).substr(2, 9),
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: "Failed to submit form" }, { status: 500 })
  }
}
