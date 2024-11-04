"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Url = {
  id: string;
  shortCode: string;
  originalUrl: string;
  visits: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copieUrl, setCopieUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shortenerUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      // Asegúrate de que `window` se use solo en el cliente
      const apiUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/api/urls`
          : "/api/urls";

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // El resto del código permanece igual
  // ...
}
