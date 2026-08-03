type HandleBookMarkProp = {
    pagePath: string;
    postId: string;
};
        
        
export const sharePost = async ({
    pagePath,
    postId,
}: HandleBookMarkProp) => {

    const url = `${window.location.origin}/${pagePath}/${postId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post",
          text: "Take a look at this post.",
          url,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }

  };
