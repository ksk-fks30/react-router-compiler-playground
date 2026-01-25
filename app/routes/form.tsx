import type { Route } from "./+types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useSubmit } from "react-router";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.email("有効なメールアドレスを入力してください。"),
    password: z.string().min(8, "パスワードは8文字以上で入力してください。"),
    passwordConfirmation: z.string().min(1, "確認用パスワードを入力してください。"),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirmation"],
        message: "パスワードが一致しません。",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;


type SubmissionValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

type ActionData =
  | { ok: true; values: SubmissionValues }
  | { ok: false; values: SubmissionValues; errors: Record<string, string[]> };

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const values: SubmissionValues = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    passwordConfirmation: String(formData.get("passwordConfirmation") ?? ""),
  };

  const result = formSchema.safeParse(values);

  if (!result.success) {
    return { ok: false, values, errors: result.error.flatten().fieldErrors } satisfies ActionData;
  }

  return { ok: true, values: result.data } satisfies ActionData;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Form Sample" },
    { name: "description", content: "React Hook Form + Zod example page." },
  ];
}

export default function FormSample() {
  const actionData = useActionData<typeof clientAction>();
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (_data: FormValues, event?: BaseSyntheticEvent) => {
    const target = event?.target;

    if (target instanceof HTMLFormElement) {
      submit(target, { method: "post" });
    }
  };

  const submitted = actionData?.values ?? null;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Sample Form</p>
        <h1 className="text-3xl font-semibold text-slate-900">React Hook Form + Zod</h1>
        <p className="text-base text-slate-600">
          パスワード一致チェックは superRefine で行います。
        </p>
      </header>

      <form
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        noValidate
      >
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          メールアドレス
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-base text-slate-900 outline-none ring-offset-2 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="you@example.com"
            type="email"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email?.message && (
            <span className="text-xs text-rose-600">{errors.email.message}</span>
          )}
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-700">
            パスワード
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-base text-slate-900 outline-none ring-offset-2 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password?.message && (
              <span className="text-xs text-rose-600">{errors.password.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-700">
            パスワード（確認）
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-base text-slate-900 outline-none ring-offset-2 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              type="password"
              autoComplete="new-password"
              {...register("passwordConfirmation")}
              aria-invalid={Boolean(errors.passwordConfirmation)}
            />
            {errors.passwordConfirmation?.message && (
              <span className="text-xs text-rose-600">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
        >
          送信する
        </button>
      </form>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold text-slate-700">送信データ</h2>
        <p className="mt-2 text-sm text-slate-500">
          clientAction で受け取ったデータを表示します。
        </p>
        <pre className="mt-4 overflow-auto rounded-lg bg-white p-4 text-xs text-slate-700">
          {submitted ? JSON.stringify(submitted, null, 2) : "まだ送信されていません。"}
        </pre>
        {actionData?.ok === false && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            <p className="font-semibold">送信エラー</p>
            <pre className="mt-2 whitespace-pre-wrap">
              {JSON.stringify(actionData.errors, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}
