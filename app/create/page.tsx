"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Play, Pause } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Voice } from "@/lib/elevenlabs/types"

const formSchema = z.object({
  prompt: z.string().min(10).max(1000),
  duration: z.string(),
  voiceId: z.string(),
})

export default function CreatePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [voices, setVoices] = useState<Voice[]>([])
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      duration: "30",
      voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel voice as default
    },
  })

  useEffect(() => {
    async function loadVoices() {
      try {
        const response = await fetch('/api/voices')
        if (!response.ok) throw new Error('Failed to fetch voices')
        const data = await response.json()
        setVoices(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load voices. Please refresh the page.",
        })
      }
    }
    loadVoices()
  }, [toast])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to generate video")
      }

      const data = await response.json()
      setGeneratedContent(data)
      
      toast({
        title: "Content Generated",
        description: "Your video content has been generated successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAudio = (audioUrl: string) => {
    if (playingAudio) {
      playingAudio.pause()
      setPlayingAudio(null)
    } else {
      const audio = new Audio(audioUrl)
      audio.play()
      audio.onended = () => setPlayingAudio(null)
      setPlayingAudio(audio)
    }
  }

  const previewVoice = (previewUrl: string) => {
    toggleAudio(previewUrl)
  }

  return (
    <div className="container max-w-4xl py-16">
      <Card className="p-6 mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ask AI to generate a script for you</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E.G Create a short story about the Wendigo legend..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe what kind of video you want to create, and our AI will generate an engaging script for you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select video duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="90">90 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the length of your video
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="voiceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem
                            key={voice.voice_id}
                            value={voice.voice_id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <span>{voice.name}</span>
                              {voice.preview_url && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="ml-2"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    previewVoice(voice.preview_url)
                                  }}
                                >
                                  {playingAudio ? (
                                    <Pause className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </Button>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a voice for your video narration
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Video
            </Button>
          </form>
        </Form>
      </Card>

      {generatedContent && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">{generatedContent.title}</h2>
          <div className="space-y-8">
            {generatedContent.scenes.map((scene: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="aspect-video mb-4 relative group">
                  <img
                    src={scene.imageUrl}
                    alt={`Scene ${index + 1}`}
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-4 right-4 opacity-90"
                    onClick={() => toggleAudio(scene.audioUrl)}
                  >
                    {playingAudio ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Duration: {scene.duration}s
                </p>
                <p className="font-medium">{scene.narration}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}