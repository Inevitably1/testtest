// 清空现有数据
db.activities.remove({});
db.counters.remove({});

// 初始数据
const activities = [
  {
    id: 1,
    title: '周末欢乐打球',
    venue: '体育中心1号场',
    date: '2024-04-01',
    startTime: '14:00',
    endTime: '16:00', 
    fee: 30,
    maxPlayers: 8,
    currentPlayers: 0,
    status: 'upcoming'
  }
];

// 插入数据
db.activities.insertMany(activities);
const count = db.activities.count();
print('Inserted', count, 'activities');

// 创建计数器
db.counters.insert({_id: 'activities', current: count});
print('Created counter with current =', count);

// 创建索引
db.activities.createIndex({ id: 1 }, { unique: true });