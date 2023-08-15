export async function processApiRequest(pin: string) {
  try {
    const response = await fetch(
      "https://frontend-challenge.screencloud-michael.now.sh/api/pin/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      }
    );

    if (response.ok) {
      return await response.json();
    } else if (response.status === 403) {
      throw new Error("Incorrect PIN.");
    } else {
      throw new Error("An error occurred.");
    }
  } catch (error) {
    throw new Error("An error occurred.");
  }
}
