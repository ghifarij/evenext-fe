const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getTickets = async () => {
  const res = await fetch(`${base_url}/tickets`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.tickets;
};
