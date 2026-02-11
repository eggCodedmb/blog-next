"use client";

import { useEffect, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { Camera, Image as ImageIcon } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";
import { UploadThingError } from "uploadthing/server";

type UploadType = "avatar" | "cover";

interface AvatarUploaderProps {
  name: string;
  image?: string;
  type?: UploadType;
  onChange: (
    state: "success" | "error",
    url?: ClientUploadedFileData<{
      uploadedBy: number;
    }>,
  ) => void;
  onError?: (e: UploadThingError<{ message: string | undefined }>) => void;
}

const STYLE_MAP: Record<
  UploadType,
  {
    wrapperClass: string;
    previewShellClass: string;
    imageClass: string;
    overlayClass: string;
    emptyClass: string;
    icon: React.ReactNode;
  }
> = {
  avatar: {
    wrapperClass: "flex flex-col items-center gap-3",
    previewShellClass: "relative group w-50 h-50 rounded-full overflow-hidden",
    imageClass: "size-full rounded-[inherit] object-cover",
    overlayClass:
      "absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition",
    emptyClass:
      "size-full rounded-[inherit] border border-theme bg-[color-mix(in_srgb,var(--card)_90%,transparent)] flex items-center justify-center text-muted",
    icon: <Camera className="text-white" size={22} />,
  },
  cover: {
    wrapperClass: "flex flex-col gap-2",
    previewShellClass:
      "relative group w-full aspect-[16/9] rounded-xl overflow-hidden border border-theme bg-[color-mix(in_srgb,var(--card)_92%,transparent)]",
    imageClass: "size-full object-cover",
    overlayClass:
      "absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition",
    emptyClass:
      "size-full flex flex-col items-center justify-center gap-2 text-muted text-xs",
    icon: <ImageIcon className="text-white" size={22} />,
  },
};

export default function AvatarUploader({
  name,
  image,
  type = "avatar",
  onChange,
  onError,
}: AvatarUploaderProps) {
  const [preview, setPreview] = useState(image);
  const styles = STYLE_MAP[type];

  useEffect(() => {
    setPreview(image);
  }, [image]);

  return (
    <div className={styles.wrapperClass}>
      <div className={styles.previewShellClass}>
        <Avatar.Root className="size-full rounded-[inherit]">
          {preview ? (
            <Avatar.Image
              className={styles.imageClass}
              src={preview}
              alt={name || ""}
            />
          ) : (
            <div className={styles.emptyClass}>
              {type === "avatar" ? (
                <Camera className="text-muted" size={22} />
              ) : (
                <>
                  <ImageIcon className="text-muted" size={20} />
                  <span>点击上传封面</span>
                </>
              )}
            </div>
          )}
        </Avatar.Root>

        <div className={styles.overlayClass}>{styles.icon}</div>

        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const file = res?.[0];
            const url = file?.ufsUrl;
            if (!url) {
              onChange("error");
              return;
            }
            setPreview(url);
            onChange("success", file);
          }}
          onUploadError={(error) => {
            onChange("error");
            onError?.(error as UploadThingError<{ message: string | undefined }>);
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
          content={{}}
          config={{
            mode: "auto",
          }}
        />
      </div>
    </div>
  );
}
