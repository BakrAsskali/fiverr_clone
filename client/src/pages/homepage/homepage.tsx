import { useEffect, useState } from "react";
import "../../assets/styles/App.css";
import { Footer } from "../../components/footer/Footer";

export interface HomepageProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-homepages-and-templates
 */
type Image = {
  id: number;
  url: string;
};

export const Homepage = ({}: HomepageProps) => {
  const [backendData, setBackendData] = useState([{}]);

  const [images] = useState<Image[]>([
    {
      id: 1,
      url: "https://colibriwp.com/blog/wp-content/uploads/2018/07/banner-redimensionat.jpg",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1493946947703-a0e68b050bee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ]);
  const [currentImage, setCurrentImage] = useState<Image>(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const nextIndex = (prevImage.id % images.length) + 1;
        return images.find((image) => image.id === nextIndex) || images[0];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className="video">
        <img className="img" src={currentImage.url} alt="" />
        <div className="overlay">
          <p>Find someone who will solve </p>
          <p>your problems with the least cost</p>
          <div className="search">
            <input type="text" placeholder="Search.." />
          </div>
          <ul className="cats">
            <li id="popular">popular</li>
            <li className="capsule">
              <a href="">Web design</a>
            </li>
            <li className="capsule">
              <a href="">Video editing</a>
            </li>
            <li className="capsule">
              <a href="">Voice acting</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="description">
        <table>
          <th>
            <h1>A whole world of freelance talent at your fingertips</h1>
          </th>
          <td>
            <h2>The best for every budget</h2>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </td>
          <td>
            <h2>Quality work done quickly</h2>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
          </td>
          <td>
            <h2>Protected payments, every time</h2>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
          </td>
          <td>
            <h2>24/7 support</h2>
            <p>
              Questions? Our round-the-clock support team is available to help
              anytime, anywhere.
            </p>
          </td>
        </table>
      </div>
      <div>
        <h2>Discover more categories</h2>
        <ul className="categories">
          <div className="category">
            <a href="">Web design</a>
          </div>
          <div className="category">
            <a href="">Video editing</a>
          </div>
          <div className="category">
            <a href="">Voice acting</a>
          </div>
          <div className="category">
            <a href="">Logo design</a>
          </div>
          <div className="category">
            <a href="">Mobile app development</a>
          </div>
          <div className="category">
            <a href="">3D modeling</a>
          </div>
          <div className="category">
            <a href="">Animation</a>
          </div>
          <div className="category">
            <a href="">Music & audio</a>
          </div>
          <div className="category">
            <a href="">Writing</a>
          </div>
          <div className="category">
            <a href="">Photography</a>
          </div>
        </ul>
      </div>
      <div className="Ad">
        <h2>Find the talent needed to get your business growing.</h2>
      </div>
      <Footer />
    </>
  );
};
