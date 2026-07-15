import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import pvcSheetsIndustrial from '../../../assets/pvc_sheets_industrial.png';

const BusinessPromo = () => {
  const navigate = useNavigate();

  const trustBadges = [
    {
      title: "Secure Payments",
      desc: "100% Protected",
      icon: "CreditCard"
    },
    {
      title: "Easy Returns",
      desc: "Hassle Free Returns",
      icon: "Rotate"
    },
    {
      title: "Fast Shipping",
      desc: "Quick & Safe Delivery",
      icon: "Shipping"
    },
    {
      title: "Dedicated Support",
      desc: "We're Here to Help",
      icon: "Support"
    }
  ];

  return (
    <Container>
      <div className="w-full py-40">
        {/* Main Promo Banner */}
        <div
          className="flex sm-flex-column items-center justify-between p-30 sm-p-20 gap-12 relative overflow-hidden rounded-5"
          style={{
            background: 'linear-gradient(135deg, #020712 0%, #081026 100%)'
          }}
        >
          {/* Left Text and CTA */}
          <div className="w-60">
            <div
              className="flex items-center gap-10 w-max p-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.14)"
              }}
            >
              <Icon name="Shield" width="14" height="14" stroke="var(--primary)" />
              <p className="mini-text text-white font-500 uppercase">
                India's No.1 PVC Manufacturer
              </p>
            </div>
            <h2 className="head-text text-primary font-700 uppercase pt-10">
              We've Got You Covered!
            </h2>
            <p className="small-text text-white font-400 mt-4" style={{ opacity: 0.80 }}>
              High quality PVC sheets, rolls, strip curtains and industrial films for temperature control, safety, protection and performance.
            </p>

            <Button
              text="Request Custom Quote"
              bg="primary"
              version="v2"
              className="font-500 cursor-pointer mt-20"
              icon="ArrowRight"
              iconPosition="right"
              onClick={() => navigate("/connect")}
            />
          </div>

          {/* Right Product Image & Badge */}
          <div className="relative flex items-center justify-center w-40">
            <Image
              src={pvcSheetsIndustrial}
              alt="Industrial PVC Rolls"
              className="w-full h-200 object-cover rounded-5"
            />
            {/* Circle badge */}
            <div
              className="absolute flex flex-column items-center justify-center text-center rounded-full"
              style={{
                width: "100px",
                height: "100px",
                right: "10%",
                top: "10%",
                background: "rgba(2, 7, 18, 0.78)",
                padding: "8px"
              }}
            >
              <p className="mini-text text-white font-300">Best</p>
              <p className="small-text text-primary font-700 uppercase">Quality</p>
              <p className="mini-text text-white font-300">Guaranteed</p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="grid-cols-4 sm-grid-cols-2 md-grid-cols-2 gap-12 mt-20">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-12 rounded-5 border-ec p-14">
              <div
                className="flex items-center justify-center rounded-5 bg-light-warning"
                style={{
                  width: "48px",
                  height: "48px",
                  minWidth: "48px"
                }}
              >
                <Icon name={badge.icon} width="24" height="24" stroke="var(--primary)" />
              </div>
              <div>
                <h4 className="headmini-text font-600 text-dark">{badge.title}</h4>
                <p className="mini-text text-gray font-400">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BusinessPromo;
