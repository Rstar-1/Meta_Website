import React from 'react';

import Icon from '../../../components/common/Icon';
import FormBuilder from '../../../components/forms/FormBuilder';
import Heading from '../../../components/layout/generic/Heading';

import { showToast } from '../../../components/common/Toast';
import { sendEmail } from '../../../utils/emailsend';


const ENQUIRY_FIELDS = [
    {
        name: 'name',
        label: 'Full Name / Contact Person',
        type: 'text',
        placeholder: 'Enter your full name',
        validation: { required: true }
    },
    {
        name: 'institution',
        label: 'Company / Organization / Plant Name',
        type: 'text',
        placeholder: 'Enter company or procurement organization name',
        validation: { required: true }
    },
    {
        name: 'email',
        label: 'Official Email',
        type: 'email',
        placeholder: 'Enter your business email address',
        validation: { required: true }
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter 10-digit mobile number',
        validation: { required: true }
    },
    {
        name: 'productCategory',
        label: 'Product Category of Interest',
        type: 'select',
        options: [
            { label: 'Stainless Steel Seamless & ERW Pipes (SS 304/316/321/Duplex)', value: 'SS Pipes' },
            { label: 'Carbon Steel & Boiler Quality Pipes (ASTM A106 Gr. B / BS 3059)', value: 'CS Boiler Pipes' },
            { label: 'Industrial Plates (Boiler Quality A516 Gr. 70, Hardox, Corten, High Tensile)', value: 'Industrial Plates' },
            { label: 'Pipe Fittings & High Pressure Forged Fittings (ASME B16.9 / 3000#)', value: 'Pipe Fittings' },
            { label: 'Stainless Steel & Nickel Alloy Flanges (WNRF / SORF / BLRF)', value: 'Flanges' },
            { label: 'Nickel Alloys & Superalloys (Inconel 625, Hastelloy C276, Monel 400)', value: 'Nickel Alloys' },
            { label: 'Stainless Steel Circles, Rings, Shims & Strips', value: 'Circles and Shims' },
            { label: 'High Tensile Fasteners (ASTM A193 B7/B8 Studs, Hex Bolts & Nuts)', value: 'Fasteners' },
            { label: 'Structural Steel Angles, Beams & Die/Tool Steel (D2, H13, EN-Series)', value: 'Structural and Tool Steel' }
        ],
        placeholder: 'Select Product Interest'
    },
    {
        name: 'message',
        label: 'Requirement Details & Quantity',
        type: 'textarea',
        placeholder: 'Specify material grade (e.g. SS 316L, ASTM A516 Gr. 70, Inconel 625), dimensions, schedule/thickness, quantity, required test certificates, or delivery destination...',
        style: { width: '97%' }
    }
];

const CONTACT_DETAILS = [
    {
        icon: 'MapPin',
        title: 'Roxy Enterprises Head Office & Stockyard',
        desc: 'Office no.12, 2nd Floor, 20/26, Doctor Building D Block, Maruti Mandir Marg, 5th Kumbharwada, Mumbai 400004 (MH), India',
        link: 'https://maps.google.com/?q=5th+Kumbharwada+Mumbai+400004',
        sub: 'Exporter, Stockiest & Supplier | 3.1 / 3.2 Mill Test Certificates'
    },
    {
        icon: 'Phone',
        title: 'Procurement & Sales Helplines',
        desc: '+91 97692 57080 (Ambalal Choudhary)',
        link: 'tel:+919769257080',
        sub: 'Direct Factory & Stockyard Pricing | Instant Quotations'
    },
    {
        icon: 'Mail',
        title: 'Official Inquiries & Orders',
        desc: 'roxyenterprises91@gmail.com',
        link: 'mailto:roxyenterprises91@gmail.com',
        sub: 'Send BOM / RFQ specifications for prompt reply from our sales desk'
    },
    {
        icon: 'Clock',
        title: 'Working Hours & Logistics',
        desc: 'Mon to Sat: 9:00 AM – 7:30 PM IST',
        sub: 'Pan-India Cargo Transit & International Export Sea/Air Shipments'
    }
];

const ContactItem = React.memo(({ item }) => (
    <div className="flex gap-12 items-start mb-16">
        <div className="icon-lg border-dark rounded-full center-div flex-shrink-0 text-dark">
            <Icon name={item.icon} width="16" height="16" stroke="currentColor" />
        </div>
        <div className="w-90">
            <h4 className="text-dark mid-text font-600">{item.title}</h4>
            {item.link ? (
                <a
                    href={item.link}
                    className="text-gray mini-text font-400 mt-2 block hover:text-dark"
                >
                    {item.desc}
                </a>
            ) : (
                <p className="text-gray mini-text font-400 mt-2">{item.desc}</p>
            )}
            {item.sub && (
                <p className="text-gray mini-text font-400 mt-2">{item.sub}</p>
            )}
        </div>
    </div>
));

ContactItem.displayName = 'ContactItem';

const Enquiry = React.memo(() => {
    const [formKey, setFormKey] = React.useState(0);

    const handleFormSubmit = React.useCallback(async (data) => {
        setFormKey((prev) => prev + 1);
        showToast('Thank you! Your healthcare supply enquiry has been submitted successfully.', 'success');

        const messageLines = ENQUIRY_FIELDS
            .map((field) => {
                const val = data[field.name];
                return val ? `${field.label}: ${val}` : null;
            })
            .filter(Boolean)
            .join('\n');

        try {
            await sendEmail(data, 'New Medical & First Aid Product Enquiry', messageLines);
        } catch (err) {
            console.error('Enquiry email delivery issue:', err);
        }
    }, []);

    return (
        <div className="flex sm-grid-cols-1 items-start gap-12 py-60">
            <div className="w-60 sm-w-full pr-20 sm-pr-1 bordr">
                <Heading
                    version="v2"
                    tag="INSTITUTIONAL & B2B INQUIRY"
                    tagIcon="Phone"
                    title="Connect With Healthcare Solutions"
                    subtitle="Request direct factory wholesale quotations, institutional hospital tenders, bulk supply discounts, or custom industrial first aid kits from Goonj and Shreehari Surgicals."
                    className="mb-20"
                />

                <div className="w-80 sm-w-full">
                    <FormBuilder
                        key={formKey}
                        version="2"
                        fields={ENQUIRY_FIELDS}
                        onSubmit={handleFormSubmit}
                        submitType="json"
                        col="1"
                        submitText="Submit Product Enquiry"
                        buttonVersion="v1"
                        buttonBg="dark"
                        buttonClassName="flex items-center justify-start mt-20"
                    />
                </div>
            </div>

            <div className="w-40 sm-w-full pl-20 sm-pl-1 sm-mt-16">
                <Heading
                    version="v2"
                    tag="DISTRIBUTION NETWORK"
                    title="Direct Manufacturer Hubs"
                    subtitle="Central coordination and dispatch facilities in Delhi and Mumbai for immediate order booking, technical catalogues, and pan-India cargo tracking."
                    className="mb-20"
                />

                <div className="grid-cols-1 gap-12 mt-20">
                    {CONTACT_DETAILS.map((item, idx) => (
                        <ContactItem key={idx} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
});

Enquiry.displayName = 'Enquiry';

export default Enquiry;