'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';
import { SalesSchema } from '@/lib/zod';

export async function talkToSalesAction(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: SalesSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const response = await fetch(process.env.TALK_TO_SALES_URL!, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Something went Wrong');
  }

  return redirect('/success');
}

export async function supportingTicketAction(
  prevState: any,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: SalesSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const response = await fetch(process.env.SUPPORT_TICKET_URL!, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Something went Wrong');
  }

  return redirect('/success');
}
