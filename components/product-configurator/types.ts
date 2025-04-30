export interface ProductConfig {
  baseColor: string
  baseMaterial: "plastic" | "metal" | "wood"
  bodyColor: string
  bodyMaterial: "plastic" | "metal" | "wood"
  includeTopPart: boolean
  topColor: string
  topMaterial: "plastic" | "metal" | "glass"
  sideAttachments: number
  attachmentColor: string
  includeLogo: boolean
}

export interface ProductPreset {
  id: string
  name: string
  config: ProductConfig
}
