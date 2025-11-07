import { ProfileCard } from "../ProfileCard";
import femaleProfile1 from "@assets/generated_images/Female_profile_example_one_9f1894cf.png";

export default function ProfileCardExample() {
  return (
    <ProfileCard
      id="1"
      name="Sophia"
      age={28}
      location="New York, NY"
      imageUrl={femaleProfile1}
      bio="Art curator with a passion for contemporary design. Love exploring hidden galleries and rooftop bars."
      occupation="Art Curator at MoMA"
      education="Columbia University"
      interests={["Art", "Wine", "Travel", "Architecture"]}
      verified={true}
    />
  );
}
