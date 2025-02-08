import InteractiveHomeClient from "./InteractiveHomeClient";
import { achievements, categories } from "../data/achievements";

export default function InteractiveHome() {
  return (
    <InteractiveHomeClient
      achievements={achievements}
      categories={categories}
    />
  );
}
