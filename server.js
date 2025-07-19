import express from 'express';  
import sqlite3 from 'sqlite3';  
import { open } from 'sqlite';  

const app = express();
const port = 3000;

let db;
(async () => {
  db = await open({
    filename: './rooms.db',
    driver: sqlite3.Database,
  });
  console.log('Database connected');
})();

app.get('/activity/:username', async (req, res) => {
  const { username } = req.params;

  const room = await db.get('SELECT * FROM rooms WHERE room_id = ?', [username]);

  if (room) {
    res.json({
      username,
      roomName: room.room_name,
      maxCapacity: room.max_capacity,
      inProgress: room.in_progress,
      isFull: room.is_full,
      isPrivate: room.is_private,
      location: room.location,
      roomId: room.room_id,
      instanceId: room.instance_id,
      platform: room.platform,
      subroomId: room.subroom_id,
      voiceServerId: room.voice_server_id,
      voiceAuthId: room.voice_auth_id,
      ipAddress: room.ip_address,
      port: room.port,
    });
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});