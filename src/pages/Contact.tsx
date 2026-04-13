import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { toast } from "sonner";
import { Mail, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  company: z.string().trim().min(1, "Required").max(100),
  role: z.string().max(100).optional(),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  centers: z.string().optional(),
  vertical: z.string().optional(),
  challenge: z.string().max(1000).optional(),
  interest: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", role: "", email: "", phone: "", centers: "", vertical: "", challenge: "", interest: "" },
  });

  const onSubmit = (data: FormValues) => {
    toast.success("Thank you! We'll review your submission within 4 hours.");
    form.reset();
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Let's Build Your Revenue Engine.</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Book a 30-minute strategy call. We'll map the media brand architecture for your vertical, model your 5-year CPL decline, and show you what the asset will be worth.</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 max-w-5xl mx-auto">
            <FadeIn>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Your Name *</FormLabel><FormControl><Input placeholder="Full name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem><FormLabel>Company / Brand *</FormLabel><FormControl><Input placeholder="Company name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="role" render={({ field }) => (
                      <FormItem><FormLabel>Your Role</FormLabel><FormControl><Input placeholder="e.g. CEO, CMO" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" placeholder="you@company.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input placeholder="+91 9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="centers" render={({ field }) => (
                      <FormItem><FormLabel>Number of Centers</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {["1–10", "10–50", "50–200", "200–500", "500+"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      <FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="vertical" render={({ field }) => (
                    <FormItem><FormLabel>Vertical / Industry</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {["Vocational Education", "Higher Education", "Beauty & Wellness", "HealthTech", "FinTech", "Real Estate", "Enterprise", "Government", "Other"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="challenge" render={({ field }) => (
                    <FormItem><FormLabel>Biggest challenge?</FormLabel><FormControl><Textarea rows={3} placeholder="Tell us about your current challenges..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="interest" render={({ field }) => (
                    <FormItem><FormLabel>Which option interests you?</FormLabel><FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                        {[
                          { value: "option-a", label: "Option A — Single Brand Pilot ₹2.5L/mo" },
                          { value: "option-b", label: "Option B — Full 3-Brand Deployment ₹6L/mo" },
                          { value: "custom", label: "Custom AI Build" },
                          { value: "explore", label: "Not sure yet — want to explore" },
                        ].map(o => (
                          <div key={o.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={o.value} id={o.value} />
                            <Label htmlFor={o.value} className="text-sm text-muted-foreground cursor-pointer">{o.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" size="lg" className="w-full">Book Strategy Call →</Button>
                </form>
              </Form>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6">What Happens Next</h3>
                  <div className="space-y-6">
                    {[
                      "We review your submission within 4 hours",
                      "Brand onboarding call scheduled — 30 minutes",
                      "We map your media brand architecture and 5-year model",
                      "Proposal + pricing delivered within 48 hours",
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                        <p className="text-sm text-muted-foreground pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">hello@optimizer360.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
