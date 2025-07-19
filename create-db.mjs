import sqlite3 from 'sqlite3';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
  const db = await open({
    filename: './rooms.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      room_id TEXT PRIMARY KEY,
      room_name TEXT,
      max_capacity INTEGER,
      in_progress TEXT,
      is_full TEXT,
      is_private TEXT,
      location TEXT,
      instance_id TEXT,
      platform TEXT,
      subroom_id TEXT,
      voice_server_id TEXT,
      voice_auth_id TEXT,
      ip_address TEXT,
      port TEXT
    )
  `);

  console.log('Database and table created!');
})();