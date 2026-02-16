"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      enquiryType: formData.get("enquiryType"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitted(true)
        e.currentTarget.reset()
      } else if (result.errors) {
        setErrors(result.errors)
      }
    } catch (error) {
      setErrors({ submit: "Failed to submit form. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
        <p className="text-lg font-semibold text-green-600 mb-2">Thank you!</p>
        <p className="text-muted-foreground">We've received your message and will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Input
            name="firstName"
            placeholder="First Name"
            required
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <Input
            name="lastName"
            placeholder="Last Name"
            required
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
      </div>

      <div>
        <Input name="phone" type="tel" placeholder="Phone Number (Optional)" />
      </div>

      <div>
        <select
          name="enquiryType"
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          required
        >
          <option value="">Select Enquiry Type</option>
          <option value="course">Course Information</option>
          <option value="franchise">Franchise Opportunity</option>
          <option value="support">Support</option>
          <option value="other">Other</option>
        </select>
        {errors.enquiryType && <p className="text-xs text-destructive mt-1">{errors.enquiryType}</p>}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          rows={6}
          required
        />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
      </div>

      {errors.submit && <p className="text-sm text-destructive">{errors.submit}</p>}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
