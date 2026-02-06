import Image from "next/image";
import { ReactNode } from "react";
import { UploadButton } from "@/lib/uploadthing/uploadthing";

type UploadVariant = "solid" | "soft" | "ghost";
type UploadSize = "sm" | "md" | "lg";

interface ImageUploadButtonProps {
  endpoint?: string;
  size?: UploadSize;
  variant?: UploadVariant;
  label?: string;
  showLabel?: boolean;
  icon?: ReactNode;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
}

function ImageUploadButton({
  endpoint = "imageUploader",
  size = "md",
  variant = "solid",
  label = "插入图片",
  showLabel = false,
  icon,
  className,
  buttonClassName,
  iconClassName,
  disabled = false,
  onUploadComplete,
  onUploadError,
}: ImageUploadButtonProps) {
  const variantClass = `editor-upload-btn--${variant}`;
  const sizeClass = `editor-upload-btn--${size}`;
  const disabledClass = disabled ? "is-disabled" : "";

  return (
    <UploadButton
      className={["editor-upload", className].filter(Boolean).join(" ")}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const url = res?.[0]?.ufsUrl;
        if (url) {
          onUploadComplete?.(url);
        }
      }}
      onUploadError={(error) => {
        onUploadError?.(error);
      }}
      appearance={{
        container: "editor-upload",
        button: [
          "editor-upload-btn",
          variantClass,
          sizeClass,
          disabledClass,
          buttonClassName,
        ]
          .filter(Boolean)
          .join(" "),
        allowedContent: "editor-upload-hint",
      }}
      content={{
        button: (
          <span className="editor-upload-content" aria-label={label}>
            <span className={["editor-upload-icon", iconClassName].filter(Boolean).join(" ")}>
              {icon ?? (
                <Image
                  src="./assets/_图片.svg"
                  alt={label}
                  width={16}
                  height={16}
                  className="editor-icon"
                />
              )}
            </span>
            {showLabel && <span className="editor-upload-label">{label}</span>}
          </span>
        ),
        allowedContent: "",
      }}
      config={{
        mode: "auto",
      }}
    />
  );
}

export default ImageUploadButton;
