import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  console.log("handle submit");
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(event.currentTarget); // Get form data

  const file = formData.get("fileInput"); // Get the file input value

  if (file instanceof File) {
    return await handleFetch(file); // Call handleFetch with the file object
  } else {
    console.error("File is missing or not a file");
    throw new Error("File is missing or not a file");
  }
}

async function handleFetch(file: File) {
  console.log("handle fetch");
  var bodyFormData = new FormData();
  bodyFormData.append("file", file);

  return await postPrediction(bodyFormData);
}

async function postPrediction(data: FormData) {
  try {
    const response = await baseApi.post(
      `/prediction`,
      data, // Directly pass FormData
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to post prediction:", error);
    throw error;
  }
}
