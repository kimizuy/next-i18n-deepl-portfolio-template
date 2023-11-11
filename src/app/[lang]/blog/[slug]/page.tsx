type Props = {
  params: { slug: string };
};

export default async function Page({ params: { slug } }: Props) {
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
