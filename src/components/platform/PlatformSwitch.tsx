import * as Switch from "@radix-ui/react-switch";
import usePlatform from "./usePlatform";

export function PlatformSwitch() {
  const { platform, setPlatform } = usePlatform();

  return (
    <div>
      <label>
        Android
        <Switch.Root
          checked={platform === "iOS"}
          onCheckedChange={() =>
            setPlatform((prev) => (prev === "iOS" ? "Android" : "iOS"))
          }
          style={{
            display: "inline-block",
            width: "65px",
            height: "30px",
            background: platform === "iOS" ? "green" : "gray",
            position: "relative",
            borderRadius: "25px",
            margin: "0 10px",
          }}
        >
          <Switch.Thumb
            style={{
              width: "30px",
              height: "30px",
              background: "white",
              borderRadius: "25px",
              position: "absolute",
              top: "0",
              transform:
                platform === "iOS" ? "translateX(-32px)" : "translateX(0)",
              transition: "transform 0.3s",
            }}
          />
        </Switch.Root>
        iOS
      </label>
    </div>
  );
}
