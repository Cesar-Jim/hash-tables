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