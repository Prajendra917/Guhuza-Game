import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Invite = () => {
  const [inviteLink] = useState("http://localhost:3000/quiz");
  const [email, setEmail] = useState("");

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=Join%20me%20on%20Job%20Quest!%20${inviteLink}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${inviteLink}`, "_blank");
  };

  return (
    <Dropdown className="invite-dropdown">
      <Dropdown.Toggle className="invite-btn" id="invite-dropdown">
        <i className="bi bi-people-fill"></i> Invite Friends
      </Dropdown.Toggle>

      <Dropdown.Menu className="invite-dropdown-menu">
        <Dropdown.Item onClick={copyInviteLink}>
          <i className="bi bi-link"></i> Copy Invite Link
        </Dropdown.Item>
        <Dropdown.Item onClick={shareOnWhatsApp}>
          <i className="bi bi-whatsapp"></i> Share on WhatsApp
        </Dropdown.Item>
        <Dropdown.Item onClick={shareOnFacebook}>
          <i className="bi bi-facebook"></i> Share on Facebook
        </Dropdown.Item>
        <Dropdown.Divider />
        {/* <Dropdown.Item>
          <input
            type="email"
            className="form-control my-2"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-outline-dark w-100" onClick={sendEmailInvite}>
            <i className="bi bi-envelope"></i> Send Email Invite
          </button>
        </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Invite;
