> What is a hash table?

**A.**

A hash table is a data structure that is used to store key/value pairs. Data is stored in an array format, where each data value has its own unique index value.  A hash table is coupled with a hash function to cumpute an index into an array in which elements are inserted and/or searched. It is very important to use a good and stable hash function, so that hashing can work well.

Hash tables are commonly used when speedy (meaning time complexity average of O(1)) insertion, deletion and lookup of elements is priority.

> What is hashing?

**A.**

Hashing is a technique to convert a range of key values into a range of indexes of an array. Its purpose is to uniquely identify a specific object from a group of similar objects. In hashing, large keys are converted into small keys by using hash functions. The values are then sorted in a data structure called hash table. Hashing is what makes hash tables extremely efficient, however, a good hashing function is the key to an efficient hash table.

Basicaly, hashing is implemented in 2 steps:
   1. An element is converted into an integer by using a hash function.
   2. The element is stored in the hash table where it can be quicly retrieved using a hash key.

> How does a hash table stores data?

**A.**

The information in a hash table basically has 2 main components: some sort of key and some sort of value. A hash table is a way that we can implement an ASSOCIATIVE array (also called dictionary) where keys and values are mapped.

To begin data-storing, a hash function is necessary to look at a certain key. It is going to evaluate it, and to output an index that will define what location in the array the data will be stored in.

If, for some reason, the same index is generated for more than one piece of data, then a possible solution is to rely on a technique called **Chaining**, in which a linked link is created to hold the data that is associated with a particular position in the array.

> How are hash tables and objects different?

**A.**

The difference can be the intended type of data that each one is supposed to hold; hash tables are intended to hold collections of similar data, whereas objects different types of data bundled together. In JavaScript, hash tables are usually used to implement objects.  

> Determine whether you would use a hash table or an object to store each of the following pieces of data:

**A.**

* A list of pets and their unique names. - HASH TABLE
* The name, age, and the birthday of your best friend. - OBJECT
* The name and location of every company in a given city. - HASH TABLE
* All of the books checked out from a library by a particular individual. - OBJECT
* The primary and secondary phone numbers for a contact. - HASH TABLE

> Build a system that allows a sales associate to enter a customer's name, address, and phone number into the system and look up customers using their phone numbers. Store this information in a hash table.

######*Code:*

```javascript
class HashTable {
   constructor() {
      this.storage = [];
      this.maxStorage = 200;
   }

   hashFunction(string, numOfBuckets) {
      let hash = 0;
      let calculatedIndex = 0;

      for (let i = 0; i < string.length; i++) {
         hash += string.charCodeAt(i);
      }
      calculatedIndex = hash % numOfBuckets;

      return calculatedIndex;
   }

   addCustomer(data) {
      var key = data.phone;
      var index = this.hashFunction(key, this.maxStorage);
      var inserted = false;

      if (this.storage[index] === undefined) {
         this.storage[index] = data;

      } else if (this.storage[index].name === data.name
         && this.storage[index].phone === data.phone
         && this.storage[index].address === data.address) {

            inserted = true;
            console.log('Duplicate record found. Only the original record will be kept!')
            console.log('\r');

      } else {
         // using linear probing to deal with collisions
         var newIndex = index + 1;

         while (!inserted && newIndex < this.storage.length) {

            if (this.storage[newIndex] === undefined) {
               this.storage[newIndex] = data;
               inserted = true;

            } else {
               newIndex++;
            }
         }
      }
   }


   customerLookup(phoneNumber) {
      var key = phoneNumber;
      var index = this.hashFunction(key, this.maxStorage);
      var found = false;
      var newIndex = index + 1;

      if (this.storage[index] === undefined) {

         return console.log(`Your query did not return any matches...`);
      }

      if (this.storage[index] !== undefined && this.storage[index].phone !== phoneNumber) {

         while (!found && newIndex < this.storage.length) {
            if (this.storage[newIndex].phone === phoneNumber) {
               index = newIndex;
               found = true;

            } else {
               newIndex++;
            }
         }

      } else {

         found = true;
      }

      if (found) {
         console.log(`The phone number "${phoneNumber}" matches with the customer:`);
         console.log('\r');
         console.log(`Name: ${this.storage[index].name}`);
         console.log(`Address: ${this.storage[index].address}`);
         console.log('-----------------------------------------')
      }
   }

   logSystemStorage() {
      console.log(this.storage);
   }
}

var customerDirectory = new HashTable();

customerDirectory.addCustomer(
   {
      name: 'John Smith',
      phone: '555-555-5555',
      address: '100, Main St.'
   });

customerDirectory.addCustomer(
   {
      name: 'Robert Mason',
      phone: '123-456-7890',
      address: '1, Chocolate St.'
   });

customerDirectory.customerLookup('123-456-7890');

customerDirectory.logSystemStorage();
```

> Build a system that allows a store owner to track their store's inventory using a hash table for storage.

*Note*: The system below is basically the same as the previous one, as I defined the class of HashTable. I just tweaked the function names, so they make sense and the max number of buckets because a store would have several products. And also a small modification in the stockByProduct method to return the stock of each product that is searched.

######*Code:*

