'use client'
import LoginFormComponent from "app/components/LoginFormComponent";
import { Image } from "@heroui/react";

export default function Login() {
  return (
    <>
      <div className="flex justify-center mt-20 mb-10">
        <Image
          className="place-content-center"
          isZoomed
          alt="HeroUI Fruit Image with Zoom"
          src="/img/oreo_logo.jpeg"
          width={100}
        />
      </div>
      <LoginFormComponent></LoginFormComponent>
      <div className="text-center p-12">
        <span className="text-xs">Not yet registered? </span>
        <span className="underline text-sm">Signup here</span>
      </div>
    </>
  );
} 