"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useState } from "react";

interface ShortenFormProps { 
  handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });
      await response.json();
      setUrl("");
      handleUrlShortened();
    } catch (error) {
      console.error("Error shortening URL", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlesSubmit} className="mb-4">
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12"
          type="url"
          placeholder="Enter URL to shorten"
          required
        />
        <Button className="w-full p-2" type="submit" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>
    </form>
  );
}
