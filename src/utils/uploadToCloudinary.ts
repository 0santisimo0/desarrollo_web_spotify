export const uploadToCloudinary = async (
  file: File,
  resourceType: "image" | "video" | "raw" = "raw",
  folder?: string
): Promise<string | null> => {
  const url = `https://api.cloudinary.com/v1_1/drbpk4dsk/${resourceType}/upload`;
  const preset = "desarrollo_en_la_nube";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  if (folder) {
    formData.append("folder", folder); // 👈 aquí le indicas el path donde guardarlo
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url ?? null;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
