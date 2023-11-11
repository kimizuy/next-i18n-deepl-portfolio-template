type Props = {
  params: { lang: string };
};

export default async function Page({ params: { lang } }: Props) {
  return (
    <div>
      <p>Current locale: {lang}</p>
    </div>
  );
}
