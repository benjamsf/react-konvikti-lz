export function BackgroundCard({
  title,
  image,
  details,
  children,
}: {
  title?: React.ReactNode;
  image?: string;
  details?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-backgroundLight rounded-lg w-full max-w-full mb-5 overflow-hidden prose prose-white">
      <h3 className="text-xl font-bold mt-1 mb-1">{title}</h3>
      {image && <img src={image} className="w-36 h-36 object-contain mt-2" />}
      {details && <p className="text-center mb-0 ml-2 mr-2 ">{details}</p>}
      <div className="w-full">{children}</div>
    </div>
  );
}
