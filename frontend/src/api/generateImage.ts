import { openAI } from "@/configs/openAi";

export const generateImage = async (prompt: string) => {
  try {
    const response = await openAI.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0]?.url;
    return imageUrl;
  } catch (error) {
    console.error("generate image error: ", error);
    return "https://cloudflare-ipfs.com/ipfs/QmRibyKgMy5iK2VmhgNYwdhDJBr795ji3eozk9nPYmU9oU/steamboat-willie.jpg";
  }
};
