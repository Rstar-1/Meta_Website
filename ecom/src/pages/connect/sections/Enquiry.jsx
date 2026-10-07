import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        title: 'ADDRESS',
        desc: import.meta.env.VITE_ADDRESS,
        sub: ''
    },
    {
        icon: 'Phone',
        title: 'Call Us',
        desc: import.meta.env.VITE_PHONE,
        link: `tel:${(import.meta.env.VITE_PHONE || '').replace(/[^\d+]/g, '')}`,
        sub: ''
    },
    {
        icon: 'Mail',
        title: 'Email Us',
        desc: import.meta.env.VITE_EMAIL,
        link: `mailto:${import.meta.env.VITE_EMAIL || ''}`,
        sub: ''
    },
    {
        icon: 'Clock',
        title: 'Working Hours',
        desc: import.meta.env.VITE_WORKING_HOURS,
        sub: import.meta.env.VITE_WEEKEND_HOURS
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

const Enquiry = React.memo(({ isCart = false, onClearCart }) => {
    const navigate = useNavigate();
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

        if (isCart) {
            const currentCart = getCart();
            if (currentCart?.length > 0) {
                localStorage.setItem('order_products', JSON.stringify(currentCart));
            }
            setTimeout(() => {
                onClearCart?.();
                navigate('/order');
            }, 1200);
        }
    }, [isCart, onClearCart, navigate]);

    return (
        <div className="flex sm-grid-cols-1 items-start gap-12 py-60">
            <div className="w-60 sm-w-full pr-20 sm-pr-1 bordr">
                <Heading
                    version="v2"
                    tag="GET IN TOUCH"
                    tagIcon="Phone"
                    title="Contact Us"
                    subtitle="Have a project in mind, need technical consultation, or have an inquiry? Reach out to our team."
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
                    title={import.meta.env.VITE_SUPPORT_TITLE || "Need Help?"}
                    subtitle={import.meta.env.VITE_SUPPORT_SUBTITLE || "To us, design has a broader purpose and as you can read about on this website, we are on a mission."}
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