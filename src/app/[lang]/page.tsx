import { MDXComponent } from "@/components/mdx-component";
import { bundleDoc } from "@/utils/mdx-bundler";
import Image from "next/image";

type Props = {
  params: { lang: string };
};

export default async function Page({ params: { lang } }: Props) {
  const { code } = await bundleDoc("home");

  return (
    <div className="grid gap-8">
      <div className="relative h-0 overflow-hidden pt-[calc(1/2*100%)]">
        <Image
          alt="Profile Image"
          src="/profile.png"
          fill
          className="object-contain"
        />
      </div>
      <MDXComponent code={code} />
    </div>
  );
}
