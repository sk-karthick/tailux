declare global {
    namespace JSX {
        interface IntrinsicElements {
            "my-modal": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

export { }; // This ensures the file is treated as a module.
