import classNames from "classnames";

interface TextProps {
  title?: string;
  server?: string;
  styling?: string;
  styling2?: string;
  description?: React.ReactNode;
  description2?: string;
}

export function Text(props: TextProps) {
  const { title, server, description, description2, styling, styling2 } = props;

  const descriptionClass = classNames("prose text-white", {
    [styling || ""]: !!styling,
  });

  const description2Class = classNames("prose text-white", {
    [styling2 || ""]: !!styling2,
  });

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="prose text-lg text-white font-bold mb-0">{title}</h3>
      <p className="prose font-em text-white">{server}</p>
      <p className={descriptionClass}>{description}</p>
      <p className={description2Class}>{description2}</p>
    </div>
  );
}
