import { LocaleSwitcher } from "@/components/locale-switcher";

type Props = {
  params: { lang: string };
};

export default async function Page({ params: { lang } }: Props) {
  return (
    <div>
      <h1>Current locale: {lang}</h1>
      <div>
        <LocaleSwitcher />
      </div>
    </div>
  );
}
