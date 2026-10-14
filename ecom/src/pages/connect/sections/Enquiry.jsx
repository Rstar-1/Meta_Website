import React from 'react';

import Icon from '../../../components/common/Icon';
import FormBuilder from '../../../components/forms/FormBuilder';

import Heading from '../../../components/layout/generic/Heading';

import { showToast } from '../../../components/common/Toast';
import { sendEmail } from '../../../utils/emailsend';

const ENQUIRY_FIELDS = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your name',
        validation: { required: true }
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validation: { required: true }
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter your phone number',
        validation: { required: true }
    },
    {
        name: 'message',
        label: 'Your message',
        type: 'textarea',
        placeholder: 'Tell us about your project or inquiry...',
        style: { width: '97%' }
    }
];

const CONTACT_DETAILS = [
    {
        icon: 'MapPin',
        title: 'Office & Registered Address',
        desc: import.meta.env.VITE_ADDRESS || 'Shop No 6, A Wing, 1st Floor, Nakoda Mehta Sunshine Heights, Khadilkar Road, Sadashiv Lane, Kakadwadi, Girgaon, Mumbai - 400004',
        sub: 'Maharashtra, India'
    },
    {
        icon: 'Phone',
        title: 'Call Us (Director & Sales)',
        desc: `${import.meta.env.VITE_PHONE || '+91 9820171740'} / 022 6639 4511`,
        link: `tel:${(import.meta.env.VITE_PHONE || '+919820171740').replace(/[^\d+]/g, '')}`,
        sub: 'Contact Person: Virendra Desai (Director)'
    },
    {
        icon: 'Phone',
        title: 'WhatsApp Inquiries',
        desc: import.meta.env.VITE_WHATSAPP || '+91 9867611740',
        link: 'https://wa.me/919867611740',
        sub: 'Quick RFQ, Catalog & Dimension Charts'
    },
    {
        icon: 'Mail',
        title: 'Email Us',
        desc: import.meta.env.VITE_EMAIL || 'info@jubilantmetal.com',
        link: `mailto:${import.meta.env.VITE_EMAIL || 'info@jubilantmetal.com'}`,
        sub: 'GSTIN: 27ATUPD4241P1Z3 | PAN: ATUPD4241P'
    },
    {
        icon: 'Clock',
        title: 'Working Hours',
        desc: import.meta.env.VITE_WORKING_HOURS || 'Mon to Sat: 9:30 AM - 7:00 PM',
        sub: import.meta.env.VITE_WEEKEND_HOURS || 'Sun: Closed'
    }
];

const getCart = () => {
    try {
        const stored = localStorage.getItem('cart') || localStorage.getItem('order_products');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const ContactItem = React.memo(({ item }) => (
    <div className="flex gap-12 items-start mb-16">
        <div className="icon-lg border-dark rounded-full center-div flex-shrink-0">
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
        showToast('Thank you! Your enquiry has been submitted successfully.', 'success');

        const messageLines = ENQUIRY_FIELDS
            .map((field) => {
                const val = data[field.name];
                return val ? `${field.label}: ${val}` : null;
            })
            .filter(Boolean)
            .join('\n');

        try {
            await sendEmail(data, 'New Product Enquiry', messageLines);
        } catch (err) {
            console.error('Enquiry email delivery issue:', err);
        }
    }, []);

    return (
        <div className="flex sm-grid-cols-1 items-start gap-12 py-60">
            <div className="w-60 sm-w-full pr-20 sm-pr-1 bordr">
                <Heading
                    version="v2"
                    tag="GET IN TOUCH"
                    tagIcon="Phone"
                    title="Contact Jubilant Metal And Alloys"
                    subtitle="Looking for ASTM/ASME certified stainless steel pipes, buttweld fittings, forged flanges, or high-tensile fasteners? Send your RFQ or connect directly with our technical team."
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
                        submitText="Submit Enquiry"
                        buttonVersion="v1"
                        buttonBg="dark"
                        buttonClassName="flex items-center justify-start mt-20"
                    />
                </div>
            </div>

            <div className="w-40 sm-w-full pl-20 sm-pl-1 sm-mt-16">
                <Heading
                    version="v2"
                    tag=""
                    title={import.meta.env.VITE_SUPPORT_TITLE || "Industrial Supply & Metal Solutions"}
                    subtitle={import.meta.env.VITE_SUPPORT_SUBTITLE || "Trust • Quality • Long Term Partner — Stockist, Manufacturer & Exporter of Stainless Steel, Duplex, Super Duplex & Nickel Alloys based in Mumbai, India."}
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