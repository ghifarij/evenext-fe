const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getEvents = async () => {
  const res = await fetch(`${base_url}/events`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.events;
};
