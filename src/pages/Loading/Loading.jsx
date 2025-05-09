import { Loader } from "@aws-amplify/ui-react";
import React from "react";

function Loading() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center h-screen w-full">
            <Loader
                filledColor="rgb(90 141 238)"
                emptyColor="rgb(243,244,244)"
                width="6rem"
                height="6rem"
            />
        </div>
    );
}

export default Loading;
