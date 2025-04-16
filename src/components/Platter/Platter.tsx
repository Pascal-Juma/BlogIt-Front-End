import { FaLink } from "react-icons/fa";
import Button from '../Button/Button';
import './Platter.css'

type platterProps = {
    visual: string;
    appealing: string;
    calender: React.ReactNode;
    day: string;
    title: string;
    user: React.ReactNode;
    handle: string;
    author: string;
    excerpt: string;
}
function Platter({visual, appealing, calender, day, title, user, handle, author, excerpt}: platterProps) {
  return (
    <>
      <div className="platter-container">
        <div className="platter-image">
            <img src={visual} alt={appealing} />
            <div className="image-link">
            <FaLink />
            </div>
        </div>
        <div className="platter-details">
            <div className="platter-time">
            {calender}{day} 
            </div>
            <div className="platter-program">
                {title}
            </div>
            <div className="platter-venue">
                {user}{handle}
            </div>
            <div className="platter-lead">
                Author: <span className="expert-stylings">{author}</span>
            </div>
            <div className="platter-lesson">
                Excerpt: <span className="lesson-stylings">{excerpt}</span>
            </div>
            <div className="platter-cta">
                <Button btn="Read More" />
            </div>
        </div>
      </div>
    </>
  )
}

export default Platter
