import { MDXComponent } from "@/components/mdx-component";
import { PageProps } from "../layout";
import { getDoc } from "@/utils/get-doc";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = PageProps;

export default async function Page({ params: { lang } }: Props) {
  const { code } = await getDoc("about", lang);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MDXComponent code={code} lang={lang} />
      </Suspense>
    </div>
  );
}
