export const getTickets = async () => {
  const res = await fetch(`http://localhost:8000/api/tickets`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.tickets;
};
