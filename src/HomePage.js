import React, { useRef, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";
import "./App2.css";
import video from "./CarServiceVideo.mp4";
import HomeNavbar from "./HomeNavbar";

function HomePage() {
  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const collaboratorSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f4f8", // Light professional background color
        display: "flex",
        flexDirection: "column",
      }}
      id="body"
      className={isFullscreen ? "fullscreen" : ""}
    >
      <HomeNavbar />
      <div ref={welcomeRef} id="welcome" className="slider-container">
        <Slider {...sliderSettings}>
        <div className="slider-slide">
            <img
              src="https://www.prathammotors.com/pm/images/service-banner-2.jpg"
              alt="Expert Car Repairs"
              className="slider-image"
            />
            <p className="slider-caption">Expert Car Repairs</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://newspaperads.ads2publish.com/wp-content/uploads/2017/08/audi-a6-and-q7-cars-design-edition-ad-bangalore-times-18-08-2017.jpg"
              alt="Audi : Design Edition"
              className="slider-image"
            />
            <p className="slider-caption">Audi : Design Edition</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://hanshyundai.com/blog/wp-content/uploads/2022/08/Hyundai-August-Offers-At-Hans-hyundai-Showroom.jpg"
              alt="Go Hyundai"
              className="slider-image"
            />
            <p className="slider-caption">Go Hyundai</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://newspaperads.ads2publish.com/wp-content/uploads/2017/07/vovlo-cars-ad-delhi-times-13-07-2017.jpg"
              alt="Choose Volvo"
              className="slider-image"
            />
            <p className="slider-caption">Choose Volvo</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://www.drivespark.com/img/2024/08/monsoon-service-campaigns-launch-1723525052908-1200x675.jpg"
              alt="Jeep : Monsoon Offers"
              className="slider-image"
            />
            <p className="slider-caption">Jeep : Monsoon Offers</p>
          </div>
        </Slider>
      </div>
      {/* Video Player Section */}
      <Container className="mt-5" id="video-player">
        <center>
          <h2 className="home-title">Experience Our Car Service!!</h2>
        </center>
        <div className="video-player-container">
          <video
            ref={videoRef}
            id="video"
            controls
            className="video-player"
            src={video}
            autoPlay
            loop
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
      <Container className="mt-5" id="aboutus">
        <center>
          <h2 className="home-title">Our Partners</h2>
        </center>
        <br />
        <div ref={aboutRef}>
          <Slider {...collaboratorSliderSettings}>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZ0ILN73Lm6h0wNFwPeLG_FYyn7jmvhnQNOSw1Jx-8OA9hJgxpSw9M7BVS4Oq3Q5VHAT0XG21QV-9TIdt933egA3XyaY2_XzxIX7krZnT3unFT4_ZUpWZ04VgQ9zvoZiMEpaLnbPFWpwU/s1600/bosch-automative.jpg"
                  alt="Auto Parts Supplier"
                />
                <Card.Body>
                  <Card.Title>Auto Parts Supplier</Card.Title>
                  <Card.Text>
                    Reliable parts for all your car maintenance needs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://windshield-expert.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/06/14073931/Acko-Car-Insurance-Claims-in-Mumbai.png"
                  alt="Car Insurance"
                />
                <Card.Body>
                  <Card.Title>Car Insurance</Card.Title>
                  <Card.Text>
                    Comprehensive insurance options for your vehicle.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://thumbs.dreamstime.com/b/illustration-vector-graphic-auto-detailing-servis-logo-design-template-illustration-vector-graphic-auto-detailing-servis-206917327.jpg"
                  alt="Auto Detailing"
                />
                <Card.Body>
                  <Card.Title>Auto Detailing</Card.Title>
                  <Card.Text>
                    Professional detailing services for a pristine finish.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgCxvtT-uR6zQzKAEsT-Fu2vLKgYkZXNkfjCnL8K-xACrG5fOQEEHoQLiKZzxknNmwi_Y&usqp=CAU"
                  alt="Tire Service"
                />
                <Card.Body>
                  <Card.Title>Tire Service</Card.Title>
                  <Card.Text>
                    Quality tire services for safety and performance.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://image.pitchbook.com/W2QBCMPiDJvOkIv4OdF2dEanEDG1671712047911_200x200"
                  alt="Oil Change"
                />
                <Card.Body>
                  <Card.Title>Oil Change</Card.Title>
                  <Card.Text>
                    Essential oil change services to keep your engine running
                    smoothly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Slider>
        </div>
      </Container>
      <Container className="mt-5" id="contact">
        <div className="contact-section" ref={contactRef}>
          <div className="contact-image">
            <img
              src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg"
              alt="Contact Us"
              className="contact-image"
            />
          </div>
          <div className="contact-form">
            <h2 className="home-title">Contact Us</h2>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formFeedback">
                <Form.Label className="form-label">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message or inquiry"
                  className="form-control"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="form-button">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
