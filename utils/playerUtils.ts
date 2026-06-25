import { players } from '@/data/players';

export function getPlayerName(id: string | number): string {
  if (!id) return 'Nepoznati';
  const p = players.find((p) => p.id === Number(id));
  return p ? p.name : `Nepoznati (${id})`;
}

export function getPlayerNumber(id: string | number): string {
  if (!id) return '';
  const p = players.find((p) => p.id === Number(id));
  return p?.number ? String(p.number) : '';
}

export function getPlayerPosition(id: string | number): string {
  if (!id) return '';
  const p = players.find((p) => p.id === Number(id));
  return p?.position || '';
}

export function getPlayerStats(id: string | number) {
  if (!id) return null;
  const p = players.find((p) => p.id === Number(id));
  return p?.stats || null;
}