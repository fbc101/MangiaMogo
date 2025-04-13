import gordon from '../assets/Gordon_Ramsay.png';
import jamie from '../assets/JamieOliver.jpg';
import julia from '../assets/JuliaChild.jpg';
import jack from '../assets/jack-black.png';
import bigsmoke from '../assets/big-smoke.png';
import nick from '../assets/nick-cook.png';
import carmy from '../assets/carmy.png';
export const cleanUsername = (user) => {
    return user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export const turnUsernameToUrl = (user) => {
    return user.replace(/\s+/g, '-').toLowerCase();
}

export const turnRecipeToUrl = (recipe) => {
    return recipe.replace(/\s+/g, '-').toLowerCase();
}

export const getUserImage = (username) => {
    if (username === 'Gordon Ramsay') {
      return gordon;
    } else if (username === 'Jamie Oliver') {
      return jamie;
    } else if (username === 'Julia Child') {
      return julia;
    } else if (username === 'Jack Black') {
      return jack;
    } else if (username === 'Big Smoke') {
      return bigsmoke;
    } else if (username === 'Nick') {
      return nick;
    } else if (username === 'Carmy Berzatto') {
      return carmy;
    } else { // Default case
      return gordon;
    }
};