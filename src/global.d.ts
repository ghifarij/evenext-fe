declare interface Window {
  snap: {
    embed: (orderToken: string, options: { embedId: string }) => void;
    pay: (orderToken: string) => void;
  };
}
