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