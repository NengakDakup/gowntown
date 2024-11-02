"use client"

import * as React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const slides = [
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    title: <>
      <span className="text-primary">Connect</span> with Graduates
    </>,
    description: "Build your professional network with fellow alumni",
  },
  {
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    title: <>
      <span className="text-primary">Find</span> Opportunities
    </>,
    description: "Discover exciting job openings and career paths",
  },
  {
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    title: <>
      <span className="text-primary">Engage</span> & Grow
    </>,
    description: "Chat, collaborate and grow with your graduate community",
  },
]

export function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-emerald-950 p-6">
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="relative w-[85%] aspect-video mb-6">
          {slides.map((slide, index) => (
            <Card
              key={slide.url}
              className={cn(
                "absolute h-full w-full transition-all duration-500 bg-primary border-none",
                index === currentSlide
                  ? ""
                  : "translate-x-full opacity-0"
              )}
            >
              <Image
                src={slide.url}
                alt="Slider Image"
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </Card>
          ))}
        </div>

        <div className="text-center text-white mb-6">
          <h2 className="mb-2 text-3xl font-bold">{slides[currentSlide].title}</h2>
          <p className="text-lg opacity-90">{slides[currentSlide].description}</p>
        </div>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all cursor-pointer",
                index === currentSlide ? "bg-white" : "bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}