import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Award, Users, TrendingUp, Globe, Shield, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower businesses with innovative solutions that drive growth and success in the digital age through cutting-edge technology and unparalleled service.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To become India's most trusted B2B platform, creating an ecosystem where businesses thrive through seamless connections and transformative solutions.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Our Values",
    description: "Integrity, innovation, customer-centricity, and excellence guide every decision we make and every relationship we build.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Our Team",
    description: "A diverse collective of visionaries, engineers, and business experts united by a passion for driving meaningful change in B2B commerce.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const milestones = [
  { year: "2020", event: "Company Founded", description: "Started with a vision to transform B2B commerce" },
  { year: "2021", event: "First 1000 Customers", description: "Reached significant milestone in customer adoption" },
  { year: "2022", event: "Vendor Network Expansion", description: "Expanded to 500+ verified vendor partners" },
  { year: "2023", event: "Platform 2.0 Launch", description: "Introduced AI-powered features and analytics" },
  { year: "2024", event: "Industry Recognition", description: "Awarded 'Best B2B Platform' by Industry Association" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Hero Section with Parallax */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative"
        >
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">Trusted Since 2020</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          >
            Building the Future of
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              B2B Commerce
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8"
          >
            Traders Pvt. Ltd. is revolutionizing how businesses connect, collaborate, and grow. 
            We're not just a platform—we're a catalyst for transformation in India's B2B landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-xl">
              <Link to="/auth/register">Join Our Network</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Learn More</Link>
            </Button>
          </motion.div>
        </motion.section>

        {/* Values Grid with Staggered Animation */}
        <motion.section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Principles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The foundation of everything we do is built on these core principles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="pt-8 pb-6 relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Story Timeline with Scroll Progress */}
        <motion.section className="mb-24 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 to-accent/20 rounded-full" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From startup to industry leader—our journey of innovation and growth
            </p>
          </motion.div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.event}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </motion.div>
                </div>
                <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Stats Section */}
        <motion.section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">By The Numbers</h2>
            <p className="text-lg text-muted-foreground">
              Our impact and growth in the B2B ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "2020", label: "Year Founded", icon: TrendingUp },
              { value: "500+", label: "Vendor Partners", icon: Users },
              { value: "50K+", label: "Active Customers", icon: Globe },
              { value: "10K+", label: "Products Listed", icon: Shield },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl" />
          <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm font-semibold">Join Our Community</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Grow With Us?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already transforming their operations and accelerating growth with Traders.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-xl px-8">
                <Link to="/auth/register">
                  Start Your Journey
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Schedule a Demo</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}