import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-8 max-w-md"
        >
          Sorry, the page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-gradient-primary">
            <Link to="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
