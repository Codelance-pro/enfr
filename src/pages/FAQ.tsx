import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Traders?",
    answer: "Traders is a B2B platform connecting businesses with verified vendors and quality products across various categories. We provide a seamless marketplace for businesses to source products and services efficiently.",
  },
  {
    question: "How do I become a vendor?",
    answer: "To become a vendor, click on 'Become a Vendor' button and complete the registration process. Our team will review your application and verify your business credentials. Once approved, you can start listing your products.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including bank transfers, UPI, credit/debit cards, and net banking. For large orders, we also offer credit terms to verified businesses.",
  },
  {
    question: "How do you ensure vendor quality?",
    answer: "All vendors undergo a thorough verification process including business registration checks, product quality assessments, and customer feedback reviews. We maintain strict quality standards to ensure reliable partnerships.",
  },
  {
    question: "What is your return policy?",
    answer: "Return policies vary by vendor and product category. Generally, we support returns within 7-30 days for defective or incorrect products. Specific terms are mentioned on individual product pages.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer competitive bulk discounts for large orders. Contact our sales team with your requirements, and we'll provide a customized quote based on your needs.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is confirmed, you'll receive a tracking ID via email and SMS. You can use this to monitor your shipment status in real-time through your vendor dashboard.",
  },
  {
    question: "What support do you provide?",
    answer: "We offer comprehensive support including onboarding assistance, technical help, account management, and customer service. Our support team is available Monday-Friday, 9 AM - 6 PM IST.",
  },
];

export default function FAQ() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-card rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
