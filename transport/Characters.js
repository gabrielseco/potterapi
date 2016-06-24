const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

/*
  Model responsible for querying and mutate todos
*/
export class CharactersModel {
  constructor() {
    // create a new Lokka client
    this.client = new Lokka({
      transport: new Transport('/graphql')
    });

    this.characterFragment = this.client.createFragment(`
      fragment on Character {
        _id
        name
        full_name,
      	birth_date,
      	birth_address,
        death_date,
        death_address,
      	known_as,
      	hair_colour,
      	eye_colour,
      	skin_colour,
        boggart,
        patronus,
      	occupations{
          name
        },
        wands{
          dimension,
          tree,
          magical_creature
        },
      	house,
        blood_status,
        gender,
      	marital_status,
        actor
      }
    `);

    this.fullNameFragment = this.client.createFragment(`
      fragment on Character {
        _id,
        full_name
      }
    `);

    // Get the initial data from the transport (it's a promise)
    this.dataPromise = this.client
      // invoke the GraphQL query to get all the items
      .query(`
        {
          characters{
              ...${this.characterFragment}
          }
        }
      `)
      .then(res => res.characters);

    this.table = this.client.query(`
      query getCharacters($field:String!, $sort:Int!){
        characters(field:$field, sort:$sort){
          _id,
          full_name
         }
      }
    `,{field: 'full_name',sort:1}).then(res => res.characters);;
  }

  getAll() {
    // get all the items but we clone the content inside the promise
    return this.table
      .then(items => items.concat([]));
  }

  getOne(id){
    return this.client.query(`
      query getCharacter($id: String!){
      characters(id: $id){
        ...${this.characterFragment}
       }
     }
      `, {id: id} ).then(res => res.characters[0])
  }

  esc_quot(str)
    {
      return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
    }

  // Add a newItem and register a callback to fire after
  // getting response from the server
  addCharacter(newItem, afterAdded) {
    let string = '';

    //newItem = JSON.stringify(newItem);
    this.client
      // Invoke the GraphQL query, which invoke our `addItem` mutation
      .mutate(`
        {
          character:createCharacter(
            ${newItem}
          ),
          {
            ...${this.characterFragment}
          }
        }
      `)
      .then(data => data.item)
      .then(item => {
        // if success, we replace the promise by adding the newly added item
        this.dataPromise = this.getAll().then(items => items.concat([newItem]));
      }, error => {
        // if there is an error, we simply log it
        console.error('Error adding item:', error);
      })
      // delay 600ms to show changes from optimistic updates
      .then(() => {
        return new Promise(resolve => setTimeout(resolve, 600))
      })
      .then(() => {
        // trigger the afterAdded callback with the updated data promise
        afterAdded(this.getAll());
      })

    // Add the item temporary to the data array to achieve
    // optimistic updates
    return this
      .getAll()
      .then(items => {
        items.push(`Adding "${newItem}" ...`);
        return items;
      });
  }
}
