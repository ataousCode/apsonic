'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

// African countries where APSONIC operates
const africanCountries = [
  { value: "nigeria", label: "Nigeria" },
  { value: "ghana", label: "Ghana" },
  { value: "kenya", label: "Kenya" },
  { value: "tanzania", label: "Tanzania" },
  { value: "uganda", label: "Uganda" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "senegal", label: "Senegal" },
  { value: "ivory-coast", label: "Côte d'Ivoire" },
  { value: "cameroon", label: "Cameroon" },
  { value: "rwanda", label: "Rwanda" },
  { value: "zambia", label: "Zambia" },
  { value: "mozambique", label: "Mozambique" },
  { value: "mali", label: "Mali" },
  { value: "burkina-faso", label: "Burkina Faso" },
  { value: "benin", label: "Benin" },
  { value: "togo", label: "Togo" },
  { value: "guinea", label: "Guinea" },
  { value: "sierra-leone", label: "Sierra Leone" },
  { value: "liberia", label: "Liberia" },
  { value: "democratic-republic-congo", label: "Democratic Republic of Congo" },
  { value: "south-africa", label: "South Africa" },
  { value: "botswana", label: "Botswana" },
  { value: "namibia", label: "Namibia" },
  { value: "zimbabwe", label: "Zimbabwe" },
  { value: "malawi", label: "Malawi" },
  { value: "other", label: "Other (Please specify in comments)" }
];

const warehouseCapacities = [
  { value: "500-1000", label: "500 - 1,000 m²" },
  { value: "1000-2000", label: "1,000 - 2,000 m²" },
  { value: "2000-5000", label: "2,000 - 5,000 m²" },
  { value: "5000+", label: "5,000+ m²" }
];

const monthlyPurchases = [
  { value: "50-100", label: "50 - 100 units" },
  { value: "100-250", label: "100 - 250 units" },
  { value: "250-500", label: "250 - 500 units" },
  { value: "500+", label: "500+ units" }
];

const yearsExperience = [
  { value: "0-2", label: "0 - 2 years" },
  { value: "2-5", label: "2 - 5 years" },
  { value: "5-10", label: "5 - 10 years" },
  { value: "10+", label: "10+ years" }
];

// Validation schema
const distributorFormSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(2, "City must be at least 2 characters"),
  businessLicenseNumber: z.string().min(3, "Business license number is required"),
  
  // Contact Information
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  
  // Business Details
  warehouseCapacity: z.string().min(1, "Please select warehouse capacity"),
  expectedMonthlyPurchase: z.string().min(1, "Please select expected monthly purchase"),
  yearsInBusiness: z.string().min(1, "Please select years of experience"),
  
  // Additional Information
  comments: z.string().optional(),
  
  // Agreements
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions"
  }),
});

type DistributorFormData = z.infer<typeof distributorFormSchema>;

export default function DistributorApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DistributorFormData>({
    resolver: zodResolver(distributorFormSchema),
  });

  const onSubmit = async (data: DistributorFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // TODO: Replace with actual API endpoint
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", data);
      
      // Show success message
      setSubmitSuccess(true);
      reset();
      
      // Scroll to success message
      setTimeout(() => {
        const successElement = document.getElementById('form-success');
        successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      
    } catch (error) {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <section
        id="application-form"
        className="relative w-full bg-apsonic-surface py-12 sm:py-16 lg:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal direction="up">
            <div id="form-success" className="glass-panel rounded-3xl p-8 sm:p-12 text-center">
              {/* Success Icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-apsonic-green/10">
                <svg
                  className="h-10 w-10 text-apsonic-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
                Application Submitted Successfully!
              </h2>
              
              <p className="mb-8 text-lg leading-relaxed text-apsonic-muted">
                Thank you for your interest in becoming an APSONIC distributor. Our partnership team will review your application and contact you within 3-5 business days.
              </p>

              <div className="space-y-4 text-left glass-panel rounded-2xl p-6">
                <p className="text-sm text-apsonic-text">
                  <span className="font-semibold text-apsonic-green">What's Next?</span>
                </p>
                <ul className="space-y-2 text-sm text-apsonic-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-apsonic-green">•</span>
                    You will receive a confirmation email within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apsonic-green">•</span>
                    Our team will review your documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apsonic-green">•</span>
                    We'll schedule an interview if your application meets our criteria
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setSubmitSuccess(false)}
                size="lg"
                variant="outline"
                className="mt-8 rounded-full"
              >
                Submit Another Application
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section
      id="application-form"
      className="relative w-full bg-apsonic-surface py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Get Started"
          title="Distributor Application Form"
          description="Fill out the form below to begin your partnership with APSONIC"
          align="center"
        />

        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-12 sm:mt-16 glass-panel rounded-3xl p-6 sm:p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Information */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-apsonic-border pb-3">
                  Company Information
                </h3>
                
                <Input
                  {...register("companyName")}
                  label="Company Name"
                  placeholder="Enter your company name"
                  error={errors.companyName?.message}
                  required
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Select
                    {...register("country")}
                    label="Country"
                    options={africanCountries}
                    error={errors.country?.message}
                    required
                  />
                  
                  <Input
                    {...register("city")}
                    label="City"
                    placeholder="Enter city name"
                    error={errors.city?.message}
                    required
                  />
                </div>

                <Input
                  {...register("businessLicenseNumber")}
                  label="Business License Number"
                  placeholder="Enter your business license/registration number"
                  error={errors.businessLicenseNumber?.message}
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-apsonic-border pb-3">
                  Contact Information
                </h3>
                
                <Input
                  {...register("contactName")}
                  label="Contact Person Name"
                  placeholder="Full name of primary contact"
                  error={errors.contactName?.message}
                  required
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    {...register("phone")}
                    label="Phone Number"
                    type="tel"
                    placeholder="+234 XXX XXXX XXXX"
                    error={errors.phone?.message}
                    required
                  />
                  
                  <Input
                    {...register("email")}
                    label="Email Address"
                    type="email"
                    placeholder="contact@company.com"
                    error={errors.email?.message}
                    required
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-apsonic-border pb-3">
                  Business Details
                </h3>
                
                <Select
                  {...register("warehouseCapacity")}
                  label="Warehouse Capacity"
                  options={warehouseCapacities}
                  error={errors.warehouseCapacity?.message}
                  required
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Select
                    {...register("expectedMonthlyPurchase")}
                    label="Expected Monthly Purchase"
                    options={monthlyPurchases}
                    error={errors.expectedMonthlyPurchase?.message}
                    required
                  />
                  
                  <Select
                    {...register("yearsInBusiness")}
                    label="Years in Business"
                    options={yearsExperience}
                    error={errors.yearsInBusiness?.message}
                    required
                  />
                </div>

                <Textarea
                  {...register("comments")}
                  label="Additional Comments"
                  placeholder="Tell us more about your business, market experience, or any questions you have..."
                  error={errors.comments?.message}
                  rows={5}
                />
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-4">
                <Checkbox
                  {...register("agreedToTerms")}
                  label={
                    <span>
                      I agree to the{" "}
                      <a href="/terms" className="text-apsonic-green hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-apsonic-green hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  }
                  error={errors.agreedToTerms?.message}
                  required
                />
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-500">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-full bg-apsonic-green px-8 font-semibold text-apsonic-ink hover:bg-apsonic-green-dark transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="mr-2 h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => reset()}
                  className="w-full sm:w-auto rounded-full border-apsonic-border bg-apsonic-surface text-white hover:bg-apsonic-surface-elevated"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

