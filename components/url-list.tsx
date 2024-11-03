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

  // Definir directamente la base de la URL si la aplicación se ejecuta en el mismo dominio.
  const shortenerUrl = (code: string) => `/${code}`;

  const fetchUrls = async () => {
    try {
      // Uso de ruta relativa para hacer la solicitud.
      const response = await fetch("/api/urls/route");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs", error);
    }
  };

  const handleCopyUrl = (code: string) => {
    const fullUrl = window.location.origin + shortenerUrl(code); // Agrega el origen de la ventana.
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopieUrl(code);
      setTimeout(() => {
        setCopied(false);
        setCopieUrl("");
      }, 3000);
    });
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urls.map((url) => (
          <li
            key={url.id}
            className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3">
            <Link
              href={`/${url.shortCode}`}
              target="_blank"
              className="text-blue-500">
              {window.location.origin + shortenerUrl(url.shortCode)}
            </Link>

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted"
                onClick={() => handleCopyUrl(url.shortCode)}>
                {copied && copieUrl == url.shortCode ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
                <span className="sr-only">Copy URL</span>
              </Button>

              <span className="flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
