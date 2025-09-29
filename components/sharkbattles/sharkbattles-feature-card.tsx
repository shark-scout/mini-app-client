export function SharkBattlesFeatureCard(props: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-row gap-2 bg-card border rounded-2xl p-4">
      <p className="text-4xl">{props.emoji}</p>
      <div className="flex flex-col gap-1">
        <p className="text-card-foreground font-bold">{props.title}</p>
        <p className="text-muted-foreground">{props.description}</p>
      </div>
    </div>
  );
}
