"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductConfigurator } from "@/components/product-configurator/product-configurator"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function ConfigurePage() {
  return (
    <>
      <Header />

      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Product Configurator</h1>
              <p className="text-muted-foreground mt-1">Customize your product to match your exact specifications</p>
            </div>

            <Button className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-muted-foreground">/</span>
                    <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-muted-foreground">/</span>
                    <span className="text-sm font-medium text-foreground">Configure</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <ProductConfigurator />

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Why Customize?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium">Perfect Fit</h3>
                <p className="text-sm text-muted-foreground">
                  Tailor the product to your exact specifications and requirements for the perfect fit.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Express Yourself</h3>
                <p className="text-sm text-muted-foreground">
                  Choose colors and materials that match your personal style and aesthetic preferences.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Optimize Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Select features and components that enhance performance for your specific use case.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
