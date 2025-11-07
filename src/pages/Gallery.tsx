import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  X, 
  ZoomIn, 
  Play, 
  Share2, 
  Heart, 
  Download,
  Grid3x3,
  List,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const galleryItems = [
  { 
    id: 1, 
    title: "Modern Office Space", 
    category: "Office", 
    description: "Our state-of-the-art workspace designed for collaboration and innovation",
    tags: ["Workspace", "Design", "Innovation"],
    featured: true,
    stats: { likes: 234, views: 1500 }
  },
  { 
    id: 2, 
    title: "Product Showcase", 
    category: "Products", 
    description: "Premium product displays and exhibition setups",
    tags: ["Exhibition", "Premium", "Display"],
    featured: false,
    stats: { likes: 189, views: 1200 }
  },
  { 
    id: 3, 
    title: "Team Collaboration", 
    category: "Team", 
    description: "Our dynamic team working together on innovative projects",
    tags: ["Teamwork", "Collaboration", "Culture"],
    featured: true,
    stats: { likes: 312, views: 2100 }
  },
  { 
    id: 4, 
    title: "Warehouse Facility", 
    category: "Facility", 
    description: "Advanced logistics and storage infrastructure",
    tags: ["Logistics", "Infrastructure", "Storage"],
    featured: false,
    stats: { likes: 156, views: 980 }
  },
  { 
    id: 5, 
    title: "Customer Meeting", 
    category: "Events", 
    description: "Strategic client discussions and partnership meetings",
    tags: ["Clients", "Partnership", "Business"],
    featured: true,
    stats: { likes: 278, views: 1800 }
  },
  { 
    id: 6, 
    title: "Technology Lab", 
    category: "Tech", 
    description: "Cutting-edge research and development laboratory",
    tags: ["R&D", "Technology", "Innovation"],
    featured: false,
    stats: { likes: 421, views: 3200 }
  },
  { 
    id: 7, 
    title: "Product Development", 
    category: "Development", 
    description: "Behind the scenes of our product creation process",
    tags: ["Process", "Creation", "Development"],
    featured: true,
    stats: { likes: 345, views: 2500 }
  },
  { 
    id: 8, 
    title: "Conference Hall", 
    category: "Office", 
    description: "Modern conference facilities for large-scale events",
    tags: ["Events", "Conference", "Facilities"],
    featured: false,
    stats: { likes: 198, views: 1400 }
  },
  { 
    id: 9, 
    title: "Innovation Hub", 
    category: "Tech", 
    description: "Creative space for brainstorming and ideation sessions",
    tags: ["Creativity", "Ideation", "Brainstorming"],
    featured: true,
    stats: { likes: 389, views: 2700 }
  },
];

const categories = ["All", "Office", "Products", "Team", "Facility", "Events", "Tech", "Development"];
const filters = ["All", "Featured", "Most Popular", "Recent"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === "All" || 
                         (activeFilter === "Featured" && item.featured) ||
                         (activeFilter === "Most Popular" && item.stats.views > 2000) ||
                         (activeFilter === "Recent" && item.id > 6);

    return matchesCategory && matchesSearch && matchesFilter;
  });

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-12">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Visual Journey</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 pb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          >
            Explore Our World
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Immerse yourself in our dynamic workspace, innovative projects, and vibrant company culture through our interactive gallery
          </motion.p>
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search galleries by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm text-lg"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full lg:w-auto">
              <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-2xl">
                {filters.map(filter => (
                  <TabsTrigger
                    key={filter}
                    value={filter}
                    className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    {filter}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full lg:w-auto">
              <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-2xl flex-wrap h-auto">
                {categories.map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "masonry")} className="w-full lg:w-auto">
              <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-2xl">
                <TabsTrigger value="grid" className="rounded-xl data-[state=active]:bg-background">
                  <Grid3x3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="masonry" className="rounded-xl data-[state=active]:bg-background">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedCategory}-${activeFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            }
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="break-inside-avoid group cursor-pointer"
              >
                <Card className="overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                  {/* Image Container with Gradient Overlay */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center text-white">
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="text-2xl font-bold mb-3"
                        >
                          {item.title}
                        </motion.h3>
                        <p className="text-sm opacity-90 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-3 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedImage(item)}
                            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <ZoomIn className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleLike(item.id)}
                            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <Heart 
                              className={`h-5 w-5 ${
                                likedItems.has(item.id) 
                                  ? "fill-red-500 text-red-500" 
                                  : "text-white"
                              }`} 
                            />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
                        {item.category}
                      </Badge>
                    </div>

                    {/* Bottom Stats */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/80 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{item.stats.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{item.stats.views}</span>
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>

                    {/* Animated Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No galleries found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse different categories
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setActiveFilter("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-2xl px-8 py-6 border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              Load More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-foreground p-8">
                    <h2 className="text-3xl font-bold mb-4">{selectedImage.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{selectedImage.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {selectedImage.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Add missing Eye icon component
const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);