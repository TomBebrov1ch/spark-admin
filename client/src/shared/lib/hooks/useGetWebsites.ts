// функция для получения списка вебсайтов
export async function useGetWebsites() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImVtYWlsIjoiYXJ0ZW0uYW5kcmVldjIwMDAxMkBtYWlsLnJ1Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTQ3MTMxMjksImV4cCI6MTcxNDc5OTUyOX0.D9slhtIO0KgNh0xxJQzyDsScpczIYObYrTgEgzmPhnI";
  const url = "https://spark-admin-production.up.railway.app/api/website";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
