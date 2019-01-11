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
      this.maxStorage = 100;
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

      if (this.storage[index] === undefined) {
         this.storage[index] = [[key, data]];

      } else {
         var inserted = false;

         for (let i = 0; i < this.storage[index].length; i++) {

            if (this.storage[index][i][0] === key
               && this.storage[index][i][1].name === data.name
               && this.storage[index][i][1].phone === data.phone
               && this.storage[index][i][1].address === data.address) {

               inserted = true;
               console.log('Duplicate record found. Only the original record will be kept!')
               console.log('\r');
            }

            if (this.storage[index][i][0] === key &&
               (!this.storage[index][i][1].name === data.name
                  || !this.storage[index][i][1].phone === data.phone
                  || !this.storage[index][i][1].address === data.address)) {

               this.storage[index][i][1] = data;
               inserted = true;
            }
         }

         if (inserted === false) {
            this.storage[index].push([key, data]);
         }
      }
   }

   customerLookup(phoneNumber) {
      var key = phoneNumber;
      var index = this.hashFunction(key, this.maxStorage);

      if (this.storage[index] === undefined) {
         console.log(`Your query did not return any matches...`);
      } else {

         console.log(`The phone number "${key}" matches with the customer:`);
         console.log('\r');

         for (let i = 0; i < this.storage[index].length; i++) {
            if (this.storage[index][i][0] === key) {

               console.log(`Name: ${this.storage[index][i][1].name}`);
               console.log(`Address: ${this.storage[index][i][1].address}`);
               console.log('-----------------------------------------')
               console.log('\r');
            }
         }
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
      this.maxStorage = 100;
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

      if (this.storage[index] === undefined) {
         this.storage[index] = [[key, data]];

      } else {
         var inserted = false;

         for (let i = 0; i < this.storage[index].length; i++) {

            if (this.storage[index][i][0] === key
               && this.storage[index][i][1].name === data.name
               && this.storage[index][i][1].brand === data.brand
               && this.storage[index][i][1].type === data.type
               && this.storage[index][i][1].color === data.color
               && this.storage[index][i][1].price === data.price) {

               data.stock += this.storage[index][i][1].stock;
               this.storage[index][i][1] = data;
               inserted = true;
            }

            if (this.storage[index][i][0] === key &&
               (!this.storage[index][i][1].brand === data.brand
                  || !this.storage[index][i][1].type === data.type
                  || !this.storage[index][i][1].color === data.color
                  || !this.storage[index][i][1].price === data.price)) {

               this.storage[index][i][1] = data;
               inserted = true;
            }
         }

         if (inserted === false) {
            this.storage[index].push([key, data]);
         }
      }
   }

   retrieveProduct(itemName) {
      var key = itemName;
      var index = this.hashFunction(key, this.maxStorage);

      if (this.storage[index] === undefined) {
         console.log(`Your query did not return any matches...`);
      } else {
         for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[index][i][0] === key) {
               return `Number of ${key} in stock: ${this.storage[index][i][1].stock}`;
            }
         }
      }
   }

   logSystemStorage() {
      console.log(this.storage);
   }
}

var myStore = new HashTable();

myStore.addProduct(
   {
      name: 'Blue-Jeans',
      brand: 'Super Jeans',
      type: 'Jeans',
      color: 'Blue',
      price: '$39.99',
      stock: 200
   });

myStore.addProduct(
   {
      name: 'Blue-Jeans',
      brand: 'Super Jeans',
      type: 'Jeans',
      color: 'Blue',
      price: '$39.99',
      stock: 30
   });

myStore.addProduct(
   {
      name: 'White-Shirt',
      brand: 'Original Shirts',
      type: 'Shirt',
      color: 'White',
      price: '$29.99',
      stock: 13
   });

myStore.addProduct(
   {
      name: 'Red-Shoes',
      brand: 'Best Shoes',
      type: 'Shoes',
      color: 'Black',
      price: '$20.99',
      stock: 8
   });

console.log(myStore.retrieveProduct('Blue-Jeans'));
console.log(myStore.retrieveProduct('White-Shirt'));
console.log(myStore.retrieveProduct('Red-Shoes'));

myStore.logSystemStorage();
```

> Build a system that allows digital copies of newspapers to be entered and searched by publisher and publication date. Use hash tables to store the necessary data.

######*Code:*

```javascript
class HashTable {
   constructor() {
      this.storage = [];
      this.maxStorage = 100;
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

      if (this.storage[index] === undefined) {
         this.storage[index] = [[key, data]];

      } else {
         var inserted = false;

         for (let i = 0; i < this.storage[index].length; i++) {

            if (this.storage[index][i][0] === key
               && this.storage[index][i][1].newspaper === data.newspaper
               && this.storage[index][i][1].publisher === data.publisher
               && this.storage[index][i][1].date === data.date
               && this.storage[index][i][1].contents === data.contents) {

               inserted = true;
               console.log('Duplicate record found. Only the original record will be kept!')
               console.log('\r');
            }

            if (this.storage[index][i][0] === key &&
               (!this.storage[index][i][1].newspaper === data.newspaper
                  || !this.storage[index][i][1].publisher === data.publisher
                  || !this.storage[index][i][1].date === data.date
                  || !this.storage[index][i][1].contents === data.contents)) {

               this.storage[index][i][1] = data;
               inserted = true;
            }
         }
         if (inserted === false) {
            this.storage[index].push([key, data]);
         }
      }
   }

   searchNewspaper(publisher, publicationDate) {
      var key = publisher + publicationDate;
      var index = this.hashFunction(key, this.maxStorage);

      if (this.storage[index] === undefined) {
         console.log(`Your query did not return any matches...`);
      } else {

         console.log(`Retrieving data:`);
         console.log('\r');

         for (let i = 0; i < this.storage[index].length; i++) {
            if (this.storage[index][i][0] === key) {
               console.log(`Newspaper: ${this.storage[index][i][1].newspaper}`);
               console.log(`Publisher: ${this.storage[index][i][1].publisher}`);
               console.log(`Date: ${this.storage[index][i][1].date}`);
               console.log(`Contents: ${this.storage[index][i][1].contents}`);
               console.log('-----------------------------------------')
               console.log('\r');
            }
         }
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