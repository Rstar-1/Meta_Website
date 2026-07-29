import { useState } from "react";
import Container from "../../../components/common/Container";
import Button from "../../../components/common/Button";
import Icon from "../../../components/common/Icon";
import cmsData from "../../../data/cms.json";

const Details = ({ addToRef }) => {
    const [loadMap, setLoadMap] = useState(false);
    const phoneEnv = import.meta.env.VITE_PHONE || '8511700544';
    const formattedPhone = `+91 ${phoneEnv.slice(0, 5)} ${phoneEnv.slice(5)}`;
    const { contact } = cmsData;

    return (
        <Container>
            <div className="w-full py-40 sm-py-30">
                <div className="pb-40 grid-cols-1 gap-12 w-full">
                    <div className="flex items-start gap-6" ref={addToRef}>
                        <Icon
                            name="Map"
                            width="20"
                            height="20"
                            stroke="gray"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray w-5 mt-2"
                        />
                        <p className="para-text text-gray w-95">
                            {contact.address}
                        </p>
                    </div>
                    <div className="flex items-start gap-6 mt-10 sm-mt-15" ref={addToRef}>
                        <Icon
                            name="Mail"
                            width="20"
                            height="20"
                            stroke="gray"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray w-5 mt-2"
                        />
                        <a href={`mailto:${contact.email}`} className="w-95">
                            <p className="para-text text-gray">
                                {contact.email}
                            </p>
                        </a>
                    </div>
                    <div className="flex items-start gap-6 mt-10 sm-mt-15" ref={addToRef}>
                        <Icon
                            name="Clock"
                            width="20"
                            height="20"
                            stroke="gray"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray w-5 mt-2"
                        />
                        <p className="para-text text-gray w-95">
                            {contact.timings}
                        </p>
                    </div>
                    <div className="flex items-start gap-6 mt-10 sm-mt-15" ref={addToRef}>
                        <Icon
                            name="Phone"
                            width="20"
                            height="20"
                            stroke="gray"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray w-5 mt-2"
                        />
                        <div className="w-95 flex sm-grid-cols-1 items-center gap-12">
                            <a href={`tel:+91${phoneEnv}`}>
                                <p className="para-text text-gray">{formattedPhone}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div ref={addToRef}>
                    {loadMap ? (
                        <iframe
                            className="w-full border-0 mt-8"
                            title="map"
                            height={350}
                            loading="lazy"
                            allowFullScreen
                            src={contact.mapEmbedUrl}
                        />
                    ) : (
                        <div
                            className="w-full mt-8 bg-forth border-ec flex flex-column items-center justify-center rounded-5 relative overflow-hidden"
                            style={{
                                height: 350,
                                background: 'linear-gradient(rgba(248, 250, 252, 0.95), rgba(248, 250, 252, 0.95)), url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=60") center/cover no-repeat'
                            }}
                        >
                            <div className="text-center p-20 z-10 flex flex-column items-center gap-10">
                                <div className="rounded-full bg-white border-ec flex items-center justify-center" style={{ width: 60, height: 60, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                    <Icon
                                        name="MapPin"
                                        width="24"
                                        height="24"
                                        stroke="var(--primary)"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                </div>
                                <h3 className="mid-text font-600 text-dark">{contact.mapPlaceholderTitle}</h3>
                                <p className="small-text text-gray max-w-280 mb-5">{contact.mapPlaceholderDesc}</p>
                                <Button
                                    onClick={() => setLoadMap(true)}
                                    text={contact.mapPlaceholderBtn}
                                    bg="primary"
                                    color="white"
                                    version="v2"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Details;
