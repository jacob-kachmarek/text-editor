import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connection to the database and version
  const jateDb = await openDB('jate', 1);
  // create new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // open object store
  const store = tx.objectStore('jate');
  // use the .add() method on the store
  const request = store.put({ id: 1, value: content });
  const result = await request;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // connection to the database and version
  const jateDb = await openDB('jate', 1);
  // create new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // open object store
  const store = tx.objectStore('jate');
  // .getAll() method to get all data in the database
  const request = store.getAll();
  // confirm request
  const result = await request;
  return result?.text;
};

initdb();
