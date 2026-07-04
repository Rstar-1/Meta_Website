import React, { useMemo, useState } from "react";
import Fields from "./Fields";
import Button from "./Button";

const FormBuilder = ({
    fields = [],
    onSubmit,
    submitType = "formdata",
    col = "1",
    submitText = "Save Changes",
    buttonVersion = "v1",
    buttonBg = "primary",
    buttonClassName = "",
    buttonStyle = {},
    children
}) => {
    const getDefaultValue = (field) => {
        if (field.defaultValue !== undefined) return field.defaultValue;
        if (field.type === "range-datepicker") return { fromDate: "", toDate: "" };
        if (field.type === "multiselect") return [];
        if (field.type === "quantity") return 1;
        if (field.type === "rating") return 0;
        if (field.type === "checkbox" || field.type === "radio" || field.type === "switch") return false;
        return "";
    };

    const initialValues = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = getDefaultValue(field);
            return acc;
        }, {});
    }, [fields]);

    const [form, setForm] = useState(initialValues);

    const handleChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (submitType === "json") {
            onSubmit?.(form);
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (val === null || val === undefined) return;
            if (val instanceof FileList) {
                Array.from(val).forEach((file) => {
                    formData.append(key, file);
                });
            } else if (Array.isArray(val)) {
                val.forEach((item) => {
                    if (item instanceof File) {
                        formData.append(key, item);
                    } else {
                        formData.append(key, item);
                    }
                });
            } else if (val instanceof File) {
                formData.append(key, val);
            } else if (typeof val === "object") {
                formData.append(key, JSON.stringify(val));
            } else {
                formData.append(key, val);
            }
        });
        onSubmit?.(formData);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="w-full"
        >
            <div className={`grid-cols-${col} gap-12 items-start`}>
                {fields.map((field) => (
                    <Fields
                        key={field.name}
                        {...field}
                        value={form[field.name]}
                        onChange={(value) => handleChange(field.name, value)}
                    />
                ))}
            </div>

            {children}

            <div className={buttonClassName || "flex justify-center mt-20"}>
                <Button
                    type="submit"
                    version={buttonVersion}
                    bg={buttonBg}
                    style={buttonStyle}
                >
                    {submitText}
                </Button>
            </div>
        </form>
    );
};

export default FormBuilder;