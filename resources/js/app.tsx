import React from "react";
import ReactDOM from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import "../css/app.css";
import { Toaster } from "@/components/ui/sonner";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.tsx", {
            eager: true,
        }) as Record<string, { default: React.ComponentType<any> }>;

        return pages[`./Pages/${name}.tsx`].default;
    },

    setup({ el, App, props }) {
        ReactDOM.createRoot(el).render(
            <>
                <App {...props} />
                <Toaster />
            </>,
        );
    },
});
