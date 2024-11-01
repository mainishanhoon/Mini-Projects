'use client';

import { pinata } from '@/lib/config';
import { CloudUpload, Loader2 } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { deleteImage } from '@/lib/actions';
import { DeleteButton } from './Buttons';

export default function Dropzone() {
  const [files, setFiles] = useState<
    Array<{ file: File; uploading: boolean; id?: string }>
  >([]);

  async function uploadFile(file: File) {
    try {
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.file === file ? { ...f, uploading: true } : f)),
      );

      const keyRequest = await fetch('/api/key');
      const keyData = await keyRequest.json();
      const upload = await pinata.upload.file(file).key(keyData.JWT);

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === file ? { ...f, uploading: false, id: upload.cid } : f,
        ),
      );

      toast.success(`File ${file.name} uploaded successfully`);
    } catch (e) {
      console.error(e);

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === file ? { ...f, uploading: false } : f,
        ),
      );

      toast.error('Trouble uploading file');
    }
  }

  async function deleteFile(fileId: string, fileName: string) {
    if (fileId) {
      const result = await deleteImage(fileId);

      if (result.success) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
        toast.success(`File ${fileName} Deleted Successfully!`);
      } else {
        toast.error('Something went Wrong!!');
      }
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFiles((prevFiles: any) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => ({ file, uploading: false })),
      ]);

      acceptedFiles.forEach(uploadFile);
    }
  }, []);

  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === 'too-many-files',
      );

      const fileSizetoBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === 'file-too-large',
      );

      if (tooManyFiles) {
        toast.error('Only 6 Images can be Selected');
      }

      if (fileSizetoBig) {
        toast.error('Image should be less than 2 MBs ');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectedFiles,
    maxFiles: 6,
    maxSize: 1024 * 1024 * 2, // 2 Mb
    accept: { 'image/*': [] },
  });

  return (
    <>
      <div
        {...getRootProps({
          className:
            'px-10 py-5 w-screen mt-10 border-dashed bg-muted border-2 border-muted-foreground max-w-sm lg:max-w-lg xl:max-w-xl md:max-w-md rounded-lg flex justify-center',
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="flex h-44 flex-col items-center justify-center text-center text-sm font-bold text-foreground">
            <CloudUpload size={70} />
            Drop the files here ...
          </p>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <CloudUpload size={70} />
              <p className="mb-1 text-lg font-bold text-foreground sm:text-lg">
                Drag and Drop files to Upload.
              </p>
              <p className="sm:text-md text-xs font-bold tracking-wide text-foreground">
                SVG, PNG, JPG or GIF
              </p>
              <Button variant="gooeyRight" className="mt-4">
                Select Files
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 px-12 xl:px-0 grid max-w-sm grid-cols-2 gap-4 text-center sm:max-w-6xl sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {files.map(({ file, uploading, id }) => (
          <div key={file.name} className="group relative w-full">
            <div className="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={200}
                height={200}
                className={cn(
                  uploading ? 'opacity-30' : '',
                  'size-32 rounded-lg border-2 border-muted-foreground bg-muted object-cover p-1',
                )}
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="size-8 animate-spin text-primary" />
                </div>
              )}
            </div>

            <form action={() => deleteFile(id!, file.name)}>
              <DeleteButton />
            </form>

            <p className="mt-2 truncate text-center text-sm font-bold text-foreground">
              {file.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
