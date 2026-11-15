// Tuba Nazlı İpekyüz — 2200004532
// Guided review, 15 November 2026: mutation versus rebinding.
export {}

{
  const session: { readonly room: { label: string } } = {
    room: { label: 'A' }
  };
  let { room } = session;
  console.log('shared before:', room === session.room);
  room.label = 'B';
  room = { label: 'C' };
  console.log('shared after:', room === session.room);
  console.log('after rebinding:', room.label, session.room.label);
  room.label = 'D';
  console.log('after local mutation:', room.label, session.room.label);
}

{
  const original = { label: 'A' };
  let copy = original;
  copy = { label: 'B' };
  original.label = 'C';
  console.log('ordinary alias:', copy.label, original.label);
}
