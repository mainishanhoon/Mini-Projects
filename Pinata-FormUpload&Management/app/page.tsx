import Dropzone from '@/components/Dropzone';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center">
      <Image src="/Logo.png" width={150} height={100} alt='Logo' />
      <h1 className="text-6xl font-bold px-14">
        <span className="text-primary">Pinata</span> - File Upload & Management
      </h1>
      <Dropzone />
    </main>
  );
}
