'use client';

import UploadFile from '@/components/UploadFile';
import { SubmitButton } from '@/components/SubmitButton';
import ThemeToggle from '@/components/ThemeToggle';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { talkToSalesAction, supportingTicketAction } from '@/lib/actions';
import { SalesSchema, SupportSchema } from '@/lib/zod';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { BadgeHelp } from 'lucide-react';
import Form from 'next/form';
import { useActionState } from 'react';

export default function Home() {
  const [salesResult, salesAction] = useActionState(talkToSalesAction, null);
  const [supportResult, supportAction] = useActionState(
    supportingTicketAction,
    null,
  );

  const [salesForm, salesField] = useForm({
    lastResult: salesResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: SalesSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const [supportForm, supportField] = useForm({
    lastResult: supportResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: SupportSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <Tabs defaultValue="sales">
          <CardHeader className="space-y-5">
            <div className="flex justify-between">
              <div className="flex items-center justify-center space-x-2 font-bold">
                <BadgeHelp size={35} strokeWidth={3} />
                <h1 className="text-3xl">Contact Us</h1>
              </div>
              <ThemeToggle />
            </div>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="sales">Talk to Sales</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="sales" className="space-y-5">
              <p className="font-bold">
                You want to integrate your product with us? We can help you.
                Please contact us down below.
              </p>
              <Form
                action={salesAction}
                id={salesForm.id}
                onSubmit={salesForm.onSubmit}
                noValidate
                className="flex flex-col space-y-5"
              >
                <input type="hidden" name="_gotcha" />

                <div className="grid space-y-1">
                  <Label>Name</Label>
                  <Input
                    key={salesField.name.key}
                    name={salesField.name.name}
                    defaultValue={salesField.name.initialValue}
                    placeholder="Lorem Ipsum"
                  />
                  <p className="text-sm text-destructive">
                    {salesField.name.errors}
                  </p>
                </div>

                <div className="grid space-y-1">
                  <Label>Email</Label>
                  <Input
                    key={salesField.email.key}
                    name={salesField.email.name}
                    defaultValue={salesField.email.initialValue}
                    placeholder="loremipsum@email.com"
                  />
                  <p className="text-sm text-destructive">
                    {salesField.email.errors}
                  </p>
                </div>

                <div className="grid space-y-2">
                  <Label>Question or Problem</Label>
                  <Textarea
                    key={salesField.message.key}
                    name={salesField.message.name}
                    defaultValue={salesField.message.initialValue}
                    className="h-32"
                    placeholder="Please share some details about your needs..."
                  />
                  <p className="text-sm text-destructive">
                    {salesField.message.errors}
                  </p>
                </div>
                <SubmitButton />
              </Form>
            </TabsContent>

            <TabsContent value="support" className="space-y-5">
              <p className="font-bold">
                Troubleshoot a technical issue or payment problem.
              </p>
              <Form
                action={supportAction}
                id={supportForm.id}
                onSubmit={supportForm.onSubmit}
                noValidate
                className="flex flex-col space-y-5"
              >
                <input type="hidden" name="_gotcha" />

                <div className="grid space-y-1">
                  <Label>Name</Label>
                  <Input
                    key={supportField.name.key}
                    name={supportField.name.name}
                    defaultValue={supportField.name.initialValue}
                    placeholder="Lorem Ipsum"
                  />
                  <p className="text-sm text-destructive">
                    {supportField.name.errors}
                  </p>
                </div>

                <div className="grid space-y-1">
                  <Label>Email</Label>
                  <Input
                    key={supportField.email.key}
                    name={supportField.email.name}
                    defaultValue={supportField.email.initialValue}
                    placeholder="loremipsum@email.com"
                  />
                  <p className="text-sm text-destructive">
                    {supportField.email.errors}
                  </p>
                </div>

                <div className="grid space-y-2">
                  <Label>Question or Problem</Label>
                  <Textarea
                    key={supportField.message.key}
                    name={supportField.message.name}
                    defaultValue={supportField.message.initialValue}
                    placeholder="What is WRONG??"
                  />
                  <p className="text-sm text-destructive">
                    {supportField.message.errors}
                  </p>
                </div>

                <div className="grid space-y-1">
                  <Label>Assets</Label>
                  <Input
                    type="file"
                    key={supportField.image.key}
                    name={supportField.image.name}
                  />
                </div>
                <SubmitButton />
              </Form>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
