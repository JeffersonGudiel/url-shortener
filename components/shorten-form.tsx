"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useState } from "react";
export default function ShortenForm() {
  const [url, setUrl] = useState<string>("");

  const handlesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(url);
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
        <Button className="w-full p-2" type="submit">
          Shorten URL
        </Button>
      </div>
    </form>
  );
}
