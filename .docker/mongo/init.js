db = new Mongo().getDB("test");

db.createCollection("Exercises", { capped: false })

db.Exercises.insertMany([
  { 
    username: "Carlos", 
    exercises: [] 
  },
  { 
    username: "Afonso", 
    exercises: [
      {
        description: "Walk with the dog",
        duration: 60,
        date: "Mon Jan 01 1990"
      }
    ] 
  },
  {
    username: "fcc_test",
    exercises: [
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      }
    ]
  }
])