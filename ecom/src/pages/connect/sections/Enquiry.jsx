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
        label: 'Hospital / Facility / Organization Name',
        type: 'text',
        placeholder: 'Enter hospital or company name',
        validation: { required: true }
    },
    {
        name: 'email',
        label: 'Official Email',
        type: 'email',
        placeholder: 'Enter your email address',
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
            { label: 'Industrial First Aid Kits & Cabinets (Shreehari - SUPPORT)', value: 'Industrial First Aid' },
            { label: 'Emergency Stretchers & Evacuation Chairs (Shreehari)', value: 'Emergency Stretchers' },
            { label: 'Hospital Stainless Steel Holloware & Dressing Drums (Goonj)', value: 'Hospital Holloware' },
            { label: 'O.T. & Examination LED Surgical Lights (Goonj / CYNOR)', value: 'OT Lights' },
            { label: 'Pressure Autoclaves & Suction Apparatus (Goonj)', value: 'Sterilization & Suction' },
            { label: 'Hospital ICU Beds, Crash Carts & Ward Furniture (CYNOR)', value: 'Hospital Furniture' },
            { label: 'Sterile Surgical Gowns & Hospital Linen (CYNOR)', value: 'Hospital Linen' },
            { label: 'Neonatal Phototherapy & Patient Monitors (CYNOR)', value: 'Diagnostic & Neonatal' },
            { label: 'Color-Coded Biohazard Waste Bins (Goonj)', value: 'Clinical Waste Bins' }
        ],
        placeholder: 'Select Product Interest'
    },
    {
        name: 'message',
        label: 'Requirement Details & Quantity',
        type: 'textarea',
        placeholder: 'Specify required quantities, models, delivery destination, or institutional tender requirements...',
        style: { width: '97%' }
    }
];

const CONTACT_DETAILS = [
    {
        icon: 'MapPin',
        title: 'Delhi Distribution Hub (Goonj / CYNOR)',
        desc: '58-B, Damodar Park Ind. Area, Dilshad Garden, Delhi - 110095',
        link: 'https://maps.google.com/?q=Dilshad+Garden+Delhi',
        sub: 'Hospital Holloware, OT Lights, Autoclaves & ICU Furniture | GST: 07AAAFG8942K1ZV'
    },
    {
        icon: 'MapPin',
        title: 'Mumbai First Aid Hub (Shreehari Surgicals)',
        desc: 'Off No: 11, 12, 2nd Floor, 290/292, Vadgadi Azad Chowk CHSL, Samuel Street, Masjid Bunder (W), Mumbai - 400003',
        link: 'https://maps.google.com/?q=Masjid+Bunder+Mumbai',
        sub: 'CE-Certified Industrial First Aid Kits & Stretchers | GST: 27AASFS9821L1Z4'
    },
    {
        icon: 'Phone',
        title: 'Central Helplines',
        desc: '+91 98731 98731 (Delhi) / +91 98179 26992 (Mumbai)',
        link: 'tel:9873198731',
        sub: 'Alt: +91 98732 98731 / +91 98205 60982 | Direct Factory Assistance'
    },
    {
        icon: 'Mail',
        title: 'Official Inquiries & Tenders',
        desc: 'info@goonjcom.in / shreeharisurgicals@gmail.com',
        link: 'mailto:info@goonjcom.in',
        sub: 'Technical catalogues & formal institutional rate cards'
    },
    {
        icon: 'Clock',
        title: 'Dispatch & Working Hours',
        desc: 'Mon to Sat: 9:00 AM – 7:00 PM IST',
        sub: 'Emergency Hospital Supplies Dispatch: 24/7 Active Transit'
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