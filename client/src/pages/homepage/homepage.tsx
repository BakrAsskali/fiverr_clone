import { Button, Text } from "@chakra-ui/react";
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

export const Homepage = ({ }: HomepageProps) => {
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

  const search = (e: any) => {
    e.preventDefault();
    window.location.href = "/Gigs";
  };

  return (
    <>
      <div className="video" style={{
        width: "100%",
      }}>
        <img className="img" src={currentImage.url} alt="" />
        <div className="overlay">
          <p>Find someone who will solve </p>
          <p>your problems with the least cost</p>
          <div className="search">
            <input type="text" placeholder="Search for any service" style={{
              color: "black",
            }} onSubmit={search} />
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
      <div className="description" style={{
        width: "80%",
        padding: "50px",
        margin: "auto",
        borderSpacing: "50px",
      }}>
        <div>
          <Text noOfLines={2} fontSize='5xl'>A whole world of freelance talent at your fingertips</Text>
          <br />
          <td style={{
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
          }}>
            <h2><b>The best for every budget</b></h2>
            <br />
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </td>
          <td style={{
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
          }}>
            <h2><b>Quality work done quickly</b></h2>
            <br />
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
          </td>
          <td style={{
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
          }}>
            <h2><b>Protected payments, every time</b></h2>
            <br />
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
          </td>
          <td style={{
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
          }}>
            <h2><b>24/7 support</b></h2>
            <br />
            <p>
              Questions? Our round-the-clock support team is available to help
              anytime, anywhere.
            </p>
          </td>
        </div>
      </div >
      <div>
        <Text fontSize="4xl" style={{
          textAlign: "center",
        }}>Discover more categories</Text>
        <ul className="categories">
          <div className="category">
            <a href="">
              <Button>Web Development</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>Video editing</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>Voice acting</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>Mobile app development</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>3D modeling</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>Graphic design</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>Writing</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>Photography</Button>
            </a>
          </div>
          <div className="category">
            <a href="">
              <Button>Writing</Button>
            </a>
          </div>
        </ul>
      </div>
      <br />
      <div className="Ad">
        <Text fontSize="3xl" style={{
          textAlign: "center",
        }}>Find the talent needed to get your business growing.</Text>
      </div>
      <Footer />
    </>
  );
};
