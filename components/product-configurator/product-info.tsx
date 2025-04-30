"use client"

export function ProductInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Product Information</h3>

      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          This premium product is crafted with high-quality materials and designed for maximum performance. Customize it
          to match your specific needs and preferences.
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
          <div>
            <span className="font-medium text-foreground">Model:</span> XR-5000
          </div>
          <div>
            <span className="font-medium text-foreground">Dimensions:</span> 24 × 12 × 8 cm
          </div>
          <div>
            <span className="font-medium text-foreground">Weight:</span> 1.2 kg
          </div>
          <div>
            <span className="font-medium text-foreground">Warranty:</span> 2 years
          </div>
        </div>
      </div>

      <div className="pt-2">
        <h4 className="font-medium mb-2">Key Features</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
          <li>Customizable design with multiple color options</li>
          <li>Premium materials including metal and high-grade plastic</li>
          <li>Modular attachments for extended functionality</li>
          <li>Energy efficient with low power consumption</li>
          <li>Compatible with all standard accessories</li>
        </ul>
      </div>
    </div>
  )
}
