import InteractiveHomeClient from "./InteractiveHomeClient";
import { categories } from "../data/achievements";

interface InteractiveHomeProps {
  isReturning?: boolean;
}

export default function InteractiveHome({
  isReturning = false,
}: InteractiveHomeProps) {
  return (
    <InteractiveHomeClient
      categories={categories}
      isReturning={isReturning}
    />
  );
}
