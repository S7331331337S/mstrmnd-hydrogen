"use client"

import { useState } from "react"
import type { ProductConfig } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ShareConfigProps {
  config: ProductConfig
}

export function ShareConfig({ config }: ShareConfigProps) {
  const [copied, setCopied] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/products/configure?config=${encodeURIComponent(JSON.stringify(config))}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareConfiguration = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Product Configuration",
          text: "Check out my custom product configuration!",
          url: shareUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
        setDialogOpen(true)
      }
    } else {
      setDialogOpen(true)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Share Your Design</h3>

      <Button variant="default" className="w-full" onClick={shareConfiguration}>
        <Share2 className="h-4 w-4 mr-2" />
        Share Configuration
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Configuration</DialogTitle>
            <DialogDescription>Copy this link to share your custom product design with others.</DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button size="icon" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
