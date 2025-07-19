const express = require('express');
const app = express();
const port = 3000;

// بيانات وهمية (يمكنك استبدالها بقاعدة بيانات حقيقية)
const roomsData = {
  '1c92f780-baf1-4bd8-aa15-27cca0aa7396': {
    roomName: 'Arab.Katana',
    maxCapacity: 35,
    inProgress: 'No',
    isFull: 'No',
    isPrivate: 'No',
    location: 'a75f7547-79eb-47c6-8986-6767abcb4f92',
    roomId: '56538877',
    instanceId: '5637642952680678292',
    platform: 'Playstation',
    subroomId: '6273510545098401552',
    voiceServerId: 'gameserver-2-r9lts-7nck7',
    voiceAuthId: 'f4b33a87-318a-459b-b3c9-b598d9396ed7',
    ipAddress: '35.210.231.12', // إضافة IP
    port: '7008', // إضافة Port
  },
  // يمكنك إضافة بيانات أخرى هنا إذا لزم الأمر
};

// الحصول على النشاط بناءً على username
app.get('/activity/:username', (req, res) => {
  const { username } = req.params;

  // التحقق إذا كانت البيانات موجودة
  if (roomsData[username]) {
    const roomData = roomsData[username];

    res.json({
      username,
      ...roomData,
    });
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
