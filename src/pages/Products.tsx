import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Grid3x3, List, Star, Zap, Clock, Shield, Truck, BadgeCheck, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const products = [
  {
    id: 1,
    name: "Enterprise Software License",
    category: "Software",
    price: "₹99,999",
    vendor: "Tech Solutions Inc",
    rating: 4.8,
    inStock: true,
    featured: true,
    delivery: "Instant",
    warranty: "1 Year",
    image: "💻",
    description: "Comprehensive enterprise software solution with advanced features and dedicated support.",
    tags: ["Popular", "Featured", "Digital Delivery"]
  },
  {
    id: 2,
    name: "Industrial Equipment Package",
    category: "Hardware",
    price: "₹2,49,999",
    vendor: "Industrial Suppliers Co.",
    rating: 4.6,
    inStock: true,
    featured: false,
    delivery: "3-5 Days",
    warranty: "2 Years",
    image: "⚙️",
    description: "Heavy-duty industrial equipment with advanced safety features and maintenance support.",
    tags: ["Premium", "Heavy Duty"]
  },
  {
    id: 3,
    name: "Business Consulting Package",
    category: "Services",
    price: "₹1,49,999",
    vendor: "ConsultPro Advisory",
    rating: 4.9,
    inStock: true,
    featured: true,
    delivery: "Custom",
    warranty: "6 Months",
    image: "📊",
    description: "Strategic business consulting with industry experts and customized growth plans.",
    tags: ["Expert", "Custom", "Featured"]
  },
  {
    id: 4,
    name: "Executive Office Furniture Set",
    category: "Furniture",
    price: "₹75,999",
    vendor: "Office Elegance",
    rating: 4.5,
    inStock: false,
    featured: false,
    delivery: "7-10 Days",
    warranty: "5 Years",
    image: "🪑",
    description: "Premium executive office furniture with ergonomic design and luxury materials.",
    tags: ["Luxury", "Ergonomic"]
  },
  {
    id: 5,
    name: "Marketing Automation Suite",
    category: "Software",
    price: "₹1,99,999",
    vendor: "MarketingPro AI",
    rating: 4.7,
    inStock: true,
    featured: true,
    delivery: "Instant",
    warranty: "Lifetime Updates",
    image: "🤖",
    description: "AI-powered marketing automation platform with analytics and campaign management.",
    tags: ["AI", "Automation", "Popular"]
  },
  {
    id: 6,
    name: "Network Security System",
    category: "Hardware",
    price: "₹3,49,999",
    vendor: "SecureNet Solutions",
    rating: 4.9,
    inStock: true,
    featured: false,
    delivery: "5-7 Days",
    warranty: "3 Years",
    image: "🔒",
    description: "Enterprise-grade network security system with 24/7 monitoring and threat protection.",
    tags: ["Security", "Enterprise"]
  },
  {
    id: 7,
    name: "Cloud Storage Solution",
    category: "Software",
    price: "₹49,999",
    vendor: "CloudTech Systems",
    rating: 4.8,
    inStock: true,
    featured: true,
    delivery: "Instant",
    warranty: "1 Year",
    image: "☁️",
    description: "Secure cloud storage with unlimited bandwidth and advanced encryption.",
    tags: ["Cloud", "Secure", "Featured"]
  },
  {
    id: 8,
    name: "Professional Workshop Tools",
    category: "Hardware",
    price: "₹1,29,999",
    vendor: "ToolMaster Pro",
    rating: 4.4,
    inStock: true,
    featured: false,
    delivery: "2-4 Days",
    warranty: "Lifetime",
    image: "🛠️",
    description: "Complete professional workshop toolset with industrial-grade durability.",
    tags: ["Professional", "Durable"]
  },
];

const categories = ["All", "Software", "Hardware", "Services", "Furniture"];
const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "featured", label: "Featured First" },
];

const quickFilters = [
  { label: "Featured", value: "featured", icon: Zap },
  { label: "In Stock", value: "inStock", icon: BadgeCheck },
  { label: "Fast Delivery", value: "fastDelivery", icon: Truck },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state
  useState(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  });

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      const matchesQuickFilter = !activeQuickFilter || 
        (activeQuickFilter === "featured" && product.featured) ||
        (activeQuickFilter === "inStock" && product.inStock) ||
        (activeQuickFilter === "fastDelivery" && product.delivery === "Instant");

      return matchesSearch && matchesCategory && matchesQuickFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-low") return parseInt(a.price.replace(/[₹,]/g, "")) - parseInt(b.price.replace(/[₹,]/g, ""));
      if (sortBy === "price-high") return parseInt(b.price.replace(/[₹,]/g, "")) - parseInt(a.price.replace(/[₹,]/g, ""));
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "featured") return (b.featured === a.featured) ? 0 : b.featured ? -1 : 1;
      return 0;
    });

  const ProductSkeleton = () => (
    <Card className="h-full border-border/50">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold">Premium Products</span>
          </motion.div>
          <h1 className=" p-8 text-6xl md:text-5xl font-bold mb-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Product Catalog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium products from verified vendors with enterprise-grade quality and support
          </p>
        </motion.div>

        {/* Enhanced Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            {quickFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeQuickFilter === filter.value;
              return (
                <Button
                  key={filter.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveQuickFilter(isActive ? null : filter.value)}
                  className={`rounded-full transition-all duration-300 ${
                    isActive ? "shadow-lg shadow-primary/20" : ""
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </Button>
              );
            })}
          </div>

          {/* Main Filters */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="text-sm font-medium mb-2 block text-foreground">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product, vendor, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-6 rounded-xl border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="w-full lg:w-48">
                <label className="text-sm font-medium mb-2 block text-foreground">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="rounded-xl py-6 border-border/50">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="rounded-lg">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full lg:w-48">
                <label className="text-sm font-medium mb-2 block text-foreground">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-xl py-6 border-border/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="rounded-lg">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
                  <TabsList className="rounded-xl p-1 bg-muted/50">
                    <TabsTrigger value="grid" className="rounded-lg data-[state=active]:bg-background">
                      <Grid3x3 className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-background">
                      <List className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>All vendors verified</span>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {[...Array(6)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500 overflow-hidden">
                    {/* Product Image/Icon */}
                    <div className="relative h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-4xl">{product.image}</span>
                      {product.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                            <Zap className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge variant={product.inStock ? "default" : "secondary"} className="shadow-sm">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {product.delivery}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pb-3">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Vendor:</span>
                          <span className="font-medium flex items-center gap-1">
                            <BadgeCheck className="h-3 w-3 text-green-500" />
                            {product.vendor}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {product.price}
                          </span>
                          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        className="w-full rounded-xl py-6 font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? (
                          <>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          "Notify When Available"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or browse different categories
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setActiveQuickFilter(null);
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}