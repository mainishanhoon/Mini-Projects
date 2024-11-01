import { getImage } from '@/lib/actions';
import Image from 'next/image';

export default async function ViewImage() {
  const data = await getImage();
  console.log(data);

  return (
    <div className="flex h-screen flex-col bg-muted items-center justify-center space-y-5">
      <h1 className="bg-emerald-500 rounded-2xl py-2 px-5 text-4xl font-bold">Image</h1>
      <div className="rounded-lg border-2 border-dashed border-muted-foreground">
        <Image
          src={data}
          alt="image"
          width={1000}
          height={600}
          priority
          className="rounded-lg object-cover bg-muted-foreground"
        />
      </div>
    </div>
  );
}
