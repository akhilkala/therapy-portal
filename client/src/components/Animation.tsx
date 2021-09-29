import React, { ReactElement } from "react";
import Lottie from "react-lottie";
import loading from "../assets/animations/loading.json";
import notFound from "../assets/animations/404.json";
import error from "../assets/animations/error.json";
import user from "../assets/animations/user.json";
import loading2 from "../assets/animations/loading2.json";
import cn from "classnames";

type IAnimation = "loading" | "not-found" | "error" | "user" | "loading2";

interface Props {
  width?: number;
  height?: number;
  className?: string;
  animation: IAnimation;
  loop?: boolean;
  fullScreen?: boolean;
}

const animations = {
  loading,
  "not-found": notFound,
  error,
  user,
  loading2,
};

export default function Animation({
  width = 300,
  height = 300,
  className = "",
  animation,
  loop = true,
  fullScreen = false,
}: Props): ReactElement {
  const getLottieOptions = () => ({
    loop,
    autoplay: true,
    animationData: animations[animation],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  return (
    <div
      className={cn("animation", `animation--${animation}`, className, {
        "screen-center": fullScreen,
      })}
    >
      <Lottie options={getLottieOptions()} height={height} width={width} />
    </div>
  );
}
