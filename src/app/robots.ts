import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/login", "/register", "/cart", "/checkout", "/razorpay/"],
    },
    sitemap: "https://aio.org.au/sitemap.xml",
    host: "https://aio.org.au",
  };
}
