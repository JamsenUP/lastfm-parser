export default async function handler(req, res) {
  const user = 'jamsenup';
  const apiKey = '02c9bd9aa8737a715c3cc09eef021c63';
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tracks = data?.recenttracks?.track;

    if (!tracks || tracks.length === 0) {
      return res.send('Музыка не играет');
    }

    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    const isNowPlaying = track['@attr']?.nowplaying === 'true';
    const artist = track.artist['#text'];
    const name = track.name;

    if (!isNowPlaying) {
      return res.send(`Последний трек: ${artist} - ${name}`);
    }

    res.send(`${artist} - ${name}`);
  } catch (e) {
    res.send('Ошибка получения трека');
  }
}
