import React, { useState } from 'react'
import Container from '../../components/common/Container'
import Fade from '../../components/common/Fade'

const ContactForm = () => {
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  }

  return (
    <Container className="bg-white">
      <div className="contact-grid-wrapper grid-cols-2 md-grid-cols-1 gap-12 py-60 w-full items-start">
        <div className="grid-cols-1 gap-12">
          <Fade
            direction="left"
            distance={30}
            delay={200}
            className="border-ec rounded-10 p-35 flex items-center gap-12 bg-white"
          >
            <span
              className="mid-text text-primary flex items-center justify-center bg-light-primary rounded-full"
              style={{ width: "50px", height: "50px", minWidth: "50px", fontSize: "24px" }}
            >
              📍
            </span>
            <div>
              <h3 className="mid-text text-dark font-600 mb-5">Corporate Headquarters</h3>
              <p className="small-text text-gray">800 Metatech Way, Building B, Industrial Valley, IV 50442</p>
            </div>
          </Fade>

          <Fade
            direction="left"
            distance={30}
            delay={350}
            className="border-ec rounded-10 p-35 flex items-center gap-12 bg-white"
          >
            <span
              className="mid-text text-primary flex items-center justify-center bg-light-primary rounded-full"
              style={{ width: "50px", height: "50px", minWidth: "50px", fontSize: "24px" }}
            >
              📞
            </span>
            <div>
              <h3 className="mid-text text-dark font-600 mb-5">Engineering Desk</h3>
              <p className="small-text text-gray">+1-555-0199 (Mon-Fri 8:00 AM - 5:00 PM CST)</p>
            </div>
          </Fade>

          <Fade
            direction="left"
            distance={30}
            delay={500}
            className="border-ec rounded-10 p-35 flex items-center gap-12 bg-white"
          >
            <span
              className="mid-text text-primary flex items-center justify-center bg-light-primary rounded-full"
              style={{ width: "50px", height: "50px", minWidth: "50px", fontSize: "24px" }}
            >
              ✉️
            </span>
            <div>
              <h3 className="mid-text text-dark font-600 mb-5">Commercial Inquiries</h3>
              <p className="small-text text-gray">commissioning@metatech.com</p>
            </div>
          </Fade>
        </div>

        <Fade
          direction="right"
          distance={30}
          delay={400}
          className="bg-white border-ec rounded-20 p-35"
        >
          {success ? (
            <div className="text-center py-40">
              <div className="text-primary font-700 mb-20" style={{ fontSize: "50px" }}>✓</div>
              <h3 className="title-text text-dark font-600 mb-10">Inquiry Dispatched</h3>
              <p className="para-text text-gray">
                Thank you. Your message has been sent to our corporate relations team. We will respond within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-column gap-20">
              <div className="flex flex-column gap-8">
                <label className="small-text text-dark font-500">Full Name</label>
                <input
                  type="text"
                  className="w-full h-input border-ec rounded-5 text-dark"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="flex flex-column gap-8">
                <label className="small-text text-dark font-500">Corporate Email</label>
                <input
                  type="email"
                  className="w-full h-input border-ec rounded-5 text-dark"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="flex flex-column gap-8">
                <label className="small-text text-dark font-500">Subject</label>
                <input
                  type="text"
                  className="w-full h-input border-ec rounded-5 text-dark"
                  required
                  placeholder="Commissioning, Custom CAD, Calibration support..."
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="flex flex-column gap-8">
                <label className="small-text text-dark font-500">Message Details</label>
                <textarea
                  className="w-full border-ec rounded-5 text-dark p-12"
                  rows="4"
                  style={{ outline: "none", fontFamily: "inherit" }}
                  required
                  placeholder="Write your commercial or integration query here..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="bg-primary text-white border-0 py-12 rounded-5 font-600 cursor-pointer w-full mt-10">
                Send Dispatch
              </button>
            </form>
          )}
        </Fade>
      </div>
    </Container>
  )
}

export default ContactForm;
