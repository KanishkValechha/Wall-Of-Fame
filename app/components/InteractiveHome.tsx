import InteractiveHomeClient from "./InteractiveHomeClient";
import { achievements, categories } from "../data/achievements";

interface InteractiveHomeProps {
  isReturning?: boolean;
}

export default function InteractiveHome({
  isReturning = false,
}: InteractiveHomeProps) {
  return (
    <InteractiveHomeClient
      achievements={achievements}
      categories={categories}
      isReturning={isReturning}
    />
  );
}
