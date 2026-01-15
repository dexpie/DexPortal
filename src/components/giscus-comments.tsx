"use client";

import Giscus from "@giscus/react";

interface GiscusCommentsProps {
    repo?: string;
    repoId?: string;
    category?: string;
    categoryId?: string;
}

export function GiscusComments({
    repo = "dexpie/DexPortal",
    repoId = "R_kgDONn5mSg",
    category = "General",
    categoryId = "DIC_kwDONn5mSs4Cl2uR",
}: GiscusCommentsProps) {
    return (
        <Giscus
            id="comments"
            repo={repo as `${string}/${string}`}
            repoId={repoId}
            category={category}
            categoryId={categoryId}
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="transparent_dark"
            lang="en"
            loading="lazy"
        />
    );
}
