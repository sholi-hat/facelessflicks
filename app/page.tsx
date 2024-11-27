import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wand2, Sparkles, Brain, Video } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
          Create Amazing Videos with AI
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Transform your ideas into stunning videos using AI-powered script writing,
          image generation, and voice synthesis
        </p>
        <Button asChild size="lg">
          <Link href="/create">
            <Wand2 className="mr-2 h-5 w-5" />
            Start Creating
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6">
          <Brain className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">AI Script Generation</h3>
          <p className="text-muted-foreground">
            Generate engaging scripts for your videos using advanced AI language models
          </p>
        </Card>
        <Card className="p-6">
          <Sparkles className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">AI Image Creation</h3>
          <p className="text-muted-foreground">
            Create stunning visuals with Stable Diffusion AI image generation
          </p>
        </Card>
        <Card className="p-6">
          <Video className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Professional Videos</h3>
          <p className="text-muted-foreground">
            Automatically combine everything into polished, professional videos
          </p>
        </Card>
      </div>
    </div>
  )
}