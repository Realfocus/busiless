import InstructorsSection from "../components/InstructorsSection";
import WelcomeSection from "../components/WelcomeSection";

const Home = () => {
  const name = sessionStorage.getItem("fullName")
  const profilepic = sessionStorage.getItem("image")
  return (
    <>
      <section className="w-full space-y-5">
        <WelcomeSection fullname={name} profilepic={profilepic} />
        <InstructorsSection />
      </section>

    </>
  );
};

export default Home;
