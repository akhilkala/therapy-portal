import React, { ReactElement } from "react";
import Login from "../components/Login";
import kidsImg from "../assets/kids.jpg";
import visionImg from "../assets/therapies/vision.jpeg";
import speechImg from "../assets/therapies/speech.jpg";
import occupationalImg from "../assets/therapies/occupational.jpeg";
import artImg from "../assets/therapies/art.jpeg";
import counsellingImg from "../assets/therapies/counselling.jpeg";
import clinicalImg from "../assets/therapies/clinical.jpeg";
import specialImg from "../assets/therapies/special.jpg";
import vocationalImg from "../assets/therapies/vocational.jpeg";

import logo from "../assets/logo.jpg";

interface Props {}

export default function Landing({}: Props): ReactElement {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);

  const handleLoginClose = () => setLoginOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  return (
    <>
      <div className="landing">
        <div className="circle-container">
          <div
            style={{
              background: `url(${kidsImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="circle"
          ></div>
        </div>
        <div className="top">
          <div className="left">
            <img src={logo} alt="Logo" className="logo" />
            <nav className={navOpen ? `` : `closed`}>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>

              <button className="btn btn-login" onClick={handleLoginOpen}>
                Login <i className="fas fa-sign-in-alt"></i>
              </button>
            </nav>
          </div>
          <button className="btn btn-login" onClick={handleLoginOpen}>
            Login <i className="fas fa-sign-in-alt"></i>
          </button>
          <button className="hamburger" onClick={() => setNavOpen(!navOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="main-center">
          <main>
            <h1>Manonaya</h1>
            <h2>New Possibilites</h2>
            <p>
              We envisions a world in which children with special needs become
              an integral part of society, fully participate in social life and
              enjoy equal oppurtunities.
            </p>
            <div className="buttons">
              <a href="#services" className="btn">
                Our Services
              </a>
              <a href="#contact" className="btn">
                Contact
              </a>
            </div>
            <div className="socials">
              <a href="https://in.pinterest.com/manonaya2021/_created/">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="https://www.facebook.com/Manonaya-103609118741614/">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/manonaya2021">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/channel/UChhI12pRj3f6k6kYYCtdG4Q">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </main>
        </div>
        <a href="#about" className="bottom">
          <h4>Scroll down</h4>
          <div className="indicator"></div>
        </a>
        <Login open={loginOpen} handleClose={handleLoginClose} />
      </div>
      <div id="about" className="about">
        <h1>About us</h1>
        <p>
          Manonaya is a state-of-an-art multi-therapy center dedicated to
          empower children with special needs. It strongly asserts to focus on
          thier holistic development enabling them to be an asset to the
          inclusive Model of society. With identification, building, and
          supporting the abilities and skills of these children, generally
          considered as "differently-abled", the center works towards ensuring
          thier full participation and inclusion in society. Powered by a
          well-trained team of experienced mental health professionals and
          therapists, Manonaya is well-equiped to address any need concerning
          these children. <br /> <br />
          The centre anchors to facilitate and nurture the opportunities that
          would enable there children to gain psychological independence,
          participate in the activites and decision-making processes at home,
          school, workplace and the other larger cultural contexts in which they
          may operate. Manonaya is deeply rooted in and guided by the echos of
          eqality, dignity and autonomy for children with special needs as well
          as ther caregivers. It strives towards strenghtening the capacities of
          all stakeholders, thereby creating a world free from experiences of
          stigmatization and marginalization for them.
        </p>
      </div>
      <div className="services" id="services">
        <h1>Services</h1>
        <div className="cards">
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${visionImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Vision Therapy</h2>
              <p>
                VT is a progressive program of vision procedure to treat various
                conditions like lazy eye, squint, computer vision syndrome,
                developmental disorders etc. It is performed under a doctor's
                supervision and is individualized to fit and meet the visual
                needs of each patient, It is generally conducted in office with
                4-5 weekly sessions of 30 minutes to an hour, sometimes with
                homework.
              </p>
            </div>
          </div>
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${speechImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Speech Therapy</h2>
              <p>
                Speech therapy encompasses more than just speakng. It can help a
                special child to express themselves more effectively. It is a
                teaching process to correctly pronounce words, build
                conversations and develop languae. It helps to improve the
                ability to understand and express thoughts, ideas and feelings.
                A speech therapist provides screening, consulation, assessment,
                diagnosis, treatmen & counselling for special needs children.
              </p>
            </div>
          </div>
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${occupationalImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Occupational Therapy</h2>
              <p>
                Occupational therapy helps to improve cognative, physical and
                motor skils of the children to make them more independant and
                self sufficient. It can also help children who struggle with
                ASD, SPD, PDD, GDD, ADD, ADHD, SLD. Down's syndrome, hand
                writing difficulties. ADL difficulties by working throgh various
                therapies. OT also works on fine motor skills, visio motor
                skills, self care skills, etc. to improve the quality of life.
              </p>
            </div>
          </div>
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${artImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Play & Art Therapy</h2>
              <p>
                Children cannot express thier emotional and mental health issues
                in a proper way. Even we as adults find it difficult to express
                about how we feel. Play method is one of the effective forms of
                psychotherapy that uses play to help children deal with
                emotional issues. Through play a child is able to explore thier
                feelings as well as thier inner world. Art therapy is basically
                using the creative process of art making to improve and enhance
                the physical, mental and emotional well being of an individual
                of all ages.
              </p>
            </div>
          </div>
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${counsellingImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Counselling</h2>
              <p>
                Children with special needs have different behavioral issues.
                Sessions on behaviour modification techniques help them to
                modify thier behaviour. Simultaneously, parental counselling is
                mandatory so that they can make the children practice the same
                regularly to get the best result. Sessions on techniques of
                mindful meditation with counsellors would helo them to improve
                their capacity to control hyperactivity and increase thier
                ability to concentrate.
              </p>
            </div>
          </div>
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${clinicalImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Clinical Psychologist</h2>
              <p>
                A clinical psychologist's role is very important in special
                needs children. The foremost thing is assessment followed by
                guiding the child for his/her early intervention. Counselling of
                parents for understanding the child's condition is another
                important role. A clinical psycholoist overall empowers the
                parent and child for thier betterment.
              </p>
            </div>
          </div>
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${specialImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Special Education</h2>
              <p>
                Special education tutoring is one of the most valuble services
                that a parent can secure for a child who lives with a learning
                disability. Children with learning disabilities are often
                overwhelmed by the difficulties they face in a group-lerarning
                environment. Special education can pave the way to academic
                success whether your child is dealing with: <br />
                • Autism Spectrum Disorder (ASD) <br />
                • Dysgraphia <br />
                • Dyslexia <br />
                • Language Processing Trouble <br />
                • ADHD (Attention deficit hyperactive disorder) <br />
                • Any other learning-related challenge
                <br />
              </p>
            </div>
          </div>
          <div className="service">
            <div
              className="img"
              style={{
                background: `url(${vocationalImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main">
              <h2>Vocational Training</h2>
              <p>
                One of the main cause of worry for parents is financial security
                of their kids. At Manonaya we will be providing a platform
                wherein these children can learn skills such as costume jewelry
                making, computer skills, baking, etc which will help them to
                become financially independant at a later stage of life.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mission">
        <h1>Our Mission</h1>
        <p>
          Manonaya's mission is to offere children spaces to explore thie
          rpotentials and stregthen thier capacities through quality assured
          services and facilities. Drawing from a research-based comprehensive
          understanding of the needs and challenges faced by differently-abled
          children, we will strive towards designing and implementing
          interventional support that can be tailored to thier needs and
          developmental contexts.
        </p>
      </div>
      <div className="contact" id="contact">
        <h1>Contact</h1>
        <h4>Reach out to us !</h4>

        <div className="details">
          <div>
            <h3>Name</h3>
            <p>Someone Doe</p>
          </div>

          <div>
            <h3>Address</h3>
            <p>120, Estate street,</p>
            <p>Some place, California</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>abcdef@xyz.in</p>
          </div>
        </div>

        <div className="socials">
          <a href="https://in.pinterest.com/manonaya2021/_created/">
            <i className="fab fa-pinterest"></i>
          </a>
          <a href="https://www.facebook.com/Manonaya-103609118741614/">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/manonaya2021">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/channel/UChhI12pRj3f6k6kYYCtdG4Q">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </>
  );
}
