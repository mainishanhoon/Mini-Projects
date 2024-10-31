'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateUser } from '../lib/actions';
import Form from 'next/form';
import { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { LoginSchema } from '@/lib/zod';
import { parseWithZod } from '@conform-to/zod';

export default function Home() {
  const [lastResult, formAction] = useActionState(CreateUser, null);

  const [form, field] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            className="grid gap-4"
            id={form.id}
            onSubmit={form.onSubmit}
            action={formAction}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  key={field.firstName.key}
                  name={field.firstName.name}
                  defaultValue={field.firstName.initialValue}
                  placeholder="Lorem"
                />
                <p className="text-sm text-destructive">
                  {field.firstName.errors}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  key={field.lastName.key}
                  name={field.lastName.name}
                  defaultValue={field.lastName.initialValue}
                  placeholder="Ipsum"
                />
                <p className="text-sm text-destructive">
                  {field.lastName.errors}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                key={field.email.key}
                name={field.email.name}
                defaultValue={field.email.initialValue}
                placeholder="loremipsum@email.com"
              />
              <p className="text-sm text-destructive">{field.email.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                key={field.password.key}
                name={field.password.name}
                defaultValue={field.password.initialValue}
              />
              <p className="text-sm text-destructive">
                {field.password.errors}
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              type="submit"
              className="w-full font-bold tracking-wider"
            >
              Create Account
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
