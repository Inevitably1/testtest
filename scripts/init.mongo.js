// Clear existing data
db.activities.remove({});
db.counters.remove({});

// Initial data
const activities = [
  {
    id: 1,
    title: 'Weekend Badminton Fun',
    venue: 'Sports Center Court 1',
    date: '2024-04-01',
    startTime: '14:00',
    endTime: '16:00', 
    fee: 30,
    maxPlayers: 8,
    currentPlayers: 0,
    status: 'upcoming'
  }
];

// Insert data
db.activities.insertMany(activities);
const count = db.activities.count();
print('Inserted', count, 'activities');

// Create counter
db.counters.insert({_id: 'activities', current: count});
print('Created counter with current =', count);

// Create index
db.activities.createIndex({ id: 1 }, { unique: true });