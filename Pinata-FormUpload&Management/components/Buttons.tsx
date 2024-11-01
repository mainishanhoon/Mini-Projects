import { LoaderCircle, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="absolute inset-y-24 h-8 w-32 inset-x-0 opacity-0 transition-opacity group-hover:opacity-100"
      variant="destructive"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <>
          <Trash2 strokeWidth={3} className="size-4 mr-1" />
          <p className='font-bold tracking-wide'>Delete</p>
        </>
      )}
    </Button>
  );
}
