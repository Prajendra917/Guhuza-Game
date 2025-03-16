import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="footer-row align-items-center">
          {/* Left Column: Navigation Links */}
          <Col md={4} className="footer-left">
            <div className="footer-nav">
              <a
                href="https://guhuza.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                Terms of Service
              </a>
              <span>|</span>
              <a
                href="https://guhuza.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                Privacy Policy
              </a>
              <span>|</span>
              <a
                href="https://guhuza.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                Contact Us
              </a>
            </div>
          </Col>

          {/* Center Column: Copyright */}
          <Col md={4} className="footer-center text-center">
            <p className="mb-0">© 2024 Guhuza. All Rights Reserved.</p>
          </Col>

          {/* Right Column: Social Media Icons */}
          <Col md={4} className="footer-right text-end">
            <div className="social-links">
              {[
                {
                  href: "https://www.facebook.com/Guhuza/",
                  img: "https://www.freeiconspng.com/uploads/facebook-logo-facebook-logo-9.png",
                  alt: "Facebook",
                },
                {
                  href: "https://x.com/torecruiters/status/1485730169029468163",
                  img: "https://static.vecteezy.com/system/resources/previews/027/395/710/non_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png",
                  alt: "Twitter",
                },
                {
                  href: "https://ca.linkedin.com/company/guhuza",
                  img: "https://logospng.org/download/linkedin/logo-linkedin-4096.png",
                  alt: "LinkedIn",
                },
                {
                  href: "https://www.instagram.com/guhuza_/",
                  img: "https://static.vecteezy.com/system/resources/previews/018/930/413/non_2x/instagram-logo-instagram-icon-transparent-free-png.png",
                  alt: "Instagram",
                },
                {
                  href: "https://www.tiktok.com/@guhuza",
                  img: "https://pngimg.com/uploads/tiktok/tiktok_PNG12.png",
                  alt: "TikTok",
                },
                {
                  href: "https://www.youtube.com/@Guhuza",
                  img: "https://www.freeiconspng.com/uploads/hd-youtube-logo-png-transparent-background-20.png",
                  alt: "YouTube",
                },
              ].map(({ href, img, alt }) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2"
                >
                  <img
                    src={img}
                    alt={alt}
                    className="social-icon"
                    aria-label={`Follow us on ${alt}`}
                  />
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
