
class HashTable {
   constructor() {
      this.storage = [];
      this.maxStorage = 50;
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

///////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////

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