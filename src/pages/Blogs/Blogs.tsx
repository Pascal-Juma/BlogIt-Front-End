import { FaUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import NavBar from "../../components/NavBar/NavBar";
import Platter from "../../components/Platter/Platter";
import workflow from "../../assets/workflow.jpg";
import health from "../../assets/health.jpg";
import tokyo from "../../assets/tokyo.jpg";
import dev from "../../assets/dev.jpg";
import wellness from "../../assets/wellness.jpg";
import gaming from "../../assets/gaming.jpg";
import "./Blogs.css";



function Blogs() {
  return (
    <>
    <NavBar />
    <div className="account-manage">
    <h2 className="account-welcome">
            Welcome to Blogit where Stories are crafted
        </h2>
        <div className="account-icon">
        <a href="/myprofile" ><FaUserCircle  /><p className="manage-profile">My Profile</p></a>
        </div>
    </div>
      <section className="schedule-section">
        <Platter
          visual={workflow}
          appealing="worflow"
          calender={<SlCalender />}
          day="January 2nd, 2023"
          title=" Productivity & Tech Tools"
          user={<FaUserCircle />}
          handle="@jamie.kihara"
          author="Jamie Kihara"
          excerpt="Top 5 Browser Extensions That Transformed My Daily Workflow and Boosted My Focus, Speed, and Efficiency Instantly"
        />

        <Platter
          visual={health}
          appealing="health"
          calender={<SlCalender />}
          day="August 13th, 2024"
          title="Mental Health & Self-Care"
          user={<FaUserCircle />}
          handle="cnth.wambo"
          author="Cynthia Wambui"
          excerpt="Burnout is Real: Here's How I Got My Creativity, Joy, Confidence, and Mental Energy Back Again"
        />

        <Platter
          visual={tokyo}
          appealing="tokyo"
          calender={<SlCalender />}
          day="May 31st, 2019"
          title="Travel & Lifestyle"
          user={<FaUserCircle />}
          handle="brayo.otieno"
          author="Brian Otieno"
          excerpt="From Nairobi to Tokyo: Embracing Minimalism Changed My Life, Mindset, Budget, and Personal Space for Good"
        />

        <Platter
          visual={dev}
          appealing="dev"
          calender={<SlCalender />}
          day="July 13th, 2012"
          title="Career & Developer Life"
          user={<FaUserCircle />}
          handle="zawdi@mburu.zawa"
          author="Zawadi Mburu"
          excerpt="My First Developer Job Was Nothing Like I Imagined—Here’s What Shocked, Humbled, and Taught Me Most"
        />

        <Platter
          visual={wellness}
          appealing="wellness"
          calender={<SlCalender />}
          day="March 31st, 2025"
          title="Wellness & Habits"
          user={<FaUserCircle />}
          handle="paulo@amani.peace"
          author="Paul Amani"
          excerpt="Morning Routines That Actually Work Well for Night Owls Who Love Sleep, Late Hours, and Lazy Starts

"
        />

        <Platter
          visual={gaming}
          appealing="gaming"
          calender={<SlCalender />}
          day="December 23th, 2021"
          title="Tech & Design Trends"
          user={<FaUserCircle />}
          handle="tash.kim"
          author="Tasha Kimathi"
          excerpt="How Retro Games Still Influence Today’s Modern UI Design, Color Choices, Navigation Patterns, and Digital Aesthetics Worldwide"
        />
      </section>
    </>
  );
}

export default Blogs;
