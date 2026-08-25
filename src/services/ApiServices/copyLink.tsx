import { toast } from "sonner";

type copyLinkProp = {
    pagePath: string;
    postId: string;
};
        
        
export const copyLink = async ({
    pagePath,
    postId,
}: copyLinkProp) => {

    const url = `${window.location.origin}/${pagePath}/${postId}`;

    await navigator.clipboard.writeText(url);

    toast("Link Copied!", {
        position: "top-right",        
        description: "page Link successefully copied",
        className:
            "bg-white dark:bg-[#101827] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700",
    });

  };
