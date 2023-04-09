import { useEffect, useState } from "react";
import "/home/bakaria19/Documents/Web/fiverr_clone/client/src/components/style/App.css";
import "/home/bakaria19/Documents/Web/fiverr_clone/client/src/components/style/NavbarElements.css";

type Image = {
  id: number;
  url: string;
};

interface PopupProps {
  onClose: () => void;
}

function PopupComponent(props: PopupProps) {
  const { onClose } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="login_popup">
      <div className="close_btn" onClick={onClose}></div>
      <h1>Sign in</h1>
      <div className="input_field">
        <input type="email" className="validate" placeholder="Email" />
      </div>
      <div className="input_field">
        <input type="password" className="validate" placeholder="Password" />
      </div>
      <button className="second_button">Sign in</button>
      <div className="signup_link">
        <a href="/signup">Don't have an account? Sign up</a>
      </div>
    </div>
  );
}

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/fiverr")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

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

  const [isActive, setIsActive] = useState(false);
  const togglePopup = () => {
    console.log("togglePopup called");
    setIsActive(!isActive);
  };

  console.log("isActive:", isActive);

  return (
    <>
      <nav>
        <a href="/">
          <h1>Logo</h1>
        </a>
        <br />
        <div className="nav-menu">
          <a href="/explore" style={{ fontWeight: "bold" }}>
            Explore
          </a>
          <button onClick={togglePopup}>Sign in</button>
        </div>
        <div className="nav-btn">
          <a
            className="nav-btn-link"
            href="/join"
            style={{ fontWeight: "bold" }}
          >
            Join
          </a>
        </div>
      </nav>
      {isActive && <PopupComponent onClose={togglePopup} />}
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
      <div className="container">
        <table className="legend">
          <thead>
            <tr>
              <th>Categories</th>
              <th colSpan={10}>Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="">Web design</a>
              </td>
              <td>
                <a href="">Help & Support</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="">Video editing</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">Voice acting</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">Logo design</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">Mobile app development</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">3D modeling</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">Animation</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">Music & audio</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">Writing</a>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="">Photography</a>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="footer">© cloned Fiverr Ltd. 2023</footer>
    </>
  );
}

export default App;