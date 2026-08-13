import Navbar from "../components/Navbar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="home">
        <section className="hero" id="home">
          <h1>Welcome to DevCollab</h1>

          <p>Collaborate. Build. Ship Together.</p>

          <p>
            A modern workspace for developers to collaborate, manage projects
            and build amazing software.
          </p>

          <button className="get-started-btn">Get Started</button>

          <button
            className="learn-more-btn"
            onClick={() =>
              document
                .getElementById("features")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore
          </button>
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="workflow">
          <HowItWorks />
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;
