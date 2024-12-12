export const getEvents = async () => {
  const res = await fetch(`http://localhost:8000/api/events`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.events;
};
