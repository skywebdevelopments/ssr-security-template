"use client";

import { useState } from "react";
import {
  BookmarkIcon,
  SkipBack,
  RotateCcw,
  Pause,
  RefreshCw,
  SkipForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function Component() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(24 * 60 + 16); // 24:16 in seconds
  const totalDuration = 75 * 60 + 50; // 75:50 in seconds

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        >
          1x
        </Button>
      </div>

      <Card className="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg?height=88&width=88"
              alt="Full Stack Radio"
              className="w-22 h-22 rounded"
              width="88"
              height="88"
            />
            <div className="min-w-0 flex-auto space-y-1 font-semibold">
              <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
                <abbr title="Episode">Ep.</abbr> 128
              </p>
              <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                Scaling CSS at Heroku with Utility Classes
              </h2>
              <p className="text-slate-900 dark:text-slate-50 text-lg">
                Full Stack Radio
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col space-y-4">
            <Slider
              value={[currentTime]}
              max={totalDuration}
              step={1}
              className="w-full"
              onValueChange={(value) => setCurrentTime(value[0])}
            />
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                {formatTime(currentTime)}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {formatTime(totalDuration)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button variant="ghost" size="icon">
              <BookmarkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Pause className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              1x
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
