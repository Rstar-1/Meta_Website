import { useEffect, useRef } from 'react';
import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const Brands = () => {
    // Sample logo data based on your image
    const row1Logos = ['Stoli', 'British Red Cross', 'B&O PLAY', 'Hanwag', 'Stoli', 'British Red Cross', 'B&O PLAY', 'Hanwag'];
    const row2Logos = ['Hanwag', 'Stoli', 'British Red Cross', 'B&O PLAY', 'Hanwag', 'Stoli', 'British Red Cross', 'B&O PLAY'];

    const containerRef = useRef(null);
    const track1Ref = useRef(null);
    const track2Ref = useRef(null);

    useEffect(() => {
        // Load the premium font
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if the marquee container is visible within the viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Calculate scroll progress (0 when top enters viewport, 1 when bottom leaves viewport)
                const totalHeight = rect.height + viewportHeight;
                const currentScroll = viewportHeight - rect.top;
                const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);

                // Horizontal shift distance (in pixels) for the marquee parallax
                const maxShift = 800;
                const shift1 = (0.5 - progress) * maxShift;
                const shift2 = (progress - 0.5) * maxShift;

                if (track1Ref.current) {
                    track1Ref.current.style.transform = `translateX(${shift1}px)`;
                }
                if (track2Ref.current) {
                    track2Ref.current.style.transform = `translateX(${shift2}px)`;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial run on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (document.head.contains(link)) {
                document.head.removeChild(link);
            }
        };
    }, []);

    return (
        <div>

            {/* Section Header */}
            <Container version="v1">
                <Fade version="v2" direction="up" distance={30}>
                    <div className="text-center mb-50">
                        <div style={{ fontSize: "12px", color: "#FF5A36", letterSpacing: "2px", gap: "10px" }} className="flex items-center justify-center font-700 uppercase">
                            <span className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: "#FF5A36" }}></span>
                            Our Partners
                        </div>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "calc(1.8rem + 1.5vw)", color: "#0C0C0F", marginTop: "10px", letterSpacing: "-1px" }} className="font-800">
                            Trusted by Brands Worldwide
                        </h2>
                    </div>
                </Fade>
            </Container>

            {/* Marquee Section */}
            <div ref={containerRef} className="marquee-container">
                {/* Injecting CSS directly via React style tag */}
                <style>{`

                    .marquee-container {
                      display: flex;
                      flex-direction: column;
                      gap: 24px;
                      padding: 40px 0;
                      background-color: #f8f6f4;
                      overflow: hidden;
                      width: 100%;
                      border-top: 1px solid rgba(12, 12, 15, 0.05);
                      border-bottom: 1px solid rgba(12, 12, 15, 0.05);
                    }

                    .marquee-row {
                      display: flex;
                      justify-content: center;
                      width: 100%;
                      overflow: hidden;
                    }

                    .marquee-track-left,
                    .marquee-track-right {
                      display: flex;
                      gap: 24px;
                      width: max-content;
                      will-change: transform;
                      transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                    }

                    .logo-card {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      width: 280px;
                      height: 120px;
                      background: #ffffff;
                      border-radius: 24px;
                      box-shadow: 0 4px 20px rgba(12, 12, 15, 0.02);
                      font-weight: 800;
                      color: #0c0c0f;
                      font-size: 1.3rem;
                      letter-spacing: -0.5px;
                      border: 1px solid rgba(12, 12, 15, 0.04);
                      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                      user-select: none;
                    }

                    .logo-card:hover {
                      transform: translateY(-6px) scale(1.03);
                      box-shadow: 0 12px 30px rgba(255, 90, 54, 0.08);
                      border-color: rgba(255, 90, 54, 0.2);
                      color: #FF5A36;
                    }

                    @media (max-width: 768px) {
                      .marquee-container {
                        gap: 16px;
                        padding: 30px 0;
                      }
                      .logo-card {
                        width: 200px;
                        height: 90px;
                        border-radius: 16px;
                        font-size: 1.05rem;
                      }
                    }
                `}</style>

                {/* Row 1: Sliding Left */}
                <div className="marquee-row">
                    <div className="marquee-track-left" ref={track1Ref}>
                        {row1Logos.map((logo, index) => (
                            <div key={`r1-${index}`} className="logo-card">{logo}</div>
                        ))}
                        {row1Logos.map((logo, index) => (
                            <div key={`r1-dup-${index}`} className="logo-card">{logo}</div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Sliding Right */}
                <div className="marquee-row">
                    <div className="marquee-track-right" ref={track2Ref}>
                        {row2Logos.map((logo, index) => (
                            <div key={`r2-${index}`} className="logo-card">{logo}</div>
                        ))}
                        {row2Logos.map((logo, index) => (
                            <div key={`r2-dup-${index}`} className="logo-card">{logo}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;