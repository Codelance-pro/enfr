import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Sparkles, Zap, MessageCircle, Brain, Rocket, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@tradersindia.com", "support@tradersindia.com"],
    gradient: "from-blue-500 to-cyan-500",
    action: "mailto:info@tradersindia.com"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 1800-123-4567", "+91 1800-765-4321"],
    gradient: "from-green-500 to-emerald-500",
    action: "tel:+9118001234567"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Business Park, Andheri East", "Mumbai, Maharashtra 400069"],
    gradient: "from-purple-500 to-pink-500",
    action: "https://maps.google.com"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
    gradient: "from-orange-500 to-red-500",
    action: null
  },
];

const interactiveFeatures = [
  {
    icon: Zap,
    title: "Instant Response AI",
    description: "Get immediate answers to common questions",
    color: "text-yellow-500"
  },
  {
    icon: Brain,
    title: "Smart Routing",
    description: "Your message goes directly to the right expert",
    color: "text-purple-500"
  },
  {
    icon: Rocket,
    title: "Priority Handling",
    description: "Business inquiries get expedited processing",
    color: "text-blue-500"
  },
  {
    icon: Globe,
    title: "Global Support",
    description: "24/7 support across multiple time zones",
    color: "text-green-500"
  }
];

function FloatingParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50]
      }}
      transition={{ 
        duration: 4, 
        delay,
        repeat: Infinity,
        repeatType: "loop"
      }}
      className="absolute w-2 h-2 bg-primary/30 rounded-full"
    />
  );
}

function InteractiveCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedInput({ label, ...props }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const springConfig = { stiffness: 300, damping: 30 };
  const scale = useSpring(isFocused ? 1.02 : 1, springConfig);

  return (
    <motion.div style={{ scale }} className="relative">
      <label className="block text-sm font-semibold mb-3 text-foreground/80">
        {label}
      </label>
      <Input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="rounded-xl py-6  border-none bg-background/50 backdrop-blur-sm transition-all duration-300"
      />
      <motion.div
        initial={false}
        animate={{ 
          width: isFocused ? "100%" : "0%",
          opacity: isFocused ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
      />
    </motion.div>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "🚀 Message Launched!",
      description: "Our AI is routing your message to the perfect team member. Expect a response within 2 hours.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} />
        ))}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Intelligent Contact System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 "
          >
            Let's Create
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-8"
            >
              Something Amazing
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Our AI-powered contact system ensures your message reaches the right expert instantly. 
            No more waiting, no more runaround—just brilliant solutions.
          </motion.p>
        </motion.div>

        {/* Interactive Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <InteractiveCard className="h-full">
                <Card 
                  className={cn(
                    "h-full border-border/50 bg-card/30 backdrop-blur-sm cursor-pointer group overflow-hidden",
                    info.action && "hover:shadow-2xl hover:shadow-primary/20"
                  )}
                  onClick={() => info.action && window.open(info.action, '_blank')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="pt-8 pb-6 relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}>
                      <info.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p 
                        key={i} 
                        className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors"
                      >
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </InteractiveCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Start a Conversation</h2>
              <p className="text-muted-foreground mb-8">
                Tell us about your project, and our AI will match you with the perfect specialist.
              </p>
            </div>

            <InteractiveCard>
              <Card className="border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-8 pb-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedInput
                        label="First Name"
                        placeholder="John"
                        required
                      />
                      <AnimatedInput
                        label="Last Name"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    
                    <AnimatedInput
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                    
                    <AnimatedInput
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                    />

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-foreground/80">
                        Your Message
                      </label>
                      <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                        <Textarea
                          placeholder="Describe your project, challenges, or questions in detail..."
                          rows={6}
                          required
                          className="rounded-xl py-4 border-border/50 bg-background/50 backdrop-blur-sm resize-none transition-all duration-300"
                        />
                        <motion.div
                          initial={false}
                          whileFocus={{ 
                            width: "100%",
                            opacity: 1 
                          }}
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                        />
                      </motion.div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="submit" 
                        className="w-full py-6 rounded-xl bg-gradient-primary hover:opacity-90 shadow-xl font-semibold text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Launch Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </InteractiveCard>
          </motion.div>

          {/* Features & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Why We're Different</h2>
              <p className="text-muted-foreground">
                Our contact system uses advanced AI to ensure you get the fastest, most accurate response possible.
              </p>
            </div>

            <div className="space-y-4">
              {interactiveFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold text-foreground">Live Support Status</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time:</span>
                  <span className="font-semibold text-green-600">Under 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Online Experts:</span>
                  <span className="font-semibold">12 available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Queue Position:</span>
                  <span className="font-semibold">You're next!</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our AI assistant can help answer common questions instantly, or connect you with a human expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="rounded-xl py-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with AI Assistant
              </Button>
              <Button size="lg" className="rounded-xl py-6 bg-gradient-primary">
                <Phone className="mr-2 h-5 w-5" />
                Request Callback
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}