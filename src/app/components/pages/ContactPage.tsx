import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { 
  Mail, Phone, MapPin, Linkedin, Github, Send, 
  Briefcase, Clock, CheckCircle, Sparkles, ArrowRight,
  MessageCircle, Calendar
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { siteConfig } from "../../config/siteConfig";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      `Thanks — ${siteConfig.responseSla.toLowerCase()}. I'll be in touch soon.`,
    );
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const reasons = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      text: "Full-time employment opportunities"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Freelance & contract projects"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Collaboration & partnerships"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Design consultations"
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: siteConfig.email,
      link: `mailto:${siteConfig.email}`
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: siteConfig.phone,
      link: `tel:${siteConfig.phone.replace(/\s+/g, "")}`
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: siteConfig.location,
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      link: siteConfig.social.linkedin
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      link: siteConfig.social.github
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Dribbble",
      link: siteConfig.social.dribbble
    }
  ];

  return (
    <div className="pt-36 md:pt-40 lg:pt-44">
      <section className="page-section relative overflow-hidden bg-gradient-to-br from-[#f8fafb] via-white to-[#f5f7fa] pb-9 md:pb-12">
        <div className="pointer-events-none absolute top-0 right-0 h-[336px] w-[336px] rounded-full bg-gradient-to-bl from-[#1a73e8]/6 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[256px] w-[256px] rounded-full bg-gradient-to-tr from-[#ff6f3c]/6 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <header className="mb-8 max-w-2xl md:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#1a73e8]" aria-hidden />
              <span className="text-sm text-[#717182]">{siteConfig.availability}</span>
            </div>

            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[#1e1e1e] leading-[1.1] md:text-5xl lg:text-[3.25rem]">
              Let&apos;s connect
            </h1>

            <p className="text-base leading-relaxed text-[#5c5c66] md:text-lg">
              I&apos;m actively seeking opportunities to join innovative teams and work on meaningful projects. Whether
              you&apos;re hiring or looking for a design partner, I&apos;d love to discuss how we can work together.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5c5c66] md:text-base">
              <span className="font-medium text-[#1e1e1e]">{siteConfig.responseSla}</span>
              {" · "}
              {siteConfig.hireFootprint}
            </p>
          </header>
        </div>
      </section>

      <section className="page-section border-t border-[#efefef] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-5">
            {/* Left Column - Contact Info & Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="mb-6 text-[#1E1E1E] text-3xl">Get in Touch</h2>
                <p className="mb-6 text-[#52525b] text-lg leading-relaxed">
                  I'm open to discussing the following opportunities:
                </p>
                
                {/* Opportunity Types */}
                <div className="space-y-3 mb-10">
                  {reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#1A73E8]/40 hover:shadow-md transition-all group"
                    >
                      <div className="text-[#1A73E8] group-hover:scale-110 transition-transform">
                        {reason.icon}
                      </div>
                      <span className="text-[#1E1E1E]">{reason.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4">
                <h3 className="text-[#1E1E1E] text-xl mb-4">Contact Information</h3>
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white to-[#F8FAFB] rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#1A73E8]/40 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1A73E8]/10 flex items-center justify-center text-[#1A73E8] flex-shrink-0 group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[#717182] mb-1">{info.label}</div>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-[#1E1E1E] hover:text-[#1A73E8] transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-[#1E1E1E]">{info.value}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-[#1E1E1E] text-xl mb-4">Connect on Social</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-[#E5E5E5] flex items-center justify-center text-[#717182] hover:text-[#1A73E8] hover:border-[#1A73E8]/40 hover:shadow-lg transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-7 md:p-10 border border-[#E5E5E5] shadow-xl">
                <div className="mb-8">
                  <h3 className="text-[#1E1E1E] text-2xl lg:text-3xl mb-2">
                    Send Me a Message
                  </h3>
                  <p className="text-[#717182]">
                    I typically respond within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#1E1E1E]">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="h-12 rounded-xl border-[#E5E5E5] focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#1E1E1E]">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="h-12 rounded-xl border-[#E5E5E5] focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#1E1E1E]">
                      Company / Organization
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      className="h-12 rounded-xl border-[#E5E5E5] focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#1E1E1E]">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      rows={6}
                      className="rounded-xl border-[#E5E5E5] focus:border-[#1A73E8] focus:ring-[#1A73E8] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#1A73E8] to-[#1557B0] hover:from-[#1557B0] hover:to-[#1A73E8] text-white rounded-full shadow-lg shadow-[#1A73E8]/30 group"
                  >
                    <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="page-section bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-gradient-to-br from-white to-[#F8FAFB] rounded-2xl border border-[#E5E5E5] hover:border-[#1A73E8]/40 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A73E8]/10 to-[#FF6F3C]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Clock className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h3 className="text-[#1E1E1E] text-xl mb-2 group-hover:text-[#1A73E8] transition-colors">Quick Response</h3>
              <p className="text-[#717182]">
                I respond to all inquiries within 24 hours
              </p>
            </div>

            <div className="group text-center p-8 bg-gradient-to-br from-white to-[#F8FAFB] rounded-2xl border border-[#E5E5E5] hover:border-[#FF6F3C]/40 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6F3C]/10 to-[#1A73E8]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Calendar className="w-8 h-8 text-[#FF6F3C]" />
              </div>
              <h3 className="text-[#1E1E1E] text-xl mb-2 group-hover:text-[#FF6F3C] transition-colors">Flexible Availability</h3>
              <p className="text-[#717182]">
                Open to discussions and meetings at your convenience
              </p>
            </div>

            <div className="group text-center p-8 bg-gradient-to-br from-white to-[#F8FAFB] rounded-2xl border border-[#E5E5E5] hover:border-[#1A73E8]/40 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A73E8]/10 to-[#FF6F3C]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Briefcase className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h3 className="text-[#1E1E1E] text-xl mb-2 group-hover:text-[#1A73E8] transition-colors">Professional Approach</h3>
              <p className="text-[#717182]">
                Clear communication and timely project delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative CTA Section - Consistent Pattern */}
      <section className="page-section bg-gradient-to-br from-[#F8FAFB] to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-20">
          <div className="relative bg-gradient-to-br from-[#1A73E8] to-[#1557B0] rounded-[40px] p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative Elements - Consistent Pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full" />
              <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full" />
            </div>
            
            <div className="relative z-10">
              <h2 className="mb-6 text-white text-4xl lg:text-5xl">
                Prefer to Email Directly?
              </h2>
              <p className="mb-10 text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
                You can reach me directly at {siteConfig.email}
              </p>
              <Button
                onClick={() => window.location.href = `mailto:${siteConfig.email}`}
                size="lg"
                className="bg-white text-[#1A73E8] hover:bg-[#F5F5F5] rounded-full shadow-lg group"
              >
                <Mail className="mr-2 w-5 h-5" />
                Send Email
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}