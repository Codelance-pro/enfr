import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle, Package, Users, TrendingUp, Shield, Star, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    name: "Wide Product Range",
    description: "Access thousands of quality products from verified vendors across multiple categories and industries.",
    icon: Package,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Trusted Vendors",
    description: "Work with pre-verified, reliable vendors with proven track records and excellent reviews.",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Business Growth",
    description: "Scale your business with our comprehensive vendor management and analytics platform.",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Secure Transactions",
    description: "Enterprise-grade security with end-to-end encryption for all your business transactions.",
    icon: Shield,
    gradient: "from-orange-500 to-red-500",
  },
];

const stats = [
  { value: "10,000+", label: "Premium Products", suffix: "" },
  { value: "500+", label: "Verified Vendors", suffix: "" },
  { value: "50,000+", label: "Happy Customers", suffix: "" },
  { value: "99.9", label: "Platform Uptime", suffix: "%" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    company: "Global Imports Inc.",
    text: "Traders transformed our supply chain. The vendor quality is exceptional!",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    company: "Tech Solutions Ltd.",
    text: "Incredible platform that helped us scale our business 3x in just 6 months.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "Retail Partners Co.",
    text: "The security and reliability give us complete peace of mind for all transactions.",
    rating: 5,
  },
];

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(motionValue, (latest) => Math.round(latest));

  React.useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span>{displayValue}</motion.span>;
}

function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function HoverCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
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
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-background text-primary flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:50px_50px]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.2}>
              <div className="w-2 h-2 bg-white/30 rounded-full absolute" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            </FloatingElement>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 50,000+ Businesses</span>
              <ArrowUpRight className="h-3 w-3 text-primary" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight  text-primary mb-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                Empowering
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="block bg-gradient-to-r text-primary mt-4"
              >
                Businesses
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-primary mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with trusted vendors, access quality products, and scale your business with 
              <span className="font-semibold  text-primary"> Traders</span>'s comprehensive B2B platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            >
              <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 shadow-2xl px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                <Link to="/products">
                  Explore Products
               
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-primary hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                <Link to="/auth/register">Become a Vendor</Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap items-center justify-center gap-8 text-primary/70"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Secure Platform</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="text-5xl font-bold text-primary mb-3 font-mono">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-lg text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Star className="h-4 w-4" />
              <span className="text-sm font-semibold">Why Choose Us</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Everything Your Business Needs
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Powerful tools and features designed to accelerate your business growth and streamline operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <HoverCard className="h-full">
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="pt-8 pb-6 relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {feature.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-muted-foreground">See what our partners say about us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm group-hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="absolute inset-0 bg-grid-primary/10 bg-[size:50px_50px]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Limited Time Offer</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join thousands of successful businesses already growing with Traders. 
              Start your journey today with our risk-free trial.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-2xl px-12 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                <Link to="/auth/register">
                  Start Free Trial
                  {/* <ArrowRight className="ml-3 h-5 w-5" /> */}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border px-12 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                <Link to="/contact">Book a Demo</Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-sm text-muted-foreground mt-8"
            >
              No credit card required • 14-day free trial • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}