import React from "react";

function PrimaryBorder() {
    return (
        <div
            className="absolute inset-0 rounded-xl z-[-1]"
            style={{
                padding: "0.85px", // ضخامت بوردر
                background: `
      linear-gradient(199.02deg, rgba(0, 0, 0, 0) 32.18%, rgba(0, 0, 0, 0.2) 99.36%),
linear-gradient(7.12deg, rgba(255, 255, 255, 0.2) 0.02%, rgba(255, 255, 255, 0.2) 100.08%)
      `,
                backgroundBlendMode: "overlay",
                WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
            }}
        />
    );
}

export default PrimaryBorder;
