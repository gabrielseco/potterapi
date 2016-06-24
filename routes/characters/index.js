import CharactersList from './CharactersList';
import AddCharacter from './AddCharacter';
import EditCharacter from './EditCharacter';


module.exports = {
  characters: {
    path: 'characters',
    component: CharactersList,
  },
  add_character:{
    path: 'add_character',
    component: AddCharacter,
  },
  edit_character:{
    path:'character/:id',
    component: EditCharacter
  }
}
