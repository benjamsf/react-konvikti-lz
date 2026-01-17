import React from "react";
import { useAlertDialog } from "../components/AlertDialogService";

export interface StepProps {
  title?: React.ReactNode;
  imageSrc?: string;
  imageLink?: string;
  imageClasses?: string;
  description?: React.ReactNode | JSX.Element;
  note?: React.ReactNode;
}

export function Step({
  title,
  imageSrc,
  imageLink,
  imageClasses,
  description,
  note,
}: StepProps): JSX.Element {
  const { openDialog } = useAlertDialog();

  const handleImageClick = (src: string, link: string) => {
    if (link) {
      window.location.href = link;
    } else {
      openDialog({
        title: "Katso kuvaa suurempana",
        description: (
          <img src={src} alt="Enlarged Content" style={{ maxWidth: "100%" }} />
        ),
        confirmLabel: "Sulje",
        confirmColor: "primary",
        onConfirm: () => {
          // just close the modal
        },
      });
    }
  };

  const renderImage = (src = "", link = "", classes = "") =>
    src && (
      <img
        src={src}
        className={`mx-auto ${classes} cursor-pointer`}
        alt="Unfoldable card content"
        onClick={() => handleImageClick(src, link)}
      />
    );

  return (
    <>
      {title && (
        <h2 className="text-left text-xl font-bold pb-1 pt-6 mb-4">
          {title}
        </h2>
      )}

      {renderImage(imageSrc, imageLink, imageClasses)}

      {description && (
        <p className="m-2 prose prose-white">{description}</p>
      )}

      {note && (
        <div className="prose prose-white max-w-none text-red-400 mt-2">
          {note}
        </div>
      )}
    </>
  );
}
