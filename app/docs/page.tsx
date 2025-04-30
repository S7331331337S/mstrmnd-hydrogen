import Link from "next/link"
import { ArrowRight, Book, Code, FileText, Layers } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about building with our headless commerce framework
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Book className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">Getting Started</CardTitle>
            <CardDescription>Learn the basics and get up and running quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/getting-started/installation" className="text-primary hover:underline">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/docs/getting-started/quick-start" className="text-primary hover:underline">
                  Quick Start Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/getting-started/project-structure" className="text-primary hover:underline">
                  Project Structure
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/docs/getting-started" className="group flex items-center text-sm font-medium text-primary">
              View all guides <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Layers className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">Core Concepts</CardTitle>
            <CardDescription>Understand the fundamental concepts</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/core-concepts/server-components" className="text-primary hover:underline">
                  Server Components
                </Link>
              </li>
              <li>
                <Link href="/docs/core-concepts/data-fetching" className="text-primary hover:underline">
                  Data Fetching
                </Link>
              </li>
              <li>
                <Link href="/docs/core-concepts/caching" className="text-primary hover:underline">
                  Caching Strategies
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/docs/core-concepts" className="group flex items-center text-sm font-medium text-primary">
              View all concepts <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Code className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">API Reference</CardTitle>
            <CardDescription>Detailed documentation of all APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/api/cart" className="text-primary hover:underline">
                  Cart API
                </Link>
              </li>
              <li>
                <Link href="/docs/api/products" className="text-primary hover:underline">
                  Products API
                </Link>
              </li>
              <li>
                <Link href="/docs/api/checkout" className="text-primary hover:underline">
                  Checkout API
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/docs/api" className="group flex items-center text-sm font-medium text-primary">
              View full API reference{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">Guides & Tutorials</CardTitle>
            <CardDescription>Step-by-step tutorials for common use cases</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/guides/product-listing" className="text-primary hover:underline">
                  Building a Product Listing Page
                </Link>
              </li>
              <li>
                <Link href="/docs/guides/cart-implementation" className="text-primary hover:underline">
                  Implementing a Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/docs/guides/checkout-flow" className="text-primary hover:underline">
                  Creating a Checkout Flow
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/docs/guides" className="group flex items-center text-sm font-medium text-primary">
              View all guides <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
