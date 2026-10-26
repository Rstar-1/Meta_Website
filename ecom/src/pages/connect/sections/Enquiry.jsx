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
        title: 'Manufacturing Plant',
        desc: 'Unit Nos. 8,9 & 12 Balaji Industrial Estate, Somnath Road, Dabhel, Daman – 396210, India',
        sub: 'Factory & Precision Moulding Facility'
    },
    {
        icon: 'MapPin',
        title: 'Sales & Corporate Hub',
        desc: '303/B, Byculla Service Industries, Dadoji Konndeo Road, Byculla (E), Mumbai – 400 027, India',
        sub: 'Sales, Distribution & Sample Dispatch'
    },
    {
        icon: 'Phone',
        title: 'Direct Call / WhatsApp',
        desc: '+91 95126 51119',
        link: 'tel:+919512651119',
        sub: 'Quick Response for Bulk Orders'
    },
    {
        icon: 'Mail',
        title: 'Email Us',
        desc: import.meta.env.VITE_EMAIL || 'sales@vasujavalplastics.com',
        link: `mailto:${import.meta.env.VITE_EMAIL || 'sales@vasujavalplastics.com'}`,
        sub: 'Quotation & Technical Queries'
    },
    {
        icon: 'Clock',
        title: 'Working Hours',
        desc: import.meta.env.VITE_WORKING_HOURS || 'Mon to Sat: 10:00 AM - 6:30 PM',
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
                    title="Request a Factory Quote"
                    subtitle="Have an inquiry about closure dimensions, thread compatibility, custom colours, or bulk drum & IBC valve supply? Reach out to our team."
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
                        submitText="Submit Now"
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
                    title={import.meta.env.VITE_SUPPORT_TITLE || "Packaging Support"}
                    subtitle={import.meta.env.VITE_SUPPORT_SUBTITLE || "From custom moulds to free sample testing kits, our engineering specialists ensure 100% leak-proof closure fitment for your containers."}
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