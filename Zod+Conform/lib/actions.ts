'use server';

import { redirect } from 'next/navigation';
import { LoginSchema } from './zod';
import { parseWithZod } from '@conform-to/zod';

export async function CreateUser(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: LoginSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  return redirect('/success');
}
