import { MDXComponent } from "@/components/mdx-component";
import { PageProps } from "../layout";
import { getDoc } from "@/utils/get-doc";

type Props = PageProps;

export default async function Page({ params: { lang } }: Props) {
  const { code } = await getDoc("about");

  return (
    <div>
      <MDXComponent code={code} lang={lang} />
    </div>
  );
}
