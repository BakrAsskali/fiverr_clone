import { Link } from "react-router-dom";
import "../../assets/styles/ProjectCard.css";

type Project = {
  img: string;
  pp: string;
  cat: string;
  username: string;
};

type ProjectCardProps = {
  item: Project;
};

const ProjectCard = ({ item }: ProjectCardProps): JSX.Element => {
  return (
    <Link to="/">
      <div>
        <img src={item.img} alt="" />
        <div className="info">
          <img src={item.pp} alt="" />
          <div className="texts">
            <h2>{item.cat}</h2>
            <span>{item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
