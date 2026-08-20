import type { Metadata } from "next";
import {
  ShoppingCart,
  Shirt,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  Ruler,
  Layers,
  Package,
  Award,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/e-commerce-fulfillment/",
  metaTitle: "E-commerce & Dropshipping Apparel Manufacturer",
  metaDescription:
    "Apparel manufacturing for e-commerce brands, dropshippers and B2B sellers. Custom production, white label, private label and dropship fulfillment with global shipping.",
  keywords: [
    "ecommerce apparel supplier",
    "online clothing manufacturer",
    "custom clothing supplier",
    "apparel production partner",
    "Shopify clothing supplier",
    "online brand manufacturer",
    "clothing fulfillment supplier",
    "apparel sourcing partner",
  ],
  badge: "For E-commerce & Fulfillment",
  hero: "/pack-warehouse.webp",
  h1: "Apparel Manufacturing for E-commerce, Dropship & B2B Sellers",
  heroTitle: "Manufacturing Support for E-commerce Apparel Brands",
  heroBody:
    "E-commerce apparel brands have different needs than physical retailers. You need flexible quantities, fast replenishment, white-label packaging, and reliable shipping directly to your customers.\n\nWe work with e-commerce brands, dropshippers, and B2B apparel sellers to provide manufacturing, private label, and fulfillment services.",
  primaryCta: "Get an E-commerce Quote",
  secondaryCta: "See E-commerce Solutions",
  stats: [
    { value: "100+", label: "E-commerce Brands" },
    { value: "MOQ 30", label: "Per Design" },
    { value: "10 days", label: "Replenishment" },
    { value: "DDP", label: "Worldwide" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Apparel Solutions for E-commerce Sellers",
    subtitle: "From small batch testing to high-volume replenishment, we support e-commerce...",
    sections: [
      {
        title: "Custom Apparel for Online Stores",
        icon: "ShoppingCart",
        items: [
          { name: "Custom Print on Demand Apparel", details: [] },
          { name: "Shopify Apparel Supplier", details: [] },
          { name: "Amazon Apparel Manufacturer", details: [] },
          { name: "Etsy Apparel Supplier", details: [] },
        ],
      },
      {
        title: "Private Label Apparel",
        icon: "Award",
        items: [
          { name: "White Label Apparel", details: [] },
          { name: "Private Label Clothing", details: [] },
          { name: "Brand Custom Apparel", details: [] },
          { name: "Custom Label Production", details: [] },
        ],
      },
      {
        title: "Dropship & Fulfillment",
        icon: "Briefcase",
        items: [
          { name: "Apparel Dropship Services", details: [] },
          { name: "B2B Apparel Fulfillment", details: [] },
          { name: "Bulk Inventory Production", details: [] },
          { name: "Replenishment Manufacturing", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why E-commerce Brands Choose Us",
    title: "Three Things That Make E-commerce Apparel Easier With Us",
    features: [
      {
        icon: "Ruler",
        title: "Flexible Quantities for Product Testing",
        body: "E-commerce brands need to test designs before scaling. We support low MOQ on first orders (30+ pieces) and can scale up replenishment as the design sells.",
      },
      {
        icon: "Layers",
        title: "White Label & Custom Branding",
        body: "We can produce apparel with your own brand labels, tags, and packaging. White label or fully branded — your customer sees your brand, not ours.",
      },
      {
        icon: "Calendar",
        title: "Replenishment Production Speed",
        body: "When a design sells out, you need to replenish fast. We offer 10-day rush replenishment for proven designs so you don't miss repeat purchase opportunities.",
      },
      {
        icon: "Globe",
        title: "Dropship to Multiple Countries",
        body: "If you sell internationally, we can ship directly to your customers in different countries. DDP options to US, UK, EU and Australia for a seamless customer experience.",
      },
      {
        icon: "Package",
        title: "Bulk Inventory + Dropship Options",
        body: "Whether you want bulk inventory shipped to your warehouse, or per-order dropship from our factory, we can support both models for the same brand.",
      },
      {
        icon: "MessageCircle",
        title: "API-Friendly Order Management",
        body: "For e-commerce brands, we can integrate with common order systems. Send orders via spreadsheet, email, or your own order management system.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "E-commerce Apparel Brands at Every Stage",
    items: [
      "Shopify store owners",
      "Amazon sellers",
      "Etsy shop owners",
      "Dropshipping businesses",
      "Print-on-demand brands",
      "Multi-channel e-commerce sellers",
    ],
  },
  faqTitle: "E-commerce Apparel Manufacturing Questions, Answered",
  faqSubtitle: "Common questions from e-commerce store owners and operations managers.",
  faqs: [
    {
      q: "What is the minimum order quantity?",
      a: "For e-commerce brands we typically start at 30 pieces per design. This lets you test designs with a small inventory commitment before scaling up.",
    },
    {
      q: "Can you produce white label or private label apparel?",
      a: "Yes. We can produce white label (your brand, our blank) or private label (your brand with your custom designs). Custom labels and tags available.",
    },
    {
      q: "Can you dropship directly to my customers?",
      a: "Yes. We offer dropship services where we ship directly to your customers in their country. DDP options available to the US, UK, EU and Australia.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We ship worldwide with DDP options to the US, UK, EU and Australia. We can ship to your warehouse, fulfillment center, or directly to retail customers.",
    },
  ],
  ctaTitle: "Looking for an E-commerce Apparel Partner?",
  ctaBody:
    "Send your brand details, product type, and rough order volume. We will reply with a sample plan, a production timeline, and pricing for your store.",
  ctaButton: "Discuss Your E-commerce Brand",
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
