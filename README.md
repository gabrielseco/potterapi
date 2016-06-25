POTTER GraphQL API
=====================
## Getting started

The url available to make the api calls is https://potter-graphql.herokuapp.com/

Install dependencies with

```
npm install
```

You'll need to configurate an env file
with a mongo url.

I don't want people adding characters out of my database but requests are welcome.

## Querying

For retrieving the name of the characters you'll use the next query

 ```
 {
  characters{
  name
  }
}
```

For retrieving  by field and ordering you'll use this

```
query getCharacters($field:String!, $sort:Int!){
  characters(field:$field, sort:$sort){
    _id,
    full_name
   }
}
```

You can use this variables as example to return the characters by name
```
{
  "field":"full_name",
  "sort":-1
}
```
