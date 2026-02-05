"use client";

import { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { UploadDropzone } from "@/lib/uploadthing/uploadthing";
import { Camera } from "lucide-react";
import { ClientUploadedFileData } from "uploadthing/types";
import { UploadThingError } from "uploadthing/server";
interface AvatarUploaderProps {
  name: string;
  image?: string;
  onChange: (
    state: "success" | "error",
    url?: ClientUploadedFileData<{
      uploadedBy: number;
    }>,
  ) => void;
  onError?: (e: UploadThingError<{ message: string | undefined }>) => void;
}

export default function AvatarUploader({
  name,
  image,
  onChange,
  onError,
}: AvatarUploaderProps) {
  const [preview, setPreview] = useState(image);

  return (
    <div className="flex flex-col items-center gap-3 rounded-full">
      {/* 头像显示 */}
      <div className="relative group w-50 h-50">
        <Avatar.Root className="w-50 h-50 rounded-full">
          <Avatar.Image
            className="size-full rounded-[inherit] object-cover"
            src={preview || ""}
            alt={name || ""}
          />
        </Avatar.Root>

        {/* 悬浮遮罩 */}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <Camera className="text-white" size={22} />
        </div>

        {/* 上传区域覆盖在头像上 */}
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const url = res?.[0]?.ufsUrl;
            setPreview(url);
            onChange("success", res?.[0]);
          }}
          onUploadError={(e) =>
            onError?.(e as UploadThingError<{ message: string | undefined }>)
          }
          className="absolute inset-0 opacity-0 cursor-pointer"
          content={{}}
          config={{
            mode: "auto",
          }}
        />
      </div>
    </div>
  );
}
