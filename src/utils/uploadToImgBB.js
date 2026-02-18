const IMGBB_API_KEY = "91cd4460b2a3bdf4a4f231f6609af30b";

export async function uploadToImgBB(file) {
    const formdata = new FormData();
    formdata.append("image", file);

    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
            method: "POST",
            body: formdata,
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data?.error?.message || "Upload failed");
    }

    return data.data.url;
}
