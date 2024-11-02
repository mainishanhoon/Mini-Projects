'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline">
          <Loader className="mr-2 size-6 animate-spin [animation-duration:3s]" />
          Submitting...
        </Button>
      ) : (
        <Button
          size="sm"
          variant="gooeyLeft"
          type="submit"
          className="px-5 text-lg"
        >
          Submit
        </Button>
      )}
    </>
  );
}
