interface StatusBarProps {
  title: string;
  progressMax: number;
  progressNow: number;
}

export function StatusBar(props: StatusBarProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-xl font-bold text-white">{props.title}</h1>
      <div className="flex items-center">
        {Array.from({ length: props.progressMax }).map((_, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded-full border ${
              index < props.progressNow ? "bg-blue-900" : "bg-white"
            } ${index !== props.progressMax - 1 ? "mr-5" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