```javascript
class HashTable {
   constructor() {
      this.storage = [];
      this.maxStorage = 200;
   }

   hashFunction(string, numOfBuckets) {
      let hash = 0;
      let calculatedIndex = 0;

      for (let i = 0; i < string.length; i++) {
         hash += string.charCodeAt(i);
      }

      calculatedIndex = hash % numOfBuckets;
      return calculatedIndex;
   }

   addProduct(data) {
      var key = data.name;
      var index = this.hashFunction(key, this.maxStorage);
      var inserted = false;

      if (this.storage[index] === undefined) {
         this.storage[index] = data;

      } else if (this.storage[index].name === data.name
         && this.storage[index].color === data.color
         && this.storage[index].price === data.price) {

         data.stock += this.storage[index].stock;
         this.storage[index] = data;
         inserted = true;

      } else {
         // using linear probing to deal with collisions
         var newIndex = index + 1;

         while (!inserted && newIndex < this.storage.length) {

            if (this.storage[newIndex] === undefined) {
               this.storage[newIndex] = data;
               inserted = true;

            } else {
               newIndex++;
            }
         }
      }
   }

   retrieveProduct(itemName) {
      var key = itemName;
      var index = this.hashFunction(key, this.maxStorage);
      var found = false;
      var newIndex = index + 1;

      if (this.storage[index] === undefined) {

         return console.log(`Your query did not return any matches...`);

      }

      if (this.storage[index] !== undefined && this.storage[index].name !== itemName) {

         while (!found && newIndex < this.storage.length) {
            if (this.storage[newIndex].name === itemName) {
               index = newIndex;
               found = true;
            } else {
               newIndex++;
            }
         }

      } else {

         found = true;
      }

      if (found) {
         console.log(`Information of product "${itemName}":`);
         console.log('\r');
         console.log(`Name: ${this.storage[index].name}`);
         console.log(`Color: ${this.storage[index].color}`);
         console.log(`Price: ${this.storage[index].price}`);
         console.log(`Stock: ${this.storage[index].stock}`);
         console.log('-----------------------------------------');
         console.log('\r');
      }

   }


   logSystemStorage() {
      console.log(this.storage);
   }
}

var myStore = new HashTable();

myStore.addProduct(
   {
      name: 'Jeans',
      color: 'Blue',
      price: '$39.99',
      stock: 200
   });

myStore.addProduct(
   {
      name: 'Jeans',
      color: 'Blue',
      price: '$39.99',
      stock: 30
   });

myStore.addProduct(
   {
      name: 'Shirt',
      color: 'White',
      price: '$29.99',
      stock: 13
   });

myStore.addProduct(
   {
      name: 'Shoes',
      color: 'Brown',
      price: '$20.99',
      stock: 8
   });

myStore.retrieveProduct('Jeans');
myStore.retrieveProduct('Shirt');

myStore.logSystemStorage();
```

> Build a system that allows digital copies of newspapers to be entered and searched by publisher and publication date. Use hash tables to store the necessary data.

######*Code:*

```javascript
class HashTable {
   constructor() {
      this.storage = [];
      this.maxStorage = 200;
   }

   hashFunction(string, numOfBuckets) {
      let hash = 0;
      let calculatedIndex = 0;

      for (let i = 0; i < string.length; i++) {
         hash += string.charCodeAt(i);
      }
      calculatedIndex = hash % numOfBuckets;

      return calculatedIndex;
   }

   addNewspaper(data) {
      var key = data.publisher + data.date;
      var index = this.hashFunction(key, this.maxStorage);
      var inserted = false;

      if (this.storage[index] === undefined) {
         this.storage[index] = data;

      } else if (this.storage[index].newspaper === data.newspaper
         && this.storage[index].publisher === data.publisher
         && this.storage[index].date === data.date
         && this.storage[index].contents === data.contents) {

         inserted = true;
         console.log('Duplicate record found. Only the original record will be kept!')
         console.log('\r');
      } else {

         // using linear probing to deal with collisions
         var newIndex = index + 1;

         while (!inserted && newIndex < this.storage.length) {

            if (this.storage[newIndex] === undefined) {
               this.storage[newIndex] = data;
               inserted = true;

            } else {
               newIndex++;
            }
         }
      }
   }

   searchNewspaper(publisher, publicationDate) {
      var key = publisher + publicationDate;
      var index = this.hashFunction(key, this.maxStorage);
      var found = false;
      var newIndex = index + 1;

      if (this.storage[index] === undefined) {
         return console.log(`Your query did not return any matches...`);
      }

      if (this.storage[index] !== undefined
         && this.storage[index].publisher !== publisher
         && this.storage[index].publicationDate !== publicationDate) {

         while (!found && newIndex < this.storage.length) {
            if (this.storage[newIndex].publisher === publisher
               && this.storage[index].publicationDate === publicationDate) {
               index = newIndex;
               found = true;

            } else {
               newIndex++;
            }
         }

      } else {
         found = true;
      }

      if (found) {
         console.log(`Search criteria: "${publisher}" + "${publicationDate}"`);
         console.log(`Newspaper: ${this.storage[index].newspaper}`);
         console.log(`Publisher: ${this.storage[index].publisher}`);
         console.log(`Date: ${this.storage[index].date}`);
         console.log(`Contents: ${this.storage[index].contents}`);
         console.log('-----------------------------------------')
         console.log('\r');
      }
   }

   logSystemStorage() {
      console.log(this.storage);
   }
}

var newspaperRepo = new HashTable();

newspaperRepo.addNewspaper(
   {
      newspaper: 'Time Press',
      publisher: 'John Doe',
      date: 'Oct-20-2003',
      contents: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sapiente libero quidem nulla aut dolorum nam sed voluptas veniam! Velit nam expedita aperiam in atque? Quod maxime ullam vel debitis.'
   });

newspaperRepo.addNewspaper(
   {
      newspaper: 'Detroit Courier',
      publisher: 'Karen Smith',
      date: 'January-11-1999',
      contents: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sapiente libero quidem nulla aut dolorum nam sed voluptas veniam! Velit nam expedita aperiam in atque? Quod maxime ullam vel debitis.'
   });

newspaperRepo.searchNewspaper('Karen Smith', 'January-11-1999');

newspaperRepo.logSystemStorage();
```

######*Submitted by Cesar Jimenez*